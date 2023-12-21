'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { theme } from '@/values/theme'

export function AppChakraProvider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme} resetCSS>{children}</ChakraProvider>
  )
}