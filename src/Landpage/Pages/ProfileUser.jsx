import React, { useState, useEffect } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCreditCard, FaUser, FaUsers, FaGift } from "react-icons/fa";
import { MdAttachMoney, MdEmail, MdDateRange, MdWarning } from "react-icons/md";
import { BiIdCard } from "react-icons/bi";
import { MdPhone,  MdNotes } from "react-icons/md";

const ProfileUser = () => {
  const [mainTab, setMainTab] = useState("booking");

  const [bookingSubTab, setBookingSubTab] = useState("pending");
  const [history, setHistory] = useState([]);
  const [bookings, setBookings] = useState({
    pending: [],
    confirmed: [],
    cancelled: [],
  });

  const [paymentSubTab, setPaymentSubTab] = useState("pending");
  const [payments, setPayments] = useState({
    pending: [],
    confirmed: [],
    cancelled: [],
  });

  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : { name: "", email: "" };
  // Fetch bookings
  useEffect(() => {
    console.log(storedUser  )
    const token = localStorage.getItem("token");
    setLoading(true);
    axios
      .get("https://bcknd.tickethub-tours.com/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const current = res.data?.data?.current || {};
        const historyData = res.data?.data?.history || [];

        setHistory(historyData);
        setBookings({
          pending: current.pending || [],
          confirmed: current.confirmed || [],
          cancelled: current.cancelled || [],
        });
      })
      .catch((err) => console.error("Error fetching bookings:", err))
      .finally(() => setLoading(false));
  }, []);

  // Fetch payments
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);
    axios
      .get("https://bcknd.tickethub-tours.com/api/payments", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data?.data || {};
        setPayments({
          pending: data.pending || [],
          confirmed: data.confirmed || [],
          cancelled: data.cancelled || [],
        });
      })
      .catch((err) => console.error("Error fetching payments:", err))
      .finally(() => setLoading(false));
  }, []);

const renderBookingList = (list) => {
  if (loading) return <p>Loading bookings...</p>;
  if (!list || list.length === 0)
    return <p className="text-gray-500">No bookings found.</p>;

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-4">
      {list.map((item, idx) => (
        <details
          key={idx}
          className="group [&_summary::-webkit-details-marker]:hidden rounded-xl bg-white shadow-md border border-gray-200 overflow-hidden"
        >
          {/* Header */}
          <summary className="flex items-center justify-between p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FaUsers className="text-gray-500" />
                Booking #{item.bookings?.id}
              </h2>
              <span
                className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${
                  statusColors[item.bookings?.status] || "bg-gray-100 text-gray-700"
                }`}
              >
                {item.bookings?.status}
              </span>
            </div>
            <svg
              className="w-5 h-5 text-gray-500 transition-transform duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>

          {/* Body */}
          <div className="p-5 text-gray-700 space-y-6 border-t border-gray-100">
            {/* Booking Info */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaUsers className="text-gray-500" /> Booking Info
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <p className="flex items-center gap-2">
                  <FaUser className="text-gray-400" /> <strong>Name:</strong> {item.bookingDetails?.fullName}
                </p>
                <p className="flex items-center gap-2">
                  <MdEmail className="text-gray-400" /> <strong>Email:</strong> {item.bookingDetails?.email}
                </p>
                <p className="flex items-center gap-2">
                  <MdPhone className="text-gray-400" /> <strong>Phone:</strong> {item.bookingDetails?.phone}
                </p>
                <p className="flex items-center gap-2">
                  <FaUsers className="text-gray-400" /> <strong>Travelers:</strong>{" "}
                  {item.bookingDetails?.adultsCount} Adults, {item.bookingDetails?.childrenCount} Children,{" "}
                  {item.bookingDetails?.infantsCount} Infants
                </p>
                <p className="flex items-center gap-2">
                  <MdAttachMoney className="text-gray-400" /> <strong>Total:</strong> ${item.bookingDetails?.totalAmount}
                </p>
                <p className="flex items-center gap-2 col-span-2">
                  <MdNotes className="text-gray-400" /> <strong>Notes:</strong> {item.bookingDetails?.notes || "—"}
                </p>
              </div>
            </div>

            {/* Extras */}
            {item.bookingExtras && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <FaGift className="text-gray-500" /> Extras
                </h4>
                <div className="space-y-2">
                  {Array.isArray(item.bookingExtras) ? (
                    item.bookingExtras.map((extra, i) => (
                      <div
                        key={i}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <p className="font-medium">{extra.extraName}</p>
                        <p className="text-sm text-gray-600">
                          Adults: {extra.adultCount}, Children: {extra.childCount}, Infants: {extra.infantCount}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="font-medium">{item.bookingExtras.extraName}</p>
                      <p className="text-sm text-gray-600">
                        Adults: {item.bookingExtras.adultCount}, Children: {item.bookingExtras.childCount}, Infants: {item.bookingExtras.infantCount}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </details>
      ))}
    </div>
  );
};

  // Render payments
  const renderPaymentList = (list) => {
    if (loading) return <p>Loading payments...</p>;
    if (!list || list.length === 0)
      return <p className="text-gray-500">No payments found.</p>;

    return (
   <div className="space-y-4">
  {list.map((item, idx) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-700",
      confirmed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };

    return (
   <div className="space-y-4">
  {list.map((item, idx) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-700",
      confirmed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };

    return (
      <details
        key={idx}
        className="group [&_summary::-webkit-details-marker]:hidden rounded-xl bg-white shadow-md border border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <summary className="flex items-center justify-between p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaCreditCard className="text-gray-500" />
              Payment #{item.payments?.id}
            </h2>
            <span
              className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${
                statusColors[item.payments?.status] || "bg-gray-100 text-gray-700"
              }`}
            >
              {item.payments?.status}
            </span>
          </div>
          <svg
            className="w-5 h-5 text-gray-500 transition-transform duration-300 group-open:-rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>

        {/* Body */}
        <div className="p-5 text-gray-700 space-y-6 border-t border-gray-100">
          {/* Payment Info */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <FaCreditCard className="text-gray-500" /> Payment Info
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <p className="flex items-center gap-2"><FaCreditCard className="text-gray-400" /> <strong>Method:</strong> {item.payments?.method}</p>
              <p className="flex items-center gap-2"><MdAttachMoney className="text-gray-400" /> <strong>Amount:</strong> ${item.payments?.amount}</p>
              <p className="flex items-center gap-2"><BiIdCard className="text-gray-400" /> <strong>Booking ID:</strong> {item.payments?.bookingId}</p>
              <p className="flex items-center gap-2"><MdDateRange className="text-gray-400" /> <strong>Created:</strong> {new Date(item.payments?.createdAt).toLocaleString()}</p>
              {item.payments?.rejectionReason && (
                <p className="col-span-2 flex items-center gap-2 text-red-600">
                  <MdWarning /> <strong>Rejection Reason:</strong> {item.payments.rejectionReason}
                </p>
              )}
            </div>
          </div>

          {/* Booking Details */}
          {item.bookingDetails && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaUsers className="text-gray-500" /> Booking Details
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <p className="flex items-center gap-2"><FaUser className="text-gray-400" /> <strong>Name:</strong> {item.bookingDetails.fullName}</p>
                <p className="flex items-center gap-2"><MdEmail className="text-gray-400" /> <strong>Email:</strong> {item.bookingDetails.email}</p>
                <p className="flex items-center gap-2"><FaUsers className="text-gray-400" /> <strong>Travelers:</strong> {item.bookingDetails.adultsCount} Adults</p>
                <p><strong>Children:</strong> {item.bookingDetails.childrenCount}</p>
              </div>
            </div>
          )}

          {/* Extras */}
          {item.bookingExtras?.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaGift className="text-gray-500" /> Extras
              </h4>
              <div className="space-y-2">
                {item.bookingExtras.map((extra, i) => (
                  <div
                    key={i}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <p className="font-medium">{extra.extraName}</p>
                    <p className="text-sm text-gray-600">
                      Adults: {extra.adultCount}, Children: {extra.childCount}, Infants: {extra.infantCount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </details>
    );
  })}
</div>
    );
  })}
