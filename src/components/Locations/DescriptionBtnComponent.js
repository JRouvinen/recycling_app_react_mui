import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Checkbox from '@mui/material/Checkbox';
import { styled } from "@mui/material/styles";
import MCard from "@mui/material/Card";

// const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  // console.log('SimpleDialog')
  // console.log(props.data.data)
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Location details</DialogTitle>
      <MCard>
      <List sx={{ pt: 0 }}>
      <Div>{"Id: "}{props.data.data.id}</Div>
      <Div>{"Name: "}{props.data.data.name}</Div>
      <Div>{"Address: "}{props.data.data.address}</Div>
      <Div>{"County: "}{props.data.data.county}</Div>
      <Div>{"Coordinates: "}{props.data.data.lat}{" / "}{props.data.data.lon}</Div>
      <Div>{"Location type: "}{props.data.data.recycling_type}</Div>
      <Div>{"Description: "}{props.data.data.description}</Div>
      <Div>{"Type: "}{props.data.data.type}</Div>
      <Div>{"Access: "}{props.data.data.access}</Div>
      </List>
      </MCard>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // selectedValue: PropTypes.string.isRequired,
};

export default function DescriptionDialog(props) {
  // console.log('DescriptionDialog')
  // console.log(props)
  const [open, setOpen] = React.useState(false);
  // const [selectedValue, setSelectedValue] = React.useState(props);

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
      {/* <Button color="inherit" onClick={handleClickOpen}>
Settings */}
      <Checkbox
        // {...label}
        icon={<InfoOutlinedIcon />}
        checkedIcon={<InfoOutlinedIcon />}
        onClick={handleClickOpen}/>
      <SimpleDialog
        data={props}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}