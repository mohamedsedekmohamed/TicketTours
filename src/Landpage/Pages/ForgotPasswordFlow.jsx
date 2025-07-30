import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import content from "../../assets/content.png";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ForgotPasswordFlow = () => {
  const navigate = useNavigate();
  const CODE_LENGTH = 6;

  const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: New Password
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(new Array(CODE_LENGTH).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [timer, setTimer] = useState(60);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const handleSendCode = async () => {
    if (!email.includes("@gmail.com")) {
      toast.error("Email should contain @gmail.com");
      return;
    }

    try {
      const response = await axios.post(
        "https://bcknd.tickethub-tours.com/api/user/auth/local/forget-password",
        { email }
      );

      if (response.data?.data?.message === "code sent succefully") {
        toast.success("Code sent successfully");
        setStep(2);
        setTimer(60);
        setCode(new Array(CODE_LENGTH).fill(""));
      }
    } catch (error) {
      const err = error?.response?.data?.error;
      if (err?.details && Array.isArray(err.details)) {
        err.details.forEach((detail) =>
          toast.error(`${detail.field}: ${detail.message}`)
        );
      } else {
        toast.error(err?.message || "Something went wrong");
      }
    }
  };

  const handleChangeCode = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (index < CODE_LENGTH - 1) {
        inputsRef.current[index + 1].focus();
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
        "https://bcknd.tickethub-tours.com/api/user/auth/local/verify-code",
        { email, code: enteredCode }
      );
      toast.success("Code verified successfully!");
      setStep(3);
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message || "Verification failed"
      );
    }
  };

  const handleResetPassword = async () => {
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "https://bcknd.tickethub-tours.com/api/user/auth/local/reset-password",
        { email, password }
      );
      toast.success("Password reset successfully!");
      setTimeout(() => {
        navigate("/"); // بعد النجاح ترجع للـ Login
      }, 1500);
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || "Reset failed");
    }
  };

  const handleResendCode = async () => {
    try {
      await axios.post(
        "https://bcknd.tickethub-tours.com/api/user/auth/local/forget-password",
        { email }
      );
      toast.success("Verification code resent!");
      setTimer(60);
      setCode(new Array(CODE_LENGTH).fill(""));
    } catch (error) {
      const err = error?.response?.data?.error;
      if (err?.details) {
        err.details.forEach((detail) =>
          toast.error(`${detail.field}: ${detail.message}`)
        );
      } else {
        toast.error(err?.message || "Something went wrong.");
      }
    }
  };

  return (
    <div className="w-screen h-screen flex gap-1 bg-white">
      <ToastContainer />
      <div className="hidden md:flex w-full max-w-1/2 h-full">
        <img src={content} alt="content" className="w-full h-full" />
      </div>

      <div className="flex flex-col items-center justify-center w-full md:w-1/2 px-6 md:px-10 gap-5">
        <BsArrowRightCircleFill
          className="absolute top-2 right-2 text-3xl text-one cursor-pointer"
          onClick={() => navigate(-1)}
        />

        {step === 1 && (
          <>
            <h2 className="text-3xl font-semibold text-one">Forgot Password?</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Enter your email and we'll send you a verification code.
            </p>
            <div className="w-full max-w-md">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full h-12 border border-one rounded-lg px-4 mt-1"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              onClick={handleSendCode}
              className="w-full max-w-md h-12 bg-one text-white rounded-lg font-semibold hover:scale-95 transition"
            >
              Send Code
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-semibold text-one">Enter Verification Code</h2>
            <p className="text-sm text-gray-500">
              Code sent to <span className="text-blue-500">{email}</span>
            </p>

            <div className="flex justify-center gap-3">
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

            <p className="text-sm text-gray-400">
              Retry After {String(Math.floor(timer / 60)).padStart(2, "0")}:
              {String(timer % 60).padStart(2, "0")}
            </p>

            <button
              onClick={handleVerifyCode}
              className="w-full max-w-md h-12 bg-one text-white rounded-lg font-semibold"
            >
              Verify Code
            </button>

            <p className="text-sm text-gray-500">
              Didn’t receive the code?{" "}
              <button
                className="text-one underline"
                onClick={handleResendCode}
                disabled={timer > 0}
              >
                Resend
              </button>
            </p>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-semibold text-one">Reset Password</h2>
            <div className="w-full max-w-md flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 border border-one rounded-lg px-4"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-12 border border-one rounded-lg px-4"
                  placeholder="Confirm new password"
                />
              </div>
              <button
                onClick={handleResetPassword}
                className="w-full h-12 bg-one text-white rounded-lg font-semibold"
              >
                Reset Password
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordFlow;
