import React, { useEffect, useState } from "react";
import DynamicTable from "../../component/DynamicTable";
import { useNavigate } from "react-router-dom";
import NavAndSearch from "../../component/NavAndSearch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loading from "../../../ui/Loading";
import Swal from "sweetalert2";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
const Roles = () => {
  const groupedPrivileges = JSON.parse(localStorage.getItem("groupedPrivileges")) || {};
  const Privileges = groupedPrivileges["Tour"]?.map((p) => p.action) || [];


   const [data, setData] = useState([]);
      const [loading, setLoading] = useState(true);
      const [searchQuery, setSearchQuery] = useState("");
      const navigate = useNavigate();
      const [selectedFilter, setSelectedFilter] = useState("");
      const [update, setUpdate] = useState(false);
        useEffect(() => {
    axios
      .get(`https://bcknd.tickethub-tours.com/api/admin/admins`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then((response) => {
        setData(
          response.data.data.admins.map((item) => ({
            id: item.id,
            name: item.name,
            email: item.email,
            phoneNumber: item.phoneNumber,
            isSuperAdmin: item.isSuperAdmin,
            imagePath: item.imagePath,
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
    { key: "name", label: "Name" },
    { key: "phoneNumber", label: "Phone" },
    { key: "email", label: "Email" },
  ];
   const handleEdit = (id) => {
    navigate("/admin/addroles", { state: { sendData: id } });
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

 if (loading) {
      return (
          <Loading/>
      );}
  return (
 <div>
      <NavAndSearch like
        nav="/admin/addroles"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ToastContainer/>
      <DynamicTable
        data={data}
        columns={columns}
        filteredData={filteredData} 
        actions={(row) => (
          <div className="flex gap-10">
            <CiEdit
              className="w-[24px] h-[24px] text-green-600 cursor-pointer"
              onClick={() => handleEdit(row.id)}
            />
            <button  className="w-[24px] h-[24px] ml-2 text-red-600 cursor-pointer"
              onClick={() => handleRoles(row.id)}>
              
              </button>
              </div>
             
        )}
        />
     
    </div>  )
}

export default Roles