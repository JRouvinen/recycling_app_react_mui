import React, {  useState } from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { styled } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import ServiceFilter from "./ServiceFilterComponent";
import NewLocationServices from "./NewLocationServiceSlector";

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

  const type = [
    'returpunkt',
    'farlig',
    'hyttepunkt',
  ]

  const locationtype = [
    'container',
    'centre',
  ]

  const services = [
    {service:"Glass packaging"}, 
  {service:"Metal packaging"} ,
  {service:"Textiles, clothes and shoes"},
  {service:"Dangerous waste"},
  {service:"Corrugated cardboard"},
  {service:"Beverage carton"},
  {service:"Packaging carton"},
  {service:"Paper"},
  {service:"Cardboard, paper and cardboard"},
  {service:"Plastic packaging"},
  {service:"Residual waste"},
  {service:"Mixed plastic"},
  {service:"Plastic (not packaging)"},
  {service:"Electrical and electronic waste"},
  {service:"Garden waste"},
  {service:"Batteries"},
  {service:"Explosive waste"},
  {service:"Medical waste"},
  {service:"Small electronics"},
  {service:"Combustible residual waste"},
  {service:"Metal"},
  {service:"Food waste"},
  {service:"Items for reuse"},
  {service:"Wood"},
  {service:"Other"},
  {service:"Small recreational boats"},
  {service:"Construction and demolition waste"},
  {service:"Large recreational boats without inboard engines"},
  {service:"Marine waste"},
  {service:"Asbestos"},
  {service:"Window panes"},
  {service:"Leisure boats with inboard motor"},
  {service:"Styrofoam (EPS)"},
  {service:"Landfill residue"},
  {service:"Plaster"},
  {service:"Coarse waste"},
  {service:"Non-combustible waste"},
  {service:"Impregnated wood"},
  {service:"Inert waste"},
  {service:"Iron and steel"},
  {service:"Composite iron and steel"},
  {service:"Tires"},
  {service:"Pure masses"},
  {service:"Compost soil"},
  {service:"Bottles and cans with deposit"},
  {service:"Cars"}
  ];



  const [newLocation, setnewLocation] = useState('');
  const [newAddress, setnewAddress] = useState('');
  const [newCounty, setnewCounty] = useState('');
  const [newLatitude, setnewLatitude] = useState('');
  const [newLongitude, setnewLongitude] = useState('');
  const [newDescription, setnewDescription] = useState('');
  const [newServices, setnewServices] = useState();
  const [newType, setnewType] = useState('');
  const [newLocationtype, setnewLocationtype] = useState('');


  const updateNewServices = (setservices) =>{
    console.log('updateNewServices')
    setnewServices = setservices;
    console.log(newServices)

  }

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
          value={newLocation}
          onChange={setnewLocation}
        />
        <TextField
          required
          id="outlined-required"
          label="Address"
          // defaultValue="Hello World"
          value={newAddress}
          onChange={setnewAddress}
        />
        <TextField
          required
          id="outlined-required"
          label="County"
          // defaultValue="Hello World"
          value={newCounty}
          onChange={setnewCounty}
        />
        <TextField
          required
          id="outlined-required"
          label="Latitude"
          // defaultValue="Hello World"
          value={newLatitude}
          onChange={setnewLatitude}
        />
        <TextField
          required
          id="outlined-required"
          label="Longitude"
          // defaultValue="Hello World"
          value={newLongitude}
          onChange={setnewLongitude}
        />
        
        </Box>
        <br/>
        <Box sx={{ m: 1, minWidth: 250, maxWidth: '100%' }}>
        {/* <ServiceFilter defservices={newServices} services={services} onServUpdate={setnewServices}/> */}
        <NewLocationServices services={services} setServices={updateNewServices}/>
        <br/>
        <Stack spacing={1} direction="row">

        <Autocomplete
      disablePortal
      id="combo-box-type"
      options={type}
      sx={{ width: 240 }}
      renderInput={(params) => <TextField {...params} label="Type" />}
      value={newType}
      // onChange={setnewType}
      onInputChange={(event, newInputValue) => {
        setnewType(newInputValue);
      }}
    />
    <br/>

    <Autocomplete
      disablePortal
      id="combo-box-locationtype"
      options={locationtype}
      sx={{ width: 240 }}
      renderInput={(params) => <TextField {...params} label="Location Type" />}
      value={newLocationtype}
      // onChange={setnewLocationtype}
      onInputChange={(event, newInputValue) => {
        setnewLocationtype(newInputValue);
      }}
    />
    <br/>
    </Stack>
    <br/>
    <Box sx={{  minWidth: 250, maxWidth: '100%' }}>
    <TextField
          required
          id="outlined-required"
          label="Description"
          multiline
          maxRows={4}
          // defaultValue="Hello World"
          value={newDescription}
          onChange={setnewDescription}
        />
    </Box>
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