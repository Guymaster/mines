'use client'

import { Text, Box, Flex, Spacer, Input, Button, HStack, useNumberInput, Center, SimpleGrid, Container, Card, CardBody, IconButton } from '@chakra-ui/react'
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

export default function GameRoomPage() {
  const gameClient = new Client(`ws://${GameServerConfig.url}`);
  // const exPlayerMap = new Map<string, Player>();
  // exPlayerMap.set("1", new Player("1", "Player 1", 0, PlayerColorName.BLUE, 0, 0, true))
  // exPlayerMap.set("2", new Player("2", "Player 254545554545", 254, PlayerColorName.GREEN, 0, 0, true))
  // exPlayerMap.set("3", new Player("3", "Player 1", 0, PlayerColorName.RED, 0, 0, true))
  const [players, setPlayers] = useState<Map<string, Player>>(new Map<string, Player>());
  // const [players, setPlayers] = useState<Map<string, Player>>(exPlayerMap);
  const [ranking, setRanking] = useState<Array<string>>([]);
  const [dimensions, setDimensions] = useState<{cols: number; rows: number}>({
    cols: 0,
    rows: 0
  });
  const [revealedContents, setRevealedContents] = useState<Map<string, CellContent>>(new Map<string, CellContent>());
  const [count, setCount] = useState<number>(0);
  const [gameStep, setGameStep] = useState<string>(GameSteps.WAITING);
  const [cells, setCells] = useState<Array<Array<CellModel>>>([[]]);

  const router = useRouter();
  const {gameRoom, setGameRoom} = useGameRoomContext();
  const params = useParams<{ game_id: string}>();
  const [width, height] = useDeviceSize();

  function getCells(){
    let cells = [];
    for(let i=0; i<dimensions.cols*dimensions.rows; i++){
      cells.push(<Cell key={i} size={getCellSize()} />);
    }
    return cells;
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
      let clls = cells;
      clls[message.row][message.col].content = new CellContent(false, message.number);
      setCells(clls);
    });
    gameRoom.onMessage(ServerMessagesTypes.BOMB_REVEALED, (message: {
      row: number,
      col: number,
      playerId: string
    }) => {
      let clls = cells;
      clls[message.row][message.col].content = new CellContent(true, 0);
      setCells(clls);
    });
    gameRoom.onMessage(ServerMessagesTypes.BOMB_REVEALED, (message: {
      //
    }) => {
      alert("END")
    });
  }, [gameRoom]);
  //Linked gameplay events
  useEffect(() => {
    let clls = [];
    for(let i=0; i++; i<dimensions.rows){
      let r = [];
      for(let j=0; j++; j<dimensions.cols){
        r.push(new CellModel(i, j, null))
      }
      clls.push(r);
    }
    setCells(clls);
  }, [dimensions]);
  useEffect(() => {
    Array.from(revealedContents.keys()).forEach(k => {
      let clls = cells;
      clls[parseInt(k.split(":")[0])][parseInt(k.split(":")[1])].content = revealedContents.get(k)? revealedContents.get(k)! : null;
      setCells(clls);
    });
  }, [revealedContents]);

  return (
    <Box width="100%" height="100vh">
      <Center height={"100%"}>
        <SimpleGrid columns={dimensions.cols} gap={getCellGap()}>
          {
           getCells()
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
          border={"none"}>IIIOOJOJ</Button>
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
          "01:20:18"
        }
      </Box>
    </Box>
  )
}
