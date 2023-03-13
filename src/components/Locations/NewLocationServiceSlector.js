import React, {useState, useEffect} from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function NewLocationServices(props) {
  const [value, setValue] = useState(props.services);
  const [inputValue, setInputValue] = useState('');
  console.log(props)

  const sendSetServices = (values) => {
    console.log('sendSetServices');
    console.log(values);
    updateNewServices(values);
  }

  useEffect(()=>{
		sendSetServices(value);
    
	}, [inputValue, value])

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-services"
      options={props.services}
      disableCloseOnSelect
      getOptionLabel={(option) => option.service}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            
          />
          {option.service}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Location services" placeholder="Services" />
      )}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
    />
  );
}


// const services = [
//   {service:"Glass packaging"}, 
// {service:"Metal packaging"} ,
// {service:"Textiles, clothes and shoes"},
// {service:"Dangerous waste"},
// {service:"Corrugated cardboard"},
// {service:"Beverage carton"},
// {service:"Packaging carton"},
// {service:"Paper"},
// {service:"Cardboard, paper and cardboard"},
// {service:"Plastic packaging"},
// {service:"Residual waste"},
// {service:"Mixed plastic"},
// {service:"Plastic (not packaging)"},
// {service:"Electrical and electronic waste"},
// {service:"Garden waste"},
// {service:"Batteries"},
// {service:"Explosive waste"},
// {service:"Medical waste"},
// {service:"Small electronics"},
// {service:"Combustible residual waste"},
// {service:"Metal"},
// {service:"Food waste"},
// {service:"Items for reuse"},
// {service:"Wood"},
// {service:"Other"},
// {service:"Small recreational boats"},
// {service:"Construction and demolition waste"},
// {service:"Large recreational boats without inboard engines"},
// {service:"Marine waste"},
// {service:"Asbestos"},
// {service:"Window panes"},
// {service:"Leisure boats with inboard motor"},
// {service:"Styrofoam (EPS)"},
// {service:"Landfill residue"},
// {service:"Plaster"},
// {service:"Coarse waste"},
// {service:"Non-combustible waste"},
// {service:"Impregnated wood"},
// {service:"Inert waste"},
// {service:"Iron and steel"},
// {service:"Composite iron and steel"},
// {service:"Tires"},
// {service:"Pure masses"},
// {service:"Compost soil"},
// {service:"Bottles and cans with deposit"},
// {service:"Cars"}
// ];