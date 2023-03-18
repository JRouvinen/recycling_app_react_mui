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
import NewLocationServiceList from "./NewLocationServiceList";
import MenuItem from '@mui/material/MenuItem';

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
    {value: '1',label:'returpunkt'},
    {value: '2',label:'farlig'},
    {value: '3',label:'hyttepunkt'},
  ]

  const locationtype = [
    {value: '1',label:'container'},
    {value: '2',label:'centre'},
  ]

  // const services = [
  //   {service:"Glass packaging"}, 
  // {service:"Metal packaging"} ,
  // {service:"Textiles, clothes and shoes"},
  // {service:"Dangerous waste"},
  // {service:"Corrugated cardboard"},
  // {service:"Beverage carton"},
  // {service:"Packaging carton"},
  // {service:"Paper"},
  // {service:"Cardboard, paper and cardboard"},
  // {service:"Plastic packaging"},
  // {service:"Residual waste"},
  // {service:"Mixed plastic"},
  // {service:"Plastic (not packaging)"},
  // {service:"Electrical and electronic waste"},
  // {service:"Garden waste"},
  // {service:"Batteries"},
  // {service:"Explosive waste"},
  // {service:"Medical waste"},
  // {service:"Small electronics"},
  // {service:"Combustible residual waste"},
  // {service:"Metal"},
  // {service:"Food waste"},
  // {service:"Items for reuse"},
  // {service:"Wood"},
  // {service:"Other"},
  // {service:"Small recreational boats"},
  // {service:"Construction and demolition waste"},
  // {service:"Large recreational boats without inboard engines"},
  // {service:"Marine waste"},
  // {service:"Asbestos"},
  // {service:"Window panes"},
  // {service:"Leisure boats with inboard motor"},
  // {service:"Styrofoam (EPS)"},
  // {service:"Landfill residue"},
  // {service:"Plaster"},
  // {service:"Coarse waste"},
  // {service:"Non-combustible waste"},
  // {service:"Impregnated wood"},
  // {service:"Inert waste"},
  // {service:"Iron and steel"},
  // {service:"Composite iron and steel"},
  // {service:"Tires"},
  // {service:"Pure masses"},
  // {service:"Compost soil"},
  // {service:"Bottles and cans with deposit"},
  // {service:"Cars"}
  // ];

  const services = [
      "Glass packaging", 
    "Metal packaging" ,
    "Textiles, clothes and shoes",
    "Dangerous waste",
    "Corrugated cardboard",
    "Beverage carton",
    "Packaging carton",
    "Paper",
    "Cardboard, paper and cardboard",
    "Plastic packaging",
    "Residual waste",
    "Mixed plastic",
    "Plastic (not packaging)",
    "Electrical and electronic waste",
    "Garden waste",
    "Batteries",
    "Explosive waste",
    "Medical waste",
    "Small electronics",
    "Combustible residual waste",
    "Metal",
    "Food waste",
    "Items for reuse",
    "Wood",
    "Other",
    "Small recreational boats",
    "Construction and demolition waste",
    "Large recreational boats without inboard engines",
    "Marine waste",
    "Asbestos",
    "Window panes",
    "Leisure boats with inboard motor",
    "Styrofoam (EPS)",
    "Landfill residue",
    "Plaster",
    "Coarse waste",
    "Non-combustible waste",
    "Impregnated wood",
    "Inert waste",
    "Iron and steel",
    "Composite iron and steel",
    "Tires",
    "Pure masses",
    "Compost soil",
    "Bottles and cans with deposit",
    "Cars"
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
  const [locationValid, setLocationValid] = useState(true)
  const [addressValid, setAddressValid] = useState(true)
  const [countyValid, setCountyValid] = useState(true)
  const [latitudeValid, setLatitudeValid] = useState(true)
  const [longitudeValid, setLongitudeValid] = useState(true)
  const [typeValid, setTypeValid] = useState(true)
  const [locationTypeValid, setLocationTypeValid] = useState(true)


  const checkText = (text) => {
    let isValid = false
    if (text !== "") {
      isValid = true
    }
    return isValid

  }

  const checkLat = (input) => {
    let isValid = false
    if (input !== '') {
      if (input > -90 && input < 90) {
        isValid = true
        return isValid
      }
    } else {
      return isValid
    }

    
    
  }

  const checkLon = (input) => {
    let isValid = false
    if (input !== '') {
      if (input > -180 && input < 180) {
        isValid = true
        return isValid
      }
  } else {
    return isValid

  }
  }

  const addNewLocation = () => {
    console.log('addNewLocation')
    setLocationValid(checkText(newLocation));
    setAddressValid(checkText(newLocation));
    setCountyValid(checkText(newLocation));
    setLatitudeValid(checkLat(newLatitude));
    setLongitudeValid(checkLon(newLongitude));
    console.log(longitudeValid)
  }

  const clearFields = () => {
    console.log('clearFields')
    setnewLocation('');
    setnewAddress('');
    setnewCounty('');
    setnewLatitude('');
    setnewLongitude('');
    setnewDescription('');
    setnewServices('');
    setnewType('');
    setnewLocationtype('');
  }

  const closeForm = () => {
    console.log('closeForm')

  }

  const locationChangeHadler = (event) => {
    setnewLocation(event.target.value);
    
  };

  const addressChangeHadler = (event) => {
    setnewAddress(event.target.value);
    
  };

  const countyChangeHadler = (event) => {
    setnewCounty(event.target.value);
    
  };

  const latitudeChangeHadler = (event) => {
    setnewLatitude(event.target.value);
    
  };

  const longitudeChangeHadler = (event) => {
    setnewLongitude(event.target.value);
    
  };

  const updateNewServices = (getServices) => {
    setnewServices(getServices);

  }

  const typeChangeHadler = (newValue) => {
    setnewType(newValue);
    
  };

  const locationtypeChangeHadler = (newValue) => {
    setnewLocationtype(newValue);
    
  };

  const descriptionChangeHadler = (event) => {
    setnewDescription(event.target.value);
    
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>New recycling location</DialogTitle>
      
      
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { padding: 1, width: '30ch' }, pt:1
      }}
      noValidate
      autoComplete="off"
    >
      {!locationValid && <TextField
          error
          id="outlined-required"
          label="Error"
          helperText="Field can't be empty"
          value={newLocation}
          onChange={locationChangeHadler}
        />}
      {locationValid && <TextField
          required
          id="outlined-required"
          label="Location"
          value={newLocation}
          onChange={locationChangeHadler}
        />}
      {!addressValid && <TextField
          error
          id="outlined-required"
          label="Error"
          helperText="Field can't be empty"
          value={newAddress}
          onChange={addressChangeHadler}
        />}
      {addressValid && <TextField
          required
          id="outlined-required"
          label="Address"
          // defaultValue="Hello World"
          value={newAddress}
          onChange={addressChangeHadler}
        />}
      {!countyValid && <TextField
          error
          id="outlined-required"
          label="Error"
          helperText="Field can't be empty"
          value={newCounty}
          onChange={countyChangeHadler}
        />}
      {countyValid && <TextField
          required
          id="outlined-required"
          label="County"
          // defaultValue="Hello World"
          value={newCounty}
          onChange={countyChangeHadler}
        />}
      {!latitudeValid && <TextField
          error
          id="outlined-required"
          label="Error"
          helperText="Incorrect entry."
          value={newLatitude}
          onChange={latitudeChangeHadler}
        />}
      {latitudeValid && <TextField
          required
          id="outlined-required"
          label="Latitude"
          // defaultValue="Hello World"
          value={newLatitude}
          onChange={latitudeChangeHadler}
        />}
      {!longitudeValid && <TextField
          error
          id="outlined-required"
          label="Error"
          helperText="Incorrect entry."
          value={newLongitude}
          onChange={longitudeChangeHadler}
        />}
      {longitudeValid && <TextField
          required
          id="outlined-required"
          label="Longitude"
          // defaultValue="Hello World"
          value={newLongitude}
          onChange={longitudeChangeHadler}
        />}
        </Box>
        <br/>
        <Box sx={{ padding: 1, minWidth: 250, maxWidth: '100%' }}>
        {/* <ServiceFilter defservices={newServices} services={services} onServUpdate={setnewServices}/> */}
        {/* <NewLocationServices services={services} setServices={updateNewServices}/> */}
        <NewLocationServiceList services={services} setServices={updateNewServices}/>
        <br/>
        <Stack spacing={1} direction="row">
        
        <TextField
          id="outlined-select-type"
          select
          label="Type"
          defaultValue="1"
          helperText="Select type"
        >
          {type.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

    <br/>
    <TextField
          id="outlined-select-locationtype"
          select
          label="Location type"
          defaultValue="1"
          helperText="Select location type"
        >
          {locationtype.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    
    <br/>
    </Stack>
    <br/>
    <Box sx={{  minWidth: 250, maxWidth: '100%' }}>
    <TextField
          
          id="outlined-required"
          label="Description"
          multiline
          maxRows={4}
          // defaultValue="Hello World"
          value={newDescription}
          onChange={descriptionChangeHadler}
        />
    </Box>
    <br/>
        <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={addNewLocation}>Add new</Button>
      <Button variant="contained" onClick={clearFields}>Clear</Button>
      <Button variant="contained" onClick={handleClose}>Cancel</Button>
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