import React, { useEffect, useState } from "react";
import DynamicTable from "../../component/DynamicTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loading from "../../../ui/Loading";
import NavAndSearch from "../../component/NavAndSearch";
import { set } from "date-fns";

const Payment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [update, setUpdate] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedRow, setSelectedRow] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // جلب البيانات
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://bcknd.tickethub-tours.com/api/admin/payments/allPayment`)
      .then((response) => {
        const payments = response.data.data.payments.map((item) => ({
          method: item.payment.method,
          amount: item.payment.amount,
          status: item.payment.status,
          fullName: item.bookingDetails?.fullName || "",
          phone: item.bookingDetails?.phone || "",
          ids: item.payment.id,
        }));
        setData(payments);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching data");
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

  // تحديث حالة الدفع
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        toast.success("Status updated successfully.");
        setUpdate((p) => !p);
      } else {
        throw new Error("Status update failed");
      }
    } catch (error) {
      console.error(error);
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
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
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="w-full">
      {/* Tabs */}
            <ToastContainer />

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

      <NavAndSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} like />

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
        view={(row) => {
          
        }}
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
    </div>
  );
};

export default Payment;
