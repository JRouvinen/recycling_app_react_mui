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
import { Card, CardContent } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  clusterLayer,
  clusterCountLayer,
  //unclusteredPointLayer,
} from "./layers";
import PopupChipsArray from "./popupChipsComponent";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";
//Geocoder test import
import MatGeocoder from "react-mui-mapbox-geocoder";
// import CITIES from '../../.data/cities.json'; -> not needed for now
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";

// Launching Mapcomponent shoots following warning into console:
// WebGL warning: texImage: Alpha-premult and y-flip are deprecated for non-DOM-Element uploads.
// --> No need to address at this state:
// https://github.com/mapbox/mapbox-gl-js/issues/5292
const MapView = (props) => {
  //console.log("Mapview:", props);
  const [locationData, setLocationData] = useState([]);
  const [userLocationData, setUserLocationData] = useState([]);
  const [locationDataBase, setLocationDataBase] = useState(
    props.locations.features
  );
  const [old_loc_data, setOldLocData] = useState([]);
  let pins = old_loc_data;
  let user_pin = [];
  const [popupInfo, setPopupInfo] = useState(null);
  const [userPopupInfo, setUserPopupInfo] = useState(null);
  const [viewState, setViewState] = React.useState({
    latitude: 61.0,
    longitude: 8.81,
    zoom: 5.5,
    //cooperativeGestures: true,
  });
  const [oldviewState, setOldViewState] = React.useState({
    latitude: 0.0,
    longitude: 0.0,
    zoom: 0,
  });
  const [locationLayer, setlocationLayer] = React.useState(true);
  const [markerLayer, setmarkerLayer] = React.useState(true);
  const [centerLayer, setCenterLayer] = React.useState(false);
  const [containerLayer, setContainerLayer] = React.useState(true);
  //const [mapDarkmode, setmapDarkmode] = React.useState(true);
  const [mapDarkmode, setmapDarkmode] = React.useState(props.darkMode);
  const [markerLayerDrawDist, setmarkerLayerDrawDist] = React.useState(30);
  const [mapCenterDist, setmapCenterDist] = React.useState(true);
  const changeMapDarkmodeHandler = () => {
    if (mapDarkmode === true) {
      setmapDarkmode(false);
    } else {
      setmapDarkmode(true);
    }
  };
  const changeDistanceCalculationModeHandler = () => {
    if (mapCenterDist === true) {
      setmapCenterDist(false);
    } else {
      setmapCenterDist(true);
    }
  };
  const changelocationLayerHandler = () => {
    if (locationLayer === true) {
      setlocationLayer(false);
    } else {
      setlocationLayer(true);
    }
  };

  const changemarkerLayerHandler = () => {
    if (markerLayer === true) {
      setmarkerLayer(false);
    } else {
      setmarkerLayer(true);
    }
  };

  // const changemarkerLayerDrawDistHandler = (event) => {
  //   if (markerLayer === true) {
  //     setmarkerLayerDrawDist(event.target.value);
  //   }
  // };

  const changeCenterLayerHandler = () => {
    if (centerLayer === true) {
      setCenterLayer(false);
    } else {
      setCenterLayer(true);
    }
  };

  const changeContainerLayerHandler = () => {
    if (containerLayer === true) {
      setContainerLayer(false);
    } else {
      setContainerLayer(true);
    }
  };

  //Slider value text
  // function valuetext(value) {
  //   return `${value} km`;
  // }

  //Geocoder consts

  const geocoderApiOptions = {
    country: "no",
    //proximity: {longitude: 8.000, latitude: 60.9197},
    //bbox: [4.0000, 70.00, 58.0000, 31.0000]
  };

  const onSelectHandler = (result) => {
    //console.log("onSelectHandler");
    //console.log(result.geometry);
    const new_viewstate = {
      latitude: result.geometry.coordinates[1],
      longitude: result.geometry.coordinates[0],
      zoom: 7,
      cooperativeGestures: true,
    };

    setViewState(new_viewstate);
  };
  // useEffect(() =>{
  //   if (mapDarkmode === true) {
  //     setmapDarkmode(false);
  //   } else {
  //     setmapDarkmode(true);
  //   }
  // },[props.Darkmode])
  //End of Geocoder consts
  //console.log("viewstate: " + viewState.zoom);
  useEffect(() => {
    //calculateDrawDistance();
    // filterByDistance(props,locationCtx)
    const map_win_lat = viewState.latitude;
    const map_win_lon = viewState.longitude;
    let draw_distance = markerLayerDrawDist;
    if (
      oldviewState.latitude !== map_win_lat ||
      oldviewState.longitude !== map_win_lon ||
      oldviewState.zoom !== viewState.zoom
    ) {
      setOldViewState({
        latitude: map_win_lat,
        longitude: map_win_lon,
        zoom: viewState.zoom,
      });
      let newArray = [];
      if (viewState.zoom > 8 && markerLayer) {
        for (let i = 0; i < locationDataBase.length; i++) {
          const lat1 = parseFloat(locationDataBase[i].geometry.coordinates[1]); //Recycling location lat and lon
          const lon1 = parseFloat(locationDataBase[i].geometry.coordinates[0]);
          let lat2 = 61.5079405;
          let lon2 = 8.5401006;
          if (mapCenterDist === true) {
            lat2 = parseFloat(map_win_lat); //User location lat and lon
          } else {
            lat2 = parseFloat(props.userLocation[0]); //User location lat and lon
          }
          // if (lat2 === 0) {
          //   lat2 = 59.911491;
          // }
          if (mapCenterDist === true) {
            lon2 = parseFloat(map_win_lon);
          } else {
            lon2 = parseFloat(props.userLocation[1]); //User location lat and lon
          }
          // if (lon2 === 0) {
          //   lon2 = 10.757933;
          // }
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
          if (dist_km <= draw_distance && locationDataBase[i].properties.recycling.length !== 0) {
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
            if (
              centerLayer === false &&
              locationDataBase[i].properties.recycling_type !== "centre"
            ) {
              newArray.push(newObj);
            } else if (
              containerLayer === false &&
              locationDataBase[i].properties.recycling_type !== "container"
            ) {
              newArray.push(newObj);
            } else if (centerLayer === true && containerLayer === true) {
              newArray.push(newObj);
            }
          }

          //https://linuxhint.com/update-object-in-javascript/
        }
      }
      setLocationData(newArray);

      //Set user location into array
      let newUserObj = [
        {
          id: "userlocation",
          lat: props.userLocation[0],
          lon: props.userLocation[1],
          type: "userlocation",
          recycling_type: "userlocation",
        },
      ];
      //newArray.push(newUserObj);
      //setLocationData(newArray);
      setUserLocationData(newUserObj);
    }
  }, [
    props,
    markerLayerDrawDist,
    viewState,
    locationDataBase,
    oldviewState.latitude,
    oldviewState.longitude,
    oldviewState.zoom,
    containerLayer,
    centerLayer,
  ]);
  //Location Pin generation
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
          {props.selectedID === location.id &&
            location.recycling_type === "container" && <PinSel />}
          {props.selectedID === location.id &&
            location.recycling_type !== "container" && <PinSel />}
          {props.selectedID !== location.id &&
            location.recycling_type === "container" && <PinCont />}
          {props.selectedID !== location.id &&
            location.recycling_type !== "container" && <Pin />}
          {/*location.recycling_type === "userlocation" && <PinUser />}
          {/* <Pin /> */}
        </Marker>
      )),

    [locationData, props.selectedID]
  );
  //UserLocation pin generation
  user_pin = useMemo(
    () =>
      //calculateDistance(),
      userLocationData.map((location, id) => (
        <Marker
          key={`marker-${id}`}
          longitude={location.lon}
          latitude={location.lat}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setUserPopupInfo(location);
          }}
        >
          {location.recycling_type === "userlocation" && <PinUser />}
        </Marker>
      )),

    [userLocationData]
  );

  return (
    <MCard>
      <Card sx={{ p: 2 }}>
        Map center: <br /> Latitude: {viewState.latitude.toFixed(4)} Longitude:{" "}
        {viewState.longitude.toFixed(4)} <br />
        User location: <br /> Latitude: {props.userLocation[0].toFixed(4)}{" "}
        Longitude: {props.userLocation[1].toFixed(4)} <br />
        <Divider />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Map settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* {props.darkMode &&<FormControlLabel
              control={<Switch defaultChecked />}
              label="Map dark mode"
              onClick={changeMapDarkmodeHandler}
            />} */}
            {!props.darkMode && (
              <FormControlLabel
                control={<Switch />}
                label="Map dark mode"
                onClick={changeMapDarkmodeHandler}
              />
            )}
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Calculate distance from map center"
              onClick={changeDistanceCalculationModeHandler}
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Cluster layer"
              onClick={changelocationLayerHandler}
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Marker layer"
              onClick={changemarkerLayerHandler}
            />
            <br />

            <FormControlLabel
              control={<Switch />}
              label="Show recycling centers"
              onClick={changeCenterLayerHandler}
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Show recycling containers"
              onClick={changeContainerLayerHandler}
            />
          </AccordionDetails>
        </Accordion>
      </Card>
      {/* Dark mode map */}
      {props.darkMode && (
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{ width: "100vw", height: "100vh" }}
          // mapStyle="mapbox://styles/mapbox/streets-v12" //light mode
          //mapStyle="mapbox://styles/mapbox/dark-v11" //dark mode
          mapStyle="mapbox://styles/mapbox/navigation-night-v1" //navigation dark mode
          mapboxAccessToken={props.mapboxtoken}
          maxZoom={14}
        >
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <ScaleControl />

          {pins}
          {user_pin}

          {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupInfo.lon)}
              latitude={Number(popupInfo.lat)}
              onClose={() => setPopupInfo(null)}
              //style={{background: "darkgrey",color: "black"}}
            >
              <Card>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Distance: {popupInfo.distance} km <br />
                    Location: {popupInfo.location} <br />
                    Address: {popupInfo.address} <br />
                  </Typography>
                  <PopupChipsArray recycling={popupInfo.recycling} />
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Description: {popupInfo.description}
                    <br />
                    ID: {popupInfo.id}
                  </Typography>
                </CardContent>
              </Card>
            </Popup>
          )}
          {userPopupInfo && (
            <Popup
              anchor="top"
              longitude={Number(userPopupInfo.lon)}
              latitude={Number(userPopupInfo.lat)}
              onClose={() => setPopupInfo(null)}
              //style={{background: "darkgrey",color: "black"}}
            >
              <div style={{ background: "darkgrey", color: "black" }}>
                User location
                <br />
                Latitude: {userPopupInfo.lat} <br />
                Longitude: {userPopupInfo.lon} <br />
              </div>
            </Popup>
          )}
          {locationLayer && (
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
              {/* <Layer {...unclusteredPointLayer} /> */}
            </Source>
          )}

          <Grid container justifyContent="flex-end" sx={{ minHeight: "200px" }}>
            <Card
              sx={{
                minHeight: "20%",
                //minHeight: "200px",
                maxHeight: "50%",
                minWidth: "20%",
                maxWidth: "50%",
              }}
            >
              <MatGeocoder
                inputPlaceholder="Search Address"
                accessToken={props.mapboxtoken}
                onSelect={onSelectHandler}
                autocomplete="true"
                showLoader={true}
                {...geocoderApiOptions}
              />
            </Card>
          </Grid>
        </Map>
      )}

      {/* Light mode map */}
      {!props.darkMode && (
        <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100vw", height: "100vh" }}
        // mapStyle="mapbox://styles/mapbox/streets-v12" //light mode
        //mapStyle="mapbox://styles/mapbox/dark-v11" //dark mode
        mapStyle="mapbox://styles/mapbox/navigation-day-v1" //navigation day mode
        mapboxAccessToken={props.mapboxtoken}
        maxZoom={14}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {pins}
        {user_pin}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.lon)}
            latitude={Number(popupInfo.lat)}
            onClose={() => setPopupInfo(null)}
            //style={{background: "darkgrey",color: "black"}}
          >
            <Card>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Distance: {popupInfo.distance} km <br />
                  Location: {popupInfo.location} <br />
                  Address: {popupInfo.address} <br />
                </Typography>
                <PopupChipsArray recycling={popupInfo.recycling} />
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Description: {popupInfo.description}
                  <br />
                  ID: {popupInfo.id}
                </Typography>
              </CardContent>
            </Card>
          </Popup>
        )}
        {userPopupInfo && (
          <Popup
            anchor="top"
            longitude={Number(userPopupInfo.lon)}
            latitude={Number(userPopupInfo.lat)}
            onClose={() => setPopupInfo(null)}
            //style={{background: "darkgrey",color: "black"}}
          >
            <div style={{ background: "darkgrey", color: "black" }}>
              User location
              <br />
              Latitude: {userPopupInfo.lat} <br />
              Longitude: {userPopupInfo.lon} <br />
            </div>
          </Popup>
        )}
        {locationLayer && (
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
            {/* <Layer {...unclusteredPointLayer} /> */}
          </Source>
        )}

        <Grid container justifyContent="flex-end" sx={{ minHeight: "200px" }}>
          <Card
            sx={{
              minHeight: "20%",
              //minHeight: "200px",
              maxHeight: "50%",
              minWidth: "20%",
              maxWidth: "50%",
            }}
          >
            <MatGeocoder
              inputPlaceholder="Search Address"
              accessToken={props.mapboxtoken}
              onSelect={onSelectHandler}
              autocomplete="true"
              showLoader={true}
              {...geocoderApiOptions}
            />
          </Card>
        </Grid>
      </Map>
      )}
    </MCard>
  );
};

export default MapView;
