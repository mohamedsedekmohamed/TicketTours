import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import content from '../../assets/content.png';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { BsArrowRightCircleFill } from "react-icons/bs";

const Signup = () => {
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

//   const handleSignup = () => {
//     if (!phone || !userType) {
//       toast.error('Please enter phone number and select user type');
//       return;
//     }

//     // Simulate signup
//     toast.success('Signup successful!');
//     setTimeout(() => {
//       navigate('/admin/home'); // Or any route you want to go to
//     }, 2000);
//   };

  return (
    <div className="w-screen h-screen flex gap-1 bg-white">
      {/* Left image */}
      <div className="hidden md:flex w-full max-w-1/2 h-full">
        <img src={content} alt="Illustration" className="w-full h-full object-cover" />
      </div>

      {/* Form */}
      <div className="flex flex-col justify-center gap-2 items-center relative px-6 md:px-10 w-full">
              <BsArrowRightCircleFill className='absolute top-2 text-4xl right-2' onClick={()=>{navigate(-1)}}>{">"}</BsArrowRightCircleFill>
            <h2 className="text-3xl lg:text-4xl text-one font-semibold mb-2">Create Account</h2>
        {/* <p className="text-base lg:text-lg text-gray-700 mb-6">Sign up with your phone</p>

        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full max-w-md h-14 border border-one rounded-lg px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-one"
          placeholder="Phone Number"
        />

        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="w-full max-w-md h-14 border border-one rounded-lg px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-one text-gray-600"
        >
          <option value="">Select User Type</option>
          <option value="Man">Man</option>
          <option value="Woman">Woman</option>
        </select>

        <button
          onClick={handleSignup}
          className="w-full max-w-md h-14 bg-one text-white rounded-lg font-semibold mb-4 transition-transform hover:scale-95"
        >
          Sign Up
        </button>

        <div className="w-full max-w-md flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">or continue with</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div> */}

        {/* Social buttons */}
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
};

export default Signup;
