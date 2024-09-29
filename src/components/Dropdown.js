// src/components/Dropdown.js
import React from 'react';

const Dropdown = ({ options, selected, onChange, label }) => {
  return (
    <div className="mb-4 rounded-md text-center">
      <label className="block text-lg font-medium mb-2 roun ">{label}</label>

      <select
        className="border p-2 rounded-sm w-full max-w-sm mx-auto"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
