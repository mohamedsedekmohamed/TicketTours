// TripDetails.jsx

import React, { useEffect, useState } from "react";
import Navtwo from "../../component/Navtwo";
import { LuClock } from "react-icons/lu";
import { IoFootsteps } from "react-icons/io5";
import { FaUserFriends, FaMapMarkerAlt, FaCheck, FaTrashAlt } from "react-icons/fa"; // Added FaTrashAlt icon
import { MdGTranslate } from "react-icons/md";
import { VscError } from "react-icons/vsc";
import axios from "axios";
import { useParams } from "react-router-dom";
import StaticMap from "./StaticMap";
import Questions from "../Home/Parts/Questions";
import Footer from "../Footer";
import QuestionsWithimage from "../QuestionsWithimage";
import BulkDiscountTable from "../BulkDiscountTable";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../../ui/Loading";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TripDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const navigate = useNavigate();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedExtraId, setSelectedExtraId] = useState("");
  const [selectedExtras, setSelectedExtras] = useState([]); // Array to hold multiple selected extras

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [open, setOpen] = useState(false); 
  const [selectedId, setSelectedId] = useState(null); // القيمة المخزنة (id)
  const [selectedDate, setSelectedDate] = useState(""); // القيمة اللي يشوفها المستخدم

  const handleSelect = (schedule) => {
    setSelectedId(schedule.id);       
    setSelectedDate(schedule.date);   
    setOpen(false);                   
  };

  useEffect(() => {
    const storedBooking = JSON.parse(localStorage.getItem("bookingData"));
    if (storedBooking) {
      if (storedBooking?.tour?.id !== Number(id)) {
        localStorage.removeItem("bookingData");
      } else {
        setAdults(storedBooking.adults || 0);
        setChildren(storedBooking.children || 0);
        setInfants(storedBooking.infants || 0);
        setSelectedId(storedBooking.tourScheduleId)
        // Load extras from local storage
        if (storedBooking.selectedExtras) {
            setSelectedExtras(storedBooking.selectedExtras);
        }
      }
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://bcknd.tickethub-tours.com/api/user/landpage/category-tours/category/${id}`
        );
        const tour = res.data.data;
        setData(tour);
        setStartDate(new Date(tour.startDate));
        setEndDate(new Date(tour.endDate));
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // **New function to add an extra**
  const addExtra = () => {
    if (selectedExtraId && data?.extras) {
      const extraToAdd = data.extras.find(e => e.id.toString() === selectedExtraId);
      const isAlreadyAdded = selectedExtras.some(e => e.id.toString() === selectedExtraId);
      
      if (extraToAdd && !isAlreadyAdded) {
        setSelectedExtras(prevExtras => [
          ...prevExtras,
          {
            ...extraToAdd,
            counts: {
              adults: 0,
              children: 0,
              infants: 0,
            },
          },
        ]);
        setSelectedExtraId(""); // Reset the select dropdown
      }
    }
  };

  // **New function to remove an extra**
  const removeExtra = (extraId) => {
    setSelectedExtras(prevExtras => prevExtras.filter(e => e.id !== extraId));
  };

  // **New function to update extra counts**
  const updateExtraCount = (extraId, type, newCount) => {
    setSelectedExtras(prevExtras =>
      prevExtras.map(extra =>
        extra.id === extraId
          ? { ...extra, counts: { ...extra.counts, [type]: newCount } }
          : extra
      )
    );
  };
  

  if (loading)
    return (
      <div className="h-screen w-screen">
        <Loading />
      </div>
    );

  const images = data.images || [];
const second = images?.[1] ?? null;
const third = images?.[2] ?? null;
  const remainingImages = images.slice(3);

  const pricePerAdult = data.price?.adult || 0;
  const pricePerChild = data.price?.child || 0;
  const pricePerInfant = data.price?.infant || 0;

  // Calculate totals for selected extras
  const extrasTotalPrice = selectedExtras.reduce((total, extra) => {
    const adultsPrice = (extra.price?.adult || 0) * extra.counts.adults;
    const childrenPrice = (extra.price?.child || 0) * extra.counts.children;
    const infantsPrice = (extra.price?.infant || 0) * extra.counts.infants;
    return total + adultsPrice + childrenPrice + infantsPrice;
  }, 0);

  const getDiscount = (group, count) => {
    const groupDiscount = data.discounts?.find(
      (d) =>
        d.targetGroup === group && count >= d.minPeople && count <= d.maxPeople
    );

    if (!groupDiscount) return 0;

    if (groupDiscount.type === "fixed") {
      if (groupDiscount.kindBy === "person") {
        return Number(groupDiscount.value) * count;
      } else if (groupDiscount.kindBy === "total") {
        return Number(groupDiscount.value);
      }
    } else if (groupDiscount.type === "percentage") {
      const price =
        group === "adult"
          ? pricePerAdult
          : group === "child"
          ? pricePerChild
          : pricePerInfant;

      if (groupDiscount.type === "percentage") {
        if (groupDiscount.kindBy === "person") {
          return price * (Number(groupDiscount.value) / 100) * count;
        } else if (groupDiscount.kindBy === "total") {
          return price * count * (Number(groupDiscount.value) / 100);
        }
      }
    }
    return 0;
  };

  // Calculate totals
  const adultsTotal = adults * pricePerAdult;
  const childrenTotal = children * pricePerChild;
  const infantsTotal = infants * pricePerInfant;

  const adultsDiscount = getDiscount("adult", adults);
  const childrenDiscount = getDiscount("child", children);
  const infantsDiscount = getDiscount("infant", infants);

  const discountAmount = adultsDiscount + childrenDiscount + infantsDiscount;
  
  // Update total calculation to include extras
  const total = adultsTotal + childrenTotal + infantsTotal - discountAmount + extrasTotalPrice;

  const handleBooking = () => {
    const bookingData = {
      tour: data,
      adults,
      children,
      infants,
      adultsTotal,
      childrenTotal,
      infantsTotal,
      adultsDiscount,
      childrenDiscount,
      infantsDiscount,
      discountAmount,
      total,    
      tourScheduleId:selectedId,
      // Store the array of selected extras
      selectedExtras,
    };

    if (adults === 0 && children === 0 && infants === 0) {
      toast.warn("At least one person must be entered.");
      return; // stop navigation
    }
    if (selectedId ===null ) {
      toast.warn("Should  Select date");
      return; // stop navigation
    }
    localStorage.setItem("bookingData", JSON.stringify(bookingData));

    navigate(`/completebooking/${data.id}`);
  };

  return (
    <div>
      <Navtwo />
      <ToastContainer />
      <span className="px-3 text-[14px] md:text-2xl font-normal text-ten">
        <button onClick={() => navigate(-1)}>{data.category}</button> /{" "}
        <span className="text-four">{data.city}</span>
      </span>
      <h4
  className="font-semibold text-center mb-4 mt-2 text-one"
  style={{
    fontSize:
      data.title.length > 40
        ? "1.25rem" // صغير
        : data.title.length > 25
        ? "1.5rem" // متوسط
        : "2rem",  // كبير
  }}
>
  {data.title}
</h4>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-3">
        <div className="sm:col-span-2">
          <img
            src={data.mainImage}
            alt="Main"
            className="w-full h-full object-cover rounded-xl aspect-video"
          />
        </div>
        <div className="flex sm:flex-col gap-3 h-full">
          {[second, third].map((img, idx) =>
            img ? (
              <div key={idx} className="relative flex-1">
                <img
                  src={img}
                  alt={`image-${idx}`}
                  className="w-full h-full object-cover rounded-xl"
                />
                {idx === 1 && remainingImages.length > 0 && (
                  <button
                    onClick={() => setShowAll(true)}
                    className="absolute inset-0 bg-black/60 text-white text-lg font-semibold flex items-center justify-center rounded-xl"
                  >
                    +{remainingImages.length}
                  </button>
                )}
              </div>
            ) : null
          )}
        </div>
      </div>
      {showAll && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 overflow-y-auto">
          <button
            onClick={() => setShowAll(false)}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            &times;
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10 w-full max-w-6xl">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`img-${i}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col lg:flex-row gap-6 mt-10 px-5 lg:px-10 min-h-screen">
        <div className="w-full lg:w-2/3">
          <div className="flex w-full flex-wrap justify-around  gap-6 mb-10">
            {[
              {
                icon: <LuClock />,
                title: "Duration",
                value: data.durationHours,
              },
              { icon: <IoFootsteps />, title: "Tour Type", value: " Tour" },
              {
                icon: <FaUserFriends />,
                title: "Group Size",
                value: data.maxUsers,
              },
              {
                icon: <VscActivateBreakpoints />,
                title: "points",
                value: data.points,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-1 items-center gap-2 border border-one p-3 rounded-lg"
              >
                <div className="text-one text-3xl">{item.icon}</div>
                <div>
                  <div className="font-semibold text-one">{item.title}</div>
                  <div className="text-one">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-one mb-2">
                About This Tour
              </h2>
              <p className="text-one leading-relaxed px-3">{data.description}</p>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-one mb-2">
                Highlights
              </h2>

            <ul className="space-y-3 mx-2 w-full">
  {data.highlights?.map((h, i) => (
    <li
      key={i}
      className="flex items-start text-one leading-relaxed"
    >
      <FaCheck className="text-four mt-1 flex-shrink-0" />
      <span className="ml-3 break-words w-full  sm:w-[90%]">{h}</span>
    </li>
  ))}
</ul>
            </div>

         <div className="px-2">
  <h2 className="text-xl sm:text-2xl font-bold text-one mb-6">
    Included / Excluded
  </h2>
  <div className="flex flex-col sm:flex-row sm:gap-7 flex-wrap">
    <ul className="flex-1 space-y-3 py-4">
      {data.includes?.map((inc, i) => (
        <li
          key={i}
          className="flex text-one  leading-relaxed"
        >
          <FaCheck className="text-four mt-1 flex-shrink-0" />
          <span className="mx-3 break-words w-full sm:w-full">
            {inc}
          </span>
        </li>
      ))}
    </ul>
    <ul className="flex-1 space-y-3 py-4">
      {data.excludes?.map((exc, i) => (
        <li
          key={i}
          className="flex items-center text-one break-words"
        >
          <VscError className="text-red-500 flex-shrink-0" />
          <span className="mx-3 break-words w-full sm:w-full">
            {exc}   
          </span>
        </li>
      ))}
    </ul>
  </div>
</div>



          </div>
        </div>
        <div className="w-full lg:w-1/3 bg-gray-50 border border-one rounded-3xl p-6 shadow-lg sticky top-6 max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-one mb-2">INFO</h2>
          <div className="mb-2 text-sm"></div>
          <div className="text-sm text-gray-500 mb-4">
            Destination:{" "}
            <span className="text-one font-medium">
              {data.country}, {data.city}
            </span>
          </div>
          <div className="mb-4 flex gap-2">
            <div
              className="flex gap-2 cursor-pointer items-center"
              onClick={() => setShowPicker(!showPicker)}
            >
              <h4 className="font-medium text-white bg-one px-3 py-1 rounded-2xl text-3xl">
                Date
              </h4>
              <p className="text-one">
                {startDate.toISOString().split("T")[0]} {"->"} {endDate.toISOString().split("T")[0]}
              </p>
             

            </div>
          
            {showPicker && (
              <div className="fixed inset-0 bg-black/80  bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-lg shadow-lg relative">
                  <div className="">
                    <DatePicker
                      selected={startDate}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
  inline
  disabled
                    />
                  </div>
                  <button
                    className="mt-4 px-4 py-2 bg-one text-white rounded"
                    onClick={() => setShowPicker(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
 <div className="relative inline-block py-2">
      <button
        onClick={() => setOpen(!open)}
        className="mt-3 px-4 py-2 border rounded-lg bg-white text-one hover:bg-one hover:text-white transition"
      >
        {selectedDate || "Select date"}
      </button>

      {/* اللستة */}
      {open && (
        <div className="absolute mt-2 bg-white border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto w-48">
          {data?.schedules?.map((s) => (
            <div
              key={s.id}
              onClick={() => handleSelect(s)}
              className="px-4 py-2 cursor-pointer hover:bg-one hover:text-white"
            >
              {s.date}
            </div>
          ))}
        </div>
      )}

    
    </div>
          {[
            ["Adults", "Over 18", pricePerAdult, adults, setAdults],
            ["Children", "Under 12", pricePerChild, children, setChildren],
            ["Infant", "Under 3", pricePerInfant, infants, setInfants],
          ].map(([label, desc, price, count, setFn]) => (
            <div
              key={label}
              className="flex justify-between items-center border-t border-gray-500 py-3"
            >
              <div>
                <p className="font-bold text-one">{label}</p>
                <p className="font-semibold text-one">{price}$</p>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFn(count > 0 ? count - 1 : 0)}
                  className="w-8 h-8 bg-one text-white rounded-full"
                >
                  -
                </button>
                <span className="w-6 text-center">{count}</span>
                <button
                  onClick={() => setFn(count + 1)}
                  className="w-8 h-8 bg-one text-white rounded-full"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          {/* **Multiple extras section** */}
          <label className="block mt-4 mb-2 font-medium">Extra Add-ons</label>
          <div className="flex items-center gap-2">
            <select
              value={selectedExtraId}
              onChange={(e) => setSelectedExtraId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">  (Add-on)</option>
              {data.extras?.map((extra) => (
                <option key={extra.id} value={extra.id}>
                  {extra.name}
                </option>
              ))}
            </select>
            <button
              onClick={addExtra}
              disabled={!selectedExtraId}
              className="w-10 h-10 bg-one text-white rounded-md flex items-center justify-center disabled:opacity-50"
            >
              +
            </button>
          </div>
          
          {selectedExtras.map((extra) => (
            <div key={extra.id} className="mt-4 border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{extra.name}</h3>
                <button onClick={() => removeExtra(extra.id)} className="text-red-500 hover:text-red-700">
                  <FaTrashAlt />
                </button>
              </div>
              
              <div className="space-y-2">
                {[
                  ["Adults", "Over 18+", extra.price.adult, extra.counts.adults, (newCount) => updateExtraCount(extra.id, 'adults', newCount)],
                  ["Children", "Under 12", extra.price.child, extra.counts.children, (newCount) => updateExtraCount(extra.id, 'children', newCount)],
                  ["Infant", "Under 3", extra.price.infant, extra.counts.infants, (newCount) => updateExtraCount(extra.id, 'infants', newCount)],
                ].map(([label, desc, price, count, setFn]) => (
                  <div key={label} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">{label}</p>
                      <p className="font-medium text-gray-800">{desc}</p>
                      <p className="font-medium text-gray-800">{price}$</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setFn(count > 0 ? count - 1 : 0)}
                  className="w-8 h-8 bg-one text-white rounded-full"
                      >
                        -
                      </button>
                      <span className="w-6 text-center">{count}</span>
                      <button
                        onClick={() => setFn(count + 1)}
                  className="w-8 h-8 bg-one text-white rounded-full"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}


          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-base">
              <span>Subtotal:</span>
              <span>
                $
                {(
                  adultsTotal +
                  childrenTotal +
                  infantsTotal +
                  extrasTotalPrice
                ).toFixed(2)}
              </span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-sm text-red-500">
                <span>Discount:</span>
                <span>- ${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-semibold mt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleBooking}
            className="bg-one text-white px-4 py-2 rounded mt-6 w-full"
          >
            Book Now
          </button>
        </div>
      </div>
      {data?.meetingPointLocation && data?.meetingPointAddress && (
  <div className="px-5 lg:px-10 my-15">
    {/* العنوان والمكان */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
      <h2 className="text-xl sm:text-4xl font-bold text-one">
        Tour's Location
      </h2>
      <div className="text-gray-600 flex items-center gap-2 mt-2 sm:mt-0">
        <FaMapMarkerAlt />{" "}
        <span>
          {data.city}, {data.country}
        </span>
      </div>
    </div>

    <div className="py-3">
      <span className="text-2xl font-semibold block mb-2">
        Meeting Address:
      </span>
      <span className="block text-lg text-gray-700">
        {data?.meetingPointAddress}
      </span>
    </div>

    {/* الخريطة */}
    <div className="w-full h-64 sm:h-80 lg:h-[400px] mt-4">
      <StaticMap
        lat={parseFloat(data.meetingPointLocation.split("q=")[1].split(",")[0])}
        lng={parseFloat(data.meetingPointLocation.split("q=")[1].split(",")[1])}
      />
    </div>
  </div>
)}

<div className="my-5">
  <QuestionsWithimage data={data?.itinerary} />
</div>


      <div className="px-4 py-6">
        <p className=" text-one text-[30px] lg:text-[48px] font-normal ">
          Discount{" "}
        </p>
        <BulkDiscountTable
          title=" Discount Adult"
          data={data?.discounts?.filter((d) => d.targetGroup === "adult")}
        />
        <BulkDiscountTable
          title=" Discount Children"
          data={data?.discounts?.filter((d) => d.targetGroup === "child")}
        />
        <BulkDiscountTable
          title=" Discount Infant"
          data={data?.discounts?.filter((d) => d.targetGroup === "infant")}
        />
      </div>
      {data?.faq&&(
      <Questions data={data?.faq} stopstatus />
      )}
      <Footer />
    </div>
  );
};

export default TripDetails;