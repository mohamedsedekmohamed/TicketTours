import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navtwo from "../../component/Navtwo";
import Footer from "../Footer";
import Medicall from "../../../assets/Medical.png";
import InputField from "../../../ui/InputField";
import FileUploadButtonArroy from "../../../ui/FileUploadButtonArroy";

const Medical = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [options, setOptions] = useState([]);
  const [describtion, setDescribtion] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
  const savedData = localStorage.getItem("savedFormData");
  if (savedData) {
    const parsed = JSON.parse(savedData);
    setFullName(parsed.fullName || "");
    setDescribtion(parsed.describtion || "");
    setPhoneNumber(parsed.phoneNumber || "");
    setEmail(parsed.email || "");
    setCategoryIds(parsed.categoryIds || []);
    setImages(parsed.images || []);
  }
}, []);


  useEffect(() => {
    axios
      .get(`https://bcknd.tickethub-tours.com/api/user/landpage/medicals-categories`)
      .then((response) => {
        setOptions(
          response.data.data.categoriesMedical.map((item) => ({
            id: item.id,
            title: item.title,
          }))
        );
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSelect = (id) => {
    setCategoryIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleSubmit =(e) => {
  e.preventDefault();
        const token = localStorage.getItem("token");

    if (!fullName.trim()) return toast.warn("Full name is required");
    if (!describtion.trim()) return toast.warn("Description is required");
    if (!phoneNumber.trim()) return toast.warn("Phone number is required");
    if (!email.trim()) return toast.warn("Email is required");
    if (categoryIds.length === 0) return toast.warn("Please select at least one option");
    if (images.length === 0) return toast.warn("Please upload at least one image");

       if (!token) {
    const formDatas = {
      fullName,
      describtion,
      phoneNumber,
      email,
      categoryIds,
      images,
    };
    localStorage.setItem("savedFormData", JSON.stringify(formDatas));

    toast.warn("You need to login in first. ");
    return;
  }
   const formData = {
  fullName,
  phoneNumber,
  email,
  describtion,
  categoryIds,
  images: images.map(img => img.imagePath) 
};

    axios
      .post(
        `https://bcknd.tickethub-tours.com/api/user/landpage/create-medical`,
        formData
      )
      .then(() => {
        toast.success("Medical successfully!");
        setFullName("");
        setPhoneNumber("");
        setEmail("");
        setDescribtion("");
        setCategoryIds([]);
        setImages([]);
            localStorage.removeItem("savedFormData"); 

      })
      .catch(() => toast.error("Something went wrong, please try again"));
  };

  return (
    <div>
      <Navtwo />
      <div className="bg-nine w-[95%] py-4 mx-auto flex justify-between items-center">
        <span className="text-3xl font-semibold px-5 text-one">
          Medical Tourism
        </span>
        <img src={Medicall} alt="Medicall" className="w-1/2 max-w-xs" />
      </div>

   <div className="min-h-screen flex items-center justify-center p-6">
  <form
    onSubmit={handleSubmit}
    className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 space-y-6"
  >
    {/* Title */}
    <div className="text-center">
      <h1 className="text-3xl font-bold text-one">Add Your Tour Medical</h1>
      <p className="text-gray-500 mt-2 text-sm">
        Fill in the details below to register your medical tour
      </p>
    </div>

    {/* Full Name */}
    <div>
     
      <InputField
        placeholder="Enter your Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
    </div>

    {/* Description */}
    <div>
   
      <InputField
        placeholder="Enter Description"
        value={describtion}
        onChange={(e) => setDescribtion(e.target.value)}
      />
    </div>

    {/* Phone Number */}
    <div>
    
      <InputField
        placeholder="Enter Your Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
    </div>

    {/* Email */}
    <div>
  
      <InputField
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    {/* Options */}
    <div className="bg-gray-50 border rounded-xl p-6">
      <h2 className="text-lg font-semibold text-one mb-4 text-center">
        Choose Options
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => (
          <label
            key={opt.id}
            className="flex items-center gap-2 cursor-pointer bg-white border rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition"
          >
            <input
              type="checkbox"
              checked={categoryIds.includes(opt.id)}
              onChange={() => handleSelect(opt.id)}
              className="form-checkbox text-one"
            />
            <span className="text-gray-700">{opt.title}</span>
          </label>
        ))}
      </div>
    </div>

    {/* File Upload */}
    <div>
     
      <FileUploadButtonArroy
        des="Images the patient's photos"
        kind="Images"
        flag={images}
        onFileChange={setImages}
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-one hover:bg-one/90 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300"
    >
      Submit
    </button>
  </form>
</div>

<ToastContainer/>
      <Footer />
    </div>
  );
};

export default Medical;
