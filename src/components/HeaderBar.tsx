import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import useGetUser from '../hooks/useGetUser';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    actionButtons: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
  { name: HeaderBar.name },
);

export default function HeaderBar() {
  const classes = useStyles();
  const user = useGetUser();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Postagram
          </Typography>
          <div className={classes.actionButtons}>
            <Typography variant="body1">{user.username}</Typography>
            <IconButton color="inherit" onClick={handleProfileMenuOpen}>
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem>
          <AmplifySignOut />
        </MenuItem>
      </Menu>
    </div>
  );
}
