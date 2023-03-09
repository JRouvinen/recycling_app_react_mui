import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsDialog from '../Locations/SettingsBtnComponent';
import LogInDialog from '../Locations/LoginComponent';
import NewLocationDialog from '../Locations/NewLocationComponent';

export default function TopBar(props) {

  const handleClickOpen = () => {
    console.log('logging out')
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EcoNav - Norway
          </Typography>
          {props.userLogged && <NewLocationDialog/>}
          <SettingsDialog/>
          {/* <Button color="inherit">Settings</Button> */}
          {props.userLogged && <Button color="inherit" onClick={handleClickOpen}> Logout </Button>}
          {!props.userLogged && <LogInDialog userLogged={props.userLogged}/>}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}