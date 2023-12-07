'use client'

import styles from './page.module.css'
import { Text, Box, Flex, Spacer, Input, Button, HStack, useNumberInput } from '@chakra-ui/react'

export default function Home() {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 5,
      defaultValue: 5,
      min: 5,
      max: 50,
      precision: 0,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()


  return (
    <main className={styles.main}>
      <Box w={"100%"} h={"100vh"} pt={"30px"} pb={"30px"}>
        <Text pb={"20px"} textAlign={"center"} fontSize={"larger"} fontWeight={"bold"}>Texte</Text>
        <Flex flexDirection={"row"} justifyContent={"space-evenly"} h={"70%"}>
            <Box w={"calc(50% - 15px)"}>
              Box 1
              <Input placeholder='Basic usage' />
            </Box>
            <Box w={"calc(50% - 15px)"}>
              Box 2
              <HStack maxW='320px'>
                <Button {...dec}>-</Button>
                <Input {...input} />
                <Button {...inc}>+</Button>
              </HStack>
            </Box>
        </Flex>
      </Box>
    </main>
  )
}
