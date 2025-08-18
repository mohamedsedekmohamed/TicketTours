// src/pages/AuthSuccess.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // (اختياري) ممكن تجيب بيانات اليوزر من API بالـ token
      // axios.get("/api/user/me", { headers: { Authorization: `Bearer ${token}` } })

      // بعد التخزين رجّع المستخدم للصفحة الرئيسية أو أي صفحة Dashboard
      navigate("/");
    }
  }, [navigate]);

  return <p>  Loading ...</p>;
}

export default AuthSuccess;
