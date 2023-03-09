import React from "react";

const SettingsContext = React.createContext({
    localDatabase: true,
    serverDatabase: false,
    setlocalDatabase: () => {},
    setserverDatabase: ()=>{}

});

export default SettingsContext;