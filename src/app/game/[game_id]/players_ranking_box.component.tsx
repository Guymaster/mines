'use client'

import { Card, Container, Box, Text, Center } from '@chakra-ui/react'
import Player from '../../../models/player.model';
import { PlayerColorName, getColorHex } from '@/values/colors';

export default function PlayersRankingBox(props: {
  players: Map<string, Player>,
  ranking: Array<string>
}) {
  return (
    <Container position={"fixed"} top={0} left={0} marginTop={2}>
      {
        props.ranking.map((id) => {
          return (
            <Box display={"flex"}>
              <Text marginLeft={0} marginRight={3} color={getColorHex(props.players.get(id)!.color as PlayerColorName)} opacity={0.7}>{props.players.get(id)!.name}</Text>
              <Text color={"gray"}>{props.players.get(id)!.score}</Text>
            </Box>
          );
        })
      }
    </Container>
  );
}