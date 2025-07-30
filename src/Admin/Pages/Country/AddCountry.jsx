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
const AddCountry = () => {
  const navigate = useNavigate();
    const location = useLocation();
    const { sendData } = location.state || {};
    const [edit, setEdit] = useState(false);
    const [checkLoading, setCheckLoading] = useState(false);
    const [loading, setLoading] = useState(true);

      const [name, setName] = useState("");
      const [imagePath, setimagePath] = useState(null);
      const [imagePathtwo, setimagePathtwo] = useState(null);
      const [errors, setErrors] = useState({
          name: "",
          Iamge: "",
        });
        useEffect(() => {
    if (sendData) {
      setEdit(true);

      const token = localStorage.getItem("token");
      axios
        .get(`https://bcknd.tickethub-tours.com/api/admin/country/${sendData}`, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        })
        .then((response) => {
          const user = response.data.data.country;
          if (user) {
            setName(user.name || "");
           setimagePath(user.imagePath||null)
           setimagePathtwo(user.imagePath||null)
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
  };

    const validateForm = () => {
        let formErrors = {};
        if (!name) formErrors.name = "Name is required";
        if (!imagePath) formErrors.Iamge = "Iamge is required";
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
};
if(imagePath!==imagePathtwo){
  newUser.imagePath=imagePath
}
    const request = edit
      ? axios.put(
          `https://bcknd.tickethub-tours.com/api/admin/country/${sendData}`,
          newUser,
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        )
      : axios.post("https://bcknd.tickethub-tours.com/api/admin/country", newUser, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });

    request
      .then(() => {
        toast.success(`country ${edit ? "updated" : "added"} successfully`);
        setTimeout(() => {
          navigate("/admin/county");
        }, 1000);

        setName("");
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
  return  ( <div>
      <Head kind={edit ? "Edit" : "Add"} name="County" />
      <ToastContainer/>
        <div className=" flex  flex-col  flex-wrap  mt-10 pr-5 space-y-5 ">
        <InputField
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
       
           <FileUploadButton
          kind="Image"
          des="Select one pic"
          pic={imagePath}
          onFileChange={(File)=> setimagePath(File)}
        />

    </div>
    <ButtonDone  checkLoading={checkLoading} handleSave={handleSave}  edit={edit}/>
    </div>
    )
}

export default AddCountry