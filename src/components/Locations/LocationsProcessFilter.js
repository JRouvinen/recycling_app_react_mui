import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FiltersContext from '../../store/filters-context';

export default function SelectLocationsProcess() {
  const [locationsToProcess, setLocationsToProcess] = React.useState(20);
  const filtersCtx = React.useContext(FiltersContext)
  console.log(filtersCtx)

  const handleChange = (event) => {
    setLocationsToProcess(event.target.value);
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 60, maxWidth: 100 }}>
        <InputLabel id="simple-select-helper-label">Max locations</InputLabel>
        <Select
          labelId="simple-select-helper-label"
          id="simple-select-helper"
          value={locationsToProcess}
          label="Locations to process"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={70}>70</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={'All'}>All</MenuItem>
        </Select>
        <FormHelperText>Maximum location <br/>count on the list</FormHelperText>
      </FormControl>
      <br/>
    </>
  );
}