</div>

    );
  };

  return (
    <div className="w-full mx-auto p-4">
      <div  className="flex p-2 ">

      <FaArrowCircleLeft
        className="text-one text-4xl cursor-pointer"
        onClick={() => nav(-1)}
      />
      <h4 className="text-center w-full text-2xl lg:text-5xl">Profile</h4>
   <div className="flex border-b justify-around">
        <button
  className={`px-4 py-2 font-semibold rounded-2xl transition-all duration-200 border-b-2 ${
    mainTab === "booking"
      ? "border-one text-white bg-one"
      : "border-transparent text-one hover:text-one hover:border-white"
  }`}
  onClick={() => setMainTab("booking")}
>
  Booking
</button>

<button
  className={`px-4 py-2 font-semibold transition-all  rounded-2xl duration-200 border-b-2 ${
    mainTab === "payment"
  ? "border-one text-white bg-one"
      : "border-transparent text-one hover:text-one hover:border-white"
  }`}
  onClick={() => setMainTab("payment")}
>
  Payment
</button>

        </div>
      </div>



      {/* بيانات المستخدم */}
      <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">User: {user.name}</h2>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>
        
      </div>

      {/* Tabs الرئيسية */}
      <div className="mt-6">
     
        {/* Booking Tab */}
       {mainTab === "booking" && (
  <div className="bg-white shadow rounded-xl p-6 mt-4">
    <div className="flex w-full justify-around border-b gap-2 mb-4">
      {["pending", "confirmed", "cancelled", "history"].map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 font-semibold transition-all   w-full rounded-2xl duration-200 border-b-2 capitalize ${
            bookingSubTab === tab
              ? "border-one text-white bg-one"
              : "border-transparent text-one hover:text-one hover:border-one"
          }`}
          onClick={() => setBookingSubTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
    {bookingSubTab === "history"
      ? renderBookingList(history)
      : renderBookingList(bookings[bookingSubTab])}
  </div>
)}

        {/* Payment Tab */}
        {mainTab === "payment" && (
          <div className="bg-white shadow rounded-xl p-6 mt-4">
            <div className="flex w-full justify-around gap-2 border-b mb-4">
              {["pending", "confirmed", "cancelled"].map((tab) => (
                <button
                  key={tab}
          className={`px-4 py-2 font-semibold transition-all   w-full rounded-2xl duration-200 border-b-2 capitalize ${
            paymentSubTab === tab
              ? "border-one text-white bg-one"
              : "border-transparent text-one hover:text-one hover:border-one"
          }`}
                  onClick={() => setPaymentSubTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            {renderPaymentList(payments[paymentSubTab])}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileUser;
