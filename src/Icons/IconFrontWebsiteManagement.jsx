import React from 'react'
import { FaEarthAsia } from "react-icons/fa6";

const IconFrontWebsiteManagement = ({ active }) => {
  const iconColor = active ? "#091A2E" : "#ffffff";

  return (
    <div>
      <FaEarthAsia className="w-6 h-6" style={{ color: iconColor }} />
    </div>
  );
};
export default IconFrontWebsiteManagement