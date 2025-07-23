import React, { useEffect, useState } from "react";
import DynamicTable from '../../component/DynamicTable';
import { useNavigate } from "react-router-dom";import NavAndSearch from '../../component/NavAndSearch'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loading from '../../../ui/Loading'
import Swal from "sweetalert2";

const PromoCodes = () => {
  //   const [searchQuery, setSearchQuery] = useState("");
  // const [data, setData] = useState([]);
  //     const [loading, setLoading] = useState(true);
  //       const [searchQuery, setSearchQuery] = useState("");
  // const navigate = useNavigate();
  //  if (Loading) {
  //     return (
  //       <Loader/>
  //     );}
  return (
    <div>
      <NavAndSearch nav="/admin/addpromocodes" />
      {/* <NavAndSearch nav="/admin/addpromocodes" searchQuery={searchQuery} setSearchQuery={setSearchQuery}/> */}
    </div>
  )
}
export default PromoCodes