import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { IoHeartSharp } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import content from '../../assets/content.png'
import { BsArrowRightCircleFill } from "react-icons/bs";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // const togglePasswordVisibility = () => setShowPassword(!showPassword);
useEffect(()=>{
  localStorage.removeItem('token');

},[])
  const handleLogin = () => {
  if(username==="1"&&password==='1')
 {
     setIsLoggedIn(true)
     setTimeout(() => {
        setIsLoggedIn(true);
        navigate('/admin/home');
      }, 3000);
 }
    //   axios.post('https://backndVoo.voo-hub.com/api/login', { 
    //     email: username, 
    //     password: password 
    //   })
    //   .then(response => {
    //     if (response.data.user.role=== "admin") {
    //       localStorage.setItem('token', response.data.token);
    //       toast.success("Welcome !");
       
    //       setTimeout(() => {
    //         setIsLoggedIn(true);
    //         setorganiztionLayout(false);
    //         navigate('/admin/home');
    //       }, 3000); 
    //     } else if (response.data.user.role === "organization") {
    //       toast.success("Welcome !");
    //           localStorage.setItem('token', response.data.token);

    //       setTimeout(() => {
    //         setIsLoggedIn(true);
    //         setorganiztionLayout(true);
    //         navigate('/organiztion/user');
    //       }, 3000);         
    //     }
    //   })
    //   .catch(() => {
    //     toast.error('Connection failed');
    //   });
  };
  
  

    return (
    <div className="w-screen h-screen flex gap-1  bg-white">
      {/* Left Side: Form */}  <div className="hidden md:flex w-full max-w-1/2 h-full ">
              <img src={content} alt="Logo" className="w-full h-full " />

      </div>
     <div className="flex flex-col justify-center gap-2 items-center px-6 md:px-10 w-full">
              <BsArrowRightCircleFill className='absolute top-2 text-4xl right-2' onClick={()=>{navigate(-1)}}>{">"}</BsArrowRightCircleFill>
      
  <h2 className="text-3xl lg:text-4xl text-one font-semibold mb-2">Welcome back</h2>
  <p className="text-base lg:text-lg text-gray-700 mb-6">Login to your account</p>

  <input
    type="text"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    className="w-full max-w-md h-14 border border-one rounded-lg px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-one"
    placeholder="Email"
  />

  <div className="relative w-full max-w-md mb-2">
    <input
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full h-14 border border-one rounded-lg px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-one"
      placeholder="Password"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600"
    >
      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
    </button>
  </div>

  {/* Forgot password */}
  <div className="w-full max-w-md text-right mb-4">
    <button
      onClick={() => navigate('/forgot-password')}
      className="text-sm text-one hover:underline"
    >
      Forgot Password?
    </button>
  </div>

  {/* Login button */}
  <button
    onClick={handleLogin}
    className="w-full max-w-md h-14 bg-one text-white rounded-lg font-semibold mb-4 transition-transform hover:scale-95"
  >
    Login
  </button>

  {/* Divider */}
  <div className="w-full max-w-md flex items-center gap-2 mb-4">
    <div className="flex-1 h-px bg-gray-300" />
    <span className="text-sm text-gray-500">or continue with</span>
    <div className="flex-1 h-px bg-gray-300" />
  </div>

  {/* Social login buttons */}
  <div className="w-full max-w-md flex flex-col md:flex-row gap-4">
    <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg w-full hover:bg-gray-100 transition">
      <FaGoogle size={18} />
      <span className="text-sm font-medium">Continue with Google</span>
    </button>

    <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg w-full hover:bg-gray-100 transition">
      <FaFacebookF size={18} />
      <span className="text-sm font-medium">Continue with Facebook</span>
    </button>
  </div>
</div>

     

      <ToastContainer />
    </div>
  );
}

export default Login;
