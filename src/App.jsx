import "./App.css";
import Home from "./Landpage/Pages/Home/Home";
import Contactus from "./Landpage/Pages/Contactus";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Aboutus from "./Landpage/Pages/Aboutus";
import Login from "./Admin/Pages/Login";
import Signup from "./Landpage/Pages/Signup";
import { useEffect, useState } from "react";
import AppRoutes from "./Routes/AppRoutes";
import Local from "./Landpage/Pages/Trips/Local";
import International from "./Landpage/Pages/Trips/International";
import Religious from "./Landpage/Pages/Trips/Religious";
import Medical from "./Landpage/Pages/Trips/Medical";
import TripDetails from "./Landpage/Pages/Booking/TripDetails";
import Loginuser from "./Landpage/Pages/Loginuser";
import ForgotPasswordFlow from "./Landpage/Pages/ForgotPasswordFlow";
import CompleteBooking from '../src/Landpage/Pages/Booking/CompleteBooking'
import ProfileUser from './Landpage/Pages/ProfileUser'
import GoogleAuthHandler from './Landpage/Pages/GoogleAuthHandler'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const stored = sessionStorage.getItem("isLoggedIn");
    return stored === "true";
  });
  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
  }, [isLoggedIn]);

  return (
    <div className="max-w-screen overflow-hidden">
      <Router>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/*" element={<Home />} />
              <Route path="/contactus" element={<Contactus />} />
              <Route path="/aboutus" element={<Aboutus />} />
              <Route
                path="/loginadmin"
                element={<Login setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route path="/auth/google/:id" element={<GoogleAuthHandler />} />
              <Route path="/login" element={<Loginuser />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/localtourism" element={<Local />} />
              <Route path="/internationaltourism" element={<International />} />
              <Route path="/religioustourism" element={<Religious />} />
              <Route path="/medicaltourism" element={<Medical />} />
              <Route path="/tripdetails/:id" element={<TripDetails />} />
              <Route path="/forgotpassword" element={<ForgotPasswordFlow />} />
              <Route path="/completebooking/:id" element={<CompleteBooking />} />
              <Route path="/profileuser" element={<ProfileUser />} />
            </>
          ) : (
            <>
              <Route
                path="/*"
                element={<AppRoutes setIsLoggedIn={setIsLoggedIn} />}
              />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
