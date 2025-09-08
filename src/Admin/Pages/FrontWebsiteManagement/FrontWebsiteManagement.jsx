import { useEffect, useState } from "react";
import HomeCover from "./HomeCover/HomeCover";
import Faq from "./Faq/Faq";
import { useLocation } from "react-router-dom";
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";
import Tour from "./Tour/Tour";
import Contact from "./contact/Contact";

const FrontWebsiteManagement = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.kind === "faq") {
      setActiveTab("tab2");
    } else if (location?.state?.kind === "cover") {
      setActiveTab("tab1");
    }
  }, [location?.state?.kind]);

  const tabClasses = (tab) =>
    `flex-1 py-2 text-center rounded-2xl transition-all duration-300 ${
      activeTab === tab
        ? "bg-eight font-semibold text-xl sm:text-2xl"
        : "hover:bg-gray-100"
    }`;

  return (
    <div className="w-full mx-auto">
      {/* Tabs Header */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-one text-lg sm:text-[20px] mb-4">
        <button className={tabClasses("tab1")} onClick={() => setActiveTab("tab1")}>
          Cover Page
        </button>
        <button className={tabClasses("tab2")} onClick={() => setActiveTab("tab2")}>
          FAQ
        </button>
        <button className={tabClasses("tab3")} onClick={() => setActiveTab("tab3")}>
          Tour
        </button>
        <button className={tabClasses("tab4")} onClick={() => setActiveTab("tab4")}>
          Contact Us
        </button>
      </div>

      {/* Tabs Content */}
      <div>
        {activeTab === "tab1" && (
          <ProtectedRoute moduleName="Home Page Cover" requiredAction={["View"]}>
            <HomeCover />
          </ProtectedRoute>
        )}
        {activeTab === "tab2" && (
          <ProtectedRoute moduleName="Home Page Faq" requiredAction={["View"]}>
            <Faq />
          </ProtectedRoute>
        )}
        {activeTab === "tab3" && (
          <ProtectedRoute moduleName="TourinHome" requiredAction={["View"]}>
            <Tour />
          </ProtectedRoute>
        )}
        {activeTab === "tab4" && (
          <ProtectedRoute moduleName="contactus" requiredAction={["View"]}>
            <Contact />
          </ProtectedRoute>
        )}
      </div>
    </div>
  );
};

export default FrontWebsiteManagement;
