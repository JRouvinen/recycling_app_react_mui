import React from "react";

const FiltersContext = React.createContext({
    filtDistance: '25',
    sortBy: 'Near',
    setDistFilt: () => {},
    setSortBy: ()=>{}

});

export default FiltersContext;