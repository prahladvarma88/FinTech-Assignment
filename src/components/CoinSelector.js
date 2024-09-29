// src/components/CoinSelector.js
import React, { useState } from 'react';
import Dropdown from './Dropdown';

const CoinSelector = ({ selectedCoin, setSelectedCoin, selectedInterval, setSelectedInterval, coins, setCoins }) => {
  const [newCoinSymbol, setNewCoinSymbol] = useState('');

  const handleAddCoin = () => {
    if (newCoinSymbol && !coins.some(coin => coin.value === newCoinSymbol.toLowerCase())) {
      const newCoin = { label: `${newCoinSymbol.toUpperCase()}/USDT`, value: newCoinSymbol.toLowerCase() };
      setCoins(prevCoins => [...prevCoins, newCoin]);
      setNewCoinSymbol(''); // Clear input field after adding
    }
  };

  return (
    <div className="mb-6 text-center">
      <Dropdown
        label="Select Cryptocurrency"
        options={coins}
        selected={selectedCoin}
        onChange={setSelectedCoin}
      />

      <div className="flex justify-center mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full max-w-xs mr-2"
          placeholder="Add new coin symbol (e.g., DOT)"
          value={newCoinSymbol}
          onChange={(e) => setNewCoinSymbol(e.target.value)}
        />
        <button
          onClick={handleAddCoin}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Coin
        </button>
      </div>

      <Dropdown
        label="Select Time Interval"
        options={[
          { label: '1 Minute', value: '1m' },
          { label: '3 Minutes', value: '3m' },
          { label: '5 Minutes', value: '5m' }
        ]}
        selected={selectedInterval}
        onChange={setSelectedInterval}
      />
    </div>
  );
};

export default CoinSelector;
