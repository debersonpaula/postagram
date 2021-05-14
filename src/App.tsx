import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import HeaderBar from './components/HeaderBar';
import PostBoard from './components/PostBoard';

const theme = createMuiTheme({});
Amplify.configure(config);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeaderBar />
      <PostBoard />
    </ThemeProvider>
  );
}

export default withAuthenticator(App);
