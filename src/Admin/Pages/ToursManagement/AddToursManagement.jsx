import React, { useEffect, useState } from "react";
import Head from "../../../ui/Head";
import Loading from "../../../ui/Loading";
import InputField from "../../../ui/InputField";
import InputArrow from "../../../ui/InputArrow";
import InputArrowarray from "../../../ui/InputArrowarray";
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
import MapPicker from "../../../ui/MapPicker";

const AddToursManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
          const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const location = useLocation();
  const { sendData } = location.state || {};
  const [edit, setEdit] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [loading, setLoading] = useState(true);
const [promocode,setPromocode]=useState([])
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
  const [policy, setPolicy] = useState("");


  const [file, setFile] = useState("");
  const [fileactive, setFileactive] = useState("");
 const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
  const [prices, setPrices] = useState([
    { adult: "", child: "", infant: "", currencyId: "" },
  ]);
  const [discounts, setDiscounts] = useState([
    {
      kindBy: "",
      targetGroup: "",
      type: "",
      value: "",
      minPeople: "",
      maxPeople: "",
    },
  ]);
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
  const [faq, setFag] = useState([
    {
      title: "",
      description: "",
      image: null,
    },
  ]);
  const [faqor, setFagor] = useState([
    {
      id: "",
      title: "",
      description: "",
      image: null,
    },
  ]);
  const [titles, setTitles] = useState([{ title: "", description: "" }]);

  const [mainImage, setMainImage] = useState("");
  const [mainImagecheck, setMainImagecheck] = useState("");

  const [arrayimage, setArrayImage] = useState([]);
  const [originalImages, setOriginalImages] = useState([]);
  const compareImages = (originalImages, currentImages) => {
    const added = currentImages
      .filter(
        (curr) =>
          !curr.id &&
          !originalImages.some((orig) => orig.imagePath === curr.imagePath)
      )
      .map((curr) => curr.imagePath);

    const deleted = originalImages
      .filter(
        (orig) =>
          !currentImages.some((curr) => curr.imagePath === orig.imagePath)
      )
      .map((img) => img.id);

    return { added, deleted };
  };

  const { added, deleted } = compareImages(originalImages, arrayimage);

  const [status, setStatus] = useState(false);
  const [featured, setFeatured] = useState(false);
  //
  const [meetingPoint, setMeetingPoint] = useState(false);
  const [meetingPointLocation, SetMeetingPointLocation] = useState({
    lat: 31.200092,
    lng: 29.918739,
  });
  const [meetingPointAddress, setMeetingPointAddress] = useState("");
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

  useEffect(() => {
    if (sendData) {
      setEdit(true);

      axios
        .get(`https://bcknd.tickethub-tours.com/api/admin/tours/${sendData}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const user = response.data.data;
          if (user) {
           setFile(user.file ||"");
           setFileactive(user.file ||"");
            setTitle(user.title || "");
            setDescribtion(user.description || "");
            setCategory(user.category || "");
            setCountry(user.country || "");
            setCity(user.city || "");
            setMaxUsers(String(user.maxUsers) || 0);
            setMainImage(user.mainImage || "");
            setMainImagecheck(user.mainImage || "");
            setStartDate(user.startDate || "");
            SetEndDate(user.endDate || "");
            setStatus(user.status || false);
            setFeatured(user.featured || false);
            SetDurationDays(String(user.durationDays) || 0);
            SetDurationHours(String(user.durationHours) || 0);
            setPolicy(user.policy || "");
            setArrayImage(
              (user.images || []).map((img) => ({
                imagePath: img.url,
              }))
            );
            setOriginalImages(
              (user.images || []).map((img) => ({
                id: img.id,
                imagePath: img.url,
              }))
            );
            setPoints(String(user.points)||0);
            setMeetingPointAddress(user.meetingPointAddress);
            if (user?.meetingPointLocation) {
              const coords = user.meetingPointLocation
                .split("q=")[1]
                ?.split(",");
              if (coords?.length === 2) {
                SetMeetingPointLocation({
                  lat: parseFloat(coords[0]),
                  lng: parseFloat(coords[1]),
                });
              } else {
                SetMeetingPointLocation({
                  lat: 31.200092,
                  lng: 29.918739,
                });
              }
            } else {
              SetMeetingPointLocation({
                lat: 31.200092,
                lng: 29.918739,
              });
            }
            const formattedDays = user.daysOfWeek
              .map((day) => {
                const capitalized =
                  day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
                return days.find((d) => d.value === capitalized);
              })
              .filter(Boolean);
            setSelectedDays(formattedDays);
            setFields(user.highlights || []);
            setFieldstwo(user.includes || []);
            setFieldsthree(user.excludes || []);
    

setPrices([
  {
    adult: String(user.price.adult ?? ""),
    child: String(user.price.child ?? ""),
    infant: String(user.price.infant ?? ""),
    currencyId: Number(user.price.currencyId ?? ""),
  },
]);

setDiscounts(
  user?.discounts?.map((discount) => ({
    kindBy: discount.kindBy,
    targetGroup: discount.targetGroup,
    type: discount.type,
    value: String(discount.value ?? ""), // ✅ لازم تبقى String
    minPeople: String(discount.minPeople ?? ""), // ✅ لازم تبقى String
    maxPeople: String(discount.maxPeople ?? ""), // ✅ لازم تبقى String
  })) || []
);

         
            setExtras(
              user?.extras?.map((ex) => ({
                extraId: ex.id,
                price: {
                  adult: String(ex.price?.adult ?? ""),
                  child: String(ex.price?.child ?? ""),
                  infant: String(ex.price?.infant ?? ""),
                  currencyId: ex.price?.currency ?? "",
                },
              })) || []
            );

            setFag(
              user?.itinerary?.map((it) => ({
                originalId: it.id,
                title: it.title,
                description: it.description,
                image: it.imagePath,
              }))
            );

            setFagor(
              user?.itinerary?.map((it) => ({
                id: it.id,
                title: it.title,
                description: it.description,
                image: it.imagePath,
              }))
            );

            setTitles(
              user?.faq?.map((tit) => ({
                title: tit.question,
                description: tit.answer,
              }))
            );
             setPromocode((user.promoCode || []).map((it) => it.id))
            meetingPoint(user.meetingPoint || false);

          }
        })
        .catch(() => {
          // Handle error
        });
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [location.state]);

  // function getChangedFields(original, updated) {
  //   const changes = {};

  //   for (let key in updated) {
  //     if (key === "daysOfWeek") {
  //       if (JSON.stringify(updated[key]) !== JSON.stringify(original[key])) {
  //         changes[key] = Object.values(updated[key]);
  //       }
  //     }
  //     else if (
  //       typeof updated[key] === "object" &&
  //       updated[key] !== null &&
  //       original[key]
  //     ) {
  //       if (Object.keys(updated[key]).every(k => !isNaN(k))) {
  //         if (JSON.stringify(updated[key]) !== JSON.stringify(original[key])) {
  //           changes[key] = Object.values(updated[key]);
  //         }
  //       } else {
  //         const nestedChanges = getChangedFields(original[key], updated[key]);
  //         if (Object.keys(nestedChanges).length > 0) {
  //           changes[key] = nestedChanges;
  //         }
  //       }
  //     }
  //     else if (updated[key] !== original[key]) {
  //       changes[key] = updated[key];
  //     }
  //   }

  //   return changes;
  // }

  const handlefaqChange = (index, key, value) => {
    setFag((prevFaq) => {
      const updated = [...prevFaq];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  const addFaq = () => {
    setFag([...faq, { title: "", description: "", image: null }]);
  };

  const removeFaq = (index) => {
    const updated = faq.filter((_, i) => i !== index);
    setFag(updated);
  };

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
    highlights: "",
    excludes: "",
    includes: "",
    prices: "",
    selectedDays: "",
    arrayimage: "",
    status: "",
    featured: "",
    Promocode:"",
    policy:""
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
    if (name === "policy") setPolicy(value);
    if (name === "meetingPointLocation") SetMeetingPointLocation(value);
    if (name === "meetingPointAddress") setMeetingPointAddress(value);
    if (name === "durationHours") SetDurationHours(value);
    if (name === "durationDays") SetDurationDays(value);
  };
  const handstartDate = (newData) => {
    if (newData) {
      const localDate = new Date(
        newData.getTime() - newData.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      setStartDate(localDate);
    } else {
      setStartDate("");
    }
  };

  const handEndtDate = (newData) => {
    if (newData) {
      const localDate = new Date(
        newData.getTime() - newData.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      SetEndDate(localDate);
    } else {
      SetEndDate("");
    }
  };
  const handleIamgesChange = (newFiles) => {
    setArrayImage(newFiles);
    // if (edit) {

    //   const keptOldImages = newFiles.filter((oldImg) =>
    //     newFiles.some((newImg) => newImg.id === oldImg.id)
    //   );

    //   const newAddedImages = newFiles.filter((img) => !img.id);

    //   setArrayImage([...keptOldImages, ...newAddedImages]);
    // } else {
    //   setArrayImage(newFiles);
    // }
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

  const handlePriceChangeTOO = (index, key, value) => {
    const updated = [...prices];
    updated[index][key] = value;
    setPrices(updated);
  };

  // functions
  const handleTitleChange = (index, field, value) => {
    const updated = [...titles];
    updated[index][field] = value;
    setTitles(updated);
  };

  const buildItineraryPayload = (faq, faqor) => {
    const added = [];
    const updated = [];
    const deleted = [];

    // خريطة سريعة للقديم
    const originalMap = new Map(faqor.map((o) => [o.id, o]));
    const seen = new Set();

    // added + updated
    faq.forEach((item) => {
      if (!item.originalId) {
        // جديد
        added.push({
          title: item.title,
          description: item.description,
          imagePath: item.image, // backend expects imagePath
        });
      } else {
        // قديم → قارن الفروق
        const orig = originalMap.get(item.originalId);
        if (orig) {
          seen.add(item.originalId);
          const changes = { id: item.originalId };
          if (item.title !== orig.title) changes.title = item.title;
          if (item.description !== orig.description)
            changes.description = item.description;
          if (item.image !== orig.image) changes.imagePath = item.image;

          // لو فيه مفاتيح غير id بالفعل
          if (Object.keys(changes).length > 1) {
            updated.push(changes);
          }
        }
      }
    });

    faqor.forEach((o) => {
      if (!seen.has(o.id)) deleted.push(o.id);
    });

    return { added, updated, deleted };
  };

  const addTitle = () => {
    setTitles([...titles, { title: "", description: "" }]);
  };

  const removeTitle = (index) => {
    const updated = titles.filter((_, i) => i !== index);
    setTitles(updated);
  };

  const handleDiscountChange = (index, key, value) => {
    const updated = [...discounts];
    updated[index][key] = value;
    setDiscounts(updated);
  };

  const addDiscount = () => {
    setDiscounts([
      ...discounts,
      {
        kindBy: "",
        targetGroup: "",
        type: "",
        value: "",
        minPeople: "",
        maxPeople: "",
      },
    ]);
  };

  const removeDiscount = (index) => {
    const updated = discounts.filter((_, i) => i !== index);
    setDiscounts(updated);
  };

  const handleSelectChange = (selectedOptions) => {
    // Store the actual option objects, not just values
    setSelectedDays(selectedOptions || []);
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
    if (!policy) formErrors.points = "policy is required";

    if (!startDate) formErrors.startDate = "Start Date is required";
    if (!endDate) formErrors.endDate = "End Date Date is required";
    if (!mainImage) formErrors.mainImage = "Mian image is required";
    if (arrayimage.length == 0) formErrors.arrayimage = "Gallery  is required";
    if (selectedDays.length == 0) formErrors.selectedDays = "Days  is required";
    if (
      !Array.isArray(fields) ||
      fields.length === 0 ||
      fields.every((h) => h.trim() === "")
    ) {
      formErrors.highlights = "Highlights are required";
    }
    if (
      !Array.isArray(fieldstwo) ||
      fieldstwo.length === 0 ||
      fieldstwo.every((h) => h.trim() === "")
    ) {
      formErrors.includes = "includes are required";
    }
    if (
      !Array.isArray(fieldsthree) ||
      fieldsthree.length === 0 ||
      fieldsthree.every((h) => h.trim() === "")
    ) {
      formErrors.excludes = "excludes are required";
    }
    if (
  !Array.isArray(prices) ||
  prices.length === 0 ||
  prices.some(
    (item) =>
      !item.adult?.toString().trim() ||
      !item.child?.toString().trim() ||
      !item.infant?.toString().trim() ||
      !item.currencyId?.toString().trim()
  )
) {
  formErrors.prices =
    "All price fields (adult, child, infant, currency) are required";
}



// Validation for Discounts
    if (Array.isArray(discounts) && discounts.length > 0) {
      const hasInvalidDiscountRow = discounts.some((item) => {
        // بنجيب القيم بأمان عشان لو مفيش قيمة ميديناش Error
        const kindBy = item.kindBy?.toString().trim();
        const targetGroup = item.targetGroup?.toString().trim();
        const type = item.type?.toString().trim();
        const value = item.value?.toString().trim();
        const minPeople = item.minPeople?.toString().trim();
        const maxPeople = item.maxPeople?.toString().trim();

        // هل كتب في أي حقل من الحقول دي؟
        const hasAnyValue = Boolean(kindBy || targetGroup || type || value || minPeople || maxPeople);
        
        // هل ملى كل الحقول دي؟
        const hasAllValues = Boolean(kindBy && targetGroup && type && value && minPeople && maxPeople);

        // بيطلع Error فقط لو هو بدأ يكتب بس مكملش كل الحقول
        return hasAnyValue && !hasAllValues;
      });

      if (hasInvalidDiscountRow) {
        formErrors.discounts = "Please fill all discount fields if you add a discount.";
      }
    }

    // Validation for Extras
    if (Array.isArray(extras) && extras.length > 0) {
      const hasInvalidExtraRow = extras.some((item) => {
        const extraId = item.extraId?.toString().trim();
        const adult = item.price?.adult?.toString().trim();
        const child = item.price?.child?.toString().trim();
        const infant = item.price?.infant?.toString().trim();

        // هل اختار extra أو كتب أي سعر؟
        const hasAnyValue = Boolean(extraId || adult || child || infant);
        
        // هل ملى كل بيانات الـ extra دي؟
        const hasAllValues = Boolean(extraId && adult && child && infant);

        // بيطلع Error فقط لو هو بدأ يكتب بس مكملش الأسعار أو نسي يختار الـ Extra
        return hasAnyValue && !hasAllValues;
      });

      if (hasInvalidExtraRow) {
        formErrors.extras = "Please fill all extra fields and prices if you add an extra.";
      }
    }








    if (
      !Array.isArray(titles) ||
      titles.length === 0 ||
      titles.some(
        (item) =>
          !item.title?.toString().trim() || !item.description?.toString().trim()
      )
    ) {
      formErrors.titles = "FAQ (title and description) is required";
    }

    //  if (
    //   faq.length === 0 ||
    //   faq.some(
    //     (item) =>
    //       !item.question?.toString().trim() || !item.answer?.toString().trim()
    //   )) {
    //   formErrors.faq = "FAQ (question and answer) is required";
    // }

    if (meetingPoint) {
      if (!meetingPointLocation)
        formErrors.meetingPointLocation = "meeting Point Location is required";
      if (!meetingPointAddress)
        formErrors.meetingPointAddress = "meeting Point Address is required";
    }
    Object.values(formErrors).forEach((error) => {
      toast.error(error);
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  const handleSave = async () => {
    if (!validateForm()) return;
    setCheckLoading(true);
           let base64File = null
    if (file !== fileactive) {
      
       base64File = await convertToBase64(file);
    }
    
    const payload = {
      title,
      policy,
      file:file ? base64File : null,
      description: describtion,
      startDate: String(startDate),
      endDate: String(endDate),
      durationDays: parseInt(durationDays),
      durationHours: parseInt(durationHours),
      points: parseInt(points),
      meetingPoint,
      meetingPointAddress: meetingPoint ? meetingPointAddress : null,
      meetingPointLocation: meetingPoint
        ? `https://www.google.com/maps?q=${meetingPointLocation.lat},${meetingPointLocation.lng}`
        : null,
      maxUsers: parseInt(maxUsers),
      categoryId: parseInt(category),
      country,
     promoCodeIds: promocode,
      city,
      mainImage,
      images: arrayimage.map((b) => b.imagePath),
      highlights: fields.filter((val) => val),
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
currencyId: parseInt(prices[0].currencyId)

        },
      })),
      discounts: discounts.map((item) => ({
        kindBy: item.kindBy,
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
        imagePath: item.image,
      })),
      daysOfWeek: selectedDays.map((p) => p.value),
      status,
      featured,
    };

    const itineraryupdata = buildItineraryPayload(faq, faqor);
    const payloadtwo = {
      title,
           policy, // file:file ? file : null,
     promoCodeIds: promocode,
      description: describtion,
      startDate: String(startDate),
      endDate: String(endDate),
      durationDays: parseInt(durationDays),
      durationHours: parseInt(durationHours),
      points: parseInt(points),
      meetingPoint,
      meetingPointAddress: meetingPoint ? meetingPointAddress : "",
      meetingPointLocation: meetingPoint
        ? `https://www.google.com/maps?q=${meetingPointLocation.lat},${meetingPointLocation.lng}`
        : "",
      maxUsers: parseInt(maxUsers),
      categoryId: parseInt(category),
      country,
      city,
      images: { added, deleted },
      highlights: fields.filter((val) => val),
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
          adult: Number(extra.price.adult),
          child: Number(extra.price.child),
          infant: Number(extra.price.infant),
currencyId: parseInt(prices[0].currencyId)
        },
      })),
      discounts: discounts.map((item) => ({
        kindBy: item.kindBy,
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
      itinerary: itineraryupdata,
        daysOfWeek: selectedDays.map((p) => p.value),
      status,
      featured,
    };
    if (file !== fileactive) {payloadtwo.file = await convertToBase64(file); }
    if (mainImage !== mainImagecheck) {
      payloadtwo.mainImage = mainImage;
    }
    setCheckLoading(true);

    const request = edit
      ? axios.put(
          `https://bcknd.tickethub-tours.com/api/admin/tours/${sendData}`,
          payloadtwo
          , {
        headers: {
          Authorization: `Bearer ${token}`,
        },}
        )
      : axios.post(
          "https://bcknd.tickethub-tours.com/api/admin/tours",
          payload
          , {
        headers: {
          Authorization: `Bearer ${token}`,
        },}
        );

    request
      .then(() => {
        toast.success(`Tour ${edit ? "updated" : "added"} successfully`);
        setTimeout(() => {
          navigate("/admin/toursmanagement");
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
      })
      .finally(() => {
        setCheckLoading(false);
      });
  };

  const tabs = ["Info", "Images", "Options", "Pricing", "Faq","Policy"];
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Head kind={edit ? "Edit" : "Add"} name="Tours Management" />
      <ToastContainer />
      <div className="flex justify-around w-full flex-wrap mt-6 bg-gradient-to-r from-white via-gray-50 to-white rounded-xl shadow-inner p-2 gap-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-1 text-center px-6 py-3 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 ease-in-out
        ${
          activeTab === index
            ? "bg-one text-white shadow-lg scale-100"
            : "bg-white text-gray-600 hover:bg-one hover:text-white hover:shadow-md hover:scale-100"
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
            <InputArrow
              name="tours/add-data"
              namedata="countries"
              placeholder="Select Country"
              value={country}
              onChange={(val) => setCountry(val)}
            />

            <Inputfiltter
              name="tours/add-data"
              namedata="cities"
              placeholder="Select City"
              value={city}
              onChange={(val) => setCity(val)}
              shara={country}
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
            <InputArrowarray
              name="tours/add-data"
              namedata="PromoCode"
              placeholder="Select Promo Code"
              value={promocode}
              onChange={(val) => setPromocode(val)}
            />

       

            <div className="relative flex flex-col w-[300px] h-[80px] z-100">
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
  value={selectedDays} 
  onChange={handleSelectChange}
  // السطر ده هو اللي هيمنع التكرار ويخفي العنصر المختار
  isOptionSelected={(option) => selectedDays.some((v) => v.value === option.value)}
  className="basic-multi-select w-75 h-[80px] rounded-2xl"
  classNamePrefix="select"
/>
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
                <MapPicker
                  location={meetingPointLocation}
                  onLocationChange={(newLocation) => {
                    SetMeetingPointLocation(newLocation);
                  }}
                />
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
      <div className="flex flex-col gap-2 pl-4">
  <label className="block mb-2 text-sm font-medium text-gray-900">Upload file</label>
  
  <input
    type="file"
accept="application/pdf"
    onChange={(e) => setFile(e.target.files[0])}
    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none
      file:mr-4 file:py-2 file:px-4
      file:rounded-l-lg file:border-0
      file:text-sm file:font-semibold
      file:bg-one file:text-white
      hover:file:bg-blue-700"
  />

  {/* إذا كنت تريد عرض صورة مصغرة (Preview) إذا كان الملف صورة */}
 {file && (
  <div className="mt-2 p-2 border rounded bg-gray-50">
    
    {/* الحالة الأولى: الملف عبارة عن رابط نصي جاي من الباك اند */}
    {typeof file === 'string' ? (
      <div className="flex items-center gap-2">
        <span className="text-green-600 font-bold">Current File:</span>
        <a 
          href={file} 
          target="_blank" 
          rel="noreferrer" 
          className="text-blue-600 underline break-all"
        >
          {file.split('/').pop()} {/* عرض اسم الملف فقط من الرابط */}
        </a>
      </div>
    ) : (
      /* الحالة الثانية: الملف عبارة عن File Object جديد تم اختياره الآن */
      <div className="flex items-center gap-2">
        <span className="text-orange-600 font-bold">New File Selected:</span>
        <span className="text-gray-700">{file.name}</span>
        
        {/* التحقق الآمن من النوع */}
        {file.type && file.type.startsWith("image/") && (
           <img 
             src={URL.createObjectURL(file)} 
             alt="preview" 
             className="h-10 w-10 object-cover rounded ml-2" 
           />
        )}
      </div>
    )}
    
  </div>
)}
</div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="flex  gap-7 flex-wrap w-full">
            {/* highlights */}

            <div className="space-y-4 p-4 w-f">
              <h2 className="text-xl font-bold">highlights</h2>

              {fields.map((value, index) => (
                <div key={index} className="flex flex-wrap items-center gap-3">
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
                <div key={index} className="flex flex-wrap items-center gap-3">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      handleChangeInputtwo(index, e.target.value)
                    }
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
                <div key={index} className="flex flex-wrap items-center gap-3">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      handleChangeInputthree(index, e.target.value)
                    }
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
            <div className="py-2 space-y-5 w-full">
              <h2 className="text-xl font-bold mb-4">Extras</h2>
              {extras.map((extra, index) => (
                <div
                  key={index}
                  className="border   w-full border-gray-300 rounded-xl  px-1 md:p-3 space-y-3 relative bg-gray-50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
                    <InputArrow
                      name="tours/add-data"
                      namedata="extras"
                      placeholder="Select Extras"
                      value={extra.extraId}
                      onChange={(val) =>
                        handleExtrasChange(index, "extraId", val)
                      }
                    />
                    {/* <InputArrow
                      name="tours/add-data"
                      namedata="currencies"
                      placeholder="Select currency"
                      value={extra.price.currencyId}
                      onChange={(val) =>
                        handlePriceChange(index, "currencyId", val)
                      }
                    /> */}
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
                +Add Extra
              </button>
              {/*  */}
            </div>

            <div className="p-2 space-y-5 w-full border-1 mt-2">
              <h2 className="text-xl font-bold text-one mb-4">Itinerary</h2>

              {faq.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 py-4   rounded relative mb-4 space-y-3"
                >
                  <InputField
                    type="text"
                    placeholder="Title"
                    value={item.title}
                    onChange={(e) =>
                      handlefaqChange(index, "title", e.target.value)
                    }
                  />

                  <label className="py-2 text-one mb-4">Description </label>
                  <textarea
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) =>
                      handlefaqChange(index, "description", e.target.value)
                    }
                    className="w-full p-2 rounded border border-gray-300 resize-none leading-5 overflow-hidden"
                    rows={3}
                    maxLength={3000}
                    onInput={(e) => {
                      const el = e.target;
                      el.style.height = "auto";
                      el.style.height = `${Math.min(el.scrollHeight, 90)}px`;
                    }}
                  />
                  <FileUploadButton
                    kind={`${index}`}
                    like
                    onFileChange={(file) =>
                      handlefaqChange(index, "image", file)
                    }
                    pic={item.image}
                    des="Image preview"
                  />

                  <button
                    onClick={() => removeFaq(index)}
                    className="text-one font-bold text-lg absolute top-2 right-2"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                onClick={addFaq}
                className="bg-one text-white p-3 mt-2 rounded"
              >
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
                <div
                  key={index}
                  className="flex gap-2 flex-wrap bg-gray-100 items-center mb-4 relative p-4 rounded"
                >
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
                </div>
              ))}
            </div>
            {/*  */}
            <div className="p-4 space-y-5 border-1 mt-2">
              <h2 className="text-xl font-bold text-one mb-4">Discounts</h2>

              {discounts.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded relative mb-4 space-y-3"
                >
                  <label className="block text-sm py-2 font-medium text-gray-700 mb-1">
                    Target Group
                  </label>
                  <select
                    value={item.targetGroup}
                    onChange={(e) =>
                      handleDiscountChange(index, "targetGroup", e.target.value)
                    }
                    className="w-full p-3 rounded border border-gray-300"
                  >
                    <option value="">Select Target Group</option>
                    <option value="adult">Adult</option>
                    <option value="child">Child</option>
                    <option value="infant">Infant</option>
                  </select>
                  <label className="block text-sm py-2 font-medium text-gray-700 mb-1">
                    discounts type
                  </label>
                  <select
                    value={item.type}
                    onChange={(e) =>
                      handleDiscountChange(index, "type", e.target.value)
                    }
                    className="w-full p-3 rounded border border-gray-300"
                  >
                    <option value="">Select Discount Type</option>
                    <option value="fixed">Fixed</option>
                    <option value="percent">Percent</option>
                  </select>
                  <label className="block text-sm py-2 font-medium text-gray-700 mb-1">
                    Kind by
                  </label>
                  <select
                    value={item.kindBy}
                    onChange={(e) =>
                      handleDiscountChange(index, "kindBy", e.target.value)
                    }
                    className="w-full p-3 rounded border border-gray-300"
                  >
                    <option value="">Select kind </option>
                    <option value="person">Person</option>
                    <option value="total">Total</option>
                  </select>

                  <div className="flex gap-2 flex-wrap">
                    <InputField
                      type="number"
                      placeholder="Discount Value"
                      value={item.value}
                      onChange={(e) =>
                        handleDiscountChange(index, "value", e.target.value)
                      }
                      className="w-full p-3 rounded border border-gray-300"
                    />
                    <InputField
                      type="number"
                      placeholder="Min People"
                      value={item.minPeople}
                      onChange={(e) =>
                        handleDiscountChange(index, "minPeople", e.target.value)
                      }
                      className="w-full p-3 rounded border border-gray-300"
                    />
                    <InputField
                      type="number"
                      placeholder="Max People"
                      value={item.maxPeople}
                      onChange={(e) =>
                        handleDiscountChange(index, "maxPeople", e.target.value)
                      }
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
              <button
                onClick={addDiscount}
                className="bg-one text-white p-3 mt-2 rounded"
              >
                Add Discount
              </button>
            </div>
          </div>
        )}
      </div>

      {activeTab === 4 && (
        <div className="w-full ">
          {/* Question & Answer */}
          <div className="p-4 space-y-5 border-1 mt-2">
            <h2 className="text-xl font-bold text-one mb-4">FAQ </h2>

            {titles.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded relative mb-4"
              >
                <InputField
                  type="text"
                  placeholder="Question"
                  value={item.title}
                  onChange={(e) =>
                    handleTitleChange(index, "title", e.target.value)
                  }
                />
                <label className="py-2 text-one mb-4">Description </label>
                <textarea
                  placeholder="description"
                  value={item.description}
                  onChange={(e) =>
                    handleTitleChange(index, "description", e.target.value)
                  }
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

            <button
              onClick={addTitle}
              className="bg-one text-white  p-3  rounded"
            >
              Add
            </button>
          </div>


        
        </div>
      )}
      {activeTab === 5 && (
        <div className="w-full ">
<div className="flex flex-col gap-2 items-start">
  <label className="text-one font-normal text-[18px]">Policy</label>
  <textarea
    name="policy"
    value={policy}
    onChange={handleChange}
    placeholder="Policy"
    rows="5" // عدد السطور المبدئية عشان يكون كبير شوية
    className={`w-full rounded-2xl border px-4 py-3 sm:text-sm transition-all resize-y
      focus:outline-none focus:ring-2 focus:ring-one focus:border-one
      ${
        policy && String(policy).trim() !== ""
          ? "border-one/50 bg-green-50"
          : "border-gray-300"
      }
    `}
  ></textarea>
</div>
          </div>
          )}
<div className="pt-10 ">

      <ButtonDone
        checkLoading={checkLoading}
        handleSave={handleSave}
        edit={edit}
        />
        </div>
    </div>
  );
};

export default AddToursManagement;
