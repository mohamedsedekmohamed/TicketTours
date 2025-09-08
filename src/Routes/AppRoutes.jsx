import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../Admin/Layouts/AdminLayout.jsx";
import Home from "../Admin/Pages/Home/Home.jsx";
import CategoriesManagement from "../Admin/Pages/CategoriesManagement/CategoriesManagement.jsx";
import ToursManagement from "../Admin/Pages/ToursManagement/ToursManagement.jsx";
import AddToursManagement from "../Admin/Pages/ToursManagement/AddToursManagement.jsx";
import UsersManagement from "../Admin/Pages/UsersManagement/UsersManagement.jsx";
import AddUsersManagement from "../Admin/Pages/UsersManagement/AddUsersManagement.jsx";
import PromoCodes from "../Admin/Pages/PromoCodes/PromoCodes.jsx";
import AddPromoCode from "../Admin/Pages/PromoCodes/AddPromoCode.jsx";
import BookingsManagement from "../Admin/Pages/BookingsManagement/BookingsManagement.jsx";
import AddCategoriesManagement from "../Admin/Pages/CategoriesManagement/AddCategoriesManagement.jsx";
import Currencies from "../Admin/Pages/Currencies/Currencies.jsx";
import AddCurrencies from '../Admin/Pages/Currencies/AddCurrencies.jsx'
import Extras from "../Admin/Pages/Extras/Extras.jsx";
import AddExtras from "../Admin/Pages/Extras/AddExtras.jsx";
import Admins from "../Admin/Pages/Admins/Admins.jsx";
import AddAdmins from "../Admin/Pages/Admins/AddAdmins.jsx";
import AddCounty from "../Admin/Pages/Country/AddCountry.jsx";
import County from "../Admin/Pages/Country/Country.jsx";
import City from "../Admin/Pages/City/City.jsx";
import AddCity from "../Admin/Pages/City/AddCity.jsx";
import FrontWebsiteManagement from "../Admin/Pages/FrontWebsiteManagement/FrontWebsiteManagement.jsx";
import AddHomeCover from "../Admin/Pages/FrontWebsiteManagement/HomeCover/AddHomeCover.jsx";
import AddFaq from "../Admin/Pages/FrontWebsiteManagement/Faq/AddFaq.jsx";

import PaymentMethod from "../Admin/Pages/PaymentMethod/PaymentMethod.jsx";
import AddPaymentMethod from "../Admin/Pages/PaymentMethod/AddPaymentMethod.jsx";

import Information from "../Admin/Pages/Profile/Information.jsx";

import Roles from "../Admin/Pages/Roles/Roles.jsx";
import AddRoles from "../Admin/Pages/Roles/AddRoles.jsx";

import Payment from "../Admin/Pages/Payment/Payment.jsx";

import ProtectedRoute from "../Admin/ProtectedRoute/ProtectedRoute.jsx";

