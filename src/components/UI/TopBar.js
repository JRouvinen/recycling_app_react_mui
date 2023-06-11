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
import { Card } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card>
      
    <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
        <Toolbar>
        <CardMedia
        component="img"
        sx={{ width: '70px' }}
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
          <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
            EcoNav - Norway
          </Typography>
          
          {/* {props.userLogged && <NewLocationDialog/>}
          <SettingsDialog adminLogged={props.adminLogged}/> */}
          {props.userLogged && <Button color="inherit" onClick={userLoggOutHandler}> Logout </Button>}
          {!props.userLogged && <LogInDialog userLoggedChangeHandler={userLoggingHandler} adminLoggedChangeHandler={adminLoggingHandler}/>}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      > 
      {/* --------- These buttons needs to be implemented correctly!!!!! --------- */}
        {props.userLogged && <NewLocationDialog/>}
        {/* <MenuItem onClick={handleClose}>Add new location</MenuItem> */}
        {props.userLogged && <SettingsDialog adminLogged={props.adminLogged}/>}
        {/* <MenuItem onClick={handleClose}>Settings</MenuItem> */}
        <MenuItem onClick={handleClose}>Info</MenuItem>
      </Menu>
        </Toolbar>
      </AppBar>
    </Box>
    </Card>
  );
}