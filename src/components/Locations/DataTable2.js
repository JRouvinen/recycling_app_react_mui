import * as React from "react";

import { DataGrid, GridToolbar, gridVisibleColumnFieldsSelector } from "@mui/x-data-grid";

const columns = [
  
  { field: "id", headerName: "ID", width: 80 },
  { field: "distance", headerName: "Distance (km)", type: "number", width: 100 },
  { field: "location", headerName: "Location", width: 200, hideable: false },
  { field: "recycling", headerName: "Recycling", width: 400 },
  { field: "type", headerName: "Type", width: 130 },
  { field: "recycling_type", headerName: "Location type", width: 130 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "county", headerName: "County", width: 130 },
  { field: "lat", headerName: "Latitude", width: 90, sortable: false },
  { field: "lon", headerName: "Longitude", width: 90, sortable: false },
  { field: "description", headerName: "Description"},
];

export default function DataTable2(props) {
  console.log('DataTable2')
  console.log(props)
  
  const CustomEmpty = () => <div>No data found</div>;
  
  const gridRef = React.useRef();

  const onSelectionChanged =
    (() => {
      const selectedRows = gridRef.current.api.getSelectedRows();
      console.log(selectedRows);
      console.log(gridRef);
    },
    [gridRef]);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        empty={<CustomEmpty />}
        // loading={true}
        ref={gridRef}
        rows={props.locations[0]}
        columns={columns}
        autoPageSize={true}
        // autoHeight={true}
        hideFooterSelectedRowCount={false}
        pageSize={10}
        rowsPerPageOptions={[10]}
        // checkboxSelection
        rowSelection={"single"}
        onSelectionChanged={onSelectionChanged}
        components={{
          Toolbar: GridToolbar,
          
        }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              // Hide columns status and traderName, the other columns will remain visible
              id: false,
              type: false,
            },
          },
        }}
      />
    </div>
  );
}