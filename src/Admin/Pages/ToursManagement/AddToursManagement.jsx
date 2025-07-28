  import React, { useEffect, useState } from "react";
  import Head from "../../../ui/Head";
  import Loading from "../../../ui/Loading";
  import InputField from "../../../ui/InputField";
  import InputArrow from "../../../ui/InputArrow";
  import Inputfiltter from "../../../ui/Inputfiltter";
  import SwitchButton from "../../../ui/SwitchButton";
  import FileUploadButton from "../../../ui/FileUploadButton";
  import ButtonDone from "../../../ui/ButtonDone";
  import FileUploadButtonArroy from "../../../ui/FileUploadButtonArroy";
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  import axios from "axios";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { useNavigate, useLocation } from "react-router-dom";
  import { FaRegCalendarAlt } from "react-icons/fa";
  import Select from "react-select";
import MapPicker from '../../../ui/MapPicker'
  const AddToursManagement = () => {
     const [activeTab, setActiveTab] = useState(0);

  
 
    const navigate = useNavigate();
    const location = useLocation();
    const { sendData } = location.state || {};
    const [edit, setEdit] = useState(false);
    const [checkLoading, setCheckLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [describtion, setDescribtion] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [maxUsers, setMaxUsers] = useState("");
    const [durationDays, SetDurationDays] = useState("");
    const [durationHours, SetDurationHours] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, SetEndDate] = useState("");
    const [points, setPoints] = useState("");

    const [mainImage, setMainImage] = useState("");
    const [mainImagecheck, setMainImagecheck] = useState("");

    const [arrayimage, setArrayImage] = useState([]);
    const [arrayimagechange, setArrayImagechange] = useState([]);
    const [arrayimagedelete, setArrayImagedelete] = useState([]);
    const [originalImages, setOriginalImages] = useState([]);

    const [currencies, setCurrencies] = useState("");
    const [status, setStatus] = useState(false);
    const [featured, setFeatured] = useState(false);
    //
    const [meetingPoint, setMeetingPoint] = useState(false);
    const [meetingPointLocation, SetMeetingPointLocation] = useState("");
    const [meetingPointAddress, setMeetingPointAddress] = useState("");
    //
    const [google, setgoogle] = useState({
   lat: 31.200092, // الإسكندرية
lng: 29.918739
    });
    const [errors, setErrors] = useState({
      title: "",
      category: "",
      describtion: "",
      country: "",
      city: "",
      maxUsers: "",
      durationDays: "",
      durationHours: "",
      startDate: "",
      points: "",
      meetingPointLocation: "",
      mainImage: "",
      meetingPointAddress: "",
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "title") setTitle(value);
      if (name === "category") setCategory(value);
      if (name === "describtion") setDescribtion(value);
      if (name === "country") setCountry(value);
      if (name === "city") setCity(value);
      if (name === "maxUsers") setMaxUsers(value);
      if (name === "points") setPoints(value);
      if (name === "meetingPointLocation") SetMeetingPointLocation(value);
      if (name === "meetingPointAddress") setMeetingPointAddress(value);
      if (name === "durationHours") SetDurationHours(value);
      if (name === "durationDays") SetDurationDays(value);
    };
    const handstartDate = (newData) => {
      if (newData) {
        const formatted = newData.toISOString().split("T")[0];
        setStartDate(formatted);
      } else {
        setStartDate("");
      }
    };
    const handEndtDate = (newData) => {
      if (newData) {
        const formatted = newData.toISOString().split("T")[0];
        SetEndDate(formatted);
      } else {
        SetEndDate("");
      }
    };
    const handleIamgesChange = (newFiles) => {
      if (edit) {
        const oldImagesWithId = originalImages;

        const keptOldImages = oldImagesWithId.filter((oldImg) =>
          newFiles.some((newImg) => newImg.id === oldImg.id)
        );

        const removedImages = oldImagesWithId.filter(
          (oldImg) => !newFiles.some((newImg) => newImg.id === oldImg.id)
        );

        const newAddedImages = newFiles.filter((img) => !img.id);

        setArrayImage([...keptOldImages, ...newAddedImages]);
        setArrayImagedelete(removedImages);
        setArrayImagechange(true);
      } else {
        setArrayImage(newFiles);
        setArrayImagechange(true);
      }
    };
    const validateForm = () => {
      let formErrors = {};

      if (!title) formErrors.name = "Title is required";
      if (!category) formErrors.category = "Category is required";
      if (!describtion) formErrors.describtion = "Describtion is required";
      if (!country) formErrors.country = "country is required";
      if (!city) formErrors.city = "city is required";
      if (!maxUsers) formErrors.maxUsers = "maxUsers is required";
      if (!points) formErrors.points = "points is required";
      if (meetingPoint) {
        if (!meetingPointLocation) formErrors.points = "points is required";
        if (!meetingPointAddress) formErrors.points = "points is required";
      }
      Object.values(formErrors).forEach((error) => {
        toast.error(error);
      });

      setErrors(formErrors);
      return Object.keys(formErrors).length === 0;
    };

 
  

    //highlights
    const [fields, setFields] = useState([""]);
    const handleChangeInput = (index, value) => {
      const newFields = [...fields];
      newFields[index] = value;
      setFields(newFields);
    };
    const handleAddField = () => {
      setFields([...fields, ""]);
    };
    const handleRemoveField = (index) => {
      const newFields = fields.filter((_, i) => i !== index);
      setFields(newFields);
    };

    // includes
    const [fieldstwo, setFieldstwo] = useState([""]);
    const handleChangeInputtwo = (index, value) => {
      const newFields = [...fieldstwo];
      newFields[index] = value;
      setFieldstwo(newFields);
    };
    const handleAddFieldtwo = () => {
      setFieldstwo([...fieldstwo, ""]);
    };
    const handleRemoveFieldtwo = (index) => {
      const newFields = fieldstwo.filter((_, i) => i !== index);
      setFieldstwo(newFields);
    };
    // excludes
    const [fieldsthree, setFieldsthree] = useState([""]);
    const handleChangeInputthree = (index, value) => {
      const newFields = [...fieldsthree];
      newFields[index] = value;
      setFieldsthree(newFields);
    };
    const handleAddFieldthree = () => {
      setFieldsthree([...fieldsthree, ""]);
    };
    const handleRemoveFieldthree = (index) => {
      const newFields = fieldsthree.filter((_, i) => i !== index);
      setFieldsthree(newFields);
    };
    const [extras, setExtras] = useState([
      {
        extraId: "",
        price: {
          adult: "",
          child: "",
          infant: "",
          currencyId: "",
        },
      },
    ]);

    const handleExtrasChange = (index, field, value) => {
      const newExtras = [...extras];
      newExtras[index][field] = value;
      setExtras(newExtras);
    };

    const handlePriceChange = (index, priceField, value) => {
      const newExtras = [...extras];
      newExtras[index].price[priceField] = value;
      setExtras(newExtras);
    };

    const addExtra = () => {
      setExtras([
        ...extras,
        {
          extraId: "",
          price: {
            adult: "",
            child: "",
            infant: "",
            currencyId: "",
          },
        },
      ]);
    };

    const removeExtra = (index) => {
      const updated = extras.filter((_, i) => i !== index);
      setExtras(updated);
    };

    const handleSubmit = async () => {
      const payload = {
        extras: extras.map((extra) => ({
          extraId: parseInt(extra.extraId),
          price: {
            adult: parseFloat(extra.price.adult),
            child: parseFloat(extra.price.child),
            infant: parseFloat(extra.price.infant),
            currencyId: parseInt(extra.price.currencyId),
          },
        })),
      };
    };
    const [prices, setPrices] = useState([
      { adult: "", child: "", infant: "", currencyId: "" },
    ]);
    const addPrice = () => {
      setPrices([
        ...prices,
        { adult: "", child: "", infant: "", currencyId: "" },
      ]);
    };
    const removePrice = (index) => {
      setPrices(prices.filter((_, i) => i !== index));
    };
    const handlePriceChangeTOO = (index, key, value) => {
      const updated = [...prices];
      updated[index][key] = value;
      setPrices(updated);
    };
  const [titles, setTitles] = useState([
    { title: "", description: "" }
  ]);

  // functions
  const handleTitleChange = (index, field, value) => {
    const updated = [...titles];
    updated[index][field] = value;
    setTitles(updated);
  };

  const addTitle = () => {
    setTitles([...titles, { title: "", description: "" }]);
  };

  const removeTitle = (index) => {
    const updated = titles.filter((_, i) => i !== index);
    setTitles(updated);
  };
  const [faq, setFag] = useState([
    {
      title: "",
      description: "",
      image: null, // يمكن أن تكون Base64 أو File
    },
  ]);
  const handlefaqChange = (index, key, value) => {
    const updated = [...faq];
    updated[index][key] = value;
    setFag(updated);
  };
  const [discounts, setDiscounts] = useState([
    {
      targetGroup: "",
      type: "",
      value: "",
      minPeople: "",
      maxPeople: "",
    },
  ]);
  const handleDiscountChange = (index, key, value) => {
    const updated = [...discounts];
    updated[index][key] = value;
    setDiscounts(updated);
  };

  const addDiscount = () => {
    setDiscounts([
      ...discounts,
      { targetGroup: "", type: "", value: "", minPeople: "", maxPeople: "" },
    ]);
  };

  const removeDiscount = (index) => {
    const updated = discounts.filter((_, i) => i !== index);
    setDiscounts(updated);
  };

  const days = [
    { label: "Sunday", value: "Sunday" },
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
  ];

  const [selectedDays, setSelectedDays] = useState([]);

  const handleSelectChange = (selectedOptions) => {
    setSelectedDays(selectedOptions.map((option) => option.value));
  };

 const handleSave = async () => {
  if (!validateForm()) return;

  const payload = {
    title,
    description: describtion,
    startDate:String(startDate),
    endDate:String(endDate),
    durationDays: parseInt(durationDays),
    durationHours: parseInt(durationHours),
    points: parseInt(points),
    meetingPoint,
    meetingPointAddress: meetingPoint ? meetingPointAddress : null,
    meetingPointLocation: meetingPoint ? meetingPointLocation : null,
    maxUsers: parseInt(maxUsers),
    categoryId: parseInt(category),
    country,
    city,
    mainImage, 
    images: arrayimage.map(b=>b.imagePath),
    includes: fieldstwo.filter((val) => val),
    excludes: fieldsthree.filter((val) => val),
    prices: prices.map((p) => ({
      adult: parseFloat(p.adult),
      child: parseFloat(p.child),
      infant: parseFloat(p.infant),
      currencyId: parseInt(p.currencyId),
    })),
    extras: extras.map((extra) => ({
      extraId: parseInt(extra.extraId),
      price: {
        adult: parseFloat(extra.price.adult),
        child: parseFloat(extra.price.child),
        infant: parseFloat(extra.price.infant),
        currencyId: parseInt(extra.price.currencyId),
      },
    })),
    discounts: discounts.map((item) => ({
      targetGroup: item.targetGroup,
      type: item.type,
      value: parseFloat(item.value),
      minPeople: parseInt(item.minPeople),
      maxPeople: parseInt(item.maxPeople),
    })),
    faq: titles.map((item) => ({
      question: item.title,
      answer: item.description,
    })),
    itinerary: faq.map((item) => ({
      title: item.title,
      description: item.description,
      imagePath: item.image
    })),
    daysOfWeek: selectedDays,
    status,
    featured,
  };
    console.log("Payload to send:", payload);
    console.log("-----------------");

 axios.post("https://tickethub-tours.com/api/admin/tours", payload, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        })
      .then(() => {
        toast.success(`User ${edit ? "updated" : "added"} successfully`);
        setTimeout(() => {
          navigate("/admin/toursmanagement");
        }, 1000);})
    }
    const tabs = ['Info', 'Images', 'Options', 'Pricing',"Faq"];
