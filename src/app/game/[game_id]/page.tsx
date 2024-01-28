'use client'

import { Text, Box, Flex, Spacer, Input, Button, HStack, useNumberInput, Center, SimpleGrid, Container, Card, CardBody, IconButton, useToast } from '@chakra-ui/react'
import Cell from './cell.component'
import useDeviceSize from '@/hooks/use_device_size.hook';
import PlayersRankingBox from './players_ranking_box.component';
import Player from '@/models/player.model';
import { useEffect, useState } from 'react';
import { PlayerColorName } from '@/values/colors';
import { SettingsIcon } from '@chakra-ui/icons';
import { useGameRoomContext } from '@/providers/game_room.provider';
import { Client } from 'colyseus.js';
import GameServerConfig from '@/configs/game_server.config';
import { LocalStorage, LocalStorageFieldName } from '@/storage/local.storage';
import { useParams, useRouter } from 'next/navigation';
import { CellContent } from '@/models/cell_content.model';
import { GameSteps, ServerMessagesTypes } from '@/values/game';
import { CellModel } from '@/models/cell.model';
import { secondsToHHMMSS } from '@/utils/time';

export default function GameRoomPage() {
  const gameClient = new Client(`ws://${GameServerConfig.url}`);
  const [players, setPlayers] = useState<Map<string, Player>>(new Map<string, Player>());
  const [ranking, setRanking] = useState<Array<string>>([]);
  const [dimensions, setDimensions] = useState<{cols: number; rows: number}>({
    cols: 0,
    rows: 0
  });
  const [revealedContents, setRevealedContents] = useState<Map<string, CellContent>>(new Map<string, CellContent>());
  const [count, setCount] = useState<number>(0);
  const [gameStep, setGameStep] = useState<string>(GameSteps.WAITING);
  const [cells, setCells] = useState<Array<Array<CellModel>>>([[]]);
  const [cellsData, setCellsData] = useState<Array<CellModel>>([]);
  const [lastRevealed, setLastRevealed] = useState<{
    row: number;
    col: number;
    content: CellContent
  } | null>(null);

  const router = useRouter();
  const {gameRoom, setGameRoom} = useGameRoomContext();
  const params = useParams<{ game_id: string}>();
  const [width, height] = useDeviceSize();
  const toast = useToast();

  function copyRoomIdToClipboard(){
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Game link copied to clipboard.",
      duration: 3000
    });
  }

  function getCellSize(): number {
    return (height-getCellGap()*2-(height/3.5))/dimensions.rows;
  }

  function getCellGap(): number {
    if(dimensions.rows < 8){
      return 2;
    }
    else if (dimensions.rows < 6){
      return 10;
    }
    else if (dimensions.rows < 7){
      return 5;
    }
    else{
      return 1;
    }
  }

  useEffect(() => {
    if(gameRoom){
      if(gameRoom.connection.isOpen){
        if(gameRoom.id == params.game_id){
          return;
        }
        router.push(`/game/${gameRoom.id}`);
        return;
      }
    }
    gameClient.joinById(params.game_id)
    .catch(e => {
      throw new Error();
    })
    .then(room => {
      setGameRoom(room);
    });
  }, []);
  useEffect(() => {
    if(!gameRoom){
      return;
    }
    setDimensions({
      cols: gameRoom.state.cols,
      rows: gameRoom.state.rows
    });
    setPlayers(gameRoom.state.players);
    setRanking(Array.from(gameRoom.state.players.values()).sort((p1, p2) => p1.score - p2.score).map(p => p.id));
    setGameStep(gameRoom.state.step);
    setCount(gameRoom.state.count);
    setRevealedContents(gameRoom.state.revealedContents);
    //TODO Listen to room events
    gameRoom.onStateChange(state => {
      setPlayers(state.players);
      setRanking(Array.from(state.players.values()).sort((p1, p2) => p1.score - p2.score).map(p => p.id));
      setGameStep(state.step);
      setCount(state.count);
    });
    gameRoom.onMessage(ServerMessagesTypes.NUMBER_REVEALED, (message: {
      row: number,
      col: number,
      number: number,
      playerId: string
    }) => {
      setLastRevealed({
        row: message.row,
        col: message.col,
        content: new CellContent(false, message.number)
      });
    });
    gameRoom.onMessage(ServerMessagesTypes.BOMB_REVEALED, (message: {
      row: number,
      col: number,
      playerId: string
    }) => {
      setLastRevealed({
        row: message.row,
        col: message.col,
        content: CellContent.bomb()
      });
      alert("END");
    });
  }, [gameRoom]);
  //Linked gameplay events
  useEffect(() => {
    let clls = [];
    for(let i=0; i<dimensions.rows; i++){
      let r = [];
      for(let j=0; j<dimensions.cols; j++){
        r.push(new CellModel(i, j, null));
      }
      clls.push(r);
    }
    setCells([...clls]);
  }, [dimensions]);
  useEffect(() => {
    Array.from(revealedContents.keys()).forEach(k => {
      let clls = cells;
      clls[parseInt(k.split(":")[0])][parseInt(k.split(":")[1])].content = revealedContents.get(k)? revealedContents.get(k)! : null;
      setCells(clls);
    });
    let _cellsData: CellModel[] = [];
    for(let i = 0; i < cells.length; i++)
    {
        _cellsData = _cellsData.concat(cells[i]);
    }
    setCellsData(_cellsData);
  }, [revealedContents, cells]);
  useEffect(() => {
  }, [cellsData]);
  useEffect(() => {
    if(!lastRevealed || !lastRevealed.row || !lastRevealed.col){
      return;
    }
    cells[lastRevealed.row][lastRevealed.col].content = lastRevealed!.content;
  }, [lastRevealed]);

  return (
    <Box width="100%" height="100vh">
      <Center height={"100%"}>
        <SimpleGrid columns={dimensions.cols} gap={getCellGap()}>
          {
           cellsData.map(d => (
            <Cell size={getCellSize()} data={d} key={`${d.row}:${d.col}`} />
           ))
          }
        </SimpleGrid>
      </Center>
      <Box />

      {/* Fixed position */}
      <PlayersRankingBox players={players} ranking={ranking} />
      <Box position={"fixed"} top={2} right={2}>
        <Button marginRight={1} variant='outline'
          aria-label='Game Settings'
          fontSize='medium'
          color={"gray"}
          _hover={{
            color: "white",
            transition: "0.3s"
          }}
          border={"none"}
          onClick={copyRoomIdToClipboard}
        >{ gameRoom?.roomId }</Button>
        <IconButton
          variant='outline'
          aria-label='Game Settings'
          fontSize='medium'
          color={"gray"}
          _hover={{
            color: "white",
            transition: "0.3s"
          }}
          border={"none"}
          icon={<SettingsIcon />}
        />
      </Box>
      <Box position={"fixed"} bottom={2} right={2} color={"gray"} fontSize={"small"}>
        {
          secondsToHHMMSS(count)
        }
      </Box>
    </Box>
  )
}
