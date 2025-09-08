import React, { useEffect, useState } from "react";
import DynamicTable from "../../component/DynamicTable";
import { useNavigate } from "react-router-dom";
import NavAndSearch from "../../component/NavAndSearch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loading from "../../../ui/Loading";
import Swal from "sweetalert2";
import { CiSearch, CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai"
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaListUl,
  FaInfoCircle,
  FaImages,
} from "react-icons/fa";
import {
  MdHighlight,
  MdQuestionAnswer,
} from "react-icons/md";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { FaUtensils, FaRegListAlt } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";

const ToursManagement = () => {
  const groupedPrivileges =
    JSON.parse(localStorage.getItem("groupedPrivileges")) || {};
  const Privileges = groupedPrivileges["Tour"]?.map((p) => p.action) || [];

  const [data, setData] = useState([]);

  const columns = [
    { key: "title", label: "Title" },
    { key: "mainImage", label: "Image" },
    { key: "durationDays", label: "Duration Days" },
    // { key: "status", label: "Status" },
    { key: "maxUsers", label: "Max Users" },
  ];
    const [activeTab, setActiveTab] = useState("overview"); 

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("");
  const [update, setUpdate] = useState(false);
  const [tourData, setTourData] = useState("");
            const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://bcknd.tickethub-tours.com/api/admin/tours`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(
          response.data.data.tours.map((item) => ({
            id: item.id,
            title: item.title,
            startDate: item.startDate,
            endDate: item.endDate,
            mainImage: item.mainImage,
            durationDays: item.durationDays,
            status: item.status,
            maxUsers: item.maxUsers,
            description: item.describtion,
            cityName: item.country,
            countryName: item.city,
          }))
        );
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [update]);

  const handleEdit = (id) => {
    navigate("/admin/addtoursmanagement", { state: { sendData: id } });
  };

  const handleDelete = (userId, userName) => {
    const token = localStorage.getItem("token");

    Swal.fire({
      title: `Are you sure you want to delete ${userName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://bcknd.tickethub-tours.com/api/admin/tours/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            setUpdate(!update);
            Swal.fire(
              "Deleted!",
              `${userName} has been deleted successfully.`,
              "success"
            );
          })
          .catch(() => {
            Swal.fire(
              "Error!",
              `There was an error while deleting ${userName}.`,
              "error"
            );
          });
      } else {
        Swal.fire("Cancelled", `${userName} was not deleted.`, "info");
      }
    });
  };

  const filteredData = data.filter((item) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      selectedFilter === ""
        ? Object.values(item || {}).some((value) =>
            typeof value === "object" && value !== null
              ? Object.values(value || {}).some((sub) =>
                  sub?.toString().toLowerCase().includes(query)
                )
              : value?.toString().toLowerCase().includes(query)
          )
        : (() => {
            const keys = selectedFilter.split(".");
            let value = item;
            for (let key of keys) value = value?.[key];
            return value?.toString().toLowerCase().includes(query);
          })();

    return matchesSearch;
  });
  const openHnadle = (id) => {
    axios
      .get(`https://bcknd.tickethub-tours.com/api/admin/tours/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const tour = res.data.data;
        setTourData(tour);
      });
  };
  const handleToggleStatus = (row) => {
    const newStatus = row.status ? false : true;
    const token = localStorage.getItem("token");

    const updateHome = {
      status: newStatus,
      tourId:row.id
    };

    axios
      .post(
        `https://bcknd.tickethub-tours.com/api/admin/tours/status`,
        updateHome,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        toast.success("Status updated successfully");
        setTimeout(() => {
          setUpdate((prev) => !prev);
        }, 1000);
      })
      .catch(() => {
        toast.error("Status was not updated successfully");
      });
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <ToastContainer/>
      {Privileges.includes("Add") || Privileges.includes("Edit") ? (
        <NavAndSearch
          nav="/admin/addtoursmanagement"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      ) : (
        <NavAndSearch
          like
          nav="/admin/addtoursmanagement"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
      <DynamicTable
        data={data}
        columns={columns}
        filteredData={filteredData}
        actions={(row) => (
          <div className="flex gap-1">
            {Privileges.includes("Edit") && (
              <CiEdit
                className="w-[24px] h-[24px] text-green-600 cursor-pointer"
                onClick={() => handleEdit(row.id)}
              />
            )}

            {Privileges.includes("Delete") && (
              <RiDeleteBin6Line
                className="w-[24px] h-[24px] ml-2 text-red-600 cursor-pointer"
                onClick={() => handleDelete(row.id, row.title)}
              />
            )}
          </div>
        )}
        customRender={(key, value) => {
          if (key === "mainImage") {
            return (
              <img
                src={value}
                alt="mainImage"
                className="w-20 h-12 object-cover rounded"
              />
            );
          }
          // if (key === "status") {
          //   return (
          //     <span
          //       className={`px-2 py-1 rounded text-sm font-medium ${
          //         value
          //           ? "bg-three/10 text-green-700 font-light"
          //           : "bg-three/50 text-one/90"
          //       }`}
          //     >
          //       {value ? "Active" : "Disabled"}
          //     </span>
          //   );
          // }

          return null;
        }}
        view={(row) => (
          <button
            onClick={() => openHnadle(row.id)}
            className="bg-one rounded-[6px] text-white px-3 py-1"
          >
            View
          </button>
        )}
              buttonstatus={(row) => (
                <>
            {Privileges.includes("Status") && (
              <td className={`flex gap-1  justify-start `}>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={row.status}
                onChange={() => handleToggleStatus(row)}
                className="sr-only peer"
                />
              <div className="w-11 h-6 bg-gray-300 peer-checked:bg-one rounded-full peer relative after:content-[''] after:absolute after:w-5 after:h-5 after:bg-white after:rounded-full after:left-0.5 after:top-0.5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </td>
            )}
            </>

        )}
        Start={(row) => (
          <span
            className=" rounded-[6px]  px-3 py-1"
          >
      {row.startDate ? row.startDate.split("T")[0] : "N/A"}
          </span>
        )}
        End={(row) => (
          <span
            className="rounded-[6px]  px-3 py-1"
          >
      {row.endDate ? row.endDate.split("T")[0] : "N/A"}
            </span>
        )}
      />
   {tourData && (
   
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white max-h-[90vh] overflow-y-auto w-[95%] md:w-[75%] lg:w-[65%] xl:w-[50%] p-6 rounded-2xl shadow-2xl relative space-y-4">

        {/* زر إغلاق */}
        <button
          onClick={() => setTourData("")}
          className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition"
        >
          ✕
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 text-2xl font-bold text-one border-b pb-2">
          <FaInfoCircle className="text-one" />
          <span>{tourData.title || "N/A"}</span>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 font-medium ${
              activeTab === "overview"
                ? "border-b-2 border-one text-one"
                : "text-gray-500"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 py-2 font-medium ${
              activeTab === "details"
                ? "border-b-2 border-one text-one"
                : "text-gray-500"
            }`}
          >
            schedules
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <p className="flex items-center gap-2 text-gray-700">
                <FaCalendarAlt className="text-orange-500" />
                {tourData.startDate?.split("T")[0]} → {tourData.endDate?.split("T")[0]}
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <MdOutlineAccessTime className="text-purple-500" />
                {tourData.durationDays} days / {tourData.durationHours} hours
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <FaUsers className="text-green-600" /> Max Users: {tourData.maxUsers}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-gray-50">
              <p className="flex items-center gap-2 text-gray-700">
                <FaMapMarkerAlt className="text-red-500" />
                {tourData.meetingPointAddress}
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
            </div>

            {tourData.price && (
              <div className="bg-blue-50 p-3 rounded-lg shadow-sm">
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
            <div className="space-y-4">
            {tourData.highlights?.length > 0 && (
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="flex items-center gap-2 font-semibold text-yellow-700">
                  <MdHighlight /> Highlights
                </p>
                <ul className="ml-6 list-disc text-gray-700">
                  {tourData.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Includes */}
            {tourData.includes?.length > 0 && (
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="flex items-center gap-2 font-semibold text-green-700">
                  <AiOutlineCheckCircle /> Includes
                </p>
                <ul className="ml-6 list-disc text-gray-700">
                  {tourData.includes.map((inc, i) => (
                    <li key={i}>{inc}</li>
                  ))}
                </ul>
              </div>
            )}

            {tourData.excludes?.length > 0 && (
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="flex items-center gap-2 font-semibold text-red-700">
                  <AiOutlineCloseCircle /> Excludes
                </p>
                <ul className="ml-6 list-disc text-gray-700">
                  {tourData.excludes.map((exc, i) => (
                    <li key={i}>{exc}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Itinerary */}
            {tourData.itinerary?.length > 0 && (
              <div className="bg-indigo-50 p-3 rounded-lg">
                <p className="flex items-center gap-2 font-semibold text-indigo-700">
                  <FaRegListAlt /> Itinerary
                </p>
                {tourData.itinerary.map((it) => (
                  <div
                    key={it.id}
                    className="border rounded p-3 mt-2 bg-white shadow-sm"
                  >
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

            {tourData.faq?.length > 0 && (
              <div className="bg-indigo-100 p-3 rounded-lg">
                <p className="flex items-center gap-2 font-semibold text-indigo-700">
                  <MdQuestionAnswer /> FAQ
                </p>
                {tourData.faq.map((f, i) => (
                  <div
                    key={i}
                    className="border p-2 rounded bg-white mt-1 shadow-sm"
                  >
                    <p className="font-semibold">Q: {f.question}</p>
                    <p className="text-gray-700">A: {f.answer}</p>
                  </div>
                ))}
              </div>
            )}

            {tourData.discounts?.length > 0 && (
              <div className="bg-pink-50 p-3 rounded-lg">
                <p className="flex items-center gap-2 font-semibold text-pink-700">
                  <MdDiscount /> Discounts
                </p>
                {tourData.discounts.map((d) => (
                  <div
                    key={d.id}
                    className="border p-2 rounded bg-white mt-1 shadow-sm"
                  >
                    <p>Target: {d.targetGroup}</p>
                    <p>Type: {d.type}</p>
                    <p>Value: {d.value}</p>
                    <p>
                      People: {d.minPeople} - {d.maxPeople}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {tourData.extras?.length > 0 && (
              <div className="bg-teal-50 p-3 rounded-lg">
                <p className="flex items-center gap-2 font-semibold text-teal-700">
                  <FaUtensils /> Extras
                </p>
                {tourData.extras.map((ex) => (
                  <div
                    key={ex.id}
                    className="border p-2 rounded bg-white mt-1 shadow-sm"
                  >
                    <p className="font-semibold">{ex.name}</p>
                    <ul className="ml-6 list-disc text-gray-700">
                      <li>Adult: {ex.price.adult}</li>
                      <li>Child: {ex.price.child}</li>
                      <li>Infant: {ex.price.infant}</li>
                    </ul>
                    <p className="text-sm text-gray-500">
                      Currency: {ex.price.currencyName}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {tourData.mainImage && (
              <div className="bg-gray-50 p-3 rounded-lg">
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
          </div>
          
        )}
   
        {activeTab === "details" && (
       <div>
        <div className="space-y-3">
  {tourData.schedules?.length > 0 ? (
    tourData.schedules.map((s) => (
      <div
        key={s.id}
        className="border p-4 rounded-xl shadow-md bg-gradient-to-r from-blue-50 to-white hover:shadow-lg transition"
      >
        <div className="flex items-center gap-2 text-blue-700 font-semibold">
          <FaCalendarAlt />
          <span>{s.date}</span>
        </div>

        <div className="flex items-center gap-2 text-green-700 mt-2">
          <FaUsers />
          <span>Available Seats: {s.availableSeats}</span>
        </div>

        <div className="flex items-center gap-2 text-purple-700 mt-2">
          <MdOutlineAccessTime />
          <span>Start: {s.startDate}</span>
        </div>

        <div className="flex items-center gap-2 text-red-600 mt-2">
          <AiOutlineCalendar />
          <span>End: {s.endDate}</span>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No schedules available.</p>
  )}
</div>
        </div>
        )}
      </div>
    </div>
)}

    </div>
  );
};

export default ToursManagement;
