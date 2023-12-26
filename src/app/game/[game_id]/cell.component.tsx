'use client'

import { CellModel } from '@/models/cell.model';
import { useGameRoomContext } from '@/providers/game_room.provider';
import { ClientMessagesTypes } from '@/values/game';
import { Card } from '@chakra-ui/react'

export default function Cell(props: {size: number, data: CellModel}) {
  const {gameRoom, setGameRoom} = useGameRoomContext();

  const handleClick = (event: any) => {
    console.log(`Clicked on cell ${props.data.row}:${props.data.col}`);
    if(!gameRoom){
      return;
    }
    gameRoom.send(ClientMessagesTypes.CURSOR_POSITION, {
      col: props.data.col,
      row: props.data.row
    })
  };
  return (
    <Card width={props.size} height={props.size} backgroundColor={"gray"} _hover={{backgroundColor: "green"}} borderRadius={0} onClick={handleClick}>
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
    </Card>
  );
}