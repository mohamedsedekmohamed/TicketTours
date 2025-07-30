import React, { useEffect, useState } from "react";
import Head from "../../../ui/Head";
import Loading from "../../../ui/Loading";
import InputField from "../../../ui/InputField";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import ButtonDone from "../../../ui/ButtonDone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import Inputfiltter from '../../../ui/Inputfiltter'
import SwitchButton from '../../../ui/SwitchButton'

const AddPromoCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sendData } = location.state || {};
  const [edit, setEdit] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [usageLimit,SetUsageLimit] = useState("");
  const [status, setStatus] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [errors, setErrors] = useState({
    code: "",
    discountType: "",
    discountValue: "",
    startDate: "",
    endDate: "",
  });

useEffect(() => {

  if (sendData) {
    setEdit(true);
    const token = localStorage.getItem("token");

    axios
      .get(`https://bcknd.tickethub-tours.com/api/admin/promocodes/${sendData}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then((response) => {
        const promocodes = response.data.data;
        if (promocodes) {
          setCode(promocodes.code || "");
          setDiscountType(promocodes.discountType || "");
          setDiscountValue(String(promocodes.discountValue) || "");
          SetUsageLimit(String(promocodes.usageLimit) || "");
          setStartDate(promocodes.startDate || "");
          setStatus(promocodes.status || "");
          setEndDate(promocodes.endDate || "");
        }

        setLoading(false);
      })
      .catch((error) => {
        toast.error(error);
        setLoading(false);
      });
  } else {
    setLoading(false);
  }
}, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "code") setCode(value);
    if (name === "discountValue") setDiscountValue(value);
    if (name === "usageLimit") SetUsageLimit(value);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!code) formErrors.code = "Code is required";
    if (!discountType) formErrors.discountType = "Discount Type is required";
   if (
  discountValue === undefined ||
  discountValue === null ||
  discountValue === '' ||
  isNaN(discountValue) ||
  Number(discountValue) < 0
) {
  formErrors.discountValue = "Discount value must be a non-negative number";
}
if (
  usageLimit === undefined ||
  usageLimit === null ||
  usageLimit === '' ||
  isNaN(usageLimit) ||
  Number(usageLimit) < 0
) {
  formErrors.usageLimit = "Usage limit must be a non-negative number";
}

    if (!startDate) formErrors.startDate = "Start Date is required";
    if (!endDate) formErrors.endDate = "End Date is required";

    Object.values(formErrors).forEach((error) => {
      toast.error(error);
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  const handstartDate = (newData) => {
    if (newData) {
      const formatted = newData.toISOString().split("T")[0];
      setStartDate(formatted);
    } else {
      setStartDate("");
    }
  };
  const handEndtDate = (newData) => {
    if (newData) {
      const formatted = newData.toISOString().split("T")[0];
      setEndDate(formatted);
    } else {
      setEndDate("");
    }
  };
   const handleSave = () => {
    setCheckLoading(true);
    if (!validateForm()) {
      setCheckLoading(false);
      return;
    }

    // const token = localStorage.getItem("token");
   const newUser = {
  code,
  discountType,
  discountValue:Number(discountValue),
  usageLimit:Number(usageLimit),
  status,
  startDate,
  endDate,
};
   
    
    const request = edit
      ? axios.put(
          `https://bcknd.tickethub-tours.com/api/admin/promocodes/${sendData}`,
          newUser,
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        )
      : axios.post("https://bcknd.tickethub-tours.com/api/admin/promocodes", newUser, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });

    request
      .then(() => {
        toast.success(`Promocode ${edit ? "updated" : "added"} successfully`);
        setTimeout(() => {
          navigate("/admin/promocodes");
        }, 1000);

        setCode("");
        setDiscountType("");
        setDiscountValue("");
        SetUsageLimit("");
        setStartDate("");
        setStatus(false);
        setEndDate("");
        setEdit(false);
      })
      .catch((error) => {
        const err = error?.response?.data?.error;

        if (err?.details && Array.isArray(err.details)) {
          err.details.forEach((detail) => {
            toast.error(`${detail.field}: ${detail.message}`);
          });
        } else if (err?.message) {
          toast.error(err.message);
        } else {
          toast.error("Something went wrong.");
        }
        setCheckLoading(false);
      });
  };
   if (loading) {
      return (

          <Loading/>
      );}
  return (
    <div>
      <Head kind={edit ? "Edit" : "Add"} name="Promo Code " />

      <ToastContainer />
      <div className=" flex gap-7 flex-wrap  mt-10 pr-5 space-y-5 ">
        <InputField
          placeholder="Code"
          name="code"
          value={code}
          onChange={handleChange}
        />

      
        <InputField 
        type="number"
          placeholder="Discount Value"
          name="discountValue"
          value={discountValue}
          onChange={handleChange}
        />
        <InputField
           type="number"
          placeholder="UsageLimit "
          name="usageLimit"
          value={usageLimit}
          onChange={handleChange}
        />
        <div className="relative flex flex-col w-[300px] h-[80px]">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Start Date
          </label>

          <div className="relative">
            <FaRegCalendarAlt className="absolute top-1/2 right-4 transform -translate-y-1/2 text-one pointer-events-none" />

            <DatePicker
              selected={startDate}
              onChange={handstartDate}
              placeholderText="Select date"
              dateFormat="yyyy-MM-dd"
              className="w-[300px] h-[50px] pl-4 pr-10 rounded-[12px] border border-three focus:outline-none focus:border-one text-gray-800 placeholder-one"
              showYearDropdown
              scrollableYearDropdown
              minDate={new Date()}
              yearDropdownItemNumber={100}
            />
          </div>
        </div>
        <div className="relative flex flex-col w-[300px] h-[80px]">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            End Date
          </label>

          <div className="relative">
            <FaRegCalendarAlt className="absolute top-1/2 right-4 transform -translate-y-1/2 text-one pointer-events-none" />

            <DatePicker
              selected={endDate}
              onChange={handEndtDate}
              placeholderText="Select date"
              dateFormat="yyyy-MM-dd"
              className="w-[300px] h-[50px] pl-4 pr-10 rounded-[12px] border border-three focus:outline-none focus:border-one text-gray-800 placeholder-one"
              showYearDropdown
              scrollableYearDropdown
              minDate={new Date()}
              yearDropdownItemNumber={100}
            />
          </div>
        </div>
<Inputfiltter
  placeholder="Discount Type"
  value={discountType}
  onChange={setDiscountType}
  name="discountType" 
/>
<SwitchButton value={status} setValue={setStatus}/>
      </div>
        <ButtonDone
          checkLoading={checkLoading}
          handleSave={handleSave}
          edit={edit}
        />
    </div>
  );
};

export default AddPromoCode;
