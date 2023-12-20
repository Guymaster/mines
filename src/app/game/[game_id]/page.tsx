'use client'

import { Text, Box, Flex, Spacer, Input, Button, HStack, useNumberInput, Center, SimpleGrid, Container, Card, CardBody, IconButton } from '@chakra-ui/react'
import Cell from './cell.component'
import useDeviceSize from '@/hooks/use_device_size.hook';
import PlayersRankingBox from './players_ranking_box.component';
import Player from '../models/player.model';
import { useState } from 'react';
import { PlayerColorName } from '@/app/values/colors';
import { SettingsIcon } from '@chakra-ui/icons';

export default function GameRoomPage() {
  const [width, height] = useDeviceSize();
  const exPlayerMap = new Map<string, Player>();
  exPlayerMap.set("1", new Player("1", "Player 1", 0, PlayerColorName.BLUE, 0, 0, true))
  exPlayerMap.set("2", new Player("2", "Player 254545554545", 254, PlayerColorName.GREEN, 0, 0, true))
  exPlayerMap.set("3", new Player("3", "Player 1", 0, PlayerColorName.RED, 0, 0, true))
  //const [players, setPlayers] = useState<Map<string, Player>>(new Map<string, Player>());
  const [players, setPlayers] = useState<Map<string, Player>>(exPlayerMap);
  const [ranking, setRanking] = useState<Array<string>>(["1", "2", "3"]);

  const dimensions: {cols: number; rows: number} = {
    cols: 25,
    rows: 25
  };

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
        <Button marginRight={2} variant='outline'
          aria-label='Game Settings'
          fontSize='medium'
          border={"none"}>IIIOOJOJ</Button>
        <IconButton
          variant='outline'
          aria-label='Game Settings'
          fontSize='medium'
          border={"none"}
          icon={<SettingsIcon />}
        />
      </Box>
      <Box position={"fixed"} bottom={2} right={2} color={"gray"} fontSize={"small"}>
        {
          "1h 20mn 18s"
        }
      </Box>
    </Box>
  )
}
