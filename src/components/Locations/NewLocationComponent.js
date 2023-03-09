import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { styled } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

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

  const handleListItemClick = (value) => {
    onClose(value);
  };


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>New recycling location</DialogTitle>
      
      
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '30ch' }, pt:1
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
          required
          id="outlined-required"
          label="Location"
          defaultValue="Hello World"
          
        />
        <TextField
          required
          id="outlined-required"
          label="Address"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="County"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="Latitude"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="Longitude"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="Description"
          defaultValue="Hello World"
        />
        <br/>
        <Stack spacing={2} direction="row">
      <Button variant="contained">Add new</Button>
      <Button variant="contained">Cancel</Button>
        </Stack>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // selectedValue: PropTypes.string.isRequired,
};

export default function NewLocationDialog() {
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
      Add new location
      </Button>
      <SimpleDialog
        // selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}