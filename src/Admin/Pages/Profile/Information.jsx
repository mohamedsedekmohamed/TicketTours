import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import FileUploadButton from "./FileUploadButton";
import InputField from "./InputField";
import Loading from "../../../ui/Loading";
import ButtonDone from "./ButtonDone";
const Information = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [edit, setEdit] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imagePath, setimagePath] = useState(null);
  const [imagePathtwo, setimagePathtwo] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
 useEffect(() => {
  setEdit(true);
  const token = localStorage.getItem("token");

  axios
    .get(`https://bcknd.tickethub-tours.com/api/admin/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },  
    })
    .then((response) => {
      const user = response.data.data.admin;
      if (user) {
        setName(user.name || "");
        setPhone(user.phoneNumber || "");
        setEmail(user.email || "");
        setimagePath(user.imagePath || null);
        setimagePathtwo(user.imagePath || null);
      }
      setLoading(false); 
    })
    .catch(() => {
      toast.error("Faild Requst");
      setLoading(false);
    });
}, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "phone") setPhone(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };
  const validateForm = () => {
    let formErrors = {};
    if (!name) formErrors.name = "Name is required";
    if (!imagePath) formErrors.Iamge = "Iamge is required";
    if (!phone) {
      formErrors.phone = "Phone is required";
    } else if (!/^\d+$/.test(phone)) {
      formErrors.phone = "Phone must contain digits only";
    }
    if (!email.includes("@gmail.com")) {
      formErrors.email = "Email should contain @gmail.com";
    }
    if (!edit) {
      if (!password) {
        formErrors.password = "Password is required";
      } else if (password.length <= 7) {
        formErrors.password = "Password must be at least 8 characters";
      }
    }
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
  phoneNumber: phone,
  email,
};
if (!edit) {
  newUser.password = password;
}
if (edit && password && password.length >= 8) {
  newUser.password = password;
}
 axios.put(
          `https://bcknd.tickethub-tours.com/api/admin/profile`,
          newUser,
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        ).then(() => {
        toast.success(`Admin ${edit ? "updated" : "added"} successfully`);
        setTimeout(() => {
          navigate("/admin/home");
        }, 1000);
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
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
    <div className="w-full">
      <p className=" text-center text-2xl text-one font-semibold my-5 ">
        Profile
      </p>
<div className="w-full min-h-screen flex flex-col md:flex-row ">
  <div className="w-full md:w-2/5 h-[250px] md:h-auto flex justify-center items-center p-4 ">
    <FileUploadButton
      pic={imagePathtwo}
      onFileChange={(base64) => setimagePath(base64)}
    />
  </div>

  <div className="w-full md:w-3/5 flex flex-col gap-4  px-4 py-6">
    <InputField
      placeholder="User"
      name="name"
      value={name}
      onChange={handleChange}
    />
    <InputField
      placeholder="Phone"
      name="phone"
      value={phone}
      onChange={handleChange}
    />
    <InputField
      placeholder="Gmail"
      name="email"
      value={email}
      onChange={handleChange}
    />
    <InputField
      placeholder=" Change Password"
      name="password"
      value={password}
      onChange={handleChange}
    />
     <ButtonDone  checkLoading={checkLoading} handleSave={handleSave}  edit="done"/>
  </div>

  <ToastContainer />
</div>

   

    </div>
  );
};

export default Information;