import Medical from "../Admin/Pages/Medical/Medical.jsx";
import AddMedical from "../Admin/Pages/Medical/AddMedical.jsx";
import MedicalReqest from "../Admin/Pages/MedicalReqest/MedicalReqest.jsx";
// import ErrorPage from "../Admi/ErrorPage.jsx";
const AppRoutes = ({ setIsLoggedIn }) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/home" />} />
      <Route path="*" element={<Navigate to="/admin/home" replace />} />

      <Route
        path="/admin"
        element={<AdminLayout setIsLoggedIn={setIsLoggedIn} />}
      >
        <Route path="home" element={<Home />} />

        <Route
          path="categoriesmanagement"
          element={
            <ProtectedRoute moduleName="Category" requiredAction={["View"]}>
              <CategoriesManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="addcategoriesmanagement"
          element={
            <ProtectedRoute moduleName="Category" requiredAction={["Edit"]}>
              <AddCategoriesManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="usersmanagement"
          element={
            <ProtectedRoute moduleName="User" requiredAction={["View"]}>
              <UsersManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="addusersmanagement"
          element={
            <ProtectedRoute moduleName="User" requiredAction={["Add", "Edit"]}>
              <AddUsersManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="toursmanagement"
          element={
            <ProtectedRoute moduleName="Tour" requiredAction={["View"]}>
              <ToursManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="addtoursmanagement"
          element={
            <ProtectedRoute moduleName="Tour" requiredAction={["Add", "Edit"]}>
              <AddToursManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="promocodes"
          element={
            <ProtectedRoute moduleName="Promo Code" requiredAction={["View"]}>
              <PromoCodes />
            </ProtectedRoute>
          }
        />

        <Route
          path="addpromocodes"
          element={
            <ProtectedRoute
              moduleName="Promo Code"
              requiredAction={["Add", "Edit"]}
            >
              <AddPromoCode />
            </ProtectedRoute>
          }
        />

        <Route
          path="currencies"
          element={
            <ProtectedRoute moduleName="Currency" requiredAction={["View"]}>
              <Currencies />
            </ProtectedRoute>
          }
        />

        <Route
          path="addcurrencies"
          element={
            <ProtectedRoute
              moduleName="Currency"
              requiredAction={["Add", "Edit"]}
            >
              <AddCurrencies />
            </ProtectedRoute>
          }
        />

        <Route
          path="extras"
          element={
            <ProtectedRoute moduleName="Extras" requiredAction={["View"]}>
              <Extras />
            </ProtectedRoute>
          }
        />

        <Route
          path="addextras"
          element={
            <ProtectedRoute
              moduleName="Extras"
              requiredAction={["Add", "Edit"]}
            >
              <AddExtras />
            </ProtectedRoute>
          }
        />

        <Route
          path="county"
          element={
            <ProtectedRoute moduleName="Country" requiredAction={["View"]}>
              <County />
            </ProtectedRoute>
          }
        />

        <Route
          path="addcounty"
          element={
            <ProtectedRoute
              moduleName="Country"
              requiredAction={["Add", "Edit"]}
            >
              <AddCounty />
            </ProtectedRoute>
          }
        />

        <Route
          path="city"
          element={
            <ProtectedRoute moduleName="City" requiredAction={["View"]}>
              <City />
            </ProtectedRoute>
          }
        />

        <Route
          path="addcity"
          element={
            <ProtectedRoute moduleName="City" requiredAction={["Add", "Edit"]}>
              <AddCity />
            </ProtectedRoute>
          }
        />

        <Route
          path="paymentmethod"
          element={
            <ProtectedRoute
              moduleName="Payment Methods"
              requiredAction={["View"]}
            >
              <PaymentMethod />
            </ProtectedRoute>
          }
        />

        <Route
          path="addpaymentmethod"
          element={
            <ProtectedRoute
              moduleName="Payment Methods"
              requiredAction={["Add", "Edit"]}
            >
              <AddPaymentMethod />
            </ProtectedRoute>
          }
        />

        <Route
          path="addhomecover"
          element={
            <ProtectedRoute
              moduleName="Home Page Cover"
              requiredAction={["Add", "Edit"]}
            >
              <AddHomeCover />
            </ProtectedRoute>
          }
        />
        <Route
          path="addfaq"
          element={
            <ProtectedRoute
              moduleName="Home Page Faq"
              requiredAction={["Add", "Edit"]}
            >
              <AddFaq />
            </ProtectedRoute>
          }
        />
        <Route
          path="information"
          element={
            <ProtectedRoute
              moduleName="Profile"
              requiredAction={["View", "Edit"]}
            >
              <Information />
            </ProtectedRoute>
          }
        />
        <Route
          path="bookingsmanagement"
          element={
            <ProtectedRoute moduleName="Bookings" requiredAction={["View"]}>
              <BookingsManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="admins"
          element={
            <ProtectedRoute moduleName="Admin" requiredAction={["View"]}>
              <Admins />
            </ProtectedRoute>
          }
        />
        <Route
          path="addadmins"
          element={
            <ProtectedRoute moduleName="Admin" requiredAction={["Add", "Edit"]}>
              <AddAdmins />
            </ProtectedRoute>
          }
        />

        <Route
          path="roles"
          element={
            <ProtectedRoute moduleName="Roles" requiredAction={["View"]}>
              <Roles />
            </ProtectedRoute>
          }
        />
        <Route
          path="addroles"
          element={
            <ProtectedRoute moduleName="Roles" requiredAction={["Add", "Edit"]}>
              <AddRoles />
            </ProtectedRoute>
          }
        />


        <Route
          path="frontwebsitemanagement"
          element={<FrontWebsiteManagement />}
        />

         <Route
          path="payment"
          element={
            <ProtectedRoute moduleName="All Payments" requiredAction={["View"]}>
              <Payment />
            </ProtectedRoute>
          }
        />


            <Route
          path="medicalreqest"
          element={
            <ProtectedRoute moduleName="Request" requiredAction={["View"]}>
              <MedicalReqest />
            </ProtectedRoute>
          }
        />
   

            <Route
          path="medical"
          element={
            <ProtectedRoute moduleName="Medical" requiredAction={["View"]}>
              <Medical />
            </ProtectedRoute>
          }
        />
        <Route
          path="addmedical"
          element={
            <ProtectedRoute moduleName="Medical" requiredAction={["Add", "Edit"]}>
              <AddMedical />
            </ProtectedRoute>
          }
        />

      </Route>
    </Routes>
  );
};

export default AppRoutes;
