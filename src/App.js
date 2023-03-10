import React, { useContext, useEffect, useState } from "react";
// import Button from '@mui/material/Button';
import Table from "./components/UI/TableComponent";
import HeaderComponent from "./components/UI/HeaderComponent";
import LocationsContext from "./store/locations-context";
import TopBar from "./components/UI/TopBar";
import SettingsContext from "./store/settings-context";
import { Card } from "@mui/material";
import MapView from "./components/UI/MapComponent";
import CircularProgress from '@mui/material/CircularProgress';

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
 - Add new focation (local)
 - Edit existing location (local)
 - Check user location at startup
 - Define local path to local db and fetch data from there
 - Define server address server db and fetch data from there
 - Loadscreen when loading from server
 - Styling


*/

function App() {
  // const [locations, setLocations] = useState(loadedlocations_actual);
  let [userLocation, setUserLocation] = useState([0, 0]);
  let [locationUpdate, setLocationUpdate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const settingsCtx = useContext(SettingsContext);
  const localDbs = settingsCtx.localDatabase
  const local_data = useContext(LocationsContext);
  const [locations, setLocations] = useState([]);
  const MAPBOX_TOKEN = 'pk.eyJ1Ijoiam1yb3V2aW5lbiIsImEiOiJjbGVqdWgwNjEwNHF0M29vZDEzdG1wb2l2In0.YVP1emAUkTgBtdGknfBVxw'; // Set your mapbox token here
  const [userLogged, setUserLogged] = useState(true);

  const getLocationData = () =>  {
    if (localDbs !== true) {
      fetchLocationsHandler();
    } else {
      setLocations(local_data.loadedlocations);
      setIsLoading(false);
    }
  }

  // Get location data from server
  async function fetchLocationsHandler(){
    if (localDbs === true) {
      console.log('fecthing data from server')
      setIsLoading(true);
      setError(null);
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
  
  useEffect(()=>{
		getLocationData();
    userLocationChangeHandler();
	}, [localDbs,locationUpdate])
  
  return (
    <>
      <TopBar userLogged={userLogged}/>
      <HeaderComponent userLocation={userLocation} onUpdateLocation={userLocationChangeHandler} />
      
      {!isLoading && locations.length === 0 && <Card> No location data found...</Card>}
      {!isLoading && error && <Card>ERROR: {error}</Card>}
      {/* {isLoading && listView &&<Card>Loading...</Card>} */}
      {isLoading && <CircularProgress/>}
      {!isLoading && locations.length > 0 && <Table userlocation={userLocation} locations={locations}/>}
      {!isLoading && locations.length > 0 && <MapView locations={locations} userLocation={userLocation} mapboxtoken={MAPBOX_TOKEN}/>}
      
      
{/*       
      {!isLoading && locations.length === 0 && <Card> No location data found...</Card>}
      {!isLoading && error && <Card>ERROR: {error}</Card>}
      {isLoading && <Card>Loading...</Card>}
      {!isLoading && locations.length > 0 && <Table userlocation={userLocation} locations={locations}/>} */}
    </>
  );
}

export default App;
