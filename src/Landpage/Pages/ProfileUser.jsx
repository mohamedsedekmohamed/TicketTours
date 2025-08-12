import React, { useState, useEffect } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://via.placeholder.com/100",
  };

  // Fetch bookings
  useEffect(() => {
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

  // Render bookings
  const renderBookingList = (list) => {
    if (loading) return <p>Loading bookings...</p>;
    if (!list || list.length === 0)
      return <p className="text-gray-500">No bookings found.</p>;

    return (
      <div className="space-y-4">
        {list.map((item, idx) => (
          <details
            key={idx}
            className="group [&_summary::-webkit-details-marker]:hidden border rounded-lg bg-gray-50 shadow-sm"
          >
            <summary className="flex items-center justify-between gap-1.5 p-4 cursor-pointer text-gray-900">
              <h2 className="text-lg font-medium">
                Booking #{item.bookings?.id} —{" "}
                <span className="capitalize">{item.bookings?.status}</span>
              </h2>
              <svg
                className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>

            <div className="px-4 pb-4 text-gray-900 space-y-1">
              <p><strong>Name:</strong> {item.bookingDetails?.fullName}</p>
              <p><strong>Email:</strong> {item.bookingDetails?.email}</p>
              <p><strong>Phone:</strong> {item.bookingDetails?.phone}</p>
              <p>
                <strong>Travelers:</strong> {item.bookingDetails?.adultsCount} Adults,{" "}
                {item.bookingDetails?.childrenCount} Children,{" "}
                {item.bookingDetails?.infantsCount} Infants
              </p>
              <p><strong>Total:</strong> ${item.bookingDetails?.totalAmount}</p>
              <p><strong>Notes:</strong> {item.bookingDetails?.notes}</p>

              {item.bookingExtras && (
                <div className="mt-2">
                  <h4 className="font-semibold">Extras:</h4>
                  <p>
                    {item.bookingExtras.extraName} — Adults:{" "}
                    {item.bookingExtras.adultCount}, Children:{" "}
                    {item.bookingExtras.childCount}, Infants:{" "}
                    {item.bookingExtras.infantCount}
                  </p>
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
        {list.map((item, idx) => (
          <details
            key={idx}
            className="group [&_summary::-webkit-details-marker]:hidden border rounded-lg bg-gray-50 shadow-sm"
          >
            <summary className="flex items-center justify-between gap-1.5 p-4 cursor-pointer text-gray-900">
              <h2 className="text-lg font-medium">
                Payment #{item.payments?.id} —{" "}
                <span className="capitalize">{item.payments?.status}</span>
              </h2>
              <svg
                className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>

            <div className="px-4 pb-4 text-gray-900 space-y-1">
              <p><strong>Method:</strong> {item.payments?.method}</p>
              <p><strong>Amount:</strong> ${item.payments?.amount}</p>
              <p><strong>Booking ID:</strong> {item.payments?.bookingId}</p>
              <p><strong>Created:</strong> {new Date(item.payments?.createdAt).toLocaleString()}</p>
              {item.payments?.rejectionReason && (
                <p><strong>Rejection Reason:</strong> {item.payments.rejectionReason}</p>
              )}

              {/* ربط الدفع بالحجز */}
              {item.bookingDetails && (
                <>
                  <h4 className="mt-2 font-semibold">Booking Details:</h4>
                  <p>{item.bookingDetails.fullName} — {item.bookingDetails.email}</p>
                  <p>Travelers: {item.bookingDetails.adultsCount} Adults, {item.bookingDetails.childrenCount} Children</p>
                </>
              )}

              {item.bookingExtras && (
                <div className="mt-2">
                  <h4 className="font-semibold">Extras:</h4>
                  <p>
                    {item.bookingExtras.extraName} — Adults:{" "}
                    {item.bookingExtras.adultCount}, Children:{" "}
                    {item.bookingExtras.childCount}, Infants:{" "}
                    {item.bookingExtras.infantCount}
                  </p>
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full mx-auto p-4">
      <FaArrowCircleLeft
        className="text-one text-4xl cursor-pointer"
        onClick={() => nav(-1)}
      />
      <h4 className="text-center w-full text-2xl lg:text-5xl">Profile</h4>

      {/* بيانات المستخدم */}
      <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">User: {user.name}</h2>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>
      </div>

      {/* Tabs الرئيسية */}
      <div className="mt-6">
        <div className="flex border-b justify-around">
          <button
            className={`px-4 py-2 font-semibold transition-colors ${
              mainTab === "booking"
                ? "border-b-2 border-one text-one"
                : "text-gray-500 hover:text-one"
            }`}
            onClick={() => setMainTab("booking")}
          >
            Booking
          </button>
          <button
            className={`px-4 py-2 font-semibold transition-colors ${
              mainTab === "payment"
                ? "border-b-2 border-one text-one"
                : "text-gray-500 hover:text-one"
            }`}
            onClick={() => setMainTab("payment")}
          >
            Payment
          </button>
        </div>

        {/* Booking Tab */}
        {mainTab === "booking" && (
          <div className="bg-white shadow rounded-xl p-6 mt-4">
            <div className="flex w-full justify-around border-b mb-4">
              {["pending", "confirmed", "cancelled", "history"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 font-semibold transition-colors capitalize ${
                    bookingSubTab === tab
                      ? "border-b-2 border-one text-one"
                      : "text-gray-500 hover:text-one"
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
            <div className="flex w-full justify-around border-b mb-4">
              {["pending", "confirmed", "cancelled"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 font-semibold transition-colors capitalize ${
                    paymentSubTab === tab
                      ? "border-b-2 border-one text-one"
                      : "text-gray-500 hover:text-one"
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
