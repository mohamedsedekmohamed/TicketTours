import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import content from "../../assets/content.png";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signup = () => {
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href =
      "https://bcknd.tickethub-tours.com/api/user/auth/google";
  };

  const handleLogin = () => {
    if (!name) {
      toast.error("Name is required");
      return;
    }
    if (phone.length < 9) {
      toast.error("Phone number must be at least 9 digits");
      return;
    }
    if (!username.includes("@gmail.com")) {
      toast.error("Email should contain @gmail.com");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    axios
      .post("https://bcknd.tickethub-tours.com/api/user/auth/local/signup", {
        email: username,
        password,
        name,
        phoneNumber: phone,
      })
      .then((response) => {
        if (
          response.data.data.message ===
          "User Signup Successfully Go Verify Email"
        ) {
          localStorage.setItem("token", response.data.data.token);
          toast.success(`Welcome ${name} `);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      })
      .catch((error) => {
        const err = error?.response?.data?.error;

        if (err?.details && Array.isArray(err.details)) {
          err.details.forEach((detail) => {
            toast.error(`${detail.field}: ${detail.message}`);
          });
        } else if (err?.message) {
          toast.error(err.message);
        } else {
          toast.error("Something went wrong.");
        }
      });
  };

  return (
    <div className="w-screen h-screen flex gap-1 bg-white">
      {/* Left image */}
      <div className="hidden md:flex w-full max-w-1/2 h-full">
        <img
          src={content}
          alt="Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form */}
      {/* Form Section */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 px-4 sm:px-6 lg:px-12 py-8">
        <BsArrowRightCircleFill
          className="absolute top-2 right-2 text-3xl text-one cursor-pointer"
          onClick={() => navigate(-1)}
        />

        <h2 className="text-2xl sm:text-3xl md:text-4xl text-one font-semibold mb-2">
          Create New Account
        </h2>
        <p className="text-base text-gray-600 mb-6">Sign Up</p>

        {/* Full Name */}
        <div className="w-full max-w-md flex flex-col gap-2 mb-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 border border-one rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-one"
            placeholder="Enter your full name"
          />
        </div>

        {/* Phone */}
        <div className="w-full max-w-md flex flex-col gap-2 mb-2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-12 border border-one rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-one"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Email */}
        <div className="w-full max-w-md flex flex-col gap-2 mb-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-12 border border-one rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-one"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className="w-full max-w-md flex flex-col gap-2 mb-2 relative">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 border border-one rounded-lg px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-one"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[64%] right-4 transform -translate-y-1/2 text-gray-600"
          >
            {/* {showPassword ? <FiEyeOff /> : <FiEye />} */}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="w-full max-w-md text-right mb-4">
          <button
            onClick={() => navigate("/forgotpassword")}
            className="text-sm text-one hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleLogin}
          className="w-full max-w-md h-12 bg-one text-white rounded-lg font-semibold mb-4 transition-transform hover:scale-95"
        >
          Sign Up
        </button>

        {/* Social Buttons */}
        <div className="w-full max-w-md flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">or continue with</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <div className="w-full max-w-md flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg w-full hover:bg-gray-100 transition"
          >
            <FaGoogle size={18} />
            <span className="text-sm font-medium">Continue with Google</span>
          </button>

          <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg w-full hover:bg-gray-100 transition">
            <FaFacebookF size={18} />
            <span className="text-sm font-medium">Continue with Facebook</span>
          </button>
        </div>

        <span className="text-sm text-three font-medium">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-one underline"
          >
            Login
          </button>
        </span>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Signup;
