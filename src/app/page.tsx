'use client'

import { useState } from 'react';
import styles from './page.module.css'
import { Text, Box, Flex, Spacer, Input, Button, HStack, useNumberInput, Center } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { PlayerColorName, PlayerColors } from './values/colors';

type UserPreferences = {
  name: string | null,
  color: PlayerColorName
};

export default function Home() {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 5,
    defaultValue: 5,
    min: 5,
    max: 50,
    precision: 0,
  });
  const [preferences, setPreferences] = useState<UserPreferences>({
    name: null,
    color: "BLUE"
  });


  return (
    <Box height={"100vh"}>
      <Flex flexDirection={"row"} justifyContent={"space-between"} height={"15%"} paddingTop={5} paddingRight={5} paddingLeft={5}>
        <Text pb={"20px"} textAlign={"center"} fontSize={"larger"} fontWeight={"bold"}>Mines</Text>
        <Text pb={"20px"} textAlign={"center"}>
          <Button rightIcon={<EditIcon />} variant='outline' fontSize={"15"} fontWeight={"regular"} color={PlayerColors[preferences.color]}>
            {preferences.name? preferences.name : "NoName"}
          </Button>
        </Text>
      </Flex>
      <Flex flexDirection={"column"} justifyContent={"center"} height={"50%"}>
        <Flex flexDirection={"row"} justifyContent={"center"}>
          <Input maxWidth={{base: "70%", lg: 500}} borderRadius={0} borderLeftRadius={20} _focus={{ boxShadow: "none", outline: "none" }} placeholder='Enter a game ID' />
          <Button borderRadius={0} borderRightRadius={20} maxWidth={{base: "15%", lg: 70}}>Join</Button>
        </Flex>
      </Flex>
      <Center height={"35%"}>
        <Button variant='outline' border={"none"}>Create a new Game</Button>
      </Center>
    </Box>
  )
}
