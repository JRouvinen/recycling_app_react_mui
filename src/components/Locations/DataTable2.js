import React, {useEffect} from "react";
import {
  DataGrid,
  GridToolbar,
  gridVisibleColumnFieldsSelector,
  GridValueGetterParams,
} from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", minWidth: 50, maxWidth: 100 },
  {
    field: "distance",
    headerName: "Distance (km)",
    type: "number",
    minWidth: 70,
    maxWidth: 90,
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

  const [selectedRows, setSelectedRows] = React.useState([]);
  const [locationRows, setlocationRows] = React.useState([]);

  //const locationRows = props.locations[0].map(myFunction)
  
  
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
    console.log("cell click");
    //console.log(ids)
    console.log(ids.id);
    //console.log(ids.hasFocus)
    props.setselectedID(ids.id);
    //setSelectedRows(selectedRows);
    //console.log(selectedRows)
  };

  useEffect(() => {
    setlocationRows(props.locations);
  }, [props]);


  return (
    <div style={{ height: 600, width: "100%" }}>
      {props.locations == true && <CustomEmpty/>}
      {props.locations != true && <DataGrid
        empty={<CustomEmpty />}
        // loading={true}
        ref={gridRef}
        rows={locationRows}
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
      />}
      
    </div>
  );
}
