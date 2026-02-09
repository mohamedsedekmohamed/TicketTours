import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navtwo from "../../component/Navtwo";
import Footer from "../Footer";
import Medicall from "../../../assets/Medical.png";
import InputField from "../../../ui/InputField";
import FileUploadButtonArroy from "../../../ui/FileUploadButtonArroy";
import { useNavigate } from "react-router-dom";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { GoogleLogin } from "@react-oauth/google";

const Medical = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [options, setOptions] = useState([]);
  const [describtion, setDescribtion] = useState("");
  const [images, setImages] = useState([]);
        const token = localStorage.getItem("tokenuser");
const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : { name: "", email: "" };
//   useEffect(() => {
//   const savedData = localStorage.getItem("savedFormData");
//   if (savedData) {
//     const parsed = JSON.parse(savedData);
//     setFullName(parsed.fullName || "");
//     setDescribtion(parsed.describtion || "");
//     setPhoneNumber(parsed.phoneNumber || "");
//     setEmail(parsed.email || "");
//     setCategoryIds(parsed.categoryIds || []);
//     setImages(parsed.images || []);
//   }
// }, []);
const [open,setOpen]=useState(false)
const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
 useEffect(() => {
  if (token) {
    setOpen(false);
  }else {
    setOpen(true);
  }
}, [token]);
 const handleLogin = () => {
  axios
    .post("https://bcknd.tickethub-tours.com/api/user/auth/local/login", {
      email: username,
      password: password,
    })
    .then((response) => {
      if (response.data.data.message === "login Successful") {
        localStorage.setItem("tokenuser", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        toast.success("Welcome ");

setOpen(false);
      }
    })
    .catch((error) => {
      const err = error?.response?.data?.error;
      const status = error?.response?.data?.error?.message;

     if (status === "Please verify your email") {
        toast.warn("Please verify your email");
        setTimeout(() => {
          navigate("/signup");
        }, 2000);
        return;
      }

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

  useEffect(() => {
    axios
      .get(`https://bcknd.tickethub-tours.com/api/user/landpage/medicals-categories`)
      .then((response) => {
        setOptions(
          response.data.data.categoriesMedical.map((item) => ({
            id: item.id,
            title: item.title,
          }))
        );
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSelect = (id) => {
    setCategoryIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleSubmit =(e) => {
  e.preventDefault();

    if (!describtion.trim()) return toast.warn("Description is required");
    if (!phoneNumber.trim()) return toast.warn("Phone number is required");
    if (categoryIds.length === 0) return toast.warn("Please select at least one option");
    if (images.length === 0) return toast.warn("Please upload at least one image");


  
   const formData = {
  fullName:user.name ,
  phoneNumber,
  email:user.email,
  describtion,
  categoryIds,
  images: images.map(img => img.imagePath) 
};

    axios
      .post(
        `https://bcknd.tickethub-tours.com/api/user/landpage/create-medical`,
        formData
      )
      .then(() => {
        toast.success("Medical successfully!");
        setFullName("");
        setPhoneNumber("");
        setEmail("");
        setDescribtion("");
        setCategoryIds([]);
        setImages([]);

      })
      .catch(() => toast.error("Something went wrong, please try again"));
  };

  return (
    <div className="relative">
      <Navtwo />
      <div className="bg-nine w-[95%] py-4 mx-auto flex justify-between items-center">
        <span className="text-3xl font-semibold px-5 text-one">
          Medical Tourism
        </span>
        <img src={Medicall} alt="Medicall" className="w-1/2 max-w-xs" />
      </div>

   <div className="min-h-screen flex items-center justify-center p-6">
  <form
    onSubmit={handleSubmit}
    className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 space-y-6"
  >
    {/* Title */}
    <div className="text-center">
      <h1 className="text-3xl font-bold text-one">Add Your Tour Medical</h1>
      <p className="text-gray-500 mt-2 text-sm">
        Fill in the details below to register your medical tour
      </p>
    </div>

    {/* Full Name */}
    <div>
     
        {/* <InputField
          placeholder="Enter your Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        /> */}
    </div>

    {/* Description */}
    <div>
   
      <InputField
        placeholder="Enter Description"
        value={describtion}
        onChange={(e) => setDescribtion(e.target.value)}
      />
    </div>

    {/* Phone Number */}
    <div>
    
      <InputField
        placeholder="Enter Your Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
    </div>

    {/* Email */}
    <div>
  
      {/* <InputField
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /> */}
    </div>

    {/* Options */}
    <div className="bg-gray-50 border rounded-xl p-6">
      <h2 className="text-lg font-semibold text-one mb-4 text-center">
        Choose Options
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => (
          <label
            key={opt.id}
            className="flex items-center gap-2 cursor-pointer bg-white border rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition"
          >
            <input
              type="checkbox"
              checked={categoryIds.includes(opt.id)}
              onChange={() => handleSelect(opt.id)}
              className="form-checkbox text-one"
            />
            <span className="text-gray-700">{opt.title}</span>
          </label>
        ))}
      </div>
    </div>

    {/* File Upload */}
    <div>
     
      <FileUploadButtonArroy
        des="Images the patient's photos"
        kind="Images"
        flag={images}
        onFileChange={setImages}
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-one hover:bg-one/90 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300"
    >
      Submit
    </button>
  </form>
</div>
{open&&(
  <div className="fixed inset-0 z-50 flex items-center justify-center mx-auto  p-4">    
  <div className="bg-white  w-[90%] md:w-[75%] lg:w-[50%] py-3 rounded-2xl border-1 border-one">
      <div className="flex flex-col justify-center gap-2 items-center px-6 md:px-10 w-full">
        <BsArrowRightCircleFill
          className="absolute top-2 text-4xl right-2"
          onClick={() => {
            navigate("/");
          }}
        >
          {">"}
        </BsArrowRightCircleFill>

        <h2 className="text-3xl lg:text-4xl text-one font-semibold mb-2">
You must log in to book.       </h2>
        <p className="text-base lg:text-lg text-gray-700 mb-6">
          Login to your account
        </p>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full max-w-md h-14 border border-one rounded-lg px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-one"
          placeholder="Email"
        />

        <div className="relative w-full max-w-md mb-2">
          <input
            type={showPassword ? "text" : "password"}
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
            {/* {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />} */}
          </button>
        </div>

        {/* Forgot password */}
        <div className="w-full max-w-md text-right mb-4">
          <button
            onClick={() => navigate("/forgotpassword")}
            className="text-sm text-one hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full max-w-md h-14 bg-one text-white rounded-lg font-semibold mb-2 transition-transform hover:scale-95"
        >
          Login
        </button>

        <div className="w-full max-w-md flex items-center gap-2 mb-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">or continue with</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        <span className="text-three font-medium">
          Don't have an account?
          <button
            onClick={() => navigate("/signup")}
            className="text-sm text-one underline"
          >
            Sign Up
          </button>
        </span>

        <div className="w-full max-w-md flex flex-col md:flex-row gap-4">
         <div className="  w-full">
  <GoogleLogin
  onSuccess={async (credentialResponse) => {
    try {
      const token = credentialResponse.credential; 
      console.log("Raw Token:", token);

      const res = await fetch("https://bcknd.tickethub-tours.com/api/user/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        throw new Error("فشل تسجيل الدخول في الباك اند");
      }

      const data = await res.json(); 
         localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("tokenuser", data.token);
navigate("/")
    } catch (err) {
      console.error("Error:", err.message);
    }
  }}
  onError={() => {
    console.log("فشل تسجيل الدخول");
  }}
/>

    </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    </div>
)}
<ToastContainer/>
      <Footer />
    </div>
  );
};

export default Medical;
