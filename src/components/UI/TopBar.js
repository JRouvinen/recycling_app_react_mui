import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SettingsDialog from '../Locations/SettingsBtnComponent';
import LogInDialog from '../Locations/LoginComponent';
import NewLocationDialog from '../Locations/NewLocationComponent';
import logo from '../images/EcoNav_5.png';
import { height } from '@mui/system';
import { Card } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

export default function TopBar(props) {
  console.log('Topbar')
  console.log(props)
  
  const userLoggingHandler = () => {
    console.log('user logging')
    props.userLoggedChangeHandler()
  };

  const adminLoggingHandler = () => {
    console.log('admin logging')
    props.adminLoggedChangeHandler()
  };

  const userLoggOutHandler = () => {
    console.log('user logout')
    props.userLogOutChangeHandler()
  };


  return (
    <Card>
      
    <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
        <Toolbar>
        <CardMedia
        component="img"
        sx={{ width: '5%' }}
        image={logo}
        alt='EcoNav-logo'
      />
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          {/* <img src={logo} width='80px'height='80px' alt='EcoNav-logo'></img> */}
          {/* <img src={logo} style={{width: '10%', height: '10%'}} alt='EcoNav-logo'></img> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EcoExplorer - Norway
            
          </Typography>
          
          {props.userLogged && <NewLocationDialog/>}
          <SettingsDialog adminLogged={props.adminLogged}/>
          {/* <Button color="inherit">Settings</Button> */}
          {props.userLogged && <Button color="inherit" onClick={userLoggOutHandler}> Logout </Button>}
          {!props.userLogged && <LogInDialog userLoggedChangeHandler={userLoggingHandler} adminLoggedChangeHandler={adminLoggingHandler}/>}
        </Toolbar>
      </AppBar>
    </Box>
    </Card>
  );
}