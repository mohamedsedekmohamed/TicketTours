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
const PaymentMethod = () => {
    
         const [data, setData] = useState([]);
          const [loading, setLoading] = useState(true);
          const [searchQuery, setSearchQuery] = useState("");
          const navigate = useNavigate();
          const [selectedFilter, setSelectedFilter] = useState("");
          const [update, setUpdate] = useState(false);
                useEffect(() => {
    axios
      .get(`https://bcknd.tickethub-tours.com/api/admin/paymentmethod`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then((response) => {
        setData(
          response.data.data.methods.map((item) => ({
            id: item.id,
            name: item.name,
            describtion: item.describtion,
            status: item.status  ,
            logoPath: item.logoPath  ,
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
    { key: "describtion", label: "Describtion " },
    { key: "logoPath", label: "Image " },
  ];
     const handleEdit = (id) => {
    navigate("/admin/addpaymentmethod", { state: { sendData: id } });
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
          .delete(`https://bcknd.tickethub-tours.com/api/admin/paymentmethod/${userId}`, {
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
     const handleToggleStatus = (row) => {
    const newStatus = row.status ?   false : true;
    const token = localStorage.getItem("token");

    const updateHome = {
      status: newStatus,
    };

    axios
      .put(`https://bcknd.tickethub-tours.com/api/admin/paymentmethod/${row.id}`, updateHome, {
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
        <div className="">
          <Loading/>
        </div>
      );}
  return (
 <div>
      <NavAndSearch
        nav="/admin/addpaymentmethod"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ToastContainer/>
      <DynamicTable
        data={data}
        columns={columns}
        filteredData={filteredData} 
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
         customRender={(key, value) =>
          key === "logoPath" ? (
           <div className={`flex justify-start`}>
             <img
              src={value}
              alt="popup"
              className="w-16 h-16 object-cover rounded"
            />
           </div>
          ) : null
        }
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
    </div>   )
}

export default PaymentMethod