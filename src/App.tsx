import React from 'react';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import HeaderBar from './components/HeaderBar';

import Amplify from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';

const theme = createMuiTheme({});
Amplify.configure(config);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeaderBar />
    </ThemeProvider>
  );
}

export default withAuthenticator(App);
