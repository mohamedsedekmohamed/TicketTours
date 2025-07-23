import React, { useEffect, useState } from "react";
import DynamicTable from '../../component/DynamicTable';
import { useNavigate } from "react-router-dom";import NavAndSearch from '../../component/NavAndSearch'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loading from '../../../ui/Loading'
import Swal from "sweetalert2";
import { CiSearch, CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
const ToursManagement = () => {

  const [data, setData] = useState([]);

         const columns = [
  { key: "title", label: "Title" },
  { key: "startDate", label: "Start Date" },
  { key: "endDate", label: "End Date" },
  { key: "mainImage", label: "Image" },
  { key: "durationDays", label: "Duration Days" },
  { key: "status", label: "Status" },
  { key: "city", label: "City" },
]; 
      const [loading, setLoading] = useState(false);
        const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState("");
  const [update, setUpdate] = useState(false);

    useEffect(() => {
    axios
      .get(`https://tickethub-tours.com/api/admin/tours`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
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
            city: item.city,
          }))
        );
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching data");
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
            `https://tickethub-tours.com/api/admin/tours/${userId}`,
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


  return matchesSearch ;
});


   if (loading) {
      return (

          <Loading/>
      );}
  return (
    <div>
      <NavAndSearch nav="/admin/addtoursmanagement" searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
  <DynamicTable
  data={data}
  columns={columns}
    filteredData={filteredData} // 👈 هذا مهم جداً

  actions={(row) => (
    <div className="flex gap-1">
      <CiEdit
        className="w-[24px] h-[24px] text-green-600 cursor-pointer"
        onClick={() => handleEdit(row.id)}
      />
      <RiDeleteBin6Line
        className="w-[24px] h-[24px] ml-2 text-red-600 cursor-pointer"
        onClick={() => handleDelete(row.id, row.title)}
      />
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

    if (key === "status") {
      return (
        <span
          className={`px-2 py-1 rounded text-sm font-medium ${
            value === 0
              ? "bg-three/80 text-one font-light"
              : "bg-three/50 text-one/90"
          }`}
        >
          {value === 0 ? "Active" : "Disabled"}
        </span>
      );
    }

    return null;
  }}
  />
      </div>

    )
}

export default ToursManagement;