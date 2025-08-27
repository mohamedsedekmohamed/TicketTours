import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { IoPersonCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from "react-icons/hi";
import { TbBrandGmail } from "react-icons/tb";

const AdminNavbar = ({setIsLoggedIn}) => {
  // const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("https://bcknd.tickethub-tours.com/api/admin/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((response) => {
      const user = response.data.data.admin;
      if (user) {
        setName(user.name || "");
        setEmail(user.email || "");
      }
    })
  }, []);

const loghandled = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("groupedPrivileges");
  setIsLoggedIn(false);
  navigate("/");
};

  return (
    <div className="w-full flex justify-between items-center relative">
      <div className='flex items-center gap-0.5'>
     
      <div className='flex flex-col'>
            <span className='text-[12px] md:text-2xl font-bold text-one'> {name}</span>
        <div className='flex items-center text-one/80 gap-0.5'>
          <TbBrandGmail className='text-2xl'/>
          <span className='text-[12px] md:text-[14px] font-bold text-one/80'>{email}</span>
        </div>
      </div>
      </div>

      <div className='flex items-center gap-0.5'>
       

        <button onClick={() => navigate('/admin/information')}>
          <IoPersonCircleSharp className='text-[12px] md:text-2xl text-one' />
        </button>
   <button onClick={loghandled}>
  <HiOutlineLogout className='text-[12px] md:text-2xl text-one' />
</button>



      </div>
 


    </div>
  );
}

export default AdminNavbar;
