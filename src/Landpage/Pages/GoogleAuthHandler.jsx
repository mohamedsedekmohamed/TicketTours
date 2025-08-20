import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleAuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      toast.success("Logged in with Google ✅");
      navigate("/", { replace: true });
    } else {
      toast.error("No token found from Google login ❌");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <p className="text-lg text-gray-600">Processing Google login...</p>
    </div>
  );
};
 

export default GoogleAuthHandler;
