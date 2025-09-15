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
import { FaCalendarAlt, FaMapMarkerAlt, FaDollarSign, FaListUl, FaInfoCircle, FaImages } from "react-icons/fa";
import { MdOutlineAccessTime, MdHighlight, MdQuestionAnswer } from "react-icons/md";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"
import { 
} from "react-icons/fa";
import { 
     FaUtensils, FaRegListAlt
} from "react-icons/fa";
import {  MdDiscount } from "react-icons/md";


  const BookingsManagement = () => {
    const [allBookings, setAllBookings] = useState([]); // جميع البوكينجز
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("upcoming");
    const [viewRow, setViewRow] = useState(null);
        const token = localStorage.getItem("token");
    const [activeTabsub, setActiveTabsub] = useState("info"); // default tab
    const [tourData, setTourData] = useState(null);
    const [loadingTour, setLoadingTour] = useState(false);
    const formatDate = (dateString) => {
      if (!dateString) return "No Date";
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
      } catch {
        return "Invalid Date";
      }
    };

      const groupedPrivileges =
    JSON.parse(localStorage.getItem("groupedPrivileges")) || {};
  const Privileges =
    groupedPrivileges["Bookings"]?.map((p) => p.action) || [];
      const categorizeBookings = (bookings) => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      const upcoming = [];
      const current = [];
      const history = [];

      bookings.forEach((booking) => {
        // console.log(`Booking ID: ${booking.id}`);
        // console.log(`Start Date: ${booking.originalStartDate}`);
        // console.log(`End Date: ${booking.originalEndDate}`);
        
        if (!booking.originalStartDate || !booking.originalEndDate) {
          console.log("No dates - moving to history");
          history.push(booking);
          return;
        }

        const startDate = new Date(booking.originalStartDate);
        const endDate = new Date(booking.originalEndDate);
        const startDateOnly = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const endDateOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

        // console.log(`Today: ${today.toDateString()}`);
        // console.log(`Start Date Only: ${startDateOnly.toDateString()}`);
        // console.log(`End Date Only: ${endDateOnly.toDateString()}`);

        if (startDateOnly > today) {
          upcoming.push(booking);
        } else if (startDateOnly <= today && endDateOnly >= today) {
          current.push(booking);
        } else {
          history.push(booking);
        }
      });

      return { upcoming, current, history };
    };

    useEffect(() => {
      axios
        .get(`https://bcknd.tickethub-tours.com/api/admin/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const apiData = response.data.data.bookings || []; // تعديل هنا حسب البنية الجديدة
          
          const formatBookings = (list) =>
            list.map((item) => ({
              id: item.id,
              status: item.status,
              discountNumber: item.discountNumber,
              location: item.tourMeetingPointLocation,
              address: item.tourMeetingPointAddress,
              createdAt: item.createdAt,

              userId: item.userId,
              UserEmail: item.bookingDetails?.email,
              UserPhone: item.bookingDetails?.phone,
              UserFullName: item.bookingDetails?.fullName,

              tourId: item.tourId,
              tourName: item.tourName,
              tourMainImage: item.tourMainImage,
              tourDescription: item.tourDescription,
              originalStartDate: item.tourStartDate,
              originalEndDate: item.tourEndDate,
              tourStartDate: formatDate(item.tourStartDate),
              tourEndDate: formatDate(item.tourEndDate),
              durationDays: item.tourDurationDays,
              hours: item.tourHours,
              maxUsers: item.tourMaxUser,

              notes: item.bookingDetails?.notes,
              adultsCount: item.bookingDetails?.adultsCount,
              childrenCount: item.bookingDetails?.childrenCount,
              infantCount: item.bookingDetails?.infantsCount,
              totalAmount: item.bookingDetails?.totalAmount,

              bookingExtras: item.bookingExtras?.map((extra) => ({
                id: extra.id,
                extraName: extra.extraName,
                adultCount: extra.adultCount,
                childCount: extra.childCount,
                infantCount: extra.infantCount,
              })),
            }));

          const formattedBookings = formatBookings(apiData);
          setAllBookings(formattedBookings);
          setLoading(false);
        })
      .catch((error) => {
                    toast.error(error.response?.data?.error);
          setLoading(false);
        });
    }, []);

    const categorizedData = categorizeBookings(allBookings);

    const columns = [
      { key: "tourName", label: "Tour Name" },
      { key: "UserFullName", label: "User Name" },
      { key: "UserPhone", label: "User Phone" },
      { key: "UserEmail", label: "User Email" },
      { key: "tourStartDate", label: "Start Date" },
      { key: "tourEndDate", label: "End Date" },
    ];

    const filteredData = (categorizedData[activeTab] || []).filter((item) =>
      Object.values(item || {}).some((value) =>
        value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

      const handleOpenTourTab = async (tourId) => {
      setActiveTabsub("tour")
      if (!tourId) {
        toast.warn("No tour ID available");
        return;
      }

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


    if (loading) return <Loading />;

    return (
      <div className="w-full">
        {/* Tabs */}
        <div className="flex gap-4 justify-around mb-4 border-b ">
          {[
            { key: "upcoming", label: "Upcoming", count: categorizedData.upcoming.length },
            { key: "current", label: "Current", count: categorizedData.current.length },
            { key: "history", label: "History", count: categorizedData.history.length },
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
              {tab.label} ({tab.count})
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

          data={Privileges.includes("View")?categorizedData[activeTab]:[]}
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-50 z-50">
        <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded shadow-lg max-h-[80vh] overflow-y-auto text-one">
          <h2 className="text-xl font-bold mb-4">
            Booking Details #{viewRow.id}
          </h2>

          <div className="flex border-b mb-4">
            <button
              onClick={() => setActiveTabsub("info")}
              className={`px-4 py-2 font-medium ${
                activeTab === "info"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              Booking Info
            </button>
            <button
              onClick={() => setActiveTabsub("extras")}
              className={`px-4 py-2 font-medium ${
                activeTabsub === "extras"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              Extras
            </button>
            <button
                            onClick={() => handleOpenTourTab(viewRow.tourId)}

              className={`px-4 py-2 font-medium ${
                activeTabsub === "tour"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              Tour
            </button>
          </div>

          {activeTabsub === "info" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="flex items-center gap-2">
                  <FaUser className="text-blue-500" />
                  <strong>Name:</strong> {viewRow.UserFullName}
                </p>
                <p className="flex items-center gap-2">
                  <FaPhone className="text-green-500" />
                  <strong>Phone:</strong> {viewRow.UserPhone}
                </p>
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-pink-500" />
                  <strong>Email:</strong> {viewRow.UserEmail}
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
                  <FaUsers className="text-blue-400" />
                  <strong>Adults:</strong> {viewRow.adultsCount}
                </p>
                <p className="flex items-center gap-2">
                  <FaChild className="text-orange-400" />
                  <strong>Children:</strong> {viewRow.childrenCount}
                </p>
                <p className="flex items-center gap-2">
                  <FaBaby className="text-purple-400" />
                  <strong>Infants:</strong> {viewRow.infantCount}
                </p>
                <p className="flex items-center gap-2">
                  <FaMoneyBill className="text-green-600" />
                  <strong>Total Amount:</strong> {viewRow.totalAmount}
                </p>
                <p className="flex items-center gap-2">
                  <RiDiscountPercentFill className="text-green-600" />
                  <strong>Discount:</strong>{" "}
                  {viewRow.discountNumber || "No discount"}
                </p>
                <p className="flex items-center gap-2">
                  <FaHouseChimneyWindow className="text-one" />
                  <strong>Address:</strong> {viewRow.address || "No address"}
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

              {viewRow.location && (
                <p className="flex items-start gap-2 w-[90%]">
                  <FaMapLocationDot className="text-amber-300 shrink-0 mt-1" />
                  <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                    <strong>Location:</strong>{" "}
                    <a
                      href={viewRow.location}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-words [overflow-wrap:anywhere]"
                    >
                      {viewRow.location}
                    </a>
                  </span>
                </p>
              )}

              {viewRow.tourMainImage && (
                <img
                  src={viewRow.tourMainImage}
                  alt="Tour"
                  className="w-full max-h-[400px] object-contain rounded"
                />
              )}
            </div>
          )}

          {activeTabsub === "extras" && (
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
                      <tr
                        key={extra.id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="border px-2 py-1">{extra.extraName}</td>
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
          )}
          {activeTabsub === "tour" && (
            <div>
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

        {/* promoCode */}
        {tourData.promoCode?.length > 0 && (
          <div>
            <p className="flex items-center gap-2 font-semibold text-orange-600">
              <MdDiscount /> promoCode
            </p>
            {tourData.promoCode.map((d) => (
              <div key={d.id} className="border p-2 rounded bg-orange-50 mt-1">
                <p>Code: {d.code}</p>
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
            </div>
          )}

          {/* Footer */}
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