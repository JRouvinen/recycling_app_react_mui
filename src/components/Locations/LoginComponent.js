import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';


function SimpleDialog(props) {
  console.log('Log in2')
  console.log(props)
  // const { onClose, selectedValue, open } = props;
  const { onClose,  open } = props;
  const handleClose = () => {
    // onClose(selectedValue);
    onClose();

  };


  const [userName, setUserName] = React.useState('');
  const [userPswd, setUserPswd] = React.useState('');
  const [validLogIn, setValidLogIn] = React.useState(true);
  

  const logInHandler = () => {
    console.log('log In')
    console.log(userName, userPswd)
    if (userName ==='Tester320' && userPswd === 'DebugMaister1#2') {
      props.adminLoggedChangeHandler()
    } else if (userName ==='user2023' && userPswd === '#TesterUser!') {
      props.userLoggedChangeHandler()
    } else {
      setValidLogIn(false);
    }

  };

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value)
  };

  const userPswdChangeHandler = (event) => {
    setUserPswd(event.target.value)
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Login</DialogTitle>
      
      
      <List sx={{ pt: 1 , m: 1}}>
      {!validLogIn && <TextField
          error
          id="outlined-required"
          label="Username"
          helperText="Wrong username"
          value={userName}
          onChange={userNameChangeHandler}
        />}
      {validLogIn && <TextField
          required
          id="outlined-required"
          label="Username"
          value={userName}
          onChange={userNameChangeHandler}
        />}
        <br/>

        <br/>
        {!validLogIn && <TextField
          error
          id="outlined-password-input"
          label="Password"
          type="password"
          helperText="Wrong password"
          autoComplete="current-password"
          value={userPswd}
          onChange={userPswdChangeHandler}
        />}
        {validLogIn && <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={userPswd}
          onChange={userPswdChangeHandler}
        />}
        <br/>

        <br/>
      <Button variant="contained" onClick={logInHandler}>Log in</Button>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // selectedValue: PropTypes.string.isRequired,
};

export default function LogInDialog(props) {
  console.log('Log in')
  console.log(props)
  const [open, setOpen] = React.useState(false);
  // const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    // setSelectedValue(value);
  };

  return (
    <div>
      {/* <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br /> */}
      <Button color="inherit" onClick={handleClickOpen}>
      Login
      </Button>
      <SimpleDialog
        // selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        userLoggedChangeHandler={props.userLoggedChangeHandler} adminLoggedChangeHandler={props.adminLoggedChangeHandler}
      />
    </div>
  );
}