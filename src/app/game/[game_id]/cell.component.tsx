'use client'

import { CellModel } from '@/models/cell.model';
import { useGameRoomContext } from '@/providers/game_room.provider';
import { ClientMessagesTypes } from '@/values/game';
import { Card, Center } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { Rect, Text, Image } from 'react-konva';
import useImage from 'use-image';

export default function Cell(props: {size: number, gap: number, data: CellModel, playerColorHex: string}) {
  const fontSize = Math.floor(0.8*props.size);

  const {gameRoom, setGameRoom} = useGameRoomContext();
  const [isHovered, setIsHovered] = useState(false);
  const [bombImage] = useImage("/bomb.png");

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
  const handleMouseEnter = (event: any) => {
    setIsHovered(true);
  };
  const handleMouseLeave = (event: any) => {
    setIsHovered(false)
  };

  useEffect(()=>{
    
  }, []);

  return (
    <>
      <Rect
        key={`${props.data.row}:${props.data.col}`}
        x={props.size*props.data.row + props.gap*props.data.row}
        y={props.size*props.data.col+props.gap*props.data.col }
        width={props.size}
        height={props.size}
        fill={(isHovered? props.playerColorHex : "gray")}
        opacity={(props.data.content? 0 : 1)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
      {(props.data.content && props.data.content.isBomb) &&
        <Image image={bombImage}
          key={`img${props.data.row}:${props.data.col}`}
          x={props.size*props.data.row + props.gap*props.data.row + Math.floor(props.size*0.2)}
          y={props.size*props.data.col+props.gap*props.data.col + Math.floor(props.size*0.2)}
          width={Math.floor(props.size*0.6)}
          height={Math.floor(props.size*0.6)}
        />
      }
      {(props.data.content && !props.data.content.isBomb && props.data.content.number != 0) &&
        <Text
          text={props.data.content.number.toString()} 
          key={`text${props.data.row}:${props.data.col}`}
          align='center'
          x={props.size*props.data.row + props.gap*props.data.row}
          y={props.size*props.data.col+props.gap*props.data.col + (props.size - fontSize)*0.7}
          width={props.size}
          height={props.size}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          fontSize={fontSize}
          fontStyle='bold'
          onClick={handleClick}
          fill='white'
        />
      }
    </>
    //<Text text="Try click on rect" />
    // <Card width={props.size} height={props.size} backgroundColor={(props.data.content)? "none" : "gray"} _hover={{backgroundColor: props.playerColorHex}} borderRadius={0} onClick={handleClick} display={"flex"} flexDirection={"column"} justifyContent={"center"} cursor={"default"}>
    //   <Center fontSize={Math.floor(props.size*0.8)} fontWeight={"bold"}>
    //     {
    //       (() => {
    //         if(!props.data.content){
    //           return "";
    //         }
    //         if(props.data.content.isBomb){
    //           return "B";
    //         }
    //         return props.data.content.number.toString();
    //       })()
    //     }
    //   </Center>
    // </Card>
  );
}