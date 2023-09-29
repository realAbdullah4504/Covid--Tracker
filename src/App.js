import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import { fetchData } from './api';
import Cards from './components/Cards/Cards';
import Charts from './components/Chart/Charts';
import CountryPicker from './components/CountryPicker/CountryPicker';
import coronaImage from './images/image.png';
import CircularProgress from '@mui/material/CircularProgress';
import FitsViewer from './components/Fits';





function App() {

  const [stats, setStats] = useState({
  });
  const [country, setCountry] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCountry('global');
    fetchData('global')
      .then(response => {
        setStats(response);
        setIsLoading(false);
        //console.log(response);
      })
      .catch(err => console.error(err));

  }, []);

  function handleChange(country) {
    setCountry(country);
    fetchData(country)
      .then(response => {
        setStats(response)
        //console.log(response)
      })
      .catch(err => console.error(err));
    //console.log(country);
  }
  const fitsImageUrl = 'https://data.darts.isas.jaxa.jp/pub/pds3/sln-l_e-hdtv-2-edr-v1.0/data/200709/sh_20070929T124558_tm8/sh_20070929T124558_tm8_0000.fits';

  return (
    <div >
      <FitsViewer fitsImageUrl={fitsImageUrl}/>
      <img src={coronaImage} className={`${styles.image} ${styles.container}`} alt='COVID-19' />
      {isLoading ?
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
        : <div className={styles.container}>
          <Cards stats={stats} />
          <CountryPicker handleChange={handleChange} country={country} />
          <Charts stats={stats} country={country} />
        </div>
      }
    </div>
  );
}

export default App;
