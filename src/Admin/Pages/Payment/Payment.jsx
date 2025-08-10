import React, { useEffect, useState } from "react";
import DynamicTable from "../../component/DynamicTable";
import { useNavigate } from "react-router-dom";
import NavAndSearch from "../../component/NavAndSearch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loading from "../../../ui/Loading";

const Payment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [update, setUpdate] = useState(false);
  const [activeTab, setActiveTab] = useState("pending"); // التاب الافتراضي

  useEffect(() => {
    axios
      .get(`https://bcknd.tickethub-tours.com/api/admin/payments/allPayment`)
      .then((response) => {
        setData(
          response.data.data.payments.map((item) => ({
            id: item.id,
            method: item.method,
            amount: item.amount,
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
    { key: "method", label: "Method" },
    { key: "amount", label: "Amount " },
  ];

  const filteredData = data
    .filter((item) => item.status === activeTab)
    .filter((item) =>
      Object.values(item || {}).some((value) =>
        value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
const handleStatusChange = async (row, newStatus) => {
  let reason = "";

  if (newStatus === "rejected") {
    reason = prompt("Enter the reason for rejection");
    if (!reason) {
      toast.warn("The reason for the rejection must be stated.");
      return;
    }
  }

  try {
    const res = await fetch(
      `https://bcknd.tickethub-tours.com/api/admin/payments/pending-payments/${row.id}`,
      {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          ...(reason && {rejectionReason: reason }), 
        }),
      }
    );

    if (!res.ok) throw new Error("فشل تحديث الحالة");

    console.log("تم التحديث بنجاح");
  } catch (error) {
    console.error(error);
  }
};

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

      <NavAndSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        like
      />
      <ToastContainer />

      {/* Table */}
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
  onChange={(e) => handleStatusChange(row, e.target.value)}
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

export default Payment;
