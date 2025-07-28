import React from "react";
import { MdOutlineUnfoldMoreDouble } from "react-icons/md";

const IconExtras = ({ active }) => {
  const iconColor = active ? "#091A2E" : "#ffffff";
  return (
    <div>
      {" "}
      <MdOutlineUnfoldMoreDouble
        className="w-6 h-6"
        style={{ color: iconColor }}
      />
    </div>
  );
};

export default IconExtras;
