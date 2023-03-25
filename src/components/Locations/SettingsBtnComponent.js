import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import ServiceFilter from './ServiceFilterComponent';
import Switch from '@mui/material/Switch';
import { styled } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import ColumnFilter from './ColumnFilterComponent';
import SettingsContext from '../../store/settings-context';

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));


function SimpleDialog(props) {
  console.log('Settingsbtn')
  const ctx = useContext(SettingsContext);
  console.log(ctx)
  
  // const { onClose, selectedValue, open } = props;
  const { onClose,  open } = props;

  const handleClose = () => {
    // onClose(selectedValue);
    onClose();

  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const [btn1_checked, setBtn1Checked] = React.useState(ctx.localDatabase);
  const [btn2_checked, setBtn2Checked] = React.useState(false);
  const [info_txt, setInfoTxt] = React.useState('...')

  const handleChange1 = (event) => {
    setBtn1Checked(event.target.checked);
    setBtn2Checked(false);
    ctx.onChangeServer();
    // settingsCtx.setserverDatabase(false)
    setInfoTxt('Loading local database..')

  };
const handleChange2 = (event) => {
    setBtn1Checked(false);
    setBtn2Checked(event.target.checked);
    ctx.onChangeServer();
    // settingsCtx.setlocalDatabase(false)
    // settingsCtx.setserverDatabase(true)
    setInfoTxt('Connecting to server..')

  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Program settings</DialogTitle>
      
      
      <List sx={{ pt: 1 }}>
      <TextField
          id="outlined-read-only-input"
          label="Info"
          // defaultValue="Hello World"
          value={info_txt}
          InputProps={{
            readOnly: true,
          }}
          padding="dense"
          sx={{ m: 1, minWidth: 250, maxWidth: 300 }}
        />
        {/* <br/>
        <SelectLocationsProcess/> */}
        <br/>
        <ServiceFilter/>
        <br/>
        <ColumnFilter/>
        <br/>
        <Div>Use local database</Div>
        <Switch
      checked={btn1_checked}
      onChange={handleChange1}
      inputProps={{ 'aria-label': 'controlled' }}
      
    />
    <Div>Use server database</Div>
        <Switch
      checked={btn2_checked}
      onChange={handleChange2}
      inputProps={{ 'aria-label': 'controlled' }}
      
    />

      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // selectedValue: PropTypes.string.isRequired,
};

export default function SettingsDialog() {
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
      />
    </div>
  );
}