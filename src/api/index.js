import axios from 'axios';


//fetch global data
const url = 'https://disease.sh/v3/covid-19/'
export const fetchData = (country) => {
  //console.log(country);
  let changeableUrl = url;
  if (country === 'global')
    changeableUrl = url + 'all';
  else changeableUrl = url + 'countries/' + country;

  const options = {
    method: 'GET',
    url: changeableUrl
  };

  const data = axios.request(options);
  

  return data.then((response) => {
    const filteredData={
      infected: response.data.cases,
      deaths: response.data.deaths,
      recovered: response.data.recovered,
      date:response.data.updated
    }
    //console.log(response);
    localStorage.setItem('dataAll', JSON.stringify(filteredData));
    return filteredData;
  })
  .catch((error) =>{
    //alert('offline');
    let dat=localStorage.getItem('dataAll');
    console.log(JSON.parse(dat));
    return JSON.parse(dat); 
  });
}
//https://disease.sh/v3/covid-19/historical/all?lastdays=all
//fetch daily data

export const fetchDailyData = () => {
  const options = {
    method: 'GET',
    url: url + 'historical/all?lastdays=all'
  };

  const data = axios.request(options);


  return data.then(response => {
    const dates = Object.keys(response.data.cases);
    const cases = Object.values(response.data.cases);
    const deaths = Object.values(response.data.deaths);

    const filteredData = dates.map((date, index) => ({
      date,
      cases: cases[index],
      deaths: deaths[index]
    }));
    //console.log(filteredData);
    localStorage.setItem('dataChart', JSON.stringify(filteredData));
    return filteredData;
  })
  .catch((error) =>{
    //alert('offline');
    let dat=localStorage.getItem('dataChart');
    console.log(dat);
    return JSON.parse(dat); 
  });
}

//https://disease.sh/v3/covid-19/countries
//fetch country
export const fetchCountryData = () => {
  const options = {
    method: 'GET',
    url: url + 'countries'
  };

  const data = axios.request(options);

  return data
    .then(response => {
      const filteredData = response.data.map((country) => country.country)
      //console.log(filteredData);
      //console.log(response.data);
      localStorage.setItem('dataCountry', JSON.stringify(filteredData));
      return filteredData;
    })
    .catch((error) =>{
      //alert('offline');
      let dat=localStorage.getItem('dataCountry');
      console.log(dat);
      return JSON.parse(dat); 
    });
}