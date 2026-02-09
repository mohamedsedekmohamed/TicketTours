import React, { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import content from "../../assets/content.png";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { GoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const CODE_LENGTH = 6;
  const [step, setStep] = useState(1);
  const [code, setCode] = useState(new Array(CODE_LENGTH).fill(""));
  const inputsRef = useRef([]);

  // ✅ إدخال رقم برقم + Backspace
  const handleChangeCode = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newCode = [...code];

    if (value) {
      newCode[index] = value;
      setCode(newCode);
      if (index < CODE_LENGTH - 1) {
        inputsRef.current[index + 1].focus();
      }
    } else {
      newCode[index] = "";
      setCode(newCode);

      if (
        e.nativeEvent.inputType === "deleteContentBackward" &&
        index > 0
      ) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  // ✅ دعم الكوبي-بيست
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, CODE_LENGTH);
    if (/^\d+$/.test(paste)) {
      const newCode = paste.split("");
      while (newCode.length < CODE_LENGTH) newCode.push("");
      setCode(newCode);
      newCode.forEach((digit, idx) => {
        if (inputsRef.current[idx]) {
          inputsRef.current[idx].value = digit;
        }
      });
      if (inputsRef.current[CODE_LENGTH - 1]) {
        inputsRef.current[CODE_LENGTH - 1].focus();
      }
    }
  };

  const handleVerifyCode = async () => {
    const enteredCode = code.join("");
    if (enteredCode.length < CODE_LENGTH) {
      toast.error("Please enter the full code");
      return;
    }

    try {
      await axios.post(
        "https://bcknd.tickethub-tours.com/api/user/auth/local/verify-email",
        { userId, code: enteredCode }
      );
      toast.success("Code verified successfully!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message || "Verification failed"
      );
    }
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
        if (response.data.success === true) {
          setStep(2);
          setUserId(response.data.data.userId);
          toast.success(`Welcome ${name} `);
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
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 px-4 sm:px-6 lg:px-12 py-8">
        <BsArrowRightCircleFill
          className="absolute top-2 right-2 text-3xl text-one cursor-pointer"
          onClick={() => navigate("/")}
        />
        {step === 1 && (
          <>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-one font-semibold mb-2">
              Create New Account
            </h2>
            <p className="text-base text-gray-600 mb-6">Sign Up</p>

            {/* Full Name */}
            <div className="w-full max-w-md flex flex-col gap-2 mb-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 border border-one rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-one"
                placeholder="Enter your full name"
              />
            </div>

            {/* Phone */}
            <div className="w-full max-w-md flex flex-col gap-2 mb-2">
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 border border-one rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-one"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Email */}
            <div className="w-full max-w-md flex flex-col gap-2 mb-2">
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 border border-one rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-one"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="w-full max-w-md flex flex-col gap-2 mb-2 relative">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border border-one rounded-lg px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-one"
                placeholder="Enter your password"
              />
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
              className="w-full max-w-md h-12 py-3 bg-one text-white rounded-lg font-semibold mb-4 transition-transform hover:scale-95"
            >
              Sign Up
            </button>
            <div className="w-full max-w-md flex flex-col md:flex-row gap-4">
         <div className="  w-full">
  <GoogleLogin
  onSuccess={async (credentialResponse) => {
    try {
      const token = credentialResponse.credential; 

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
          </>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-one">
              Enter Verification Code
            </h2>
            <p className="text-sm text-gray-500">
              Code sent to <span className="text-blue-500">{username}</span>
            </p>

            <div
              className="flex justify-center gap-3"
              onPaste={handlePaste} // ✅ لصق الكود
            >
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChangeCode(e, index)}
                  ref={(el) => (inputsRef.current[index] = el)}
                  className="w-12 h-12 text-center text-xl border border-gray-600 rounded-lg"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyCode}
              className="w-full max-w-md h-12 bg-one text-white rounded-lg font-semibold"
            >
              Verify Code
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
