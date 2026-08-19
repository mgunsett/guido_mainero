import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const colors = {
  brand: {
    brown: '#9c755a', // color principal de marca
    brownDark: '#70533f', // hover del principal
    brownLight: '#b5744e', // variante clara (gradientes)
    gold: '#c9a84cc0', // acento dorado (trofeos, representante)
    dark: '#080C12', // fondo global
    gray: '#8A8F9E',
    gray2: '#5A6070', // gris apagado (labels secundarios del panel)
    amber: '#C9A84C', // acento del panel /AdminPage
    amberLight: '#E0C475',
    dorado: '#9c755a',
    bone: '#F5F0E8',
    boneWarm: '#EDE8DC',
  },
}

const fonts = {
  heading: `'Bebas Neue', sans-serif`,
  body: `'Barlow', sans-serif`,
  condensed: `'Barlow Condensed', sans-serif`,
}

const styles = {
  global: {
    'html, body': {
      bg: '#080C12',
      color: 'white',
      overflowX: 'hidden',
    },
    '::-webkit-scrollbar': {
      width: '4px',
      height: '4px',
    },
    '::-webkit-scrollbar-track': {
      background: '#080C12',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#9c755a',
    },
    '::selection': {
      background: 'rgba(156,117,90,0.35)',
    },
  },
}

const components = {
  Button: {
    variants: {
      piovi: {
        fontFamily: `'Barlow Condensed', sans-serif`,
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        borderRadius: 0,
        border: '1px solid',
        borderColor: 'rgba(255,255,255,0.18)',
        bg: 'transparent',
        color: 'white',
        transition: 'all 0.3s ease',
        _hover: {
          bg: 'brand.brown',
          borderColor: 'brand.brown',
          color: 'white',
        },
      },
      pioviSolid: {
        fontFamily: `'Barlow Condensed', sans-serif`,
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        borderRadius: 0,
        border: '1px solid',
        borderColor: 'brand.brown',
        bg: 'brand.brown',
        color: 'white',
        transition: 'all 0.3s ease',
        _hover: {
          bg: 'brand.brownDark',
          borderColor: 'brand.brownDark',
        },
      },
    },
  },
}

const theme = extendTheme({ config, colors, fonts, styles, components })

export default theme
