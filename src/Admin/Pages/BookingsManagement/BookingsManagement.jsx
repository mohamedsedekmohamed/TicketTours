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
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <NavAndSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} like />
      <ToastContainer />

         {activeTab === "confirmed" || activeTab === "cancelled" ? (
        <DynamicTable
          data={data}
          columns={columns}
          filteredData={filteredData}
    
        />
      ) : (
        <DynamicTable
          data={data}
          columns={columns}
          filteredData={filteredData}
          buttonstatus={(row) =>
            row.status === "pending" ? (
              <td className="flex gap-1 justify-start">
                <select
                  value={row.status}
                  onChange={(e) =>
                    console.log("Change status for", row, "to", e.target.value)
                  }
                  className="border border-gray-400 bg-one text-white rounded-3xl px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-one"
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
            ) : null
          }
        />
      )}
    </div>
  );
};

export default BookingsManagement;
