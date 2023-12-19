import { extendTheme } from "@chakra-ui/react"

const breakpoints = {
    base: "0px",
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  };

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

export const theme = extendTheme({ config, breakpoints })