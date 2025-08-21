// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const GoogleAuthHandler = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get("token");

//     if (token) {
//       localStorage.setItem("token", token);
//       toast.success("Logged in with Google ✅");
//       navigate("/", { replace: true });
//     } else {
//       toast.error("No token found from Google login ❌");
//       navigate("/login", { replace: true });
//     }
//   }, [navigate]);

//   return (
//     <div className="w-screen h-screen flex items-center justify-center">
//       <p className="text-lg text-gray-600">Processing Google login...</p>
//     </div>
//   );
// };
 

// export default GoogleAuthHandler;



// import React, { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";

// const GoogleAuthHandler = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     // التحقق من وجود التوكن في الـ URL
//     const params = new URLSearchParams(location.search);
//     const token = params.get("token");
    
//     if (token) {
//       try {
//         // حفظ التوكن
//         localStorage.setItem("token", token);
        
//         // محاولة الحصول على بيانات المستخدم من الـ API
//         fetchUserData(token);
        
//         toast.success("Welcome! Logged in successfully with Google 🎉");
        
//         // تنظيف الـ URL من التوكن
//         window.history.replaceState({}, document.title, window.location.pathname);
        
//         // التوجه للصفحة الرئيسية بعد ثانية
//         setTimeout(() => {
//           navigate("/", { replace: true });
//         }, 1000);
        
//       } catch (error) {
//         console.error("Error processing Google auth:", error);
//         toast.error("Error processing authentication data");
//         navigate("/login", { replace: true });
//       }
//     } else {
//       const existingToken = localStorage.getItem("token");
//       if (existingToken) {
//         navigate("/", { replace: true });
//       } else {
//         // لا يوجد توكن، اذهب للتسجيل
//         navigate("/login", { replace: true });
//       }
//     }
//   }, [navigate, location]);

//   const fetchUserData = async (token) => {
//     try {
//       const response = await fetch("https://bcknd.tickethub-tours.com/api/user/profile", {
//         headers: {
//           "Authorization": `Bearer ${token}`
//         }
//       });
      
//       if (response.ok) {
//         const userData = await response.json();
//         localStorage.setItem("user", JSON.stringify(userData.data));
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   return (
//     <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
//       <div className="text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//         <p className="text-lg text-gray-600">Processing Google login...</p>
//         <p className="text-sm text-gray-500 mt-2">Please wait...</p>
//       </div>
//     </div>
//   );
// };

// export default GoogleAuthHandler;

import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleAuthHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // نجيب الـ query parameters
    const params = new URLSearchParams(location.search);
const token = params.get("token");
const email = params.get("email");
const name = params.get("name");

    if (token) {
      try {
        // حفظ التوكن في localStorage
        localStorage.setItem("token", token);

        toast.success("Welcome! Logged in successfully with Google 🎉");

        window.history.replaceState({}, document.title, window.location.pathname);

        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);

      } catch (error) {
        console.error("Error processing Google auth:", error);
        toast.error("Error processing authentication data");
        navigate("/login", { replace: true });
      }
    } else {
      // لو مفيش token في الـ URL
      const existingToken = localStorage.getItem("token");
      if (existingToken) {
        navigate("/", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [navigate, location]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Processing Google login...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait...</p>
      </div>
    </div>
  );
};

export default GoogleAuthHandler;
