'use client'

import { useEffect, useState } from 'react';
import styles from './page.module.css'
import { Text, Box, Flex, Spacer, Input, Button, HStack, useNumberInput, Center, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, useDisclosure, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Select, Stack } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { PlayerColorName, getColorHex } from './values/colors';
import React from 'react';
import { CookieFieldName, CookieStorage } from '@/storage/local.storage';
import { count } from 'console';

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
    color: PlayerColorName.BLUE
  });

  const prefEdit = useDisclosure()

  const handleJoinGame = () => {};
  const handleEditPreferences = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let name = data.get("name") as string;
    let color = data.get("color") as PlayerColorName;
    setPreferences({
      name,
      color
    });
    CookieStorage.setPreference(CookieFieldName.PREF_NAME, name);
    CookieStorage.setPreference(CookieFieldName.PREF_COLOR, color);
    prefEdit.onClose();
  };
  const handleCreateNewGame = () => {};

  useEffect(() => {
    setPreferences({
      name: CookieStorage.getPreference(CookieFieldName.PREF_NAME),
      color: CookieStorage.getPreference(CookieFieldName.PREF_COLOR)? CookieStorage.getPreference(CookieFieldName.PREF_COLOR)! as PlayerColorName : PlayerColorName.BLUE
    });
  }, []);

  return (
    <>
      <Box height={"100vh"}>
        <Flex flexDirection={"row"} justifyContent={"space-between"} height={"15%"} paddingTop={5} paddingRight={5} paddingLeft={5}>
          <Text pb={"20px"} textAlign={"center"} fontSize={"larger"} fontWeight={"bold"}>Mines</Text>
          <Text pb={"20px"} textAlign={"center"}>
            <Button rightIcon={<EditIcon />} variant='outline' fontSize={"15"} fontWeight={"regular"} color={getColorHex(preferences.color)} onClick={prefEdit.onOpen}>
              {preferences.name? preferences.name : "NoName"}
            </Button>
          </Text>
        </Flex>
        <Flex flexDirection={"column"} justifyContent={"center"} height={"50%"}>
          <Flex flexDirection={"row"} justifyContent={"center"}>
            <Input maxWidth={{base: "70%", lg: 500}} borderRadius={0} borderLeftRadius={20} _focus={{ boxShadow: "none", outline: "none" }} placeholder='Enter a game ID' />
            <Button borderRadius={0} borderRightRadius={20} maxWidth={{base: "15%", lg: 70}} colorScheme='blue'>Join</Button>
          </Flex>
        </Flex>
        <Center height={"35%"}>
          <Button variant='outline' border={"none"} fontSize={"large"}>Create a new Game</Button>
        </Center>
      </Box>
      <Drawer
        isOpen={prefEdit.isOpen}
        placement='right'
        onClose={prefEdit.onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
        <form onSubmit={handleEditPreferences}>
            <Flex flexDirection={"column"} justifyContent={"space-between"} height={"100vh"}>
              <Box>
                <DrawerCloseButton />
                <DrawerHeader>Edit Preferences</DrawerHeader>
                <DrawerBody>
                  <Input placeholder='Name' marginBottom={5} name={"name"} defaultValue={preferences.name? preferences.name : "NoName"} required />
                  <Select name={"color"} defaultValue={preferences.color? preferences.color : PlayerColorName.BLUE} required >
                    <option value={PlayerColorName.BLUE}>Blue</option>
                    <option value={PlayerColorName.GREEN}>Green</option>
                    <option value={PlayerColorName.RED}>Red</option>
                    <option value={PlayerColorName.YELLOW}>Yellow</option>
                  </Select>
                </DrawerBody>
              </Box>
              <DrawerFooter>
                <Button variant='outline' mr={3} onClick={prefEdit.onClose}>
                  Cancel
                </Button>
                <Button colorScheme='blue' type='submit'>Save</Button>
              </DrawerFooter>
            </Flex>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  )
}
