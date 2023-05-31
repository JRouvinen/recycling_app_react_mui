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
import Pin_cont from "./pin_container";
import Pin_sel from "./pin_selected";
import MCard from "@mui/material/Card";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./layers";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";

// import CITIES from '../../.data/cities.json'; -> not needed for now

const MapView = (props) => {
  console.log("mapview");
  // console.log(props.locations.features);
  const [locationData, setLocationData] = useState([]);
  const [locationDataBase, setLocationDataBase] = useState(
    props.locations.features
  );
  const [old_loc_data, setOldLocData] = useState([]);
  //const [geoJson_data, setgeoJson_data] = useState("https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson")
  let pins = old_loc_data;
  //console.log(geoJson_data)
  const [popupInfo, setPopupInfo] = useState(null);

  const [viewState, setViewState] = React.useState({
    latitude: 61.0,
    longitude: 8.81,
    zoom: 9,
    cooperativeGestures: true,
  });
  //console.log(locationData);

  const zoom_distances = {
    //distances: zoom level: distance in km
    12: 2.5,
    11: 5,
    10: 10,
    9: 15,
    8: 30,
    7: 60,
    6: 250,
    5: 300,
    4: 300,
    3: 300,
    2: 300,
  };

  const calculateDistance = () => {
    const zoom_level = viewState.zoom.toFixed();
    console.log("zoom level", zoom_level);
    const map_win_lat = viewState.latitude;
    const map_win_lon = viewState.longitude;
    let draw_distance = zoom_distances[zoom_level];
    let newArray = [];

    if (zoom_level > 12) {
      draw_distance = 12;
    }
    if (zoom_level < 9) {
      draw_distance = 0;
    }
    // draw_distance = 10;
    console.log(draw_distance);

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

  useEffect(() => {
    calculateDistance();
    // filterByDistance(props,locationCtx)
  }, [viewState, props]);

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
            location.recycling_type === "container" && <Pin_sel />}
          {props.selectedID === location.id &&
            location.recycling_type !== "container" && <Pin_sel />}
          {props.selectedID !== location.id &&
            location.recycling_type === "container" && <Pin_cont />}
          {props.selectedID !== location.id &&
            location.recycling_type !== "container" && <Pin />}

          {/* <Pin /> */}
        </Marker>
      )),
    [locationData]
  );

  const pointClick = (e) => {
    console.log("pointclick");
    console.log(e);
  };

  return (
    <MCard>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100vw", height: "100vh" }}
        // mapStyle="mapbox://styles/mapbox/streets-v12" //light mode
        mapStyle="mapbox://styles/mapbox/dark-v11" //dark mode
        mapboxAccessToken={props.mapboxtoken}
        // ref={mapRef} onLoad={onMapLoad}
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
        </Source>
      </Map>
    </MCard>
  );
};

export default MapView;
