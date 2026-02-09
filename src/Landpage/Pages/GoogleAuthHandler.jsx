import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const GoogleAuthHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("tokenuser");
    const email = searchParams.get("email");
    const name = searchParams.get("name");

    if (token) {
      localStorage.setItem("authToken", token);
      if (email) localStorage.setItem("userEmail", email);
      if (name) localStorage.setItem("userName", name);

      navigate("/"); 
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return <p>Signing you in with Google...</p>;
};

export default GoogleAuthHandler;
