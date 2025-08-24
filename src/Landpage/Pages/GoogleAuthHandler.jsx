import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const GoogleAuthHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const name = searchParams.get("name");

    if (token) {
      // Save auth data
      localStorage.setItem("authToken", token);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", name);

      // Redirect to dashboard or home
      navigate("/dashboard");
    } else {
      // If no token, send back to login
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return <p>Signing you in with Google...</p>;
};

export default GoogleAuthHandler;
