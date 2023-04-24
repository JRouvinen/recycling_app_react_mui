import * as React from 'react';
import {useState, useMemo} from 'react';
import Map, {NavigationControl, Popup, ScaleControl, GeolocateControl, FullscreenControl, Marker} from 'react-map-gl';
import Pin from './pin';
import Pin_cont from './pin_container';
import MCard from "@mui/material/Card";
import 'mapbox-gl/dist/mapbox-gl.css';

// import CITIES from '../../.data/cities.json'; -> not needed for now


const MapView = (props) => {
    console.log('MapView');
    console.log(props)
    const loc_data = props.locations;
    const [old_loc_data, setOldLocData] = useState([]);
    let pins = old_loc_data
    // console.log(props.mapboxtoken)
    const [popupInfo, setPopupInfo] = useState(null);
    
      pins = useMemo(
        () =>
          props.locations.map((location, id) => (
            <Marker
              key={`marker-${id}`}
              longitude={location.lon}
              latitude={location.lat}
              anchor="bottom"
              onClick={e => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                setPopupInfo(location);
              }}
            >
              {location.recycling_type === 'container' && <Pin_cont />}
              {location.recycling_type !== 'container' && <Pin />}

              {/* <Pin /> */}
            </Marker>
          )),
        [props]
      );
        

  return (
    

    <MCard>
    <Map
      initialViewState={{
        longitude: 8.81,
        latitude: 61.00,
        zoom: 5,
        cooperativeGestures: true
      }}
      style={{width: '100vw', height: '100vh'}}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={props.mapboxtoken}
      // ref={mapRef} onLoad={onMapLoad}
      
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
              Location: {popupInfo.location}, Address: {popupInfo.address} | Recycling: {popupInfo.recycling.toString() } | Description: {popupInfo.description} | Distance: {popupInfo.distance} km
              
            </div>
            
          </Popup>
        )}
      
    </Map>
    {/* <ControlPanel /> */}
    </MCard>
  );
}

export default MapView;

