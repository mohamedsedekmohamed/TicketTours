import React, { useEffect, useState } from "react";
import Head from "../../../../ui/Head";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import ButtonDone from "../../../../ui/ButtonDone";
import Loading from "../../../../ui/Loading";
import  InputField from "../../../../ui/InputField";
import SwitchButton from "../../../../ui/SwitchButton";
const AddFaq = () => {
      const navigate = useNavigate();
      const location = useLocation();
      const { sendData } = location.state || {};
      const [checkLoading, setCheckLoading] = useState(false);
      const [loading, setLoading] = useState(true);
      const[question,SetQuestion]=useState("")
      const[answer,setAnswer]=useState("")
       const [value, setValue] = useState(false);
        const [edit, setEdit] = useState(false);
 const [errors, setErrors] = useState({
    question: "",
    answer: "",
  });
     useEffect(() => {
    if (sendData) {
      setEdit(true);

      const token = localStorage.getItem("token");
      axios
        .get(`https://tickethub-tours.com/api/admin/faq/${sendData}`, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        })
        .then((response) => {
          const user = response.data.data.faq;
          if (user) {
            SetQuestion(user.question || "");
            setAnswer(user.answer || "");
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

   const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "question") SetQuestion(value);
    if (name === "answer") setAnswer(value);
  };
     const validateForm = () => {
      let formErrors = {};
      if (!question) formErrors.question = "question is required";
      if (!answer) formErrors.answer = "answer is required";
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
  question,
  answer,
  status:value,
};



    const request = edit
      ? axios.put(
          `https://tickethub-tours.com/api/admin/faq/${sendData}`,
          newUser,
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        )
      : axios.post("https://tickethub-tours.com/api/admin/faq", newUser, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });

    request
      .then(() => {
        toast.success(`Faq ${edit ? "updated" : "added"} successfully`);
        setTimeout(() => {
    navigate("/admin/frontwebsitemanagement", { state: { kind: "faq" } });
        }, 1000);

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
      <Head kind={edit ? "Edit" : "Add"} name="Faq"  
       nav={{ pathname: "/admin/frontwebsitemanagement", state: { kind: "faq" } }}
/>
      <ToastContainer/>
        <div className=" flex gap-7 flex-wrap  mt-10 pr-5 space-y-5 ">
        <InputField
          placeholder="Question"
          name="question"
          value={question}
          onChange={handleChange}
        />
        <InputField
          placeholder="Answer"
          name="answer"
          value={answer}
          onChange={handleChange}
        />
        <SwitchButton value={value} setValue={setValue}/>
 
    </div>
    <ButtonDone  checkLoading={checkLoading} handleSave={handleSave}  edit={edit}/>
    </div>  )
}

export default AddFaq