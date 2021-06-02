import React from 'react';
import { red } from '@material-ui/core/colors';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { zhCN } from '@material-ui/core/locale';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          backgroundColor: '#f4f5f5'
        },
        body: {
          backgroundColor: 'unset'
        }
      }
    }
  }
}, zhCN);

function ThemeProviderPro(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}

export default ThemeProviderPro;
