'use client'

import { Card } from '@chakra-ui/react'

export default function Cell(props: {size: number}) {
  return (<Card width={props.size} height={props.size} backgroundColor={"gray"} _hover={{backgroundColor: "green"}}></Card>);
}
