'use client'

import { Text, Box, Flex, Spacer, Input, Button, HStack, useNumberInput, Center, SimpleGrid, Container } from '@chakra-ui/react'
import Cell from './cell.component'
import useDeviceSize from '@/hooks/use_device_size.hook';
import PlayersRankingBox from './players_ranking_box.component';

export default function GameRoomPage() {
  const [width, height] = useDeviceSize();

  const dimensions: {cols: number; rows: number} = {
    cols: 10,
    rows: 10
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
      return 15;
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
  }""

  return (
    <Box width="100%" height="100vh">
      <PlayersRankingBox></PlayersRankingBox>
      <Center height={"100%"}>
        <SimpleGrid columns={dimensions.cols} gap={getCellGap()}>
          {
           getCells()
          }
        </SimpleGrid>
      </Center>
      <Box />
      <Box position={"fixed"} bottom={2} right={2} color={"gray"} fontWeight={"bold"}>
        {
          "1h 20mn 18s"
        }
      </Box>
    </Box>
  )
}
