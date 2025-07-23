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
const AddUsersManagement = () => {
  const navigate = useNavigate();
    const location = useLocation();
    const { sendData } = location.state || {};
    const [edit, setEdit] = useState(false);
    const [checkLoading, setCheckLoading] = useState(false);
    const [loading, setLoading] = useState(true);
  
     const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

     const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
   useEffect(() => {
    if (sendData) {
      setEdit(true);

      const token = localStorage.getItem("token");
      axios
        .get(`https://tickethub-tours.com/api/admin/users/${sendData}`, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        })
        .then((response) => {
          const user = response.data.data.user;
          if (user) {
            setName(user.name || "");
            setPhone(user.phoneNumber || "");
            setEmail(user.email || "");          }
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
    if (name === "phone") setPhone(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };
   const validateForm = () => {
    let formErrors = {};

    if (!name) formErrors.name = "Name is required";

 if (!phone) {
  formErrors.phone = "Phone is required";
} else if (!/^\d+$/.test(phone)) {
  formErrors.phone = "Phone must contain digits only";
}

    if (!email.includes("@gmail.com")) {
      formErrors.email = "Email should contain @gmail.com";
    }
    if (!edit && (!password || password.length >= 8)) {
      formErrors.password = "Password must be at least 8 characters";
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

    // const token = localStorage.getItem("token");
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


    const request = edit
      ? axios.put(
          `https://tickethub-tours.com/api/admin/users/${sendData}`,
          newUser,
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        )
      : axios.post("https://tickethub-tours.com/api/admin/users", newUser, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });

    request
      .then(() => {
        toast.success(`User ${edit ? "updated" : "added"} successfully`);
        setTimeout(() => {
          navigate("/admin/usersmanagement");
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
    <div>
      <Head kind={edit ? "Edit" : "Add"} name="Users Management" />
      <ToastContainer/>
        <div className=" flex gap-7 flex-wrap  mt-10 pr-5 space-y-5 ">
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
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
    </div>
    <ButtonDone  checkLoading={checkLoading} handleSave={handleSave}  edit={edit}/>
    </div>
  );
};

export default AddUsersManagement;
