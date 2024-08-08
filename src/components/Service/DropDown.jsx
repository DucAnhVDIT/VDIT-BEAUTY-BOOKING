import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const DropDown = ({ options, selectedId, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id) => {
    onSelect(id);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.id === selectedId);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
      >
        <span>{selectedOption ? selectedOption.name : 'Select category'}</span>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.name} ({option.count})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;