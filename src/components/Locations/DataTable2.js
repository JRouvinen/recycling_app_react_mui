import React, {useEffect} from "react";
import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", minWidth: 50, maxWidth: 100 },
  {
    field: "distance",
    headerName: "Distance (km)",
    type: "number",
    minWidth: 80,
    maxWidth: 100,
  },
  {
    field: "location",
    headerName: "Location",
    minWidth: 200,
    maxWidth: 300,
    hideable: false,
  },
  { field: "recycling", headerName: "Recycling", minWidth: 200, maxWidth: 400 },
  { field: "type", headerName: "Type", minWidth: 80, maxWidth: 160 },
  {
    field: "recycling_type",
    headerName: "Location type",
    minWidth: 80,
    maxWidth: 160,
  },
  { field: "address", headerName: "Address", minWidth: 200, maxWidth: 400 },
  { field: "county", headerName: "County", minWidth: 80, maxWidth: 160 },
  {
    field: "lat",
    headerName: "Latitude",
    minWidth: 90,
    maxWidth: 180,
    sortable: false,
  },
  {
    field: "lon",
    headerName: "Longitude",
    minWidth: 90,
    maxWidth: 180,
    sortable: false,
  },
  {
    field: "description",
    headerName: "Description",
    minWidth: 200,
    maxWidth: 400,
    sortable: false,
  },
];

export default function DataTable2(props) {
  console.log('datatable2')
  console.log(props)
  //const [selectedRows, setSelectedRows] = React.useState([]);
  const [locationRows, setlocationRows] = React.useState([]);

  //const locationRows = props.locations[0].map(myFunction)
  
  
  const CustomEmpty = () => <div>No data found</div>;

  const gridRef = React.useRef();

  const onCellClickHandle = (ids) => {
    console.log("cell click");
    console.log(ids.id);
    props.setselectedID(ids.id);
    
  };

  useEffect(() => {
    setlocationRows(props.locations);
  }, [props]);


  return (
    //<div style={{ height: 600, width: "100%" }}>
    <div style={{ width: "100vw", height: "100vh" }}>

    
      {props.locations === true && <CustomEmpty/>}
      {props.locations !== true && <DataGrid 
        empty={<CustomEmpty />}
        // loading={true}
        ref={gridRef}
        rows={locationRows}
        columns={columns}
        autoPageSize={true}
        disableColumnResize={false}
        //autoHeight={true}
        autoWidth={true}
        hideFooterSelectedRowCount={false}
        pageSize={10}
        rowsPerPageOptions={[10]}
        rowSelection={true}
        onCellClick={onCellClickHandle}
        

        slots={{
          Toolbar: GridToolbar,
        }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              // Hide columns, the other columns will remain visible
              id: false,
              type: false,
            },
          },
        }}
      />}
      
    
    </div>
  );
}
