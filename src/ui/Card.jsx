import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id,image, title, description, duration, price, discount }) => {
  return (
    <div className=" w-70 md:w-80 lg:w-90 lx:w-100">
      <Link to={`/tripdetails/${id}`} className="block rounded-lg p-4 shadow-xs shadow-indigo-100">
        <img
          alt={title}
          src={image}
          className="h-56 w-full rounded-md object-cover"
        />
        <div className="mt-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {" "}
            {description.length > 40
              ? description.slice(0, 100) + "  ....."
              : description}
          </p>
          <p className="text-sm text-gray-500 mt-1">Days: {duration}</p>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-gray-400 line-through">
              ${discount}
            </span>
            <span className="text-sm text-four font-medium">${price}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
