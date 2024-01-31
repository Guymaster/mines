'use client'

import { CellModel } from '@/models/cell.model';
import { useGameRoomContext } from '@/providers/game_room.provider';
import { ClientMessagesTypes } from '@/values/game';
import { Card, Center } from '@chakra-ui/react'

export default function Cell(props: {size: number, data: CellModel, playerColorHex: string}) {
  const {gameRoom, setGameRoom} = useGameRoomContext();

  const handleClick = (event: any) => {
    console.log(`Clicked on cell ${props.data.row}:${props.data.col}`);
    if(!gameRoom){
      return;
    }
    gameRoom.send(ClientMessagesTypes.CHOOSE_CELL, {
      col: props.data.col,
      row: props.data.row
    });
  };
  return (
    <Card width={props.size} height={props.size} backgroundColor={(props.data.content)? "none" : "gray"} _hover={{backgroundColor: props.playerColorHex}} borderRadius={0} onClick={handleClick} display={"flex"} flexDirection={"column"} justifyContent={"center"} cursor={"default"}>
      <Center fontSize={Math.floor(props.size*0.8)} fontWeight={"bold"}>
        {
          (() => {
            if(!props.data.content){
              return "";
            }
            if(props.data.content.isBomb){
              return "B";
            }
            return props.data.content.number.toString();
          })()
        }
      </Center>
    </Card>
  );
}