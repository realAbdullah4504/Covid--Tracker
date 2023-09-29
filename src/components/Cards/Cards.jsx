import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CountUp from 'react-countup';
import styles from './Cards.module.css';
//import cx from 'classnames';

function Cards({ stats: { infected, recovered, date, deaths } }) {

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justifyContent="center" >
        <Grid item component={Card} xs={12} md={3} 
          style={{
            borderBottom: '10px solid rgba(0,0,255,0.5)'
            , margin: '0 2%'
          }}>
          <CardContent>
            <Typography color='textSecondary' gutterbottom="true">Infected</Typography>
            <Typography variant="h5">
              <CountUp start={0} end={infected} duration={2.5} separator="," ></CountUp>
            </Typography>
            <Typography color='textSecondary'>{new Date(date).toDateString()}</Typography>
            <Typography variant="body2">Number of active cases</Typography>
          </CardContent>
        </Grid>


        <Grid item component={Card} xs={12} md={3}
          style={{
            borderBottom: '10px solid rgba(0,255,0,0.5)'
            , margin: '0 2%'
          }}>
          <CardContent>
            <Typography color='textSecondary' gutterbottom="true">Recovered</Typography>
            <Typography variant="h5">
              <CountUp start={0} end={recovered} duration={2.5} separator=","></CountUp>
            </Typography>
            <Typography color='textSecondary'>{new Date(date).toDateString()}</Typography>
            <Typography variant="body2">Number of active cases</Typography>
          </CardContent>
        </Grid>

        <Grid item component={Card} xs={12} md={3}
          style={{
            borderBottom: '10px solid rgba(255,0,0,0.5)'
            , margin: '0 2%'
          }}>
          <CardContent>
            <Typography color='textSecondary' gutterbottom="true">Deaths</Typography>
            <Typography variant="h5">
              <CountUp start={0} end={deaths} duration={2.5} separator=","></CountUp>
            </Typography>
            <Typography color='textSecondary'>{new Date(date).toDateString()}</Typography>
            <Typography variant="body2">Number of active cases</Typography>
          </CardContent>
        </Grid>

      </Grid>
    </div>
  );
}

export default Cards;