import React, { useContext, useEffect, useState } from "react";
// import Button from '@mui/material/Button';
import Table from "./components/UI/TableComponent";
// import LocationsContext from "./store/locations-context";
import LocationsContext_full from "./store/locations-context_full";
import TopBar from "./components/UI/TopBar";
import SettingsContext from "./store/settings-context";
import { Card } from "@mui/material";
import MapView from "./components/UI/MapComponent";
import CircularProgress from '@mui/material/CircularProgress';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
/* 
Names

1. EcoFinder
2. ReCycleMe
3. UpcycleNow
4. ReCyclingRoutes
5. EarthMate
6. GreenGo
7. ReSourceIt
8. ReUseItUp
9. EcoNav -> My favourite!
10. ReClaimIt

1. ReFuseThis
2. TrashCanTrot
3. TheTrashTour
4. ReCycleMania
5. RePurposePal
6. DumpsterDiver
7. EcoExplorer -> Also good one!
8. DumpsterDash
9. ReUseRally
10. EcoQuest

ToDo:
 - Add new location (to server) -> DONE
  -> Add verification of server response
 - Edit existing location (on server)
 - Check user location at startup
 - Define local path to local db and fetch data from there
 - Define server address server db and fetch data from there
 - Set different colors in map for local and server data
 - Loadscreen when loading from server -> DONE
 - Styling
 - Implement full navigation with directions
 - Highlight selected row (location) from map
 - Draw only locations in the viewport? or
 - Create advanced filters bar and folowing tools:set location lat/lon, draw closest 5 / 10 /25 / 50 locations

*/
const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});


function App() {
  // const [locations, setLocations] = useState(loadedlocations_actual);
  let [userLocation, setUserLocation] = useState([0, 0]);
  let [locationUpdate, setLocationUpdate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const settingsCtx = useContext(SettingsContext);
  const [localDbs, setlocalDbs] = useState(true);
  const local_data = useContext(LocationsContext_full);
  let [locations, setLocations] = useState([]);
  const MAPBOX_TOKEN = 'pk.eyJ1Ijoiam1yb3V2aW5lbiIsImEiOiJjbGVqdWgwNjEwNHF0M29vZDEzdG1wb2l2In0.YVP1emAUkTgBtdGknfBVxw'; // Set your mapbox token here
  const [userLogged, setUserLogged] = useState(true);
  const [adminLogged, setAdminLogged] = useState(true);
  const [selectedID, setselectedID] = useState('');

  const getLocationData = () =>  {
    if (locations.length > 0) {
      console.log('locations delete')
      locations = [];
      console.log(locations)
    }
    if (localDbs !== true) {
      fetchLocationsHandler();
    } else {
      setLocations(local_data.loadedlocations);
      setIsLoading(false);
    }
  }

  const userLoggedChangeHandler = () => {
    if (userLogged === false) {
      setUserLogged(true);
    }
    
  }

  const adminLoggedChangeHandler = () => {
    if (adminLogged === false) {
      setAdminLogged(true);
      setUserLogged(true);

    }
  }

  const userLogOutChangeHandler = () => {
    setAdminLogged(false);
    setUserLogged(false);
    
  }

  const selectedIDChangeHandler = (selected) => {
    setselectedID(selected);
    console.log('seledtedID')
    console.log(selectedID)

    
  }

  // Get location data from server
  async function fetchLocationsHandler(){
    if (localDbs !== true) {
      console.log('fecthing data from server')
      locations = [];
      setIsLoading(true);
      setError(null);
      console.log(locations)

      try{
        const response = await fetch('http://localhost:8080')

        if (!response.ok) {
          throw new Error("Could't retrieve data from server!");
          
        }
        const data = await response.json();

        if (data.results.length > 0){
          setLocations(data.results);
          setIsLoading(false);
      }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);

      }
      setIsLoading(false);
      
    }
    } 

  //Update user location on change
  const userLocationChangeHandler = (newUserLocation) => {

      if (newUserLocation !== undefined) {
        setUserLocation(newUserLocation);
        setLocationUpdate(true);
      }  
    
  };

  const changeServerHandler = () => {
    console.log('changeserver')
    if (localDbs === true) {
      setlocalDbs(false);
      getLocationData();
    } else {
      setlocalDbs(true);
      getLocationData();

    }
  };
  
  useEffect(()=>{
		getLocationData();
    // userLocationChangeHandler();
	}, [locationUpdate,SettingsContext])
  
  return (
    <ThemeProvider theme={theme}>
      <SettingsContext.Provider value={{
        localDatabase: localDbs,
        onChangeServer: changeServerHandler
      }}>
      <TopBar userLogged={userLogged} adminLogged={adminLogged} userLoggedChangeHandler={userLoggedChangeHandler} adminLoggedChangeHandler={adminLoggedChangeHandler} userLogOutChangeHandler={userLogOutChangeHandler}/>
      </SettingsContext.Provider>
      {/* <HeaderComponent userLocation={userLocation} onUpdateLocation={userLocationChangeHandler} />  ---> wil be used when navigation is implemented*/} 
      
      {!isLoading && locations.length === 0 && <Card> No location data found...</Card>}
      {!isLoading && error && <Card>ERROR: {error}</Card>}
      {/* {isLoading && listView &&<Card>Loading...</Card>} */}
      {isLoading && <CircularProgress/>}
      {!isLoading && locations.length > 0 && <Table userlocation={userLocation} locations={locations} selectedID={selectedID} setselectedID={setselectedID}/>}
      {!isLoading && locations.length > 0 && <MapView locations={locations} userLocation={userLocation} mapboxtoken={MAPBOX_TOKEN} selectedID={selectedID}/>}
      {/* {!isLoading && locations.length > 0 && <MapViewDirections locations={locations} userLocation={userLocation} mapboxtoken={MAPBOX_TOKEN}/>} */}
      
      
{/*       
      {!isLoading && locations.length === 0 && <Card> No location data found...</Card>}
      {!isLoading && error && <Card>ERROR: {error}</Card>}
      {isLoading && <Card>Loading...</Card>}
      {!isLoading && locations.length > 0 && <Table userlocation={userLocation} locations={locations}/>} */}
    </ThemeProvider>
  );
}

export default App;
