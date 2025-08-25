import React, { useEffect, useState } from "react";
import DynamicTable from "../../component/DynamicTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loading from "../../../ui/Loading";
import NavAndSearch from "../../component/NavAndSearch";
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaDollarSign, FaListUl, FaInfoCircle, FaImages } from "react-icons/fa";
import { MdOutlineAccessTime, MdHighlight, MdQuestionAnswer } from "react-icons/md";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"
import { 
} from "react-icons/fa";
import { 
     FaUtensils, FaRegListAlt
} from "react-icons/fa";
import {  MdDiscount } from "react-icons/md";

import {
  FaUser,
  FaPhone,
  FaMoneyBill,
  FaCheckCircle,
  FaEnvelope,
  FaChild,
  FaBaby,
  
} from "react-icons/fa";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaHouseChimneyWindow } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";

const Payment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [update, setUpdate] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedRow, setSelectedRow] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [viewRow, setViewRow] = useState(null);
  const [activeTabcard, setActiveTabcard] = useState("booking");
  const [tourData, setTourData] = useState(null);
  const [loadingTour, setLoadingTour] = useState(false);
          const token = localStorage.getItem("token");

  // جلب البيانات
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://bcknd.tickethub-tours.com/api/admin/payments/allPayment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const payments = response.data.data.payments.map((item) => ({
          method: item.payment?.method || "N/A",
          amount: item.payment?.amount || 0,
          status: item.payment?.status || "pending",
          rejectionReason: item.payment?.rejectionReason || "",
          email: item.bookingDetails?.email || "N/A",
          adultsCount: item.bookingDetails?.adultsCount || 0,
          childrenCount: item.bookingDetails?.childrenCount || 0,
          infantsCount: item.bookingDetails?.infantsCount || 0,
          totalAmount: item.bookingDetails?.totalAmount || 0,
          fullName: item.bookingDetails?.fullName || "Unknown",
          phone: item.bookingDetails?.phone || "N/A",
          ids: item.payment?.id,
          bookingExtras: item.bookingExtras || [],
          proofImage: item.manualPayment?.proofImage || null,
          notes: item.bookingDetails?.notes || "",
          discountNumber: item.bookings?.discountNumber || null,
          location: item.bookings?.location || "",
          address: item.bookings?.address || "",
          tourId: item.bookings?.tourId || null
        }));

        setData(payments);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [update]);

  // أعمدة الجدول
  const columns = [
    { key: "method", label: "Method" },
    { key: "amount", label: "Amount" },
    { key: "fullName", label: "Name" },
    { key: "phone", label: "Phone" },
  ];

  const filteredData = data
    .filter((item) => item.status === activeTab)
    .filter((item) =>
      Object.values(item || {}).some((value) =>
        value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  const handleStatusChange = async (row, newStatus) => {
    if (newStatus === "cancelled") {
      setSelectedRow(row);
      setRejectionReason("");
      return;
    }

    try {
      const res = await fetch(
        `https://bcknd.tickethub-tours.com/api/admin/payments/pending-payments/${row.ids}`,
        {
          method: "PATCH",
   headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ هنا مكانه الصح
      },          body: JSON.stringify({ status: newStatus }),
        }
      );  

      if (res.ok) {
        toast.success("Status updated successfully.");
        setTimeout(() => {
          setUpdate((p) => !p);
        }, 1000);
      } else {
        throw new Error("Status update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  const submitRejection = async () => {
    if (!rejectionReason.trim()) {
      toast.warn("Please provide a reason for rejection.");
      return;
    }

    try {
      const res = await fetch(
        `https://bcknd.tickethub-tours.com/api/admin/payments/pending-payments/${selectedRow.ids}`,
        {
          method: "PATCH",
   headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ هنا مكانه الصح
      },          body: JSON.stringify({
            status: "cancelled",
            rejectionReason,
          }),
        }
      );

      if (res.ok) {
        toast.success("Rejection sent successfully.");
        setSelectedRow(null);
        setRejectionReason("");
        setTimeout(() => {
          setUpdate((p) => !p);
        }, 1000);
      } else {
        throw new Error("Rejection failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit rejection");
    }
  };

  // Fixed handleOpenTourTab function
  const handleOpenTourTab = async (tourId) => {
    setActiveTabcard("tour");
    
    if (!tourId) {
      toast.warn("No tour ID available");
      return;
    }

    // Reset tour data when switching to tour tab
    setTourData(null);
    
    try {
      setLoadingTour(true);
      const response = await axios.get(
        `https://bcknd.tickethub-tours.com/api/admin/tours/${tourId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      setTourData(response.data.data || response.data);
      console.log("Tour data:", response.data);
    } catch (err) {
      console.error("Error fetching tour:", err);
      toast.error("Failed to load tour details");
    } finally {
      setLoadingTour(false);
    }
  };

  const handleViewRow = (row) => {
    setViewRow(row);
    setActiveTabcard("booking"); 
    setTourData(null); 
  };

  const handleCloseModal = () => {
    setViewRow(null);
    setActiveTabcard("booking");
    setTourData(null);
  };

  if (loading) return <Loading />;

  return (
    <div className="w-full">
      <ToastContainer />

      {/* Tabs */}
      <div className="flex gap-4 justify-around mb-4 border-b">
        {["pending", "confirmed", "cancelled"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 border-b-2 ${
              activeTab === status
                ? "border-one text-one font-bold"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <NavAndSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        like
      />

      {/* إدخال سبب الرفض */}
      {selectedRow && (
        <div className="bg-gray-100 border p-4 mb-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">
            Reason for rejecting payment #{selectedRow.ids}
          </h2>
          <textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Write the rejection reason here..."
            className="w-full border rounded p-2 mb-3"
            rows="3"
          />
          <div className="flex gap-2">
            <button
              onClick={submitRejection}
              className="bg-one text-white px-4 py-1 rounded"
            >
              Send Rejection
            </button>
            <button
              onClick={() => setSelectedRow(null)}
              className="bg-gray-300 px-4 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* الجدول */}
      <DynamicTable
        data={data}
        columns={columns}
        filteredData={filteredData}
        Seen={
          activeTab === "cancelled"
            ? (row) =>
                row.status === "cancelled" && (
                  <span className="text-one font-semibold">
                    {row.rejectionReason
                      ? row.rejectionReason.length > 20
                        ? row.rejectionReason.slice(0, 20) + ".."
                        : row.rejectionReason
                      : "No reason provided"}
                  </span>
                )
            : undefined
        }
        view={(row) => (
          <button
            onClick={() => handleViewRow(row)}
            className="bg-one rounded-[6px] text-white px-3 py-1"
          >
            View
          </button>
        )}
        buttonstatus={
          activeTab === "pending"
            ? (row) =>
                row.status === "pending" && (
                  <td>
                    <select
                      defaultValue=""
                      onChange={(e) => handleStatusChange(row, e.target.value)}
                      className="border border-gray-400 bg-one text-white rounded-3xl px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-one"
                    >
                      <option disabled value="">
                        Select
                      </option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Rejected</option>
                    </select>
                  </td>
                )
            : undefined
        }
      />

      {/* Modal for viewing details */}
      {viewRow && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
          <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded shadow-lg max-h-[80vh] overflow-y-auto text-one">
            <h2 className="text-xl font-bold mb-4">
              Payment Details #{viewRow.ids}
            </h2>

            {/* Tabs Header */}
            <div className="flex border-b mb-4">
              <button
                onClick={() => setActiveTabcard("booking")}
                className={`px-4 py-2 ${
                  activeTabcard === "booking" ? "border-b-2 border-one font-semibold" : "text-gray-500"
                }`}
              >
                Booking Info
              </button>
              <button
                onClick={() => setActiveTabcard("payment")}
                className={`px-4 py-2 ${
                  activeTabcard === "payment" ? "border-b-2 border-one font-semibold" : "text-gray-500"
                }`}
              >
                Extra Info
              </button>
              <button
                onClick={() => handleOpenTourTab(viewRow.tourId)}
                className={`px-4 py-2 ${
                  activeTabcard === "tour"
                    ? "border-b-2 border-one font-semibold"
                    : "text-gray-500"
                }`}
              >
                Tour Info
              </button>
            </div>

            {/* Booking Info */}
            {activeTabcard === "booking" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="flex items-center gap-2">
                    <FaUser className="text-blue-500" />
                    <strong>Name:</strong> {viewRow.fullName}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaPhone className="text-green-500" />
                    <strong>Phone:</strong> {viewRow.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-pink-500" />
                    <strong>Email:</strong> {viewRow.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaUsers className="text-blue-400" />
                    <strong>Adults:</strong> {viewRow.adultsCount}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaChild className="text-orange-400" />
                    <strong>Children:</strong> {viewRow.childrenCount}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaBaby className="text-purple-400" />
                    <strong>Infants:</strong> {viewRow.infantsCount}
                  </p>
                  <p className="flex items-center gap-2">
                    <RiDiscountPercentFill className="text-green-600" />
                    <strong>Discount:</strong> {viewRow.discountNumber || "No discount"}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaHouseChimneyWindow className="text-one" />
                    <strong>Address:</strong> {viewRow.address || "No address"}
                  </p>
                </div>

               <p className="flex items-start gap-2 w-[90%]">
                                <MdOutlineSpeakerNotes className="text-gray-400 mt-1 shrink-0" />
                                <span className="min-w-0 w-full">
                                  <strong>Notes:</strong>
                                  <div className="mt-1 max-h-48 overflow-auto whitespace-pre-line break-words [overflow-wrap:anywhere]">
                                    {viewRow.notes || "No notes"}
                                  </div>
                                </span>
                              </p>

                <p className="flex items-start gap-2 w-[90%]">
                               <FaMapLocationDot className="text-amber-300 shrink-0 mt-1" />
                               <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                                 <strong>Location :</strong>{" "}
                                 <a
                                   href={viewRow.location}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="text-blue-600 underline break-words [overflow-wrap:anywhere]"
                                 >
                                   {viewRow.location || "No location"}
                                 </a>
                               </span>
                             </p>
                {viewRow.proofImage && (
                  <div>
                    <strong>Proof Image:</strong>
                    <img
                src={viewRow.proofImage}
                alt="Proof"
                className="w-full max-h-[400px] object-contain rounded"
              />
                  </div>
                )}
              </div>
            )}

            {/* Extra Info */}
            {activeTabcard === "payment" && (
              <div>
                <strong className="text-lg">Extras:</strong>
                {viewRow.bookingExtras && viewRow.bookingExtras.length > 0 ? (
                  <table className="w-full mt-2 border border-gray-300 text-sm rounded overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-2 py-1 text-left">Extra Name</th>
                        <th className="border px-2 py-1">Adults</th>
                        <th className="border px-2 py-1">Children</th>
                        <th className="border px-2 py-1">Infants</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewRow.bookingExtras.map((extra, index) => (
                        <tr key={extra.id || index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border px-2 py-1">{extra.extraName || "N/A"}</td>
                          <td className="border px-2 py-1 text-center">{extra.adultCount || 0}</td>
                          <td className="border px-2 py-1 text-center">{extra.childCount || 0}</td>
                          <td className="border px-2 py-1 text-center">{extra.infantCount || 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="mt-2 text-gray-500">No extras available.</p>
                )}
              </div>
            )}

            {/* Tour Info */}
            {activeTabcard === "tour" && (
          <div className="space-y-4">
  {loadingTour ? (
    <div className="flex justify-center items-center py-8 text-gray-500">
      Loading tour details...
    </div>
  ) : tourData ? (
    <div className="space-y-3">
      {/* Title */}
      <p className="flex items-center gap-2 text-lg font-semibold text-blue-700">
        <FaInfoCircle className="text-blue-500" /> {tourData.title || "N/A"}
      </p>

      {/* Dates */}
      <p className="flex items-center gap-2 text-gray-700">
        <FaCalendarAlt className="text-orange-500" /> 
        {tourData.startDate} → {tourData.endDate}
      </p>

      {/* Duration */}
      <p className="flex items-center gap-2 text-gray-700">
        <MdOutlineAccessTime className="text-purple-500" />
        {tourData.durationDays} days / {tourData.durationHours} hours
      </p>

      {/* Users */}
      <p className="flex items-center gap-2 text-gray-700">
        <FaUsers className="text-green-600" /> Max Users: {tourData.maxUsers}
      </p>

      {/* Meeting Point */}
      <p className="flex items-center gap-2 text-gray-700">
        <FaMapMarkerAlt className="text-red-500" /> 
        {tourData.meetingPointAddress}{" "}
        {tourData.meetingPointLocation && (
          <a
            href={tourData.meetingPointLocation}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline ml-2"
          >
            View Map
          </a>
        )}
      </p>

      {/* Pricing */}
      {tourData.price && (
        <div className="bg-blue-50 p-3 rounded">
          <p className="font-semibold flex items-center gap-2 text-blue-600">
            <FaDollarSign /> Pricing
          </p>
          <ul className="ml-6 mt-1 list-disc text-gray-700">
            <li>Adult: {tourData.price.adult}</li>
            <li>Child: {tourData.price.child}</li>
            <li>Infant: {tourData.price.infant}</li>
          </ul>
        </div>
      )}

      {/* Highlights */}
      {tourData.highlights?.length > 0 && (
        <div>
          <p className="flex items-center gap-2 font-semibold text-yellow-600">
            <MdHighlight /> Highlights
          </p>
          <ul className="ml-6 list-disc text-gray-700">
            {tourData.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </div>
      )}

      {/* Includes */}
      {tourData.includes?.length > 0 && (
        <div>
          <p className="flex items-center gap-2 font-semibold text-green-600">
            <AiOutlineCheckCircle /> Includes
          </p>
          <ul className="ml-6 list-disc text-gray-700">
            {tourData.includes.map((inc, i) => <li key={i}>{inc}</li>)}
          </ul>
        </div>
      )}

      {/* Excludes */}
      {tourData.excludes?.length > 0 && (
        <div>
          <p className="flex items-center gap-2 font-semibold text-red-600">
            <AiOutlineCloseCircle /> Excludes
          </p>
          <ul className="ml-6 list-disc text-gray-700">
            {tourData.excludes.map((exc, i) => <li key={i}>{exc}</li>)}
          </ul>
        </div>
      )}

      {/* Itinerary */}
      {tourData.itinerary?.length > 0 && (
        <div>
          <p className="flex items-center gap-2 font-semibold text-indigo-600">
            <FaRegListAlt /> Itinerary
          </p>
          {tourData.itinerary.map((it) => (
            <div key={it.id} className="border rounded p-2 mt-2 bg-gray-50">
              <p className="font-semibold">{it.title}</p>
              <p className="text-gray-700">{it.description}</p>
              {it.imagePath && (
                <img
                  src={it.imagePath}
                  alt={it.title}
                  className="w-full max-h-[200px] object-cover mt-2 rounded"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* FAQ */}
      {tourData.faq?.length > 0 && (
        <div>
          <p className="flex items-center gap-2 font-semibold text-indigo-600">
            <MdQuestionAnswer /> FAQ
          </p>
          {tourData.faq.map((f, i) => (
            <div key={i} className="border p-2 rounded bg-indigo-50 mt-1">
              <p className="font-semibold">Q: {f.question}</p>
              <p className="text-gray-700">A: {f.answer}</p>
            </div>
          ))}
        </div>
      )}

      {/* Discounts */}
      {tourData.discounts?.length > 0 && (
        <div>
          <p className="flex items-center gap-2 font-semibold text-pink-600">
            <MdDiscount /> Discounts
          </p>
          {tourData.discounts.map((d) => (
            <div key={d.id} className="border p-2 rounded bg-pink-50 mt-1">
              <p>Target: {d.targetGroup}</p>
              <p>Type: {d.type}</p>
              <p>Value: {d.value}</p>
              <p>People: {d.minPeople} - {d.maxPeople}</p>
            </div>
          ))}
        </div>
      )}

      {/* Extras */}
      {tourData.extras?.length > 0 && (
        <div>
          <p className="flex items-center gap-2 font-semibold text-teal-600">
            <FaUtensils /> Extras
          </p>
          {tourData.extras.map((ex) => (
            <div key={ex.id} className="border p-2 rounded bg-teal-50 mt-1">
              <p className="font-semibold">{ex.name}</p>
              <ul className="ml-6 list-disc text-gray-700">
                <li>Adult: {ex.price.adult}</li>
                <li>Child: {ex.price.child}</li>
                <li>Infant: {ex.price.infant}</li>
              </ul>
              <p className="text-sm text-gray-500">Currency: {ex.price.currencyName}</p>
            </div>
          ))}
        </div>
      )}

      {/* Image */}
      {tourData.mainImage && (
        <div>
          <p className="flex items-center gap-2 font-semibold text-gray-700">
            <FaImages /> Main Image
          </p>
          <img
            src={tourData.mainImage}
            alt="Tour"
            className="w-full max-h-[300px] object-contain rounded mt-2 shadow"
          />
        </div>
      )}
    </div>
  ) : (
    <div className="text-gray-500 text-center py-8">No tour data available</div>
  )}
</div>
            )}

            {/* Footer */}
            <div className="mt-6 flex justify-end">
              <button 
                onClick={handleCloseModal} 
                className="bg-one text-white px-4 py-2 rounded hover:bg-opacity-90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;