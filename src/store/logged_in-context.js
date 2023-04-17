import React from "react";

const LoggedInContext = React.createContext({
    loggedIn: false,
    adminLoggedIn: false
});

export default LoggedInContext;