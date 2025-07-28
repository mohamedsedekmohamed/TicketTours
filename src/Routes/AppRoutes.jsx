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
const AppRoutes = ({setIsLoggedIn}) => {
  return (
  <Routes>
      <Route path="/" element={<Navigate to="/admin/home" />} />  
        <Route path="*" element={<Navigate to="/admin/home" replace />} />

          <Route path="/admin" element={<AdminLayout />}>
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
          </Route>
          

      </Routes>
  )

}

export default AppRoutes