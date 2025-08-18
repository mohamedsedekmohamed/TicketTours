import { useEffect, useState } from "react";
import HomeCover from "./HomeCover/HomeCover";
import Faq from "./Faq/Faq";
import { useLocation } from "react-router-dom";
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute"; // نفس اللي عملناه قبل

const FrontWebsiteManagement = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.kind === "faq") {
      setActiveTab("tab2");
    } else if (location?.state?.kind === "cover") {
      setActiveTab("tab1");
    } 
    // else if (location?.state?.kind === "other") {
    //   setActiveTab("tab3");
    // }
  }, [location?.state?.kind]);

  return (
    <div className="w-full mx-auto">
      <div className="flex text-one text-[20px]">
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === "tab1" ? "bg-eight rounded-2xl font-normal text-2xl" : ""
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          Cover Page
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === "tab2" ? "bg-eight rounded-2xl text-2xl font-normal" : ""
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          FAQ
        </button>
        {/* <button
          className={`flex-1 py-2 text-center ${
            activeTab === "tab3" ? "bg-eight rounded-2xl text-2xl font-normal" : ""
          }`}
          onClick={() => setActiveTab("tab3")}
        >
          Contact us
        </button> */}
      </div>

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
        {/* {activeTab === "tab3" && (
          <ProtectedRoute moduleName="Contact" requiredAction={["View"]}>
            <p>محتوى التاب الثالث</p>
          </ProtectedRoute>
        )} */}
      </div>
    </div>
  );
};

export default FrontWebsiteManagement;
