import React from 'react'
import { MdPayment } from "react-icons/md";

const IconsPayment =({ active }) => {
  const iconColor = active ? "#091A2E" : "#ffffff";

  return (
    <div>
      <MdPayment className="w-6 h-6" style={{ color: iconColor }} />
    </div>
  );
};

export default IconsPayment