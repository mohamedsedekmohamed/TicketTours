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
      const [data, setData] = useState([]);
      const [loading, setLoading] = useState(true);
      const [searchQuery, setSearchQuery] = useState("");
      const navigate = useNavigate();
      const [selectedFilter, setSelectedFilter] = useState("");
      const [update, setUpdate] = useState(false);
        useEffect(() => {
    axios
      .get(`https://tickethub-tours.com/api/admin/admins`, {
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
    { key: "imagePath", label: "Image" },
  ];
   const handleEdit = (id) => {
    navigate("/admin/addroles", { state: { sendData: id } });
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
          .delete(`https://tickethub-tours.com/api/admin/admins/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
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

    return matchesSearch;
  });
    const handleToggleStatus = (row) => {
//     const newStatus = row.status === "active" ? "disabled" : "active";
//     const token = localStorage.getItem("token");

//     const updatedPopup = {
//       title: row.title,
//       startDate: row.startDate,
//       endDate: row.endDate,
//       status: newStatus,
//     };

//     axios
//       .put(`https://app.15may.club/api/admin/popups/${row.id}`, updatedPopup, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(() => {
//         toast.success(t("Statusupdatedsuccessfully"));
//   setTimeout(() => {
//           setUpdate((prev) => !prev);
//   }, 1000);
//       })
//       .catch(() => {
//         toast.error(t("Statuswasnotupdatedsuccessfully"));
//       });
  };
 if (loading) {
      return (
          <Loading/>
      );}
  return (
 <div>
      <NavAndSearch
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
          key === "imagePath" ? (
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
                checked={row.isSuperAdmin}
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

export default Roles