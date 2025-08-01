import './App.css'
import Home from './Landpage/Pages/Home/Home';
import Contactus from './Landpage/Pages/Contactus';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import  Aboutus  from './Landpage/Pages/Aboutus';
import  Login  from './Admin/Pages/Login';
import  Signup  from './Landpage/Pages/Signup';
import { useEffect, useState } from 'react';
import AppRoutes from './Routes/AppRoutes';
import Local from './Landpage/Pages/Trips/Local'
import International from './Landpage/Pages/Trips/International'
import Religious from './Landpage/Pages/Trips/Religious'
import Medical from './Landpage/Pages/Trips/Medical'
import TripDetails from './Landpage/Pages/TripDetails'
import Loginuser from './Landpage/Pages/Loginuser'
import ForgotPasswordFlow from './Landpage/Pages/ForgotPasswordFlow'
// import Code from './Landpage/Pages/Code'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const stored = sessionStorage.getItem("isLoggedIn");
    return stored === "true";
  });
  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
  }, [isLoggedIn]);

  return (
<div className='max-w-screen overflow-hidden'>
 <Router>
      <Routes>
                  {!isLoggedIn ? (
            <>

        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Home />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/loginadmin" element={<Login   setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/login" element={<Loginuser  />} />
        <Route path="/signup" element={<Signup  />} />
        <Route path="/localtourism" element={<Local/>} />
        <Route path="/internationaltourism" element={<International />} />
        <Route path="/religioustourism" element={<Religious />} />
        <Route path="/medicalTtourism" element={<Medical />} /> 
        <Route path="/tripdetails" element={<TripDetails />} /> 
        <Route path="/forgotpassword" element={<ForgotPasswordFlow />} /> 
        {/* <Route path="/code" element={<Code />} />  */}
                          </>
    ):(
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
  )
}

export default App
