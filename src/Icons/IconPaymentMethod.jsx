import React from 'react'
import { MdPayments } from "react-icons/md";

const IconPaymentMethod = ({ active }) => {
  const iconColor = active ? "#091A2E" : "#ffffff";

  return (
    <div>
      <MdPayments className="w-6 h-6" style={{ color: iconColor }} />
    </div>
  );
};
export default IconPaymentMethod