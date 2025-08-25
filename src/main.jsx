import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="328332346966-kicfbsv0c9bn2deb2i56ii18nh9doo14.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
