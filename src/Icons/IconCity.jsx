import React from 'react'
import { FaTreeCity } from "react-icons/fa6";

const IconCity =({ active }) => {
  const iconColor = active ? "#091A2E" : "#ffffff";

  return (
    <div>
      <FaTreeCity className="w-6 h-6" style={{ color: iconColor }} />
    </div>
  );
};

export default IconCity