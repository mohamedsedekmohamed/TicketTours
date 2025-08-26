import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, image, title, description, duration, price, discount, startDate }) => {
  const safeTitle = title || "No Title Available";
  const safeDescription = description || "No Description Available";
  const safeImage = image || "https://via.placeholder.com/400x250?text=No+Image";
  const safeDuration = duration ?? "N/A";
  const safePrice = price ?? "N/A";
  const safeDiscount = discount ?? null;
  const safeDate = startDate ? startDate.split("T")[0] : "N/A";

  return (
    <div className="w-70 md:w-80 lg:w-90 lx:w-100">
      <Link
        to={`/tripdetails/${id || "#"}`}
        className="block rounded-lg p-4 shadow-xs shadow-indigo-100"
      >
        <img
          alt={safeTitle}
          src={safeImage}
          className="h-56 w-full rounded-md object-cover"
        />
        <div className="mt-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {safeTitle.length > 20 ? safeTitle.slice(0, 20) + "..." : safeTitle}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {safeDescription.length > 100
              ? safeDescription.slice(0, 100) + "..."
              : safeDescription}
          </p>

          <p className="text-sm text-gray-500 mt-1">Days: {safeDuration}</p>
          <p className="text-sm text-gray-500 mt-1">Date: {safeDate}</p>

          <div className="mt-2 flex items-center gap-2">
            {safeDiscount ? (
              <span className="text-sm text-gray-400 line-through">
                ${safeDiscount}
              </span>
            ) : null}
            <span className="text-sm text-four font-medium">${safePrice}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
