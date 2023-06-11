import React, { useState, useContext, useEffect } from "react";

import MCard from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FiltersContext from "../../store/filters-context";
import DataTable2 from "../Locations/DataTable2";

const Table = (props) => {
  console.log("TableComp");
  console.log(props);
  let location_data = useState(props.locations);
  let locDataList = useState([]);
  const userLocation = useState(props.userlocation);
  const filterContext = useContext(FiltersContext);
  const [locDataListIsempty, setlocDataListIsempty] = useState(true)
  //const distFilter = filterContext.filtDistance;

  const getDateString = () => {
    let fulldate = new Date();
    let day = fulldate.getDate();
    let month = fulldate.getMonth() + 1;
    let year = fulldate.getFullYear();
    let hours = fulldate.getHours();
    let minutes = fulldate.getMinutes();
    let seconds = fulldate.getSeconds();
    let millisec = fulldate.getMilliseconds();
    let dateString =
      year +
      "/" +
      month +
      "/" +
      day +
      "-" +
      hours +
      ":" +
      minutes +
      ":" +
      seconds +
      "." +
      millisec;

    // console.log(dateString);
    return dateString;
  };

  // useEffect(() => {
  //   calculateDistance(location_data);
  // }, [location_data, calculateDistance, props]);

  useEffect(() => {
    console.log('calculate dist')
    let userLocation_Lat = 0;
    let userLocation_Lon = 0;

    if (userLocation === undefined) {
      const userLocation_Lat = 59.911491;
      const userLocation_Lon = 10.757933;
    } else {
      const userLocation_Lat = userLocation[0];
      const userLocation_Lon = userLocation[1];
    }
    for (let i = 0; i < location_data[0].length; i++) {
      let newLocationObj = {
        id: "",
        address: "",
        amenity: "",
        bookmark: "",
        county: "",
        description: "",
        distance: "",
        location: "",
        recycling: "",
        recycling_type: "",
        sortere_ref: "",
        timetag: "",
        type: ""
      }
      const lat1 = parseFloat(location_data[0][i].geometry.coordinates[0]); //Recycling location lat and lon
      const lon1 = parseFloat(location_data[0][i].geometry.coordinates[1]);
      let lat2 = parseFloat(userLocation_Lat); //User location lat and lon
      let lon2 = parseFloat(userLocation_Lon);
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
      if (d > 20) {
        dist_km = d.toFixed(0);
      } else {
        dist_km = d.toFixed(2);
      }
      newLocationObj.id = location_data[0][i].properties.id
      newLocationObj.address = location_data[0][i].properties.address
      newLocationObj.amenity = location_data[0][i].properties.amenity
      newLocationObj.bookmark = location_data[0][i].properties.bookmark
      newLocationObj.county = location_data[0][i].properties.county
      newLocationObj.description = location_data[0][i].properties.description
      newLocationObj.distance = dist_km
      newLocationObj.location = location_data[0][i].properties.location
      newLocationObj.recycling = location_data[0][i].properties.recycling
      newLocationObj.recycling_type = location_data[0][i].properties.recycling_type
      newLocationObj.sortere_ref = location_data[0][i].properties.sortere_ref
      newLocationObj.timetag = getDateString()
      newLocationObj.type = location_data[0][i].properties.type
      newLocationObj.lat = location_data[0][i].geometry.coordinates[1]
      newLocationObj.lon = location_data[0][i].geometry.coordinates[0]
      //commented out with geojson update
      //location_data[0][i].properties.distance = dist_km;
      //location_data[0][i].properties.timetag = getDateString();
      //push updated date into list
      locDataList.push(newLocationObj)
    }
    locDataList.shift();
    locDataList.shift();
    console.log('locDataList')
    console.log(locDataList)
    if (locDataList.length > 0) {
      setlocDataListIsempty(false);
    }
  
  }, [location_data, props, locDataList, userLocation]);

  return (
    <MCard>
      <Divider />
      {!locDataListIsempty && <DataTable2
        locations={locDataList}
        selectedID={props.selectedID}
        setselectedID={props.setselectedID}
      />}
      {locDataListIsempty && <DataTable2
        locations={true}

      />}
      
    </MCard>
  );
};

export default Table;
