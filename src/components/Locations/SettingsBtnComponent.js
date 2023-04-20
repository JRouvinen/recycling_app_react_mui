import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import ServiceFilter from "./ServiceFilterComponent";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import ColumnFilter from "./ColumnFilterComponent";
import SettingsContext from "../../store/settings-context";
import LoadingButton from "@mui/lab/LoadingButton";
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

function SimpleDialog(props) {
  console.log("Settingsbtn");
  const ctx = useContext(SettingsContext);
  // console.log(ctx);


  // const { onClose, selectedValue, open } = props;
  const { onClose, open } = props;

  const handleClose = () => {
    // onClose(selectedValue);
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const [db_checked, setDbChecked] = useState(ctx.localDatabase);
  const [srv_checked, setSrvChecked] = useState(false);
  const [info_txt, setInfoTxt] = useState("...");
  const [local_file, setLocalFile] = useState("sortere-mar19.osm");
  const [server_addr, setServerAddr] = useState("localhost:8080");
  const [isLoading, setIsLoading] = useState(false);
  const [loadedFile, setLoadedFile] = useState('');
  const [correctFile, setCorrectFile] = useState(true)
  const [serverError, setServerError] = useState(false)

  const dbChangeHandle = (event) => {
    setDbChecked(event.target.checked);
    setSrvChecked(false);
    // ctx.onChangeServer();
    // settingsCtx.setserverDatabase(false)
    // setInfoTxt("Loading local database..");
  };
  const srvChangeHandle = (event) => {
    setDbChecked(false);
    setSrvChecked(event.target.checked);
    // ctx.onChangeServer();
    // settingsCtx.setlocalDatabase(false)
    // settingsCtx.setserverDatabase(true)
    // setInfoTxt("Connecting to server..");
  };

  const uploadHandle = (e) => { //Needs checks and warning if loaded file is not json and actual processing of the file if it is 
    console.log('uploadHandle')
    console.log(e)
    console.log(e.type)
    setLoadedFile(e)
    setLocalFile(e.name)
    if (e.type !== 'application/json') {
      setCorrectFile(false)
    } else {
      setCorrectFile(true)
      // e.PreventDefault()
      const reader = new FileReader()
      reader.readAsText(e)
    }
    
  };

  const serverChangeHandler = (event) => {
    setServerAddr(event.target.value)
  };

  const applyClickHandle = () => {
    if (srv_checked === true && server_addr !== '') {
      setServerError(false);
      ctx.onChangeServer();
      setInfoTxt("Connecting to server..");
    } else if (server_addr === '') {
        setServerError(true);
    } else if (db_checked === true && correctFile === true) {
      ctx.onChangeServer();
      setInfoTxt("Loading local database..");
    }
    
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Program settings</DialogTitle>
      <List sx={{ pt: 1 }}>
        {/* <TextField
          id="outlined-read-only-input"
          label="Info"
          // defaultValue="Hello World"
          value={info_txt}
          InputProps={{
            readOnly: true,
          }}
          padding="dense"
          sx={{ m: 1, minWidth: 250, maxWidth: 300 }}
        /> */}
        <br />
        
        <Divider />
        <br />
        <ColumnFilter />
        <br />
        <Divider />
        <Div>Use local database
        <Switch
          checked={db_checked}
          onChange={dbChangeHandle}
          inputProps={{ "aria-label": "controlled" }}
        /></Div>
        {!correctFile && <TextField
          id="outlined-error-helper-text"
          label="Error"
          helperText="Incorrect file type."
          value={local_file}
          padding="dense"
          sx={{ m: 1, minWidth: 250, maxWidth: 300 }}
        />}
        {correctFile && <TextField
          id="outlined-read-only-input"
          // label="Local database file"
          // defaultValue="Hello World"
          value={local_file}
          // InputProps={{
          //   readOnly: true,
          // }}
          padding="dense"
          sx={{ m: 1, minWidth: 250, maxWidth: 300 }}
        />}
        
        <br />
        {!isLoading && (
          <Button
            variant="contained" 
            component="label"
            sx={{ m: 1, minWidth: 50, maxWidth: 300 }}
            // onChange={uploadHandle}
            // onChange={e => setLoadedFile(e.target.files[0])}
            // onChange={e => setLoadedFile(e.target.files[0])}
            onChange={e => uploadHandle(e.target.files[0])}

          >
            Upload database file
            <input hidden accept="json/" type="file" id="select-json"/>
          </Button>
        )}
        {isLoading && (
          <LoadingButton loading loadingIndicator="Loading…" variant="outlined">
            Fetch data
          </LoadingButton>
        )}

        
        <Divider />

        <Div>Use server database
        <Switch
          checked={srv_checked}
          onChange={srvChangeHandle}
          inputProps={{ "aria-label": "controlled" }}
        />
        </Div>
        {!props.adminLogged && !serverError &&<TextField
          id="outlined-read-only-input"
          label="Remote server address"
          value={server_addr}
          InputProps={{
            readOnly: true,
          }}
          padding="dense"
          sx={{ m: 1, minWidth: 250, maxWidth: 300 }}
        />}
        {props.adminLogged && !serverError &&<TextField
          id="outlined-read-only-input"
          label="Remote server address"
          value={server_addr}
          InputProps={{
            readOnly: false,
          }}
          padding="dense"
          sx={{ m: 1, minWidth: 250, maxWidth: 300 }}
          onChange={serverChangeHandler}

        />}
        {!props.adminLogged && serverError &&<TextField
          id="outlined-error-helper-text"
          label="Error"
          helperText="Incorrect entry."
          value={server_addr}
          InputProps={{
            readOnly: true,
          }}
          padding="dense"
          sx={{ m: 1, minWidth: 250, maxWidth: 300 }}
        />}
        {props.adminLogged && serverError &&<TextField
          id="outlined-error-helper-text"
          label="Error"
          helperText="Incorrect entry."
          value={server_addr}
          InputProps={{
            readOnly: false,
          }}
          padding="dense"
          sx={{ m: 1, minWidth: 250, maxWidth: 300 }}
          onChange={serverChangeHandler}

        />}
        <br/>
        
      </List>
      <Divider />
      <br/>

      <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button variant="contained" onClick={applyClickHandle}>Apply</Button>
      <Button variant="contained" onClick={handleClose}>Close</Button>
      </ButtonGroup>
      <br/>
      
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // selectedValue: PropTypes.string.isRequired,
};

export default function SettingsDialog(props) {
  const [open, setOpen] = React.useState(false);
  // const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    // setSelectedValue(value);
  };

  return (
    <div>
      {/* <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br /> */}
      <Button color="inherit" onClick={handleClickOpen}>
        Settings
      </Button>
      <SimpleDialog
        // selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        adminLogged={props.adminLogged}
      />
    </div>
  );
}
