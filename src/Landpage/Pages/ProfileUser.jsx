import React, { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const ProfileUser = () => {
  const [activeTab, setActiveTab] = useState("payment");
const nav =useNavigate()
  // بيانات تجريبية من localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://via.placeholder.com/100",
  };

  return (
    <div className=" w-full mx-auto p-4">
        <FaArrowCircleLeft className="text-one text-4xl" onClick={()=>nav(-1)}/>
        <h4 className="text-center w-full text-2xl lg:text-5xl">Profile</h4>
      <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row items-center gap-4">
       
        <div>
          <h2 className="text-xl font-bold">User: {user.name}</h2>
          <p className="text-gray-600">Email:{user.email}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex border-b justify-around">
          <button
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === "payment"
              ? "border-b-2 border-one text-one"
                : "text-gray-500 hover:text-one"
            }`}
            onClick={() => setActiveTab("payment")}
          >
            Payment
          </button>
          <button
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === "booking"
                ? "border-b-2 border-one text-one"
                : "text-gray-500 hover:text-one"
            }`}
            onClick={() => setActiveTab("booking")}
          >
            Booking
          </button>
        </div>

        {/* محتوى التبويب */}
        <div className="bg-white shadow rounded-xl p-6 mt-4">
          {activeTab === "payment" && (
            <div>
              <h3 className="text-lg font-bold mb-2">Payment Info</h3>
              <p>Here you can view your payment details.</p>
            </div>
          )}

          {activeTab === "booking" && (
            <div>
              <h3 className="text-lg font-bold mb-2">My Bookings</h3>
              <p>Here you can view your bookings.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
