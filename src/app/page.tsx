'use client'

import { useEffect, useState } from 'react';
import styles from './page.module.css'
import { Text, Box, Flex, Spacer, Input, Button, HStack, useNumberInput, Center, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, useDisclosure, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Select, Stack, InputGroup, InputLeftAddon, InputRightAddon, Checkbox, Badge } from '@chakra-ui/react';
import { ArrowForwardIcon, EditIcon } from '@chakra-ui/icons';
import { PlayerColorName, getColorHex } from './values/colors';
import React from 'react';
import { CookieFieldName, CookieStorage } from '@/storage/local.storage';
import { GameDifficulties } from './values/game';

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
  const [searchGameId, setSearchGameId] = useState<string>("");

  const prefEdit = useDisclosure();
  const gameCreate = useDisclosure();

  const handleJoinGame = (e: any) => {
    if(e.type == "keydown" && e.key != "Enter"){
      return;
    }
    //
  };
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
  const handleCreateNewGame = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
  };
  const onSearchGameIdChange = (e: any) => {
    setSearchGameId(e.target.value);
  };

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
            <Input maxWidth={{base: "70%", lg: 500}} borderRadius={0} borderLeftRadius={20} _focus={{ boxShadow: "none", outline: "none" }} placeholder='Enter a game ID' fontWeight={"bold"} fontSize={{base: "medium", lg: "large"}} onKeyDown={handleJoinGame} padding={{base: 3, lg: 7}} onChange={onSearchGameIdChange} />
            <Button borderRadius={0} borderRightRadius={20} maxWidth={{base: "15%", lg: 70}} colorScheme='blue' padding={{base: 3, lg: 7}} onClick={handleJoinGame}>Join</Button>
          </Flex>
        </Flex>
        <Center height={"35%"}>
          <Button variant='outline' border={"none"} fontSize={"large"} onClick={gameCreate.onOpen}>Create a new Game</Button>
        </Center>
      </Box>

      {/* Edit preferences Drawer */}
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
                <Button colorScheme='blue' type='submit'>Save</Button>
              </DrawerFooter>
            </Flex>
          </form>
        </DrawerContent>
      </Drawer>

      {/* Create game Drawer */}
      <Drawer
        isOpen={gameCreate.isOpen}
        placement='right'
        onClose={gameCreate.onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
        <form onSubmit={handleCreateNewGame}>
            <Flex flexDirection={"column"} justifyContent={"space-between"} height={"100vh"}>
              <Box>
                <DrawerCloseButton />
                <DrawerHeader>Create a new Game</DrawerHeader>
                <DrawerBody>
                  <InputGroup>
                    <Input placeholder='Rows number' marginBottom={5} name={"rows"} defaultValue={5} type='number' step={5} min={5} max={25} required />
                    <InputRightAddon children='rows' />
                  </InputGroup>
                  <InputGroup>
                    <Input placeholder='Cols number' marginBottom={5} name={"cols"} defaultValue={5} type='number' step={5} min={5} max={25} required />
                    <InputRightAddon children='cols' />
                  </InputGroup>
                  <Select name={"difficulty"} defaultValue={GameDifficulties.INTERMEDIARY} marginBottom={5} required >
                    <option value={GameDifficulties.BEGINNER}>Beginner</option>
                    <option value={GameDifficulties.INTERMEDIARY}>Intermediary</option>
                    <option value={GameDifficulties.ADVANCED}>Advanced</option>
                  </Select>
                  <Checkbox colorScheme='blue' name='watchOut' marginBottom={0} disabled>
                    Watch-Out Mode
                    <Badge ml='1'>Coming Soon</Badge>
                  </Checkbox>
                  <Checkbox colorScheme='blue' name='delay' disabled>
                    Delay-Action Bomb
                    <Badge ml='1'>Coming Soon</Badge>
                  </Checkbox>
                  <Checkbox colorScheme='blue' name='sabotage' disabled>
                    Sabotage
                    <Badge ml='1'>Coming Soon</Badge>
                  </Checkbox>
                </DrawerBody>
              </Box>
              <DrawerFooter>
                <Button colorScheme='blue' type='submit' rightIcon={<ArrowForwardIcon />}>Go</Button>
              </DrawerFooter>
            </Flex>
          </form>
        </DrawerContent>
      </Drawer>

      {/* Fixed position */}
      <Text position={"fixed"} bottom={5} right={5} opacity={0.5} fontWeight={"bold"}>v1.0.0</Text>
    </>
  )
}
