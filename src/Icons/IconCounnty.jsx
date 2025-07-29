import React from 'react'
import { ImFlag } from "react-icons/im";

const IconCounnty= ({ active }) => {
  const iconColor = active ? "#091A2E" : "#ffffff";

  return (
    <div>
      <ImFlag className="w-6 h-6" style={{ color: iconColor }} />
    </div>
  );
};

export default IconCounnty