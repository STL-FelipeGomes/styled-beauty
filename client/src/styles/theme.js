import { extendTheme } from '@chakra-ui/react';

export default extendTheme({
  colors: {
    whiteX: {
      700: '#FFFFFF',
      600: '#F4F4F4',
    },
    blackX: {
      600: '#0F241D',
      500: '#666666',
      400: '#D9D9D9',
    },
    greenX: {
      700: '#49B88D',
      600: '#40A07B',
    },
    orangeX: {
      700: '#FF843F',
    },
    redX: {
      700: '#F20000',
    },
  },
  fonts: {
    heading: 'Poppins, Dm Sans, sans-serif',
    body: 'Poppins, Dm Sans, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'whiteX.600',
        color: 'blackX.600',
      },
    },
  },
});
