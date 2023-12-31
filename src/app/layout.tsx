import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppChakraProvider } from '@/providers/chakra.provider'
import { ColorModeScript } from '@chakra-ui/react'
import { theme } from '../values/theme'
import { GameRoomProvider } from '@/providers/game_room.provider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <AppChakraProvider>
          <GameRoomProvider>
            {children}
          </GameRoomProvider>
        </AppChakraProvider>
      </body>
    </html>
  )
}
