
import { useEffect, useState } from "react";
import HomeCover from "./HomeCover/HomeCover";
import Faq from "./Faq/Faq";
import { useLocation } from "react-router-dom";    

const FrontWebsiteManagement = () => {
  const [activeTab, setActiveTab] = useState("tab1");
   const location = useLocation();
useEffect(()=>{
  console.log(location?.state?.kind)
  if (location?.state?.kind === "faq") {
      setActiveTab("tab2");
    } else if (location?.state?.kind === "cover") {
      setActiveTab("tab1");
    } else if (location?.state?.kind === "other") {
      setActiveTab("tab3");
    }
},[location?.state?.kind])
  return (
    <div className="w-full  mx-auto ">
      <div className="flex  text-one text-[20px] ">
        <button
          className={`flex-1 py-2 text-center  ${
            activeTab === "tab1" ? "bg-eight rounded-2xl font-normal text-2xl" : ""
          }`}
          onClick={() => setActiveTab("tab1")}
        >
            Cover Page
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === "tab2" ? " bg-eight  rounded-2xl    text-2xl font-normal" : ""
          }`}
          onClick={() => setActiveTab("tab2")}
        >
FAQ        </button>
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === "tab3" ? " bg-eight  rounded-2xl  text-2xl  font-normal" : ""
          }`}
          onClick={() => setActiveTab("tab3")}
        >
Contect us        </button>
      </div>

      {/* المحتوى حسب التاب */}
      <div className="">
        {activeTab === "tab1" && <HomeCover/>}
        {activeTab === "tab2" && <Faq/>}
        {activeTab === "tab3" && <p>محتوى التاب الثالث</p>}
      </div>
    </div>
  );
};

export default FrontWebsiteManagement;
