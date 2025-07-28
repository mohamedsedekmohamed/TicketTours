import React from 'react'
import { BsCurrencyExchange } from "react-icons/bs";

const IconCurrencies = ({ active }) => {
  const iconColor = active ? "#091A2E" : "#ffffff";

  return (
    <div>
      <BsCurrencyExchange className="w-6 h-6" style={{ color: iconColor }} />
    </div>
  );
};

export default IconCurrencies;
