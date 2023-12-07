'use client'

import { Card, Container, Box, Text, Center } from '@chakra-ui/react'
import Player from '../models/player.model';

export default function PlayersRankingBox(props: {}) {
  let players: Player[] = [
    new Player("Player 1", 0, "#502545", null),
    new Player("Player 2", 254, "#502545", null),
  ];
  return (
    <Container position={"fixed"} top={0} left={0} marginTop={2}>
      {
        players.map((player) => {
          return (
            <Box display={"flex"}>
              <Center>
                  <Box height={3} width={3} borderRadius={"100%"} backgroundColor={player.color}></Box>
                </Center>
              <Text marginLeft={2} marginRight={3}>{player.name}</Text>
              <Text fontWeight={"bold"}>{player.score}</Text>
            </Box>
          );
        })
      }
    </Container>
  );
}