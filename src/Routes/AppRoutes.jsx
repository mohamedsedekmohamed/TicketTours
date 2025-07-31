import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from '../Admin/Layouts/AdminLayout.jsx'
import Home from "../Admin/Pages/Home/Home.jsx";
import CategoriesManagement from "../Admin/Pages/CategoriesManagement/CategoriesManagement.jsx";
import ToursManagement from "../Admin/Pages/ToursManagement/ToursManagement.jsx";
import AddToursManagement from "../Admin/Pages/ToursManagement/AddToursManagement.jsx";
import UsersManagement from "../Admin/Pages/UsersManagement/UsersManagement.jsx";
import AddUsersManagement from "../Admin/Pages/UsersManagement/AddUsersManagement.jsx";
import PromoCodes from "../Admin/Pages/PromoCodes/PromoCodes.jsx";
import AddPromoCode from "../Admin/Pages/PromoCodes/AddPromoCode.jsx";
import FinancialSection from "../Admin/Pages/FinancialSection/FinancialSection.jsx";
import BookingsManagement from "../Admin/Pages/BookingsManagement/BookingsManagement.jsx";
import AddCategoriesManagement from "../Admin/Pages/CategoriesManagement/AddCategoriesManagement.jsx";
import AddFinancialSection from '../Admin/Pages/FinancialSection/AddFinancialSection.jsx'
import AddCurrencies from '../Admin/Pages/Currencies/AddCurrencies.jsx'
import Currencies from '../Admin/Pages/Currencies/Currencies.jsx'
import Extras from '../Admin/Pages/Extras/Extras.jsx'
import AddExtras from '../Admin/Pages/Extras/AddExtras.jsx'
import Roles from '../Admin/Pages/Roles/Roles.jsx';
import AddRoles from '../Admin/Pages/Roles/AddRoles.jsx';
import AddCounty from '../Admin/Pages/Country/AddCountry.jsx'
import County from '../Admin/Pages/Country/Country.jsx'
import City from '../Admin/Pages/City/City.jsx'
import AddCity from '../Admin/Pages/City/AddCity.jsx'
import FrontWebsiteManagement from '../Admin/Pages/FrontWebsiteManagement/FrontWebsiteManagement.jsx'
import AddFrontWebsiteManagement from '../Admin/Pages/FrontWebsiteManagement/AddFrontWebsiteManagement.jsx'
import AddHomeCover from '../Admin/Pages/FrontWebsiteManagement/HomeCover/AddHomeCover.jsx';
import AddFaq from '../Admin/Pages/FrontWebsiteManagement/Faq/AddFaq.jsx';

import PaymentMethod from '../Admin/Pages/PaymentMethod/PaymentMethod.jsx'
import AddPaymentMethod from '../Admin/Pages/PaymentMethod/AddPaymentMethod.jsx'

import Information from '../Admin/Pages/Profile/Information.jsx'
const AppRoutes = ({setIsLoggedIn}) => {
  return (
  <Routes>
      <Route path="/" element={<Navigate to="/admin/home" />} />  
        <Route path="*" element={<Navigate to="/admin/home" replace />} />

          <Route path="/admin" element={<AdminLayout setIsLoggedIn={setIsLoggedIn} />}>
                  <Route path="home" element={<Home/>} />
                  <Route path="categoriesmanagement" element={<CategoriesManagement/>} />
                  <Route path="addcategoriesmanagement" element={<AddCategoriesManagement/>} />
                  <Route path="toursmanagement" element={<ToursManagement/>} />
                  <Route path="addtoursmanagement" element={<AddToursManagement/>} />
                  <Route path="usersmanagement" element={<UsersManagement/>} />
                  <Route path="addusersmanagement" element={<AddUsersManagement/>} />
                  <Route path="promocodes" element={<PromoCodes/>} />
                  <Route path="addpromocodes" element={<AddPromoCode/>} />
                  <Route path="financialsection" element={<FinancialSection/>} />
                  <Route path="addfinancialsection" element={<AddFinancialSection/>} />
                  <Route path="bookingsmanagement" element={<BookingsManagement/>} />

                  <Route path="addcurrencies" element={<AddCurrencies/>} />
                  <Route path="currencies" element={<Currencies/>} />

                  <Route path="extras" element={<Extras/>} />
                  <Route path="addextras" element={<AddExtras/>} />

                  <Route path="roles" element={<Roles/>} />
                  <Route path="addroles" element={<AddRoles/>} />

                  <Route path="county" element={<County/>} />
                  <Route path="addcounty" element={<AddCounty/>} />

                  <Route path="city" element={<City/>} />
                  <Route path="addcity" element={<AddCity/>} />

                  <Route path="paymentmethod" element={<PaymentMethod/>} />
                  <Route path="addpaymentmethod" element={<AddPaymentMethod/>} />

                  <Route path="frontwebsitemanagement" element={<FrontWebsiteManagement/>} />
                  <Route path="addfrontWebsitemanagement" element={<AddFrontWebsiteManagement/>} />
                  <Route path="addhomecover" element={<AddHomeCover/>} />
                  <Route path="addfaq" element={<AddFaq/>} />

                  <Route path="information" element={<Information/>} />

          </Route>
          

      </Routes>
  )

}

export default AppRoutes