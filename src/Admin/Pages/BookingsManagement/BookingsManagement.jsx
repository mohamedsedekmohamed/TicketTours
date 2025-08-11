import React, { useEffect, useState } from "react";
import DynamicTable from "../../component/DynamicTable";
import { useNavigate } from "react-router-dom";
import NavAndSearch from "../../component/NavAndSearch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loading from "../../../ui/Loading";

const BookingsManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [update, setUpdate] = useState(false);
  const [activeTab, setActiveTab] = useState("pending"); // التاب الافتراضي

  useEffect(() => {
    axios
      .get(`https://bcknd.tickethub-tours.com/api/admin/bookings`)
      .then((response) => {
        setData(
          response.data.data.bookings.map((item) => ({
            id: item.id,
            tourName: item.tourName,
            userName: item.userName,
            tourStartDate: item.tourStartDate,
            tourEndDate: item.tourEndDate,
            status: item.status,
          }))
        );
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching data");
        setLoading(false);
      });
  }, [update]);

  const columns = [
    { key: "tourName", label: "Tour Name" },
    { key: "userName", label: "User Name" },
    { key: "tourStartDate", label: "Start Date" },
    { key: "tourEndDate", label: "End Date" },
  ];

  const filteredData = data
    .filter((item) => item.status === activeTab)
    .filter((item) =>
      Object.values(item || {}).some((value) =>
        value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  if (loading) return <Loading />;

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-4 justify-around mb-4 border-b ">
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
            {status==="pending"&& "Upcaoming"}
            {status==="confirmed"&& "Current"}
            {status==="cancelled"&& "Histroy"}
          </button>
        ))}
      </div>

      <NavAndSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} like />
      <ToastContainer />

        <DynamicTable
          data={data}
          columns={columns}
          filteredData={filteredData}
    
        />
     
    </div>
  );
};

export default BookingsManagement;
