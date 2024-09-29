import React, { useEffect, useState, useRef } from 'react';
import ChartComponent from './components/ChartComponent';
import CoinSelector from './components/CoinSelector';
import { connectWebSocket } from './services/WebSocketService';

const initialCoins = [
  { label: 'ETH/USDT', value: 'ethusdt' },
  { label: 'BNB/USDT', value: 'bnbusdt' },
  { label: 'DOT/USDT', value: 'dotusdt' }
];

const MAX_CANDLES = 50; 

const BinanceMarketData = () => {
  const [coins, setCoins] = useState(initialCoins); 
  const [selectedCoin, setSelectedCoin] = useState('ethusdt');
  const [selectedInterval, setSelectedInterval] = useState('1m');
  const [chartData, setChartData] = useState({});
  const ws = useRef(null);

  const loadSavedData = (coin, interval) => {
    const savedData = localStorage.getItem(`${coin}_${interval}`);
    if (savedData) {
      setChartData(JSON.parse(savedData));
    } else {
      setChartData([]);
    }
  };

  useEffect(() => {
    loadSavedData(selectedCoin, selectedInterval);
    
    ws.current = connectWebSocket(selectedCoin, selectedInterval, (newCandle) => {
    setChartData((prevData) => {
        const updatedData = [...(prevData[selectedCoin] || []), newCandle].slice(-MAX_CANDLES);
        localStorage.setItem(`${selectedCoin}_${selectedInterval}`, JSON.stringify(updatedData));
        return { ...prevData, [selectedCoin]: updatedData };
      });
    });

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [selectedCoin, selectedInterval]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-6 text-center">Binance Market Data</h2>
      <CoinSelector
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        coins={coins}
        setCoins={setCoins} 
      />
      <div className="bg-white shadow-lg rounded-lg p-6">
        <ChartComponent data={chartData[selectedCoin] || []} />
      </div>
    </div>
  );
};

export default BinanceMarketData;
