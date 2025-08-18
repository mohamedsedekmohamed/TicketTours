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
  FaEnvelope,
} from "react-icons/fa";
import { MdCategory, MdOutlineSpeakerNotes } from "react-icons/md";
import { FaHouseChimneyWindow } from "react-icons/fa6";

const MedicalReqest = () => {
  const [data, setData] = useState({
    upcoming: [],
    current: [],
    history: [],
  });
  const [loading, setLoading] = useState(true);
  const [viewRow, setViewRow] = useState(null);
const [updata,setUpdata]=useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  // لتخزين بيانات الفورم
  const [confirmForm, setConfirmForm] = useState({ rowId: null, price: "", file: null });
  const [rejectForm, setRejectForm] = useState({ rowId: null, reason: "" });

  useEffect(() => {
    axios
      .get(`https://bcknd.tickethub-tours.com/api/admin/medical/medicalTour-all`)
      .then((response) => {
        const apiData = response.data.data.medicals;

        const formatBookings = (list) =>
          list.map((item) => ({
            id: item.id,
            describtion: item.describtion,
            userName: item.userName,
            userEmail: item.userEmail,
            status: item.status || "pending",
            phoneNumber: item.phoneNumber,
            categories: item.categories?.map((categorie) => ({
              title: categorie.title,
            })),
            images: item.images?.map((image) => ({
              imagePath: image.imagePath,
            })),
          }));

        setData({
          pending: formatBookings(apiData.pending || []),
          accepted: formatBookings(apiData.accepted || []),
          history: formatBookings(apiData.history || []),
        });

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [updata]);

  const handleStatusChange = (row, value) => {
    if (value === "confirmed") {
      setConfirmForm({ rowId: row.id, price: "", file: null });
      setRejectForm({ rowId: null, reason: "" }); // لو فاتح رفض نقفله
    } else if (value === "cancelled") {
      setRejectForm({ rowId: row.id, reason: "" });
      setConfirmForm({ rowId: null, price: "", file: null }); // لو فاتح تأكيد نقفله
    }
  };

  const handleConfirmSubmit = async () => {
    if (!confirmForm.price || !confirmForm.file) {
      toast.warn("Please enter price and upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("medicalId", confirmForm.rowId);
    formData.append("price", confirmForm.price);
    formData.append("fileData", confirmForm.file);

    try {
      await axios.post(
        "https://bcknd.tickethub-tours.com/api/admin/medical/accept-medical",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Request confirmed successfully!");
      setUpdata(p=>!p)
      setConfirmForm({ rowId: null, price: "", file: null });
    } catch (error) {
      toast.error("Error confirming request");
    }
  };

  const handleRejectSubmit = async () => {
    if (!rejectForm.reason) {
      toast.error("Please enter rejection reason");
      return;
    }

    try {
      await axios.post(
        "https://bcknd.tickethub-tours.com/api/admin/medical/reject-medical",
        {
          medicalId: rejectForm.rowId,
          reason: rejectForm.reason,
        }
      );
      toast.success("Request rejected successfully!");
            setUpdata(p=>!p)

      setRejectForm({ rowId: null, reason: "" });
    } catch (error) {
      toast.error("Error rejecting request");
    }
  };

  const columns = [
    { key: "userName", label: "Name" },
    { key: "describtion", label: "Describtion" },
    { key: "userEmail", label: "Email" },
    { key: "phoneNumber", label: "Phone" },
  ];

  const filteredData = (data[activeTab] || []).filter((item) =>
    Object.values(item || {}).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (loading) return <Loading />;

  return (
    <div>
      <ToastContainer />

      {/* Tabs */}
      <div className="flex gap-4 justify-around mb-4 border-b ">
        {[
          { key: "pending", label: "Pending" },
          { key: "accepted", label: "Accepted" },
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

      <NavAndSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} like />

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
        buttonstatus={
          activeTab === "pending"
            ? (row) =>
                row.status === "pending" && (
                  <td>
                   {confirmForm.rowId === row.id ? (
  <div className="flex flex-col gap-2">
    <input
      type="number"
      placeholder="Enter price"
      value={confirmForm.price}
        min="0"

      onChange={(e) =>
        setConfirmForm({ ...confirmForm, price: e.target.value })
      }
      className="border p-1 rounded"
    />
    <input
      type="file"
      accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
      onChange={(e) =>
        setConfirmForm({ ...confirmForm, file: e.target.files[0] })
      }
      className="border p-1 rounded"
    />
    <button
      onClick={handleConfirmSubmit}
      className="bg-one text-white px-3 py-1 rounded"
    >
      Confirm
    </button>
  </div>
) : rejectForm.rowId === row.id ? (
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          placeholder="Enter rejection reason"
                          value={rejectForm.reason}
                          onChange={(e) =>
                            setRejectForm({ ...rejectForm, reason: e.target.value })
                          }
                          className="border p-1 rounded"
                        />
                        <button
                          onClick={handleRejectSubmit}
                          className="bg-one/90 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      // القائمة الأساسية
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
                    )}
                  </td>
                )
            : undefined
        }
      />

      {/* Popup عرض التفاصيل */}
      {viewRow && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full relative shadow-xl">
            <button
              onClick={() => setViewRow(null)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-one flex items-center gap-2">
              <FaUser className="text-one" /> Medical Details
            </h2>

            <div className="space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <FaUser className="text-blue-500" />
                <strong>Name:</strong> {viewRow.userName}
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-green-500" />
                <strong>Email:</strong> {viewRow.userEmail}
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-purple-500" />
                <strong>Phone:</strong> {viewRow.phoneNumber}
              </p>
              <p className="flex items-start gap-2 w-[90%]">
                <MdOutlineSpeakerNotes className="text-gray-400 mt-1 shrink-0" />
                <span className="min-w-0 w-full">
                  <strong>Notes:</strong>
                  <div className="mt-1 max-h-48 overflow-auto whitespace-pre-line break-words [overflow-wrap:anywhere]">
                    {viewRow.describtion || "No notes"}
                  </div>
                </span>
              </p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold flex items-center gap-2 text-gray-800">
                <MdCategory className="text-pink-500" /> Categories
              </h3>
              <ul className="list-disc list-inside text-gray-600 ml-6">
                {viewRow.categories?.map((c, idx) => (
                  <li key={idx}>{c.title}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold flex items-center gap-2 text-gray-800">
                <FaHouseChimneyWindow className="text-indigo-500" /> Images
              </h3>
              <div className="flex gap-3 flex-wrap mt-2">
                {viewRow.images?.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.imagePath}
                    alt="medical"
                    className="w-24 h-24 rounded-lg object-cover border shadow-sm hover:scale-105 transition"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalReqest;
