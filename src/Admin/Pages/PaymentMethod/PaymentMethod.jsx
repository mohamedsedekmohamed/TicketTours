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
      .get(`https://tickethub-tours.com/api/admin/paymentmethod`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then((response) => {
        setData(
          response.data.data.methods.map((item) => ({
            id: item.id,
            name: item.name,
            type: item.type,
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
   const columns = [
    { key: "name", label: "Name" },
    { key: "type", label: "Type " },
  ];
  return (
    <div>PaymentMethod</div>
  )
}

export default PaymentMethod