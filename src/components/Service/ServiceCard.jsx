import React from 'react';
import { Plus } from 'lucide-react';

const ServiceCard = ({ name, duration, price, onSelect, onShowDetails }) => {
  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-200">
      <div>
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-600">
          {duration}
        </p>
      </div>
      <div className="flex items-center">
        <span className="font-bold text-lg mr-4">£{price}</span>
        <button 
          onClick={onSelect}
          className="flex items-center px-4 py-2 border border-primary text-primary rounded hover:bg-primary-400 transition duration-300"
        >
          <Plus className="w-4 h-4 mr-2" /> Select
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;