import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function ColumnFilter() {
  return (
    <Stack spacing={3} sx={{ minWidth: 250, maxWidth: 400 }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={services}
        getOptionLabel={(option) => option.service}
        defaultValue={[services[0],services[3],services[9]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Hide Column"
            placeholder="Show"
          />
        )}
      />
      
      
    </Stack>
  );
}

const services = [
  { service: 'Id'},
  { service: 'Distance'},
  { service: 'Recycling'},
  { service: 'Type'},
  { service: 'Location type'},
  { service: 'Address'},
  { service: 'County'},
  { service: 'Latitude'},
  { service: 'Longitude'},
  { service: 'Description'},

  
];