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
import FileUploadButton from '../../../ui/FileUploadButton'
import SwitchButton from "../../../ui/SwitchButton";

const AddPaymentMethod = () => {
   const navigate = useNavigate();
    const location = useLocation();
    const { sendData } = location.state || {};
    const [edit, setEdit] = useState(false);
    const [checkLoading, setCheckLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    
      const [name, setName] = useState("");
      const [describtion, setDescribtion] = useState("");
    const [imagePath, setimagePath] = useState(null);
      const [imagePathtwo, setimagePathtwo] = useState(null);
        const [value, setValue] = useState(false);

        const [errors, setErrors] = useState({
            name: "",
            describtion: "",
          });
              useEffect(() => {
    if (sendData) {
      setEdit(true);

      const token = localStorage.getItem("token");
      axios
        .get(`https://bcknd.tickethub-tours.com/api/admin/paymentmethod/${sendData}`, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        })
        .then((response) => {
          const user = response.data.data.method;
          if (user) {
            setName(user.name || "");
            setDescribtion(user.describtion || "");
            setValue(user.status || "");
           setimagePath(user.logoPath||null)
           setimagePathtwo(user.logoPath||null)
          }
        })
        .catch((error) => {
          toast.error("Error fetching this User:", error);
        });
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [location.state]);
   const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "describtion") setDescribtion(value);
  };
   const validateForm = () => {
        let formErrors = {};
        if (!name) formErrors.name = "Name is required";
        if (!describtion) formErrors.describtion = "describtion is required";
        if (!imagePath) formErrors.image = "Iamge is required";
        Object.values(formErrors).forEach((error) => {
          toast.error(error);
        });
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
      }; 
      
       const handleSave = () => {
    setCheckLoading(true);
    if (!validateForm()) {
      setCheckLoading(false);
      return;
    }
   const newUser = {
  name,
describtion,
status:value
};
if(imagePath!==imagePathtwo){
  newUser.logoPath=imagePath
}




    const request = edit
      ? axios.put(
          `https://bcknd.tickethub-tours.com/api/admin/paymentmethod/${sendData}`,
          newUser,
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        )
      : axios.post("https://bcknd.tickethub-tours.com/api/admin/paymentmethod", newUser, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });

    request
      .then(() => {
        toast.success(`Payment Method ${edit ? "updated" : "added"} successfully`);
        setTimeout(() => {
          navigate("/admin/paymentmethod");
        }, 1000);

        setName("");
        setDescribtion("");
      setValue(false)
        setimagePath(null)
        setimagePathtwo(null)
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
  return ( <div>
      <Head kind={edit ? "Edit" : "Add"} name="Admin Roles" />
      <ToastContainer/>
        <div className=" flex gap-7 flex-wrap  mt-10 pr-5 space-y-5 ">
        <InputField
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <InputField
          placeholder="Describtion"
          name="describtion"
          value={describtion}
          onChange={handleChange}
        />
       </div>

           <FileUploadButton
          kind="Image"
          des="Select one pic"
          pic={imagePath}
          onFileChange={(File)=> setimagePath(File)}
        />
        <SwitchButton value={value} setValue={setValue} />

    <ButtonDone  checkLoading={checkLoading} handleSave={handleSave}  edit={edit}/>
    </div>
  )
};

export default AddPaymentMethod