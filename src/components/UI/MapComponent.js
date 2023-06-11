import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import Map, {
  NavigationControl,
  Popup,
  ScaleControl,
  GeolocateControl,
  FullscreenControl,
  Marker,
  Layer,
  Source,
} from "react-map-gl";
import Pin from "./pin";
import PinCont from "./pin_container";
import PinSel from "./pin_selected";
import PinUser from "./pin_user";
import MCard from "@mui/material/Card";
import { Card } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./layers";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
//Geocoder test import
import MatGeocoder from 'react-mui-mapbox-geocoder'
// import CITIES from '../../.data/cities.json'; -> not needed for now
import Grid from '@mui/material/Grid';
import Pin_user from "./pin_user";

const MapView = (props) => {
  console.log("mapview");
  console.log(props);
  const [locationData, setLocationData] = useState([]);
  const [locationDataBase, setLocationDataBase] = useState(
    props.locations.features
  );
  const [old_loc_data, setOldLocData] = useState([]);
  let pins = old_loc_data;
  const [popupInfo, setPopupInfo] = useState(null);
  const [viewState, setViewState] = React.useState({
    latitude: 61.0,
    longitude: 8.81,
    zoom: 9,
    //cooperativeGestures: true,
  });
  const [oldviewState, setOldViewState] = React.useState({
    latitude: 0.0,
    longitude: 0.0,
    zoom: 0,
  });
  const [locationLayer, setlocationLayer] = React.useState(true);
  const [markerLayer, setmarkerLayer] = React.useState(true);
  const [mapDarkmode, setmapDarkmode] = React.useState(true);
  const [markerLayerDrawDist, setmarkerLayerDrawDist] = React.useState(30);

  const changeMapDarkmodeHandler = () => {
    if (mapDarkmode === true) {
      setmapDarkmode(false)
      console.log(mapDarkmode)
    } else {
      setmapDarkmode(true)
      console.log(mapDarkmode)

    }
    
  }

  const changelocationLayerHandler = () => {
    if (locationLayer === true) {
      setlocationLayer(false)
    } else {
      setlocationLayer(true)

    }
    
  }

  const changemarkerLayerHandler = () => {
    setmarkerLayerDrawDist(-1)
    
  }

  const changemarkerLayerDrawDistHandler = (event) => {
    if (markerLayer === true) {
    setmarkerLayerDrawDist(event.target.value)

    }
  }
    

  //Slider value text
  function valuetext(value) {
    return `${value} km`;
  }

  //Geocoder consts

  const geocoderApiOptions = {
    country: 'no',
    //proximity: {longitude: 8.000, latitude: 60.9197},
    //bbox: [4.0000, 70.00, 58.0000, 31.0000]
  }
  
  const onSelectHandler = (result) => {
    console.log('onSelectHandler')
    console.log(result.geometry)
    const new_viewstate = {
      latitude: result.geometry.coordinates[1],
      longitude: result.geometry.coordinates[0],
      zoom: 7,
      cooperativeGestures: true,
    }

    setViewState(new_viewstate)

  }


  //End of Geocoder consts

  useEffect(() => {
    //calculateDrawDistance();
    // filterByDistance(props,locationCtx)
    const map_win_lat = viewState.latitude;
    const map_win_lon = viewState.longitude;
    let draw_distance = markerLayerDrawDist;
    if (oldviewState.latitude !== map_win_lat || oldviewState.longitude !== map_win_lon || oldviewState.zoom !== viewState.zoom) {
      setOldViewState({
        latitude: map_win_lat,
        longitude: map_win_lon,
        zoom: viewState.zoom,})
        let newArray = [];
    
      for (let i = 0; i < locationDataBase.length; i++) {
        const lat1 = parseFloat(locationDataBase[i].geometry.coordinates[1]); //Recycling location lat and lon
        const lon1 = parseFloat(locationDataBase[i].geometry.coordinates[0]);
        let lat2 = parseFloat(map_win_lat); //User location lat and lon
        if (lat2 === 0) {
          lat2 = 59.911491;
        }
        let lon2 = parseFloat(map_win_lon);
        if (lon2 === 0) {
          lon2 = 10.757933;
        }
        let dist_km = 0.0;
        // Calculations based on the ‘haversine’ formula to calculate the great-circle distance between two points –>
        // the shortest distance over the earth’s surface – giving an ‘as-the-crow-flies’ distance between the points (ignoring any hills or other obstacles).
        const R = 6371.0; // metres
        const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;
        const a =
          Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // in kilometres
        dist_km = d.toFixed(0);
        if (dist_km <= draw_distance) {
          let newObj = {
            id: locationDataBase[i].properties.id,
            lat: locationDataBase[i].geometry.coordinates[1],
            lon: locationDataBase[i].geometry.coordinates[0],
            amenity: locationDataBase[i].properties.amenity,
            sortere_ref: locationDataBase[i].properties.sortere_ref,
            // source: locationDataBase[i].source,
            recycling_type: locationDataBase[i].properties.recycling_type,
            recycling: locationDataBase[i].properties.recycling,
            location: locationDataBase[i].properties.location,
            address: locationDataBase[i].properties.address,
            bookmark: locationDataBase[i].properties.bookmark,
            county: locationDataBase[i].properties.county,
            description: locationDataBase[i].properties.description,
            // distance: locationDataBase[i].properties.distance,
            distance: dist_km,
            timetag: locationDataBase[i].properties.timetag,
            type: locationDataBase[i].properties.type,
          };
          newArray.push(newObj);
        }

        //https://linuxhint.com/update-object-in-javascript/
      }
      setLocationData(newArray);
    };
      
        
  }, [props, markerLayerDrawDist, viewState, locationDataBase, oldviewState.latitude, oldviewState.longitude, oldviewState.zoom]);

  
  pins = useMemo(
    () =>
      //calculateDistance(),
      locationData.map((location, id) => (
        <Marker
          key={`marker-${id}`}
          longitude={location.lon}
          latitude={location.lat}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(location);
          }}
        >
          {/* {location.recycling_type === 'container' && <Pin_cont />}
            {location.recycling_type !== 'container' && <Pin />}
            {props.selectedID == id && <Pin_sel />} */}
          {props.selectedID === location.id &&
            location.recycling_type === "container" && <PinSel />}
          {props.selectedID === location.id &&
            location.recycling_type !== "container" && <PinSel />}
          {props.selectedID !== location.id &&
            location.recycling_type === "container" && <PinCont />}
          {props.selectedID !== location.id &&
            location.recycling_type !== "container" && <Pin />}

          {/* <Pin /> */}
        </Marker>
      )),
      <Marker
          key={`marker-user`}
          longitude={props.userLocation[1]}
          latitude={props.userLocation[0]}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo('User Location');
          }}
        >

          <PinUser />
        </Marker>,
    [locationData, props.selectedID]
  );  

  return (
    <MCard>
      <Card sx={{p: 2}}>
      Map center: <br/> Latitude: {viewState.latitude.toFixed(4)} Longitude: {viewState.longitude.toFixed(4)} <br/> 
      User location: <br/> Latitude: {props.userLocation[0].toFixed(4)} Longitude: {props.userLocation[1].toFixed(4)} <br/>
      <Divider />
      <FormControlLabel control={<Switch defaultChecked />} label="Location layer" onClick={changelocationLayerHandler}/> 
      <FormControlLabel control={<Switch defaultChecked />} label="Marker layer" onClick={changemarkerLayerHandler}/> 
      <FormControlLabel control={<Switch defaultChecked />} label="Dark mode" onClick={changeMapDarkmodeHandler}/> <br/>
      Marker layer draw distance: {markerLayerDrawDist} (km)
      <Box sx={{ width: '30%' }}>
      <Slider
        aria-label="Marker draw dist"
        defaultValue={30}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={5}
        marks
        min={10}
        max={100}
        onChange={changemarkerLayerDrawDistHandler}
      />
      
    </Box>
    
      </Card>
      {/* Dark mode map */}
      {mapDarkmode && <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100vw", height: "100vh" }}

        // mapStyle="mapbox://styles/mapbox/streets-v12" //light mode
        mapStyle="mapbox://styles/mapbox/dark-v11" //dark mode
        mapboxAccessToken={props.mapboxtoken}
        maxZoom={14}
        
      >
        
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        

        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.lon)}
            latitude={Number(popupInfo.lat)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              Distance: {popupInfo.distance} km <br />
              ID: {popupInfo.id} <br />
              Location: {popupInfo.location} <br />
              Address: {popupInfo.address} <br />
              Recycling: {popupInfo.recycling.toString()} | Description:{" "}
              {popupInfo.description}
            </div>
          </Popup>
        )}
        {locationLayer &&
        <Source
          id="recycling_locations"
          type="geojson"
          data={props.locations}
          cluster={true}
          clusterMaxZoom={18}
          clusterRadius={20}
        >
          
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>}
        
  <Grid container justifyContent="flex-end">
  <Card sx={{minHeight: '20%', maxHeight: '50%', minWidth: '20%', maxWidth: '50%'}}>
    <MatGeocoder
    inputPlaceholder="Search Address"
    accessToken={props.mapboxtoken}
    onSelect={onSelectHandler}
    autocomplete='true'
    showLoader={true}
    {...geocoderApiOptions}
  /></Card>
</Grid>
      </Map>}
      
      {/* Light mode map */}
      {!mapDarkmode && <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100vw", height: "100vh" }}

        mapStyle="mapbox://styles/mapbox/streets-v12" //light mode
        //mapStyle="mapbox://styles/mapbox/dark-v11" //dark mode
        mapboxAccessToken={props.mapboxtoken}
        maxZoom={14}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {pins}
        

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.lon)}
            latitude={Number(popupInfo.lat)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              Distance: {popupInfo.distance} km <br />
              ID: {popupInfo.id} <br />
              Location: {popupInfo.location} <br />
              Address: {popupInfo.address} <br />
              Recycling: {popupInfo.recycling.toString()} | Description:{" "}
              {popupInfo.description}
            </div>
          </Popup>
        )}
        {locationLayer &&
        <Source
          id="recycling_locations"
          type="geojson"
          data={props.locations}
          cluster={true}
          clusterMaxZoom={18}
          clusterRadius={20}
        >
          
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>}
      </Map>}
      
    </MCard>
  );
};

export default MapView;
