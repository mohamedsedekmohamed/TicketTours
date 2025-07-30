import React, { useEffect, useState } from "react";
import Head from "../../../../ui/Head";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import ButtonDone from "../../../../ui/ButtonDone";
import Loading from "../../../../ui/Loading";
import FileUploadButton from "../../../../ui/FileUploadButton";
import SwitchButton from "../../../../ui/SwitchButton";
const AddHomeCover = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sendData } = location.state || {};
  const [checkLoading, setCheckLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [iamge, setImage] = useState("");
  const [iamgetwo, setImagetwo] = useState("");
  const [value, setValue] = useState(false);
  const [edit, setEdit] = useState(false);

  const [errors, setErrors] = useState({
    iamge: "",
    status: "",
  });
    useEffect(() => {
    if (sendData) {
      setEdit(true);

      const token = localStorage.getItem("token");
      axios
        .get(`https://bcknd.tickethub-tours.com/api/admin/homepage/${sendData}`, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        })
        .then((response) => {
          const user = response.data.data.page;
          if (user) {
            setImagetwo(user.imagePath || "");
            setImage(user.imagePath || "");
            setValue(user.status || "");
           
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
  const handleSave = () => {
    setCheckLoading(true);
    if (!iamge) {
      toast.error("Image is required");
      setCheckLoading(false);
      return;
    }

    const newUser = {
      status: value,
    };
    if (iamge !== iamgetwo) {
      newUser.imagePath = iamge;
    }
    const newStatus = value=="active"?true  : false;

    const eidtUser = {
      status: newStatus,
    };
    if (iamge !== iamgetwo) {
      eidtUser.imagePath = iamge;
    }

    const request = edit
      ? axios.put(
          `https://bcknd.tickethub-tours.com/api/admin/homepage/${sendData}`,
          eidtUser
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        )
      : axios.post("https://bcknd.tickethub-tours.com/api/admin/homepage", newUser, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });

    request
      .then(() => {
        toast.success(`Home Cover ${edit ? "updated" : "added"} successfully`);
        setTimeout(() => {
navigate("/admin/frontwebsitemanagement", { state: { kind: "cover" } });
        }, 1000);
        setImage(null);
        setImagetwo(null);
        setValue(false);
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
      <Head kind={edit ? "Edit" : "Add"} name="Home Cover"
             nav={{ pathname: "/admin/frontwebsitemanagement", state: { kind: "cover" } }}

      />
      <ToastContainer />
      <div className=" flex  flex-col gap-7   mt-10 pr-5 space-y-5 ">
        <FileUploadButton
          kind=" Cover image"
          onFileChange={setImage}
          pic={iamge}
          des={`It will be the cover in Home page  `}
        />
        <SwitchButton value={value} setValue={setValue} />
      </div>
      <ButtonDone
        checkLoading={checkLoading}
        handleSave={handleSave}
        edit={edit}
      />
    </div>
  );
};
export default AddHomeCover;
