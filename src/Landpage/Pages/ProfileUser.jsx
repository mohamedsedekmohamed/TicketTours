import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaUser, FaUsers, FaCreditCard, FaCalendarAlt, FaPhone, FaEnvelope, FaDollarSign, FaGift, FaExclamationTriangle, FaFileAlt, FaClock, FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import { MdEmail, MdPhone, MdAttachMoney, MdDateRange, MdWarning, MdNotes } from "react-icons/md";
import { BiIdCard } from "react-icons/bi";
import axios from "axios";
import { MdOutlineNearbyError } from "react-icons/md";
import { MdLocalHospital } from "react-icons/md";
import { MdMonetizationOn } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";
const ProfileUser = () => {
const nav= useNavigate()
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

const [medical, setMedical] = useState({
  accept: [],
  rejected: [],
});

 useEffect(() => {
    const token = localStorage.getItem("tokenuser");
    setLoading(true);

    Promise.all([
      axios.get(
        "https://bcknd.tickethub-tours.com/api/user/landpage/accept-medical-requests",
        { headers: { Authorization: `Bearer ${token}` } }
      ),
      axios.get(
        "https://bcknd.tickethub-tours.com/api/user/landpage/rejected-medical-requests",
        { headers: { Authorization: `Bearer ${token}` } }
      ),
    ])
      .then(([acceptRes, rejectRes]) => {
        setMedical({
          accept: acceptRes.data?.data?.medicalRequests || [],
          rejected: rejectRes.data?.data?.medicalRequests || [],
        });
      })
      .finally(() => setLoading(false));
  }, []);



    useEffect(() => {
    const token = localStorage.getItem("tokenuser");
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

  useEffect(() => {
    const token = localStorage.getItem("tokenuser");
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
const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : { name: "", email: "" };
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("tokenuser");
  nav("/"); 
};

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaClock className="w-4 h-4" />;
      case "confirmed":
        return <FaCheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <FaTimesCircle className="w-4 h-4" />;
      default:
        return <FaClock className="w-4 h-4" />;
    }
  };

  const renderBookingList = (list) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <FaSpinner className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading bookings...</span>
        </div>
      );
    }

    if (!list || list.length === 0) {
      return (
        <div className="text-center py-12">
          <FaUsers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No bookings found</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {list.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <FaUsers className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Booking #{item.bookings?.id}
                    </h3>
                    <p className="text-gray-600 mt-1">{item.bookingDetails?.fullName}</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(item.bookings?.status)}`}>
                  {getStatusIcon(item.bookings?.status)}
                  <span className="font-semibold capitalize">{item.bookings?.status}</span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                    <FaUser className="w-5 h-5 mr-2 text-blue-600" />
                    Contact Information
                  </h4>
                  <div className="space-y-3 pl-7">
                    <div className="flex items-center text-gray-700">
                      <FaEnvelope className="w-4 h-4 mr-3 text-gray-400" />
                      <span>{item.bookingDetails?.email}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FaPhone className="w-4 h-4 mr-3 text-gray-400" />
                      <span>{item.bookingDetails?.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                    <FaDollarSign className="w-5 h-5 mr-2 text-green-600" />
                    Booking Summary
                  </h4>
                  <div className="space-y-3 pl-7">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Adults:</span>
                      <span className="font-semibold">{item.bookingDetails?.adultsCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Children:</span>
                      <span className="font-semibold">{item.bookingDetails?.childrenCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Infants:</span>
                      <span className="font-semibold">{item.bookingDetails?.infantsCount}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex items-center justify-between text-lg font-bold text-green-600">
                      <span>Total Amount:</span>
                      <span>${item.bookingDetails?.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {item.bookingDetails?.notes && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center mb-3">
                    <FaFileAlt className="w-5 h-5 mr-2 text-purple-600" />
                    Notes
                  </h4>
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <p className="text-gray-700">{item.bookingDetails.notes}</p>
                  </div>
                </div>
              )}

              {/* Extras */}
              {item.bookingExtras && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                    <FaGift className="w-5 h-5 mr-2 text-orange-600" />
                    Additional Services
                  </h4>
                  <div className="grid gap-4">
                    {Array.isArray(item.bookingExtras) ? (
                      item.bookingExtras.map((extra, i) => (
                        <div key={i} className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                          <h5 className="font-semibold text-orange-800 mb-2">{extra.extraName}</h5>
                          <div className="flex items-center space-x-6 text-sm text-orange-700">
                            <span>Adults: {extra.adultCount}</span>
                            <span>Children: {extra.childCount}</span>
                            <span>Infants: {extra.infantCount}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                        <h5 className="font-semibold text-orange-800 mb-2">{item.bookingExtras.extraName}</h5>
                        <div className="flex items-center space-x-6 text-sm text-orange-700">
                          <span>Adults: {item.bookingExtras.adultCount}</span>
                          <span>Children: {item.bookingExtras.childCount}</span>
                          <span>Infants: {item.bookingExtras.infantCount}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderPaymentList = (list) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <FaSpinner className="w-8 h-8 animate-spin text-one" />
          <span className="ml-2 text-gray-600">Loading payments...</span>
        </div>
      );
    }

    if (!list || list.length === 0) {
      return (
        <div className="text-center py-12">
          <FaCreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No payments found</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {list.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <FaCreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Payment 
                    </h3>
                    <p className="text-gray-600 mt-1"></p>
                  </div>
                </div>
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(item.payments?.status)}`}>
                  {getStatusIcon(item.payments?.status)}
                  <span className="font-semibold capitalize">{item.payments?.status}</span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Payment Information */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                    <FaCreditCard className="w-5 h-5 mr-2 text-green-600" />
                    Payment Details
                  </h4>
                  <div className="space-y-3 pl-7">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Method:</span>
                      <span className="font-semibold">{item.payments?.method}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-green-600 text-lg">${item.payments?.amount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span className="font-semibold">
                        {new Date(item.payments?.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {item.bookingDetails && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                      <FaUser className="w-5 h-5 mr-2 text-blue-600" />
                      Customer Information
                    </h4>
                    <div className="space-y-3 pl-7">
                      <div className="flex items-center text-gray-700">
                        <span className="text-gray-600 mr-3">Name:</span>
                        <span className="font-semibold">{item.bookingDetails.fullName}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FaEnvelope className="w-4 h-4 mr-3 text-gray-400" />
                        <span>{item.bookingDetails.email}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FaUsers className="w-4 h-4 mr-3 text-gray-400" />
                        <span>{item.bookingDetails.adultsCount} Adults, {item.bookingDetails.childrenCount}, Children{item.bookingDetails.infantsCount} Infants</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

 {item.bookingDetails?.notes && (
                <div className="mb-6">
                  <div className=" border border-red-200 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <FaExclamationTriangle className="w-5 h-5 text-green-700 mr-2" />
                      <span className="font-semibold text-green-500">Note </span>
                    </div>
                    <p className="">{item.bookingDetails.notes}</p>
                  </div>
                </div>
              )}
              {/* Rejection Reason */}
              {item.payments?.rejectionReason && (
                <div className="mb-6">
                  <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <FaExclamationTriangle className="w-5 h-5 text-red-600 mr-2" />
                      <span className="font-semibold text-red-800">Rejection Reason</span>
                    </div>
                    <p className="text-red-700">{item.payments.rejectionReason}</p>
                  </div>
                </div>
              )}

              {/* Manual Payment Proof */}
              {item.manualPayment && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                    <FaFileAlt className="w-5 h-5 mr-2 text-purple-600" />
                    Payment Proof
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <img
                      src={item.manualPayment.proofImage}
                      alt="Payment Proof"
                      className="w-full max-h-96 object-contain rounded-lg shadow-sm"
                    />
                  </div>
                </div>
              )}

              {/* Extras */}
              {item.bookingExtras?.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                    <FaGift className="w-5 h-5 mr-2 text-orange-600" />
                    Additional Services
                  </h4>
                  <div className="grid gap-4">
                    {item.bookingExtras.map((extra, i) => (
                      <div key={i} className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                        <h5 className="font-semibold text-orange-800 mb-2">{extra.extraName}</h5>
                        <div className="flex items-center space-x-6 text-sm text-orange-700">
                          <span>Adults: {extra.adultCount}</span>
                          <span>Children: {extra.childCount}</span>
                          <span>Infants: {extra.infantCount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <button onClick={()=>nav(-1)} className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <FaArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">Profile</h1>
          </div>

        <div className="bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-2xl shadow-sm border border-gray-200 p-6">
  <div className="flex items-center space-x-4">
    <div className="bg-blue-100 p-4 rounded-full flex items-center justify-center">
      <FaUser className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
    </div>
    <div>
      <h2 className="text-lg md:text-2xl font-bold text-gray-800">
        {user.name}
      </h2>
      <p className="text-gray-600 flex items-center mt-1 text-sm md:text-base">
        <FaEnvelope className="w-3 h-3 md:w-4 md:h-4 mr-2" />
        {user.email}
      </p>
    </div>
  </div>

  <button
    onClick={handleLogout}
    className="px-4 py-2 text-sm md:text-base bg-one text-white rounded-lg hover:bg-one/80 transition-colors"
  >
    Logout
  </button>
</div>


        </div>

        {/* Main Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-200 ${
                  mainTab === "booking"
          ? "bg-one text-white border-b-2 border-one"
                    : "text-gray-600 hover:text-one hover:bg-gray-50"
                }`}
                onClick={() => setMainTab("booking")}
              >
                <FaUsers className="w-5 h-5 inline mr-2" />
                Bookings
              </button>
              <button
                className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-200 ${
                  mainTab === "payment"
                    ? "bg-one text-white border-b-2 border-one"
                    : "text-gray-600 hover:text-one hover:bg-gray-50"
                }`}
                onClick={() => setMainTab("payment")}
              >
                <FaCreditCard className="w-5 h-5 inline mr-2" />
                Payments
              </button>
              <button
                className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-200 ${
                  mainTab === "medical"
                    ? "bg-one text-white border-b-2 border-one"
                    : "text-gray-600 hover:text-one hover:bg-gray-50"
                }`}
                onClick={() => setMainTab("medical")}
              >
                <MdLocalHospital className="w-5 h-5 inline mr-2" />
                Medical
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Booking Tab */}
            {mainTab === "booking" && (
              <div>
                <div className="flex justify-around  flex-wrap gap-2 mb-6 border-b border-gray-100 pb-4">
                  {["pending", "confirmed", "cancelled", "history"].map((tab) => (
                    <button
                      key={tab}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-200 capitalize ${
                        bookingSubTab === tab
                          ? "bg-one text-white shadow-md"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
              <div>
                <div className="flex justify-around flex-wrap gap-2 mb-6 border-b border-gray-100 pb-4">
                  {["pending", "confirmed", "cancelled"].map((tab) => (
                    <button
                      key={tab}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-200 capitalize ${
                        paymentSubTab === tab
                          ? "bg-one text-white shadow-md"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
{mainTab === "medical" && (
  <div className="p-4 md:p-6 space-y-12">
    {/* ✅ Accepted Requests */}
    <section>
      <h2 className="text-xl md:text-2xl font-bold  mb-6 lg:mb-10 text-green-700 text-center gap-2">
        ✅ Accepted Requests
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {medical.accept.length > 0 ? (
          medical.accept.map((item) => {
            const isImage =
              item.documentUrl &&
              /\.(jpg|jpeg|png|gif|webp)$/i.test(item.documentUrl);

            return (
              <div
                key={item.id + item.title}
                className="p-5  rounded-2xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="font-semibold text-lg md:text-xl text-one flex items-center gap-2">
                  <FaFileAlt className="text-one" />
   {item.titles?.map((it, index) => (
  <span key={index}>
    {it}{index !== item.titles.length - 1 && " - "}
  </span>
))}

                </h3>

                <p className="text-gray-600 mt-2 text-sm md:text-base">
                  {item.describtion}
                </p>

                <div className="mt-4 space-y-2 text-sm md:text-base">
                  <p className="flex items-center gap-2 text-gray-700">
                    <FaUser className="text-one" />
                    <span className="font-medium">{item.fullName}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <FaPhone className="text-blue-500" />
                    {item.phoneNumber}
                  </p>
                </div>

                {item.documentUrl && (
                  <div className="mt-4">
                    {/* {isImage && (
                      <img
                        src={item.documentUrl}
                        alt={item.title}
                        className="w-full h-40 object-cover rounded-lg border"
                      />
                    )} */}
                    <a
                      href={item.documentUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block px-4 py-2 text-sm md:text-base bg-one text-white rounded-lg hover:bg-one/80 transition-colors"
                    >
                      📥 Download {isImage?"Image":"File"} 
                    </a>
                  </div>
                )}

                <span className="mt-4 flex gap-1 items-center text-green-700 font-bold ">
             <MdMonetizationOn className="text-[20px]" /> <span>     Price: {item.price || "Not specified"}</span>
                </span>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 italic">No accepted requests</p>
        )}
      </div>
    </section>

    {/* ❌ Rejected Requests */}
    <section>
      <h2 className="text-xl md:text-2xl font-bold mb-b lg:mb-10 text-red-700 text-center gap-2">
         Rejected Requests
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {medical.rejected.length > 0 ? (
          medical.rejected.map((item) => {
            const isImage =
              item.documentUrl &&
              /\.(jpg|jpeg|png|gif|webp)$/i.test(item.documentUrl);

            return (
              <div
                key={item.id + item.title}
                className="p-5  rounded-2xl shadow-xl bg-white hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="font-semibold text-lg md:text-xl text-one flex items-center gap-2">
                  <FaFileAlt className="text-one" />
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-2 text-sm md:text-base">
                  {item.describtion}
                </p>

                <div className="mt-4 space-y-2 text-sm md:text-base">
                  <p className="flex items-center gap-2 text-gray-700">
                    <FaUser className="text-one" />
                    <span className="font-medium">{item.fullName}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <FaPhone className="text-blue-500" />
                    {item.phoneNumber}
                  </p>
                </div>

                {item.documentUrl && (
                  <div className="mt-4">
                    {isImage && (
                      <img
                        src={item.documentUrl}
                        alt={item.title}
                        className="w-full h-40 object-cover rounded-lg border"
                      />
                    )}
                    <a
                      href={item.documentUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 px-4 py-2 text-sm md:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      📥 Download File
                    </a>
                  </div>
                )}

                <p className="mt-2 flex items-center gap-1 text-red-700 font-bold ">
                <FaCircleInfo className=""/>  <span className="">{item.reason}</span>
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 italic">No rejected requests</p>
        )}
      </div>
    </section>
  </div>
)}



          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;