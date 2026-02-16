import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { IoPersonCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from "react-icons/hi";
import { TbBrandGmail } from "react-icons/tb";
import { IoNotificationsSharp } from "react-icons/io5";

const AdminNavbar = ({setIsLoggedIn ,unseenCount}) => {
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

      <div className='flex items-center gap-1 px-4 lg:gap-4'>
       
        <button 
          onClick={() => navigate('/admin/notifications')}
          className="relative p-1" // إضافة relative و padding بسيط
        >
          <IoNotificationsSharp className='text-[18px] md:text-2xl text-one' />
          
          {/* إظهار العداد فقط إذا كان أكبر من 0 */}
          {unseenCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] md:text-[11px] font-bold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full border-2 border-white animate-pulse">
              {unseenCount > 99 ? '99+' : unseenCount}
            </span>
          )}
        </button>
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
