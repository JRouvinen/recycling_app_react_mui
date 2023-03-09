import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function ServiceFilter() {
  return (
    <Stack spacing={3} sx={{ minWidth: 250, maxWidth: 400 }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={services}
        getOptionLabel={(option) => option.service}
        defaultValue={[services[0],services[1],services[3]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Services filter"
            placeholder="Show"
          />
        )}
      />
      
      
    </Stack>
  );
}

const services = [
  {service:"Glass packaging"}, 
{service:"Metal packaging"} ,
{service:"Textiles, clothes and shoes"},
{service:"Dangerous waste"},
{service:"Corrugated cardboard"},
{service:"Beverage carton"},
{service:"Packaging carton"},
{service:"Paper"},
{service:"Cardboard, paper and cardboard"},
{service:"Plastic packaging"},
{service:"Residual waste"},
{service:"Mixed plastic"},
{service:"Plastic (not packaging)"},
{service:"Electrical and electronic waste"},
{service:"Garden waste"},
{service:"Batteries"},
{service:"Explosive waste"},
{service:"Medical waste"},
{service:"Small electronics"},
{service:"Combustible residual waste"},
{service:"Metal"},
{service:"Food waste"},
{service:"Items for reuse"},
{service:"Wood"},
{service:"Other"},
{service:"Small recreational boats"},
{service:"Construction and demolition waste"},
{service:"Large recreational boats without inboard engines"},
{service:"Marine waste"},
{service:"Asbestos"},
{service:"Window panes"},
{service:"Leisure boats with inboard motor"},
{service:"Styrofoam (EPS)"},
{service:"Landfill residue"},
{service:"Plaster"},
{service:"Coarse waste"},
{service:"Non-combustible waste"},
{service:"Impregnated wood"},
{service:"Inert waste"},
{service:"Iron and steel"},
{service:"Composite iron and steel"},
{service:"Tires"},
{service:"Pure masses"},
{service:"Compost soil"},
{service:"Bottles and cans with deposit"},
{service:"Cars"}
];
