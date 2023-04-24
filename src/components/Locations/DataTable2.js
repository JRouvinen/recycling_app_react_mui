import * as React from "react";
import { DataGrid, GridToolbar, gridVisibleColumnFieldsSelector, GridValueGetterParams } from "@mui/x-data-grid";

const columns = [
  
  { field: "id", headerName: "ID", minWidth: 50, maxWidth: 100 },
  { field: "distance", headerName: "Distance (km)", type: "number", minWidth: 70, maxWidth: 90 },
  { field: "location", headerName: "Location", minWidth: 200, maxWidth: 300, hideable: false },
  { field: "recycling", headerName: "Recycling", minWidth: 200, maxWidth: 400 },
  { field: "type", headerName: "Type", minWidth: 80, maxWidth: 160 },
  { field: "recycling_type", headerName: "Location type", minWidth: 80, maxWidth: 160 },
  { field: "address", headerName: "Address", minWidth: 200, maxWidth: 400 },
  { field: "county", headerName: "County", minWidth: 80, maxWidth: 160 },
  { field: "lat", headerName: "Latitude", minWidth: 90, maxWidth: 180, sortable: false },
  { field: "lon", headerName: "Longitude", minWidth: 90, maxWidth: 180, sortable: false },
  { field: "description", headerName: "Description", minWidth: 200, maxWidth: 400, sortable: false },
];

export default function DataTable2(props) {
  console.log('DataTable2')
  console.log(props.locations[0])

  const [selectedRows, setSelectedRows] = React.useState([]);
  
  const CustomEmpty = () => <div>No data found</div>;
  
  const gridRef = React.useRef();

  const onSelectionChanged =
    (() => {
      const selectedRows = gridRef.current.api.getSelectedRows();
      console.log(selectedRows);
      console.log(gridRef);
    },
    [gridRef]);

  const onCellClickHandle = (ids) => {
    console.log('cell click')
    console.log(ids)  
    console.log(ids.id)  
    console.log(ids.hasFocus)
    //setSelectedRows(selectedRows);
    //console.log(selectedRows)

  }
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        empty={<CustomEmpty />}
        // loading={true}
        ref={gridRef}
        rows={props.locations[0]}
        columns={columns}
        autoPageSize={true}
        disableColumnResize={false}
        // autoHeight={true}
        hideFooterSelectedRowCount={false}
        pageSize={10}
        rowsPerPageOptions={[10]}
        //checkboxSelection
        rowSelection={true}
        //onSelectionChanged={onSelectionChanged}
        onCellClick={onCellClickHandle}
        // onSelectionModelChange={(ids) => {
        //   const selectedIDs = new Set(ids);
        //   console.log(selectedIDs)
        //   const selectedRows = props.locations[0].filter((id) =>
        //     selectedIDs.has(id),
        //   );
          
        //   setSelectedRows(selectedRows);
        //   console.log(selectedRows)

        // }}

        components={{
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
      />
    </div>
  );
}