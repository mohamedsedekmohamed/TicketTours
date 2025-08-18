import React, { useEffect, useState } from "react";
import DynamicTable from "../../component/DynamicTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loading from "../../../ui/Loading";
import NavAndSearch from "../../component/NavAndSearch";
import {
  FaUser,
  FaPhone,
  FaMoneyBill,
  FaCheckCircle,
  FaEnvelope,
  FaUsers,
  FaChild,
  FaBaby,
} from "react-icons/fa";
import { MdCategory, MdOutlineSpeakerNotes } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaHouseChimneyWindow, FaMapLocationDot } from "react-icons/fa6";

const BookingsManagement = () => {
  const [data, setData] = useState({
    upcoming: [],
    current: [],
    history: [],
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming"); // الافتراضي
  const [viewRow, setViewRow] = useState(null);
  useEffect(() => {
    axios
      .get(`https://bcknd.tickethub-tours.com/api/admin/bookings`)
      .then((response) => {
        const apiData = response.data.data;
console.log(apiData)
        const formatBookings = (list) =>
          list.map((item) => ({
            id: item.id,
            status: item.status,
            discountNumber: item.discountNumber,
            location: item.location,
            address: item.address,
            createdAt: item.createdAt,

            userId: item.user?.id,
            UserEmail: item.bookingDetails?.UserEmail,
            UserPhone: item.bookingDetails?.UserPhone,
            UserFullName: item.bookingDetails?.UserFullName,

            tourId: item.tour?.id,
            tourName: item.tour?.name,
            tourMainImage: item.tour?.mainImage,
            tourDescription: item.tour?.description,
            tourStartDate: item.tour?.startDate,
            tourEndDate: item.tour?.endDate,
            durationDays: item.tour?.durationDays,
            hours: item.tour?.hours,
            maxUsers: item.tour?.maxUsers,

              notes: item.bookingDetails?.notes,
              adultsCount: item.bookingDetails?.adultsCount,
              childrenCount: item.bookingDetails?.childrenCount,
              infantCount: item.bookingDetails?.infantCount,

            bookingExtras: item.bookingExtras?.map((extra) => ({
              id: extra.id,
              extraName: extra.extraName,
              adultCount: extra.adultCount,
              childCount: extra.childCount,
              infantCount: extra.infantCount,
            })),
          }));

        setData({
          upcoming: formatBookings(apiData.upcoming || []),
          current: formatBookings(apiData.current || []),
          history: formatBookings(apiData.history || []),
        });

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const columns = [
    { key: "tourName", label: "Tour Name" },
    { key: "UserFullName", label: "User Name" },
    { key: "UserPhone", label: "User Phone" },
    { key: "UserEmail", label: "User Email" },
    { key: "tourStartDate", label: "Start Date" },
    { key: "tourEndDate", label: "End Date" },
  ];

  const filteredData = (data[activeTab] || []).filter((item) =>
    Object.values(item || {}).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (loading) return <Loading />;

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-4 justify-around mb-4 border-b ">
        {[
          { key: "upcoming", label: "Upcoming" },
          { key: "current", label: "Current" },
          { key: "history", label: "History" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`px-4 py-2 border-b-2 ${
              activeTab === tab.key
                ? "border-one text-one font-bold"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <NavAndSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        like
      />
      <ToastContainer />

      <DynamicTable
        data={data[activeTab]}
        view={(row) => (
          <button
            onClick={() => setViewRow(row)}
            className="bg-one rounded-[6px] text-white px-3 py-1 "
          >
            View
          </button>
        )}
        columns={columns}
        filteredData={filteredData}
        
      />
      {viewRow && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-50   z-50">
          <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded shadow-lg max-h-[80vh] overflow-y-auto  text-one">
            <h2 className="text-xl font-bold mb-4">
              Payment Details #{viewRow.ids}
            </h2>
            <div className="space-y-4 ">
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
                  <MdCategory className="text-purple-500" />
                  <strong>Method:</strong> {viewRow.method}
                </p>
                <p className="flex items-center gap-2">
                  <FaMoneyBill className="text-yellow-500" />
                  <strong>Amount:</strong> {viewRow.amount}
                </p>
                <p className="flex items-center gap-2">
                  <FaCheckCircle
                    className={
                      viewRow.status === "confirmed"
                        ? "text-green-500"
                        : viewRow.status === "pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }
                  />
                  <strong>Status:</strong> {viewRow.status}
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
                  <FaMoneyBill className="text-green-600" />
                  <strong>Total Amount:</strong> {viewRow.totalAmount}
                </p>
                <p className="flex items-center gap-2">
                  <RiDiscountPercentFill className="text-green-600" />
                  <strong> Discount :</strong> {viewRow.discountNumber}
                </p>

                <p className="flex items-center gap-2">
                  <FaHouseChimneyWindow className="text-one" />
                  <strong> Address :</strong> {viewRow.address || "No address"}
                </p>
                <p className="flex items-start gap-2 w-[90%]">
                  <MdOutlineSpeakerNotes className="text-gray-400 mt-1 shrink-0" />
                  <span className="min-w-0 w-full">
                    <strong>Notes:</strong>
                    <div className="mt-1 max-h-48 overflow-auto whitespace-pre-line break-words [overflow-wrap:anywhere]">
                      {viewRow.notes || "No notes"}
                    </div>
                  </span>
                </p>
              </div>
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

              <img
                src={viewRow.proofImage}
                alt="Proof"
                className="w-full max-h-[400px] object-contain rounded"
              />
              <div>
                <strong className="text-lg">Extras:</strong>
                {viewRow.bookingExtras && viewRow.bookingExtras.length > 0 ? (
                  <table className="w-full mt-2 border border-gray-300 text-sm rounded overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-2 py-1 text-left">
                          Extra Name
                        </th>
                        <th className="border px-2 py-1">Adults</th>
                        <th className="border px-2 py-1">Children</th>
                        <th className="border px-2 py-1">Infants</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewRow.bookingExtras.map((extra, index) => (
                        <tr
                          key={extra.id}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="border px-2 py-1">
                            {extra.extraName}
                          </td>
                          <td className="border px-2 py-1 text-center">
                            {extra.adultCount}
                          </td>
                          <td className="border px-2 py-1 text-center">
                            {extra.childCount}
                          </td>
                          <td className="border px-2 py-1 text-center">
                            {extra.infantCount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="mt-2 text-gray-500">No extras available.</p>
                )}
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setViewRow(null)}
                className="bg-one text-white px-4 py-2 rounded"
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

export default BookingsManagement;
