import React, { useEffect, useState } from "react";
import Head from '../../../ui/Head'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import ButtonDone from "../../../ui/ButtonDone";
import Loading from "../../../ui/Loading";
import InputField from "../../../ui/InputField";
import FileUploadButton from "../../../ui/FileUploadButton";
const AddCategoriesManagement = () => {
   const navigate = useNavigate();
      const location = useLocation();
          const { sendData } = location.state || {};
    const [checkLoading, setCheckLoading] = useState(false);
    const [loading, setLoading] = useState(true);
       const [name, setName] = useState("");
       const [iamge, setImage] = useState("");
       const [iamgetwo, setImagetwo] = useState("");
       
   useEffect(() => {

      const token = localStorage.getItem("token");
      axios
        .get(`https://tickethub-tours.com/api/admin/categories/${sendData}`, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        })
        .then((response) => {
          const category = response.data.data.category;
          if (category) {
            setName(category.name || "");
            setImage(category.imagePath || "");
            setImagetwo(category.imagePath || "");
             }

             setLoading(false);
        })  .catch((error) => {
                toast.error(error);
                setLoading(false);
              })
          
  }, [location.state]);
const handleSave = () => {
    setCheckLoading(true);
   if(!iamge && !iamgetwo )  return toast.error("image is required ")


   if(iamge==iamgetwo) 
   {
       toast.success(`Categories Management updated successfully`);
  setTimeout(() => {
          navigate("/admin/categoriesmanagement");
        }, 1000);
        return
   }
     // const token = localStorage.getItem("token");
   const newUser = {
imagePath:iamge
};
 axios.put(
          `https://tickethub-tours.com/api/admin/categories/${sendData}`,
          newUser,
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        ). then(() => {
  toast.success(`Categories Management updated successfully`);
  setTimeout(() => {
          navigate("/admin/categoriesmanagement");
        }, 1000);
       
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
      <Head kind="Edit" name="Categories Management"/>
           <ToastContainer />
      <div className=" flex  flex-col gap-7   mt-10 pr-5 space-y-5 ">
        <InputField
          placeholder="Name"
          value={name}
          disabled
        />
   <FileUploadButton
          kind=" Cover image"
          onFileChange={setImage}
          pic={iamge}
          des={`It will be the cover pic for ${name} `}
        />
    </div>
       <ButtonDone
          checkLoading={checkLoading}
          handleSave={handleSave}
          edit={true}
        />
    </div>
  )
}

export default AddCategoriesManagement