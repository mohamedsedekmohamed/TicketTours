import React, { useEffect, useState } from "react";
import DynamicTable from "../../../component/DynamicTable";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loading from "../../../../ui/Loading";
import Swal from "sweetalert2";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
const Contact = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const groupedPrivileges =
    JSON.parse(localStorage.getItem("groupedPrivileges")) || {};
  const Privileges =
    groupedPrivileges["Home Page Faq"]?.map((p) => p.action) || [];
      const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://bcknd.tickethub-tours.com/api/admin/contactus/contact`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(
          response.data.data.messages.map((item) => ({
            name: item.name,
            email: item.email,
            phone: item.phone,
            message: item.message,
          }))
        );
        setLoading(false);
      })
      .catch(() => {
         setLoading(false);
      });
  }, []);
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
  ];


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
      <div className="mt-20">
        <Loading />
      </div>
    );
  }
  return (
    <div>

      <DynamicTable
        data={data}
        columns={columns}
        filteredData={filteredData}
 view={(row) => (
  <button
    onClick={() =>
      Swal.fire({
        title: "Message",
        text: row.message,
        confirmButtonText: "Close",
      })
    }
    className="text-one underline"
  >
    View Message
  </button>
)}
      />
    </div>
  );
};

export default Contact;
