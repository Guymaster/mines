'use client'

import { Text, Box, Flex, Spacer, Input, Button, HStack, useNumberInput, Center, SimpleGrid } from '@chakra-ui/react'
import Cell from './cell.component'
import useDeviceSize from '@/hooks/use_device_size.hook';

export default function GameRoomPage() {
  const [width, height] = useDeviceSize();

  const dimensions: {cols: number; rows: number} = {
    cols: 50,
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
      <Center height={"100%"}>
        <SimpleGrid columns={dimensions.cols} gap={getCellGap()}>
          {
           getCells()
          }
        </SimpleGrid>
      </Center>
      <Box />
    </Box>
  )
}
