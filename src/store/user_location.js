import React from "react";

const UserLocationContext = React.createContext({
    userLatitude: "",
    userLongitude: ""
});

export default UserLocationContext;