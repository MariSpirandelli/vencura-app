import { createTheme } from '@material-ui/core';

export const materialUITheme = createTheme({
  palette: {
    primary: {
      main: '#1C93D6',
    },
    secondary: {
      main: '#54AADB',
    },
  },
  typography: {
    htmlFontSize: 16,

    h1: {
      fontSize: '3.2rem',
      fontWeight: 400,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 400,
    },
    h3: {
      fontSize: '1.6rem',
      fontWeight: 400,
    },
    h4: {
      fontSize: '1.1333rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '0.8rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '0.6666rem',
      fontWeight: 700,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
