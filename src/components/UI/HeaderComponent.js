import React, {  useState } from "react";
import Button from "@mui/material/Button";
import MCard from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const HeaderComponent = (props) => {

  const [enteredLat, setEnteredLat] = useState(props.userLocation[0]);
  const [enteredLon, setEnteredLon] = useState(props.userLocation[1]);
  const latChangeHadler = (event) => {
    setEnteredLat(event.target.value);
    // updateLocationCall();
    setTimeout(() => {
      console.log('latChangeHadler');
      // setEnteredLat(event.target.value);
    updateLocationCall();
    }, 1000);
    // TODO: Needs validation and user feedback
    // setUserInput({
    //     ...userInput,
    //     enteredLat: event.target.value

    // })
  };

  const lonChangeHadler = (event) => {
    setEnteredLon(event.target.value);
    // updateLocationCall();
    setTimeout(() => {
      console.log('lonChangeHadler');
      // setEnteredLon(event.target.value);
      updateLocationCall();
    }, 1000);
    // TODO: Needs validation and user feedback

    // setUserInput({
    //     ...userInput,
    //     enteredLon: event.target.value

    // })
  };

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

  const updateLocationCall = () => {
    let oldLocationLat  = enteredLat;
    let oldLocationLon = enteredLon;
    if (oldLocationLat === enteredLat || oldLocationLon === enteredLon) {
      setTimeout(() => {
        console.log('Calling location update1');
        const newLatLon = [enteredLat, enteredLon];
        props.onUpdateLocation(newLatLon);
      }, 3000);
    } else {
      console.log('Calling location update2');
      const newLatLon = [enteredLat, enteredLon];
      props.onUpdateLocation(newLatLon);
    }
    
      
      
  }

  const getUserLocation = () => {
    
    // console.log(props)
    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log("Latitude is :", position.coords.latitude);
      setEnteredLat(position.coords.latitude);
      // console.log("Latitude is :", enteredLat);

      // console.log("Longitude is :", position.coords.longitude);
      setEnteredLon(position.coords.longitude);
      // console.log("Latitude is :", enteredLon);
      updateLocationCall();
    });
    
    
    
  };

  return (
    <MCard>
      <Div>{"Location Latitude and longitude"}</Div>

      <TextField
        required
        id="outlined-required"
        label="Latitude"
        // defaultValue={enteredLat}
        value={enteredLat}
        onChange={latChangeHadler}
        size="small"
        margin="dense"
      />
      <TextField
        required
        id="outlined-required"
        label="Longitude"
        // defaultValue={enteredLon}
        value={enteredLon}
        onChange={lonChangeHadler}
        size="small"
        margin="dense"

      />
      <br />
      <Button variant="contained" onClick={getUserLocation}>
        Get current location
      </Button>
      
      {/* <Fab variant="extended">
        <NavigationIcon sx={{ mr: 1 }} />
        Navigate
      </Fab> */}
    </MCard >
  );
};

export default HeaderComponent;
