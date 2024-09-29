import React from 'react';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  CandlestickController,
  CandlestickElement,
  Tooltip,
  Legend
);

const ChartComponent = ({ data }) => {
  const chartData = {
    datasets: [
      {
        label: 'Candlestick Chart',
        data: data.map((candle) => ({
          x: new Date(candle.time),
          o: candle.open,
          h: candle.high,
          l: candle.low,
          c: candle.close,
        })),
        borderColor: '#000',
        backgroundColor: 'rgba(0,0,0,0.1)',
      }
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: '500px' }}>
      <Chart type="candlestick" data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
