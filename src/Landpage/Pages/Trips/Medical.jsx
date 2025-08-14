import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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

  const handleSubmit = () => {
    if (!fullName.trim()) return toast.warn("Full name is required");
    if (!describtion.trim()) return toast.warn("Description is required");
    if (!phoneNumber.trim()) return toast.warn("Phone number is required");
    if (!email.trim()) return toast.warn("Email is required");
    if (categoryIds.length === 0) return toast.warn("Please select at least one option");
    if (images.length === 0) return toast.warn("Please upload at least one image");

   const formData = {
  fullName,
  phoneNumber,
  email,
  describtion,
  categoryIds,
  images: images.map(img => img.imagePath) // يحولهم لستينج بس
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

      <div className="flex items-center py-3 font-medium justify-center">
        <span className="text-center text-one text-2xl">
          Add your Tour Medical
        </span>
      </div>

      <div className="p-5 gap-4 flex flex-col">
        <InputField
          placeholder="Enter your Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <InputField
          placeholder="Enter Description"
          value={describtion}
          onChange={(e) => setDescribtion(e.target.value)}
        />
        <InputField
          placeholder="Enter Your Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <InputField
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm">
          <h1 className="text-xl font-bold mb-4 text-one text-center">Choose Options</h1>
          {options.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center space-x-2 mb-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={categoryIds.includes(opt.id)}
                onChange={() => handleSelect(opt.id)}
                className="form-checkbox text-blue-500"
              />
              <span>{opt.title}</span>
            </label>
          ))}
        </div>

        <FileUploadButtonArroy
          des="Images the patient's photos"
          kind="Images"
          flag={images}
          onFileChange={setImages}
        />

        <button
          onClick={handleSubmit}
          className="bg-one hover:bg-one/30 text-white py-2 px-4 rounded-lg mt-4"
        >
          Submit
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Medical;
