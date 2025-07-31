import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaMapMarkerAlt,
  FaHourglassHalf,
} from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaEarthAsia } from "react-icons/fa6";
import { BsShieldLockFill } from "react-icons/bs";
import axios from "axios";

const Home = () => {
   const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get("https://bcknd.tickethub-tours.com/api/admin/home/header").then((res) => {
      const data = res.data.data;
      const updatedStats = [
        {
          title: "Number of Users",
          icon: <FaUsers />,
          value: data.userCount,
        },
        {
          title: "Number of Added Tours",
          icon: <MdOutlineAccessTimeFilled />,
          value: data.tourCount,
        },
        {
          title: "Current Bookings",
          icon: <FaEarthAsia />,
          value: data.bookingCount,
        },
        {
          title: "Pending Payments",
          icon: <FaHourglassHalf />,
          value: data.paymnetCount,
        },
        {
          title: "Promo Codes",
          icon: <FaMapMarkerAlt />,
          value: data.promocodeCount,
        },
      ];
      setStats(updatedStats);
    });
  }, []);


  const activities = [
    {
      text: "Successful Admin Login: admin@domain.com",
      time: "July 16, 2025 – 11:30 AM",
      type: "success",
    },
    {
      text: "Failed Login Attempt — user_try_2025",
      time: "July 16, 2025 – 10:58 AM",
      type: "error",
    },
    {
      text: "User Permissions Updated — Ali_Secure",
      time: "July 15, 2025 – 8:44 PM",
      type: "update",
    },
  ];

  const links = [
    { label: "Bookings Management", href: "/admin/bookingsmanagement", icon: "" },
    { label: "Financial Section", href: "/admin/financialsection", icon: "" },
    { label: "Tours Management", href: "/admin/toursmanagement", icon: "" },
    { label: "Users Management", href: "/admin/usersmanagement", icon: "" },
  ];

  return (
    <div className="w-full p-6 space-y-8 bg-white">
      <div>
<div className="flex gap-3">       
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6973 20.8376C27.0401 23.2786 14.9268 1.35936 1.08264 1.2034C20.9798 -0.35219 32.6655 30.0346 12.6974 20.8375L12.6973 20.8376Z" fill="#091A2E"/>
</svg>

   <h2 className="text-xl font-bold text-one mb-4">Quick System Overview</h2>

  </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl p-4 flex flex-col  shadow-sm"
            >
             <div className="flex gap-3"> <div className="text-2xl text-one mb-2">{stat.icon}</div>
              <p className="text-xl font-semibold text-one">{stat.value}</p></div>
              <p className="text-sm text-gray-600 ">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Security Activities & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security */}
        <div>
          <h2 className="text-lg font-bold text-one mb-4 flex items-center gap-2">
            <BsShieldLockFill/> Latest Security Activities:
          </h2>
          <div className="space-y-3">
            {activities.map((act, i) => (
              <div
                key={i}
                className={`rounded-lg px-4 py-3 `}
              >
                <p className="text-sm font-medium">{act.text}</p>
                <p className="text-xs opacity-70">{act.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold text-one mb-4 flex items-center gap-2">
            <FiLink /> Quick Links:
          </h2>
          <div className="flex flex-col  gap-4">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="bg-one text-white px-4 py-3 rounded-lg flex items-center justify-center text-center font-medium hover:bg-one/90"
              >
                {link.icon} {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
