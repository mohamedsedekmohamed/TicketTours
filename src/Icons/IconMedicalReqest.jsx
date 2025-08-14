import React from 'react'
import { FaHandHoldingMedical } from "react-icons/fa6";

const IconMedicalReqest = ({ active }) => {
  const iconColor = active ? "#091A2E" : "#ffffff";

  return (
    <div>
      <FaHandHoldingMedical className="w-6 h-6" style={{ color: iconColor }} />
    </div>
  );
};
export default IconMedicalReqest