const addFaq = () => {
  setFag([...faq, { title: "", description: "", image: null }]);
};

const removeFaq = (index) => {
  const updated = faq.filter((_, i) => i !== index);
  setFag(updated);
};

 

    return (
      <div>
        <Head kind={edit ? "Edit" : "Add"} name="Tours Management" />
        <ToastContainer />
 <div className="flex justify-around w-full mt-6 bg-gradient-to-r from-white via-gray-50 to-white rounded-xl shadow-inner p-2 gap-2">
  {tabs.map((tab, index) => (
    <button
      key={index}
      onClick={() => setActiveTab(index)}
      className={`flex-1 text-center px-6 py-3 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 ease-in-out
        ${
          activeTab === index
            ? 'bg-one text-white shadow-lg scale-100'
            : 'bg-white text-gray-600 hover:bg-one hover:text-white hover:shadow-md hover:scale-100'
        }
      `}
    >
      {tab}
    </button>
  ))}
</div>


        <div className=" flex gap-7 flex-wrap  mt-10 pr-5 ">

       {activeTab === 0 && (
        <>
                 <InputField
            placeholder="Title"
            name="title"
            value={title}
            onChange={handleChange}
          />
          <InputField
            placeholder="Describtion"
            name="describtion"
            value={describtion}
            onChange={handleChange}
          />
          <InputField
            placeholder="Country"
            name="country"
            value={country}
            onChange={handleChange}
          />
          <InputField
            placeholder="City"
            name="city"
            value={city}
            onChange={handleChange}
          />
          <InputField
            type="number"
            placeholder="Max Users"
            name="maxUsers"
            value={maxUsers}
            onChange={handleChange}
          />
          <InputField
            type="number"
            placeholder="Duration Days"
            name="durationDays"
            value={durationDays}
            onChange={handleChange}
          />
          <InputField
            type="number"
            placeholder="Duration Hours"
            name="durationHours"
            value={durationHours}
            onChange={handleChange}
          />
          <InputField
            type="number"
            placeholder="Points "
            name="points"
            value={points}
            onChange={handleChange}
          />
          <InputArrow
            name="tours/add-data"
            namedata="categories"
            placeholder="Select Category"
            value={category}
            onChange={(val) => setCategory(val)}
          />

          <SwitchButton value={status} setValue={setStatus} title="Status" />
          <SwitchButton
            value={featured}
            setValue={setFeatured}
            title="Featured"
          />
            <SwitchButton
            value={meetingPoint}
            setValue={setMeetingPoint}
            title="Meeting Point"
          />
          <div className="flex flex-col">
    <label className="mb-2 font-medium text-one">Select Days</label>
    <Select
      isMulti
      options={days}
      value={days.filter((d) => selectedDays.includes(d.value))}
      onChange={handleSelectChange}
      className="basic-multi-select w-75 h-[80px] rounded-2xl"
      classNamePrefix="select"
    />
  </div>

          <div className="relative flex flex-col w-[300px] h-[80px]">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Start Date
            </label>

            <div className="relative">
              <FaRegCalendarAlt className="absolute top-1/2 right-4 transform -translate-y-1/2 text-one pointer-events-none" />

              <DatePicker
                selected={startDate}
                onChange={handstartDate}
                placeholderText="Select date"
                dateFormat="yyyy-MM-dd"
                className="w-[300px] h-[50px] pl-4 pr-10 rounded-[12px] border border-three focus:outline-none focus:border-one text-gray-800 placeholder-one"
                showYearDropdown
                scrollableYearDropdown
                minDate={new Date()}
                yearDropdownItemNumber={100}
              />
            </div>
          </div>

          <div className="relative flex flex-col w-[300px] h-[80px]">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              End Date
            </label>

            <div className="relative">
              <FaRegCalendarAlt className="absolute top-1/2 right-4 transform -translate-y-1/2 text-one pointer-events-none" />

              <DatePicker
                selected={endDate}
                onChange={handEndtDate}
                placeholderText="Select date"
                dateFormat="yyyy-MM-dd"
                className="w-[300px] h-[50px] pl-4 pr-10 rounded-[12px] border border-three focus:outline-none focus:border-one text-gray-800 placeholder-one"
                showYearDropdown
                scrollableYearDropdown
                minDate={new Date()}
                yearDropdownItemNumber={100}
              />
            </div>
          </div>
              {meetingPoint ? (
          <div className=" flex   w-full flex-col gap-3">
            {" "}
            <InputField
              placeholder="Meeting Point Address"
              name="meetingPointAddress"
              value={meetingPointAddress}
              onChange={handleChange}
            />

          </div>
        ) : null}
           {meetingPoint ? (
          <div className=" flex  mt-5 flex-col w-full gap-3">
            {" "}
         
                     <MapPicker location={google} onLocationChange={(newLocation)=>{setgoogle(newLocation)}} />

          </div>
        ) : null}
       
        </>
        )}
 {activeTab === 1 && (
        <div className="flex flex-col gap-2 w-full">
          <FileUploadButton
          kind=" Mian image"
          onFileChange={setMainImage}
          pic={mainImage}
          des={"It will be the cover"}
        />
        <FileUploadButtonArroy
          name="Image"
          kind="Gallery"
          flag={arrayimage}
          onFileChange={handleIamgesChange}
        />
        </div>
        )}
 
  {activeTab === 2 && (
      <div className="flex gap-7 flex-wrap w-full">

        {/* highlights */}

        <div className="space-y-4 p-4 w-f">
          <h2 className="text-xl font-bold">highlights</h2>

          {fields.map((value, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                value={value}
                onChange={(e) => handleChangeInput(index, e.target.value)}
                placeholder={`Value ${index + 1}`}
                className="p-2 border border-gray-300 rounded-md w-64"
              />
              <button
                onClick={() => handleRemoveField(index)}
                className="text-red-600 font-semibold"
              >
                Delete
              </button>
            </div>
          ))}

          <button
            onClick={handleAddField}
            className="px-4 py-2 bg-one text-white rounded-md"
          >
            + New
          </button>
        </div>
        {/* includes */}
        <div className="space-y-4 p-4">
          <h2 className="text-xl font-bold">Includes </h2>
          {fieldstwo.map((value, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                value={value}
                onChange={(e) => handleChangeInputtwo(index, e.target.value)}
                placeholder={`Value ${index + 1}`}
                className="p-2 border border-gray-300 rounded-md w-64"
              />
              <button
                onClick={() => handleRemoveFieldtwo(index)}
                className="text-red-600 font-semibold"
              >
                Delete
              </button>
            </div>
          ))}

          <button
            onClick={handleAddFieldtwo}
            className="px-4 py-2 bg-one text-white rounded-md"
          >
            + New
          </button>
        </div>
        {/* excludes */}
        <div className="space-y-4 p-4">
          <h2 className="text-xl font-bold">Excludes </h2>
          {fieldsthree.map((value, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                value={value}
                onChange={(e) => handleChangeInputthree(index, e.target.value)}
                placeholder={`Value ${index + 1}`}
                className="p-2 border border-gray-300 rounded-md w-64"
              />
              <button
                onClick={() => handleRemoveFieldthree(index)}
                className="text-red-600 font-semibold"
              >
                Delete
              </button>
            </div>
          ))}

          <button
            onClick={handleAddFieldthree}
            className="px-4 py-2 bg-one text-white rounded-md"
          >
            + New
          </button>
        </div>

        {/* extras */}
        <div className="p-4 space-y-5 w-full">
          <h2 className="text-xl font-bold mb-4">Extras</h2>
          {extras.map((extra, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-xl p-4 space-y-3 relative bg-gray-50"
            >
              <div className="grid grid-cols-2 gap-4">
                <InputArrow
                  name="tours/add-data"
                  namedata="extras"
                  placeholder="Select Extras"
                  value={extra.extraId}
                  onChange={(val) => handleExtrasChange(index, "extraId", val)}
                />
                <InputArrow
                  name="tours/add-data"
                  namedata="currencies"
                  placeholder="Select currencies"
                  value={extra.price.currencyId}
                  onChange={(val) => handlePriceChange(index, "currencyId", val)}
                />
                <InputField
                  type="number"
                  placeholder="Adult Price"
                  value={extra.price.adult}
                  onChange={(e) =>
                    handlePriceChange(index, "adult", e.target.value)
                  }
                />
                <InputField
                  type="number"
                  placeholder="Child Price"
                  value={extra.price.child}
                  onChange={(e) =>
                    handlePriceChange(index, "child", e.target.value)
                  }
                />
                <InputField
                  type="number"
                  placeholder="Infant Price"
                  value={extra.price.infant}
                  onChange={(e) =>
                    handlePriceChange(index, "infant", e.target.value)
                  }
                />
              </div>

              <button
                onClick={() => removeExtra(index)}
                className="text-one absolute top-2 right-2 font-bold"
              >
                X
              </button>
            </div>
          ))}

          <button
            onClick={addExtra}
            className="px-4 py-2 bg-one text-white rounded hover:bg-one/70"
          >
            + إضافة Extra
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-one text-white rounded hover:bg-green-700 block mt-4"
          >
Save Data          </button>
        </div>
        <div className="p-4 space-y-5 w-full border-1 mt-2">
    <h2 className="text-xl font-bold text-one mb-4">Itinerary</h2>

  {faq.map((item, index) => (
  <div key={index} className="bg-gray-100 p-4 rounded relative mb-4 space-y-3">
    <InputField
      type="text"
      placeholder="Title"
      value={item.title}
      onChange={(e) => handlefaqChange(index, "title", e.target.value)}
    />
    <textarea
      placeholder="Description"
      value={item.description}
      onChange={(e) => handlefaqChange(index, "description", e.target.value)}
      className="w-full p-2 rounded border border-gray-300 resize-none leading-5 overflow-hidden"
      rows={3}
      maxLength={300}
      onInput={(e) => {
        const el = e.target;
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 90)}px`;
      }}
    />
    <FileUploadButton
      kind={`FAQ Image ${index + 1}`}
      onFileChange={(file) => handlefaqChange(index, "image", file)}
      pic={item.image}
      des="FAQ image preview"
    />
    <button
      onClick={() => removeFaq(index)}
      className="text-one font-bold text-lg absolute top-2 right-2"
    >
      ✕
    </button>
  </div>
))}

    {/* Add new QA */}
    <button onClick={addTitle} className="bg-one text-white p-3 mt-2 rounded">
      Add
    </button>
  </div>
 
      </div>
        )}
        
 {activeTab === 3 && (
          <div className="flex flex-col w-full gap-2">
             {/* price */}
        <div className="p-4 space-y-5  border-1 ">
          <h2 className="text-xl font-bold text-one mb-4">price</h2>
          {prices.map((price, index) => (
    <div key={index} className="flex gap-2 bg-gray-100 items-center mb-4 relative p-4 rounded">
    <InputField
      type="number"
      placeholder="Adult Price"
      value={price.adult}
      onChange={(e) =>
        handlePriceChangeTOO(index, "adult", e.target.value)
      }
    />
    <InputField
      type="number"
      placeholder="Child Price"
      value={price.child}
      onChange={(e) =>
        handlePriceChangeTOO(index, "child", e.target.value)
      }
    />
    <InputField
      type="number"
      placeholder="Infant Price"
      value={price.infant}
      onChange={(e) =>
        handlePriceChangeTOO(index, "infant", e.target.value)
      }
    />
    <InputArrow
      name="tours/add-data"
      namedata="currencies"
      placeholder="Currency"
      value={price.currencyId}
      onChange={(val) =>
        handlePriceChangeTOO(index, "currencyId", val)
      }
    />

    {/* زر الحذف على الطرف */}
    <button
      onClick={() => removePrice(index)}
      className="text-one font-bold text-lg ml-2 my-auto mt-11"
    >
      ✕
    </button>
  </div>

          ))}
          <button onClick={addPrice} className="bg-one text-white p-3 mt-2">
            Add Price
          </button>
        </div>
          {/*  */}
           <div className="p-4 space-y-5 border-1 mt-2">
    <h2 className="text-xl font-bold text-one mb-4">Discounts</h2>

    {discounts.map((item, index) => (
      <div key={index} className="bg-gray-100 p-4 rounded relative mb-4 space-y-3">
  <label className="block text-sm py-2 font-medium text-gray-700 mb-1">
          Target Group
        </label>
        <select
          value={item.targetGroup}
          onChange={(e) => handleDiscountChange(index, "targetGroup", e.target.value)}
          className="w-full p-3 rounded border border-gray-300"
        >
          <option value="">Select Target Group</option>
          <option value="adult">Adult</option>
          <option value="child">Child</option>
          <option value="infant">Infant</option>
        </select>
  <label className="block text-sm py-2 font-medium text-gray-700 mb-1">
          Target Group
        </label>
        <select
          value={item.type}
          onChange={(e) => handleDiscountChange(index, "type", e.target.value)}
          className="w-full p-3 rounded border border-gray-300"
        >
          <option value="">Select Discount Type</option>
          <option value="fixed">Fixed</option>
          <option value="percent">Percent</option>
        </select>

        {/* Numeric Fields */}
        <div className="flex gap-2">
          <InputField
            type="number"
            placeholder="Discount Value"
            value={item.value}
            onChange={(e) => handleDiscountChange(index, "value", e.target.value)}
            className="w-full p-3 rounded border border-gray-300"
          />
          <InputField
            type="number"
            placeholder="Min People"
            value={item.minPeople}
            onChange={(e) => handleDiscountChange(index, "minPeople", e.target.value)}
            className="w-full p-3 rounded border border-gray-300"
          />
          <InputField
            type="number"
            placeholder="Max People"
            value={item.maxPeople}
            onChange={(e) => handleDiscountChange(index, "maxPeople", e.target.value)}
            className="w-full p-3 rounded border border-gray-300"
          />
        </div>

        {/* Remove button */}
        <button
          onClick={() => removeDiscount(index)}
          className="text-one font-bold text-lg absolute top-2 right-2"
        >
          ✕
        </button>
      </div>
    ))}

    {/* Add discount button */}
    <button onClick={addDiscount} className="bg-one text-white p-3 mt-2 rounded">
      Add Discount
    </button>
  </div>
          </div>
        )}

        </div>
       
      {activeTab===4&&(
<div className="w-full ">
 {/* Question & Answer */}
  <div className="p-4 space-y-5 border-1 mt-2">
    <h2 className="text-xl font-bold text-one mb-4">Question & Answer</h2>

    {titles.map((item, index) => (
      <div key={index} className="bg-gray-100 p-4 rounded relative mb-4">
        <InputField
          type="text"
          placeholder="Question"
          value={item.title}
          onChange={(e) => handleTitleChange(index, "title", e.target.value)}
        />
        <textarea
          placeholder="Answer"
          value={item.description}
          onChange={(e) => handleTitleChange(index, "description", e.target.value)}
          className="w-full mt-3 p-2 rounded border border-gray-300"
          rows={3}
          
        />

        <button
          onClick={() => removeTitle(index)}
          className="text-one font-bold text-lg absolute top-2 right-2"
        >
          ✕
        </button>
      </div>
    ))}

    <button onClick={addTitle} className="bg-one text-white p-3 mt-2 rounded">
      Add 
    </button>
  </div>
</div>
      )}

       
       
  

        <ButtonDone
          checkLoading={checkLoading}
          handleSave={handleSave}
          edit={edit}
        />
      </div>
    );
  };

  export default AddToursManagement;
