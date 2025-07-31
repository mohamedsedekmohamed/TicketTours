import React, { useEffect, useState } from "react";
import DynamicTable from "../../../component/DynamicTable";
import { useNavigate } from "react-router-dom";
import NavAndSearch from "../../../component/NavAndSearch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loading from "../../../../ui/Loading";
import Swal from "sweetalert2";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
const HomeCover = () => {

     const [data, setData] = useState([]);
      const [loading, setLoading] = useState(true);
      const [searchQuery, setSearchQuery] = useState("");
      const navigate = useNavigate();
      // const [selectedFilter, setSelectedFilter] = useState("");
      const [update, setUpdate] = useState(false);
      
        useEffect(() => {
    axios
      .get(`https://bcknd.tickethub-tours.com/api/admin/homepage`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then((response) => {
        setData(
          response.data.data.pages.map((item) => ({
            id: item.id,
            imagePath: item.imagePath,
            status: item.status  
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
    navigate("/admin/addhomecover", { state: { sendData: id } });
  };
  const handleDelete = (userId) => {
    const token = localStorage.getItem("token");

    Swal.fire({
      title: `Are you sure you want to delete ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://bcknd.tickethub-tours.com/api/admin/homepage/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            setUpdate(!update);
            Swal.fire(
              "Deleted!",
              `it has been deleted successfully.`,
              "success"
            );
          })
          .catch(() => {
            Swal.fire(
              "Error!",
              `There was an error while deleting `,
              "error"
            );
          });
      } else {
        Swal.fire("Cancelled", `it was not deleted.`, "info");
      }
    });
  };
   const columns = [
    { key: "imagePath", label: "Cover Iamge" },
  ];
     const handleToggleStatus = (row) => {
    const newStatus = row.status ?   false : true;
    const token = localStorage.getItem("token");

    const updateHome = {
      status: newStatus,
    };

    axios
      .put(`https://bcknd.tickethub-tours.com/api/admin/homepage/${row.id}`, updateHome, {
        // headers: { Authorization: `Bearer ${token}` },
      })
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
      return (
        <div className="mt-20">
          <Loading/>

        </div>
      );}
  return (
  <div>
      <NavAndSearch stopsearch
        nav="/admin/addhomecover"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ToastContainer/>
      <DynamicTable
        data={data}
        columns={columns}
        filteredData={data} 
        actions={(row) => (
          <div className="flex gap-1">
            <CiEdit
              className="w-[24px] h-[24px] text-green-600 cursor-pointer"
              onClick={() => handleEdit(row.id)}
            />
            <RiDeleteBin6Line
              className="w-[24px] h-[24px] ml-2 text-red-600 cursor-pointer"
              onClick={() => handleDelete(row.id, row.name)}
            />
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

    return null;
  }}
      buttonstatus={(row) => (
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
      />
    </div>  )
}

export default HomeCover