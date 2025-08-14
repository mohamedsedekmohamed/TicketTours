import React from 'react'
import { FaFileMedical } from "react-icons/fa6";

const IconMedical= ({ active }) => {
  const iconColor = active ? "#091A2E" : "#ffffff";

  return (
    <div>
      <FaFileMedical className="w-6 h-6" style={{ color: iconColor }} />
    </div>
  );
};
export default IconMedical