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
const CategoriesManagement = () => {
   const [data, setData] = useState([]);
   const columns = [
  { key: "name", label: "Name" },
  { key: "imagePath", label: "Image" },
  { key: "status", label: "Status" },
]; 
  const [loading, setLoading] = useState(false);
        const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState("");
  const [update, setUpdate] = useState(false);
  const groupedPrivileges = JSON.parse(localStorage.getItem("groupedPrivileges")) || {};
  const Privileges = groupedPrivileges["Category"]?.map((p) => p.action) || [];
      const token = localStorage.getItem("token");

 useEffect(() => {
    axios
      .get(`https://bcknd.tickethub-tours.com/api/admin/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(
          response.data.data.Categories.map((item) => ({
            id: item.id,
            name: item.name,
            imagePath: item.imagePath,
            status: item.status,
          }))
        );
        setLoading(false);
      })
      .catch(() => {
         setLoading(false);
      });
  }, [update]);
  const handleEdit = (id) => {
    navigate("/admin/addcategoriesmanagement", { state: { sendData: id } });
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


  return matchesSearch ;
});

   if (loading) {
      return (

          <Loading/>
      );}
  return (
    <div>
       <DynamicTable
  data={data}
  columns={columns}
    filteredData={filteredData} // 👈 هذا مهم جداً

  actions={(row) => (
    <div className="flex gap-1">
     {Privileges.includes("Edit") && (
                   <CiEdit
                     className="w-[24px] h-[24px] text-green-600 cursor-pointer"
                     onClick={() => handleEdit(row.id)}
                   />
                 )}

    </div>
  )}
   customRender={(key, value) => {
    if (key === "imagePath") {
      return (
        <img
          src={value}
          alt="imagePath"
          className="w-20 h-12 object-cover rounded"
        />
      );
    }

    if (key === "status") {
      return (
        <span
          className={`px-2 py-1 rounded text-sm font-medium ${
            value
              ? "bg-three/10 text-green-700 font-light"
              : "bg-three/50 text-one/90"
          }`}
        >
          {value ? "Active" : "Disabled"}
        </span>
      );
    }

    return null;
  }}
  />
    </div>
  )
}

export default CategoriesManagement