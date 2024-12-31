import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1d1d1f',
      light: '#424245',
      dark: '#000000',
    },
    secondary: {
      main: '#06c',
      light: '#147ce5',
      dark: '#0055b3',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1d1d1f',
      secondary: '#6e6e73',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    h1: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      fontWeight: 600,
      fontSize: '48px',
      letterSpacing: '-0.015em',
    },
    h2: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      fontWeight: 600,
      fontSize: '40px',
      letterSpacing: '-0.015em',
    },
    h3: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      fontWeight: 500,
      fontSize: '32px',
      letterSpacing: '-0.015em',
    },
    h4: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      fontWeight: 500,
      fontSize: '28px',
      letterSpacing: '-0.015em',
    },
    h5: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      fontWeight: 500,
      fontSize: '24px',
      letterSpacing: '-0.015em',
    },
    h6: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      fontWeight: 500,
      fontSize: '20px',
      letterSpacing: '-0.015em',
    },
    body1: {
      fontSize: '17px',
      lineHeight: 1.47059,
      fontWeight: 400,
      letterSpacing: '-0.022em',
    },
    body2: {
      fontSize: '14px',
      lineHeight: 1.42859,
      fontWeight: 400,
      letterSpacing: '-0.016em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 400,
      letterSpacing: '-0.01em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 980,
          padding: '8px 16px',
          transition: 'all 0.2s ease',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme; 