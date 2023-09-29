import React, { useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { fetchCountryData } from "../../api";
import styles from './CountryPicker.module.css';

function CountryPicker(props) {
  const [fectchedCountry, setFetchedCountry] = useState([]);

  const handleChange = (event) => {
    //setCountry(country);
    props.handleChange(event.target.value);
  };
  useEffect(() => {
    fetchCountryData()
      .then(response => {
        setFetchedCountry(response);
        //console.log(response);
      })
      .catch(err => console.error(err));
  }, []);
  //use effect eill only activates without this this would run endlesssly but if we put it 
  //in dependency array it will change only if selected countries change that enable to pick 
  //different countries


  return (
    <Box sx={{ minWidth: 120 }} className={styles.formControl}>
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Countries</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue=''
          label="Countries"
          onChange={handleChange}>

          <MenuItem value='global'>Global</MenuItem>
          {fectchedCountry.map((country, index) =>
            <MenuItem key={index} value={country}>{country}</MenuItem>
          )}

        </Select>
      </FormControl>
    </Box>
  );
}

export default CountryPicker;