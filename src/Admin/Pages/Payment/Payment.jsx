import React, { useEffect, useState } from "react";
import DynamicTable from "../../component/DynamicTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loading from "../../../ui/Loading";
import NavAndSearch from "../../component/NavAndSearch";
import { FaUser, FaPhone, FaMoneyBill, FaCheckCircle, FaEnvelope, FaChild, FaBaby, FaUsers } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

const Payment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [update, setUpdate] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedRow, setSelectedRow] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [viewRow, setViewRow] = useState(null); // لعرض الـ modal

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
          rejectionReason: item.payment.rejectionReason,
          email: item.bookingDetails?.email,
          adultsCount: item.bookingDetails?.adultsCount,
          childrenCount: item.bookingDetails?.childrenCount,
          infantsCount: item.bookingDetails?.infantsCount,
          totalAmount: item.bookingDetails?.totalAmount,
          fullName: item.bookingDetails?.fullName || "",
          phone: item.bookingDetails?.phone || "",
          ids: item.payment.id,
          bookingExtras: item.bookingExtras
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
   setTimeout(() => {
          setUpdate((p) => !p);
        }, 1000);      } else {
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
    
Seen={
  activeTab === "cancelled"
    ? (row) => (
        row.status === "cancelled" && (
          <span className="text-one font-semibold">
  {row.rejectionReason
    ? row.rejectionReason.length > 20
      ? row.rejectionReason.slice(0, 20) + ".."
      : row.rejectionReason
    : "No reason provided"}
</span>

        )
      )
    : undefined
}


        view={(row) => (
          <button
            onClick={() => setViewRow(row)}
            className="bg-one rounded-[6px] text-white px-3 py-1 "
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

      {/* Modal عرض البيانات */}
      {viewRow && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-50  z-50">
          <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded shadow-lg max-h-[80vh] overflow-y-auto  text-one">
            <h2 className="text-xl font-bold mb-4">
              Payment Details #{viewRow.ids}
            </h2>
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
      <MdCategory className="text-purple-500" /> 
      <strong>Method:</strong> {viewRow.method}
    </p>
    <p className="flex items-center gap-2">
      <FaMoneyBill className="text-yellow-500" /> 
      <strong>Amount:</strong> {viewRow.amount}
    </p>
    <p className="flex items-center gap-2">
      <FaCheckCircle className={viewRow.status === "confirmed" ? "text-green-500" : viewRow.status === "pending" ? "text-yellow-500" : "text-red-500"} /> 
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
  </div>

  {/* جدول الإضافات */}
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
            <tr key={extra.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="border px-2 py-1">{extra.extraName}</td>
              <td className="border px-2 py-1 text-center">{extra.adultCount}</td>
              <td className="border px-2 py-1 text-center">{extra.childCount}</td>
              <td className="border px-2 py-1 text-center">{extra.infantCount}</td>
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

export default Payment;
