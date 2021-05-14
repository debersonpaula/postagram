import React from 'react';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import HeaderBar from './components/HeaderBar';

const theme = createMuiTheme({});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeaderBar />
    </ThemeProvider>
  );
}
