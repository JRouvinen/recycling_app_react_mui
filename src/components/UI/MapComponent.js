import * as React from 'react';
import {useState, useMemo, useEffect} from 'react';
import Map, {NavigationControl, Popup, ScaleControl, GeolocateControl, FullscreenControl, Marker} from 'react-map-gl';
import Pin from './pin';
import Pin_cont from './pin_container';
import Pin_sel from './pin_selected';
import MCard from "@mui/material/Card";
import 'mapbox-gl/dist/mapbox-gl.css';

// import CITIES from '../../.data/cities.json'; -> not needed for now


const MapView = (props) => {
    console.log('mapview')
    const [locationData, setLocationData] = useState([]);
    const [locationDataBase, setLocationDataBase] = useState(props.locations);
    const [old_loc_data, setOldLocData] = useState([]);
    let pins = old_loc_data
    // console.log(props.mapboxtoken)
    const [popupInfo, setPopupInfo] = useState(null);

    const [viewState, setViewState] = React.useState({
      latitude: 61.00,
      longitude: 8.81,
      zoom: 9,
      cooperativeGestures: true
    });   
    console.log(locationData)
    
    const zoom_distances = { //distances: zoom level: distance in km
      11:15,
      10:45,
      9:75,
      8:100,
      7:200,
      6:250,
      5:300,
      4:300,
      3:300,
      2:300,
    }

    const calculateDistance = () => {
            const zoom_level = viewState.zoom
            console.log(zoom_level)
            const map_win_lat = viewState.latitude
            const map_win_lon = viewState.longitude
            let draw_distance = zoom_distances[zoom_level]
            let newArray = []

            if (zoom_level > 11){
              draw_distance = 10
            }
            if (zoom_level < 5) {
              draw_distance = 300
            }
            console.log(draw_distance)
            
            for (let i = 0; i < locationDataBase.length; i++) {
              const lat1 = parseFloat(locationDataBase[i].lat); //Recycling location lat and lon
              const lon1 = parseFloat(locationDataBase[i].lon);
              let lat2 = parseFloat(map_win_lat); //User location lat and lon
              if (lat2 === 0) {
                lat2 = 59.911491
              }
              let lon2 = parseFloat(map_win_lon);
              if (lon2 === 0) {
                lon2 = 10.757933
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
                  id: locationDataBase[i].id, 
                    lat: locationDataBase[i].lat, 
                    lon: locationDataBase[i].lon, 
                    amenity: locationDataBase[i].amenity, 
                    sortere_ref: locationDataBase[i].sortere_ref, 
                    source: locationDataBase[i].source, 
                    recycling_type: locationDataBase[i].recycling_type, 
                    recycling: locationDataBase[i].recycling, 
                    location: locationDataBase[i].location, 
                    address: locationDataBase[i].address,
                  bookmark: locationDataBase[i].bookmark,
                  county: locationDataBase[i].county,
                  description: locationDataBase[i].description,
                  distance: locationDataBase[i].distance,
                  timetag: locationDataBase[i].timetag,
                  type: locationDataBase[i].type
                }

                newArray.push(newObj)

              }
              
              
              //locationData[i].timetag = getDateString();
              
              //https://linuxhint.com/update-object-in-javascript/
          }
          setLocationData(newArray);
        }


    useEffect(()=>{
      calculateDistance();
      // filterByDistance(props,locationCtx)
    },[viewState, props.selectedID])

    pins = useMemo(
      () =>
        //calculateDistance(),
        locationData.map((location, id) => (
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
            {/* {location.recycling_type === 'container' && <Pin_cont />}
            {location.recycling_type !== 'container' && <Pin />}
            {props.selectedID == id && <Pin_sel />} */}
            {props.selectedID === location.id && location.recycling_type === 'container' && <Pin_sel />}
            {props.selectedID === location.id && location.recycling_type !== 'container' && <Pin_sel />}
            {props.selectedID !== location.id && location.recycling_type === 'container' && <Pin_cont />}
            {props.selectedID !== location.id && location.recycling_type !== 'container' && <Pin />}
            

            {/* <Pin /> */}
          </Marker>
        )),
      [locationData]
    );

   

  return (
    

    <MCard>
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
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
              ID: {popupInfo.id}
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

