import React, { useCallback, useContext, useEffect, useState } from "react";
// import Button from '@mui/material/Button';
import Table from "./components/UI/TableComponent";
// import LocationsContext from "./store/locations-context";
import LocationsContext_full from "./store/locations-context_full";
import TopBar from "./components/UI/TopBar";
import SettingsContext from "./store/settings-context";
import MapboxKeyContext from "./store/mapboxkey-context";
import { Card } from "@mui/material";
import MapView from "./components/UI/MapComponent";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

/* 
Names
EcoNav -> My favourite!


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
 - Change color of single recycling point


*/


function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: green[500],
      },
    },
  });
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  // const [locations, setLocations] = useState(loadedlocations_actual);
  let [userLocation, setUserLocation] = useState([0,0]);;
  let [locationUpdate, setLocationUpdate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localDbs, setlocalDbs] = useState(false);
  const local_data = useContext(LocationsContext_full);
  let [datalocations, setDataLocations] = useState([]);
  let [maplocations, setMapLocations] = useState([]);
  const mapboxctx = useContext(MapboxKeyContext);
  const MAPBOX_TOKEN = (MapboxKeyContext.mapBoxKey)
  const [userLogged, setUserLogged] = useState(true);
  const [adminLogged, setAdminLogged] = useState(true);
  const [selectedID, setselectedID] = useState("");
  const [darkMode, setDarkMode] = useState(true)
  const [mode, setMode] = React.useState('light');
  console.log('local_data');
  console.log(local_data);
  console.log(userLocation)

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
    
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      setUserLocation([latitude,longitude]);
      setLocationUpdate(true);
    }
    
    function error() {
      console.log("Unable to retrieve your location");
    }
  }

  

  const getLocationData = useCallback(() => {
    if (userLocation[0] === 0 && userLocation[1] === 0) {
      getUserLocation()
    }

    if (datalocations.length > 0) {
      console.log("locations delete");
      datalocations = [];
      maplocations = [];
    }
    if (localDbs !== true) {
      fetchLocationsHandler();
    } else {
      setMapLocations(local_data.loadedlocations);
      setDataLocations(local_data.loadedlocations.features);
      setIsLoading(false);
    }
  }, [local_data]);


  const userLoggedChangeHandler = () => {
    if (userLogged === false) {
      setUserLogged(true);
    }
  };

  const adminLoggedChangeHandler = () => {
    if (adminLogged === false) {
      setAdminLogged(true);
      setUserLogged(true);
    }
  };

  const userLogOutChangeHandler = () => {
    setAdminLogged(false);
    setUserLogged(false);
  };

  const darkModeChangeHandler = () => {
    if (darkMode === true) {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
    
  };

  // Get location data from server
  async function fetchLocationsHandler() {
    if (localDbs !== true) {
      console.log("fecthing data from server");
      datalocations = [];
      maplocations = [];
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("https://econav-no-default-rtdb.europe-west1.firebasedatabase.app/features.json?timeout=10s");

        if (!response.ok) {
          throw new Error("Could't retrieve data from server!");
        }
        const data = await response.json();
        const serv_data = {
          type: "FeatureCollection",
          crs: {
            type: "name",
            properties: { name: "Serverdata:2023-06-28 16:40:25" }, //this line needs timetag
          },
          features: data};

        if (data.length > 0) {
          setMapLocations(serv_data);
          setDataLocations(data);
          setIsLoading(false);

        }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
      setIsLoading(false);
    }
  }

  //Update user location on change -> Mapview locate issue needs to be fixed
  // const userLocationChangeHandler = (newUserLocation) => {
  //   if (newUserLocation !== undefined) {
  //     setUserLocation(newUserLocation);
  //     setLocationUpdate(true);
  //   }
  // };

  const changeServerHandler = () => {
    console.log("changeserver");
    if (localDbs === true) {
      setlocalDbs(false);
      getLocationData();
    } else {
      setlocalDbs(true);
      getLocationData();
    }
  };

  useEffect(() => {
    getLocationData();
    // userLocationChangeHandler();
  }, [locationUpdate, getLocationData]);
  console.log("app darkmode", darkMode)
  return (
    <>
    {!darkMode && <ThemeProvider theme={theme}>
      <SettingsContext.Provider
        value={{
          localDatabase: localDbs,
          onChangeServer: changeServerHandler,
        }}
      >
        <TopBar
          userLogged={userLogged}
          adminLogged={adminLogged}
          darkMode={darkMode}
          userLoggedChangeHandler={userLoggedChangeHandler}
          adminLoggedChangeHandler={adminLoggedChangeHandler}
          userLogOutChangeHandler={userLogOutChangeHandler}
          darkModeChangeHandler={darkModeChangeHandler}
        />
      </SettingsContext.Provider>
      {/* <HeaderComponent userLocation={userLocation} onUpdateLocation={userLocationChangeHandler} />  ---> wil be used when navigation is implemented*/}

      {!isLoading && datalocations.length === 0 && (
        <Card> No location data found...</Card>
      )}
      {!isLoading && error && <Card>ERROR: {error}</Card>}
      {/* {isLoading && listView &&<Card>Loading...</Card>} */}
      {isLoading && <CircularProgress />}
      
      {!isLoading && datalocations.length > 0 && (
        <MapView
          locations={maplocations}
          userLocation={userLocation}
          mapboxtoken={MAPBOX_TOKEN}
          selectedID={selectedID}
          darkMode={darkMode}
        />
      )}
      {!isLoading && datalocations.length > 0 && (
        <Table
          userlocation={userLocation}
          locations={datalocations}
          selectedID={selectedID}
          setselectedID={setselectedID}
        />
      )}
    </ThemeProvider>}
    {darkMode && <ThemeProvider theme={darkTheme}>
      <SettingsContext.Provider
        value={{
          localDatabase: localDbs,
          onChangeServer: changeServerHandler,
        }}
      >
        <TopBar
          userLogged={userLogged}
          adminLogged={adminLogged}
          darkMode={darkMode}
          userLoggedChangeHandler={userLoggedChangeHandler}
          adminLoggedChangeHandler={adminLoggedChangeHandler}
          userLogOutChangeHandler={userLogOutChangeHandler}
          darkModeChangeHandler={darkModeChangeHandler}
        />
      </SettingsContext.Provider>
      {/* <HeaderComponent userLocation={userLocation} onUpdateLocation={userLocationChangeHandler} />  ---> wil be used when navigation is implemented*/}

      {!isLoading && datalocations.length === 0 && (
        <Card> No location data found...</Card>
      )}
      {!isLoading && error && <Card>ERROR: {error}</Card>}
      {/* {isLoading && listView &&<Card>Loading...</Card>} */}
      {isLoading && <CircularProgress />}
      
      {!isLoading && datalocations.length > 0 && (
        <MapView
          locations={maplocations}
          userLocation={userLocation}
          mapboxtoken={MAPBOX_TOKEN}
          selectedID={selectedID}
          darkMode={darkMode}
        />
      )}
      {!isLoading && datalocations.length > 0 && (
        <Table
          userlocation={userLocation}
          locations={datalocations}
          selectedID={selectedID}
          setselectedID={setselectedID}
        />
      )}
    </ThemeProvider>}
    </>
  );
}

export default App;
