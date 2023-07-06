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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';


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

  const changeDarkmodeHandler = () => {
    console.log('dark mode change')
    props.darkModeChangeHandler();
  }
  const label = { inputProps: { 'aria-label': 'Color switch demo' } };

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
      
    },
  }));

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
          {/* <FormControlLabel control={<Switch defaultChecked />} color="warning"  label="Dark mode" onClick={changeDarkmodeHandler}/> <br/> */}
          {/* {!props.darkMode && <>Light mode</>}
          {props.darkMode && <>Dark mode</>}
          <PinkSwitch label="Dark mode" onClick={changeDarkmodeHandler}/> */}
          {props.darkMode && <FormControlLabel
        control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
        onClick={changeDarkmodeHandler}
      />}
          {!props.darkMode && <FormControlLabel
        control={<MaterialUISwitch sx={{ m: 1 }} />}
        onClick={changeDarkmodeHandler}
      />}
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