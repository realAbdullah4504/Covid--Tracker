import React, { useEffect, useState } from 'react';
import styles from './Charts.module.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { fetchDailyData } from '../../api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function Charts({stats:{infected,recovered,date,deaths},country}) {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {

    fetchDailyData()
      .then(response =>
        setDailyData(response))
      .catch(err => console.error(err));
        
  }, []);
  const lineData = {
    labels: dailyData.map(d => d.date),
    datasets: [
      {
        label: 'Cases',
        data: dailyData.map(c => c.cases),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Deaths',
        data: dailyData.map(c => c.deaths),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const labels = ['Infected','Recovered','Deaths'];

  const barData = {
    labels,
    datasets: [
      {
        label: 'Infected',
        data: [infected, recovered, deaths],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display:false
      },
      title: {
        display: true,
        text: 'Current State is ' + country,
      },
    },
  };

  return (
    <div className={styles.container}>
      {country==='global' ? <Line data={lineData} /> : <Bar options={options} data={barData} />}
    </div>
  );
}

export default Charts;