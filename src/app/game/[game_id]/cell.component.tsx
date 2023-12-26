'use client'

import { CellModel } from '@/models/cell.model';
import { Card } from '@chakra-ui/react'

export default function Cell(props: {size: number, data: CellModel}) {

  const handleClick = (event: any) => {
    console.log(`Clicked on cell ${props.data.row}:${props.data.col}`);
  };

  return (
    <Card width={props.size} height={props.size} backgroundColor={"gray"} _hover={{backgroundColor: "green"}} borderRadius={0} onClick={handleClick}>
      {props.data.content &&
        (props.data.content.isBomb)?
          "B" : `${props.data.content?.number}`
      }
    </Card>
  );
}