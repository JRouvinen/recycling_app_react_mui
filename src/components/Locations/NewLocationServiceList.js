import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';


export default function NewLocationServiceList(props) {
  const [checked, setChecked] = React.useState([]);
  

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      
    } else {
      newChecked.splice(currentIndex, 1);

    }
    setChecked(newChecked);
    props.setServices(newChecked);
    
  };


  return (
    <List sx={{ width: '100%', maxWidth: 470, maxHeight: 200,position: 'relative',overflow: 'auto',bgcolor: 'background.paper' }}>
      {props.services.map((service) => {
        const labelId = `checkbox-list-label-${service}`;

        return (
          
          <ListItem
            key={service}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                {/* <CommentIcon /> */}
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(service)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(service) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${service}`} />
            </ListItemButton>
          </ListItem>
          
        );
      })}
    </List>
  );
}