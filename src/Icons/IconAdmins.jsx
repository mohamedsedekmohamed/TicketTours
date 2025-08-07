import React from 'react'
import { AiFillControl } from "react-icons/ai";

const IconAdmins =({ active }) => {
  const iconColor = active ? "#091A2E" : "#ffffff";

  return (
    <div>
      <AiFillControl className="w-6 h-6" style={{ color: iconColor }} />
    </div>
  );
};

export default IconAdmins