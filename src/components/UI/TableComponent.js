import React, { useState, useContext, useEffect } from "react";

import MCard from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FiltersContext from "../../store/filters-context";
import DataTable2 from "../Locations/DataTable2";

const Table = (props) => {
  // let locationCtx = useContext(LocationsContext);
  // locationCtx = locationCtx.loadedlocations;
  console.log("Table");
  console.log(props);
  let location_data = useState(props.locations);
  const userLocation = useState(props.userlocation);
  const filterContext = useContext(FiltersContext);
  // console.log(filterContext)
  const distFilter = filterContext.filtDistance;
  // console.log(distFilter)

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

  const calculateDistance = (location_data, userLocation) => {
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
      // if (locations[i].distance === 0) {
      const lat1 = parseFloat(location_data[0][i].lat); //Recycling location lat and lon
      const lon1 = parseFloat(location_data[0][i].lon);
      let lat2 = parseFloat(userLocation_Lat); //User location lat and lon
      if (lat2 === 0) {
        lat2 = 59.911491;
      }
      let lon2 = parseFloat(userLocation_Lon);
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
      if (d > 20) {
        dist_km = d.toFixed(0);
      } else {
        dist_km = d.toFixed(2);
      }
      location_data[0][i].distance = dist_km;
      location_data[0][i].timetag = getDateString();
      // console.log(filteredDistances[i])
      // https://linuxhint.com/update-object-in-javascript/
      // }
    }
    // filterByDistance(locationCtx);
  };

  useEffect(() => {
    calculateDistance(location_data);
    // filterByDistance(props,locationCtx)
  }, [props]);

  return (
    <MCard>
      <Divider />
      {/* <DataTable locations={filteredDistances} /> */}
      <DataTable2
        locations={location_data}
        selectedID={props.selectedID}
        setselectedID={props.setselectedID}
      />
    </MCard>
  );
};

export default Table;
