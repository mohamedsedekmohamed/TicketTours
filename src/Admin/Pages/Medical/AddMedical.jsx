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
const AddMedical = () => {
    const navigate = useNavigate();
      const location = useLocation();
      const { sendData } = location.state || {};
      const [edit, setEdit] = useState(false);
      const [checkLoading, setCheckLoading] = useState(false);
      const [loading, setLoading] = useState(true);
        const token = localStorage.getItem("token");

        const [name, setName] = useState("");
     
        const [errors, setErrors] = useState({
            name: "",
          });
                useEffect(() => {
    if (sendData) {
      setEdit(true);

      axios
        .get(`https://bcknd.tickethub-tours.com/api/admin/medical/${sendData}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const user = response.data.data.categorymedical;
          if (user) {
            setName(user.title || "");
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
      const validateForm = () => {
          let formErrors = {};
          if (!name) formErrors.name = "Name is required";
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
 title:name,
};

    const request = edit
      ? axios.put(
          `https://bcknd.tickethub-tours.com/api/admin/medical/${sendData}`,
          newUser,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      : axios.post("https://bcknd.tickethub-tours.com/api/admin/medical", newUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

    request
      .then(() => {
        toast.success(`Medical ${edit ? "updated" : "added"} successfully`);
        setTimeout(() => {
          navigate("/admin/medical");
        }, 1000);

        setName("");
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
     const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
  };
  if (loading) {
      return (
          <Loading/>
      );}
  return (
    <div>

    <Head kind={edit ? "Edit" : "Add"} name="Medical" />
      <ToastContainer/>
        <div className=" flex  flex-col  flex-wrap  mt-10 pr-5 space-y-5 ">
        <InputField
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
       
          

    </div>
    <ButtonDone  checkLoading={checkLoading} handleSave={handleSave}  edit={edit}/>
    </div>
  )
}

export default AddMedical