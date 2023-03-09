import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import ServiceFilter from './ServiceFilterComponent';
import Switch from '@mui/material/Switch';
import { styled } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import ColumnFilter from './ColumnFilterComponent';

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));


function SimpleDialog(props) {
  // const { onClose, selectedValue, open } = props;
  const { onClose,  open } = props;

  const handleClose = () => {
    // onClose(selectedValue);
    onClose();

  };


  const [btn1_checked, setBtn1Checked] = React.useState(true);
  const [btn2_checked, setBtn2Checked] = React.useState(false);
  const [info_txt, setInfoTxt] = React.useState('...')
  const handleChange1 = (event) => {
    setBtn1Checked(event.target.checked);
    setBtn2Checked(false);
    setInfoTxt('Loading local database..')

  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Login</DialogTitle>
      
      
      <List sx={{ pt: 1 , m: 1}}>
      <TextField
          required
          id="outlined-required"
          label="Login name"
          defaultValue=""
        />
        <br/>

        <br/>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <br/>

        <br/>
      <Button variant="contained">Log in</Button>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // selectedValue: PropTypes.string.isRequired,
};

export default function LogInDialog() {
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
      />
    </div>
  );
}