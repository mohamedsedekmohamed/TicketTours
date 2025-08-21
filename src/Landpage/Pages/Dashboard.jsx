import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    // استخرج التوكن + البيانات من الـ URL
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const email = decodeURIComponent(params.get("email") || "");
    const name = decodeURIComponent(params.get("name") || "");

    if (token) {
      try {
        // حفظ التوكن واليوزر
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ email, name }));

        setUser({ email, name });

        toast.success("Welcome! Logged in successfully 🎉");

        // شيل الـ query من الـ URL بعد ما نخزن
        window.history.replaceState({}, document.title, "/dashboard");
      } catch (error) {
        console.error("Error processing auth:", error);
        toast.error("Error processing authentication data");
        navigate("/", { replace: true });
      }
    } else {
      // لو مفيش توكن في الـ URL، شوف localStorage
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (savedToken && savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [location, navigate]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      {user ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">
            Welcome, {user.name} 👋
          </h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      ) : (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
