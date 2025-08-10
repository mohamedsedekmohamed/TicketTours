// TripDetails.jsx

import React, { useEffect, useState } from "react";
import Navtwo from "../../component/Navtwo";
import { LuClock } from "react-icons/lu";
import { IoFootsteps } from "react-icons/io5";
import { FaUserFriends, FaMapMarkerAlt, FaCheck } from "react-icons/fa";
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
import Loading from '../../../ui/Loading'
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

const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
  const storedBooking = JSON.parse(localStorage.getItem("bookingData"));

  if (storedBooking) {
    if (storedBooking?.tour?.id !== Number(id)) {
      localStorage.removeItem("bookingData");
    } else {
      setAdults(storedBooking.adults || 0);
      setChildren(storedBooking.children || 0);
      setInfants(storedBooking.infants || 0);
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


  if (loading) return <div className="h-screen w-screen"><Loading/></div>;

  const images = data.images || [];
  const [second, third] = [images[1], images[2]];
  const remainingImages = images.slice(3);

 const pricePerAdult = data.price?.adult || 0;
const pricePerChild = data.price?.child || 0;
const pricePerInfant = data.price?.infant || 0;

// Helper function to calculate discount
const getDiscount = (group, count) => {
  const groupDiscount = data.discounts?.find(
    (d) =>
      d.targetGroup === group &&
      count >= d.minPeople &&
      count <= d.maxPeople
  );

  if (!groupDiscount) return 0;

  if (groupDiscount.type === "fixed") {
    return Number(groupDiscount.value) * count;
  } else if (groupDiscount.type === "percentage") {
    const price =
      group === "adult"
        ? pricePerAdult
        : group === "child"
        ? pricePerChild
        : pricePerInfant;
    return price * count * (Number(groupDiscount.value) / 100);
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
const total = adultsTotal + childrenTotal + infantsTotal - discountAmount;


  
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
    total
  };

  localStorage.setItem("bookingData", JSON.stringify(bookingData));
 if (adults === 0 && children === 0 && infants === 0) {
  toast.warn("At least one person must be entered.");
  return; // stop navigation
}

navigate(`/completebooking/${data.id}`);  
};

  return (
    <div>
      <Navtwo />
      <ToastContainer />

      <span className="px-3 text-[14px] font-normal text-ten">
     <button onClick={()=>navigate(-1) }>{data.category}</button>    / <span className="text-four">{data.city}</span>
      </span>

      <h4 className="text-2xl sm:text-3xl md:text-4xl text-one font-semibold text-center mb-4 mt-2">
        {data.title}
      </h4>

      {/* Images */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-3">
  {/* الصورة الرئيسية */}
  <div className="sm:col-span-2">
    <img
      src={data.mainImage}
      alt="Main"
      className="w-full h-full object-cover rounded-xl aspect-video"
    />
  </div>

  {/* العمود الجانبي */}
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

      {/* Image Overlay Viewer */}
      {showAll && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 overflow-y-auto">
          <button onClick={() => setShowAll(false)} className="absolute top-4 right-4 text-white text-3xl">
            &times;
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10 w-full max-w-6xl">
            {images.map((img, i) => (
              <img key={i} src={img} alt={`img-${i}`} className="w-full h-48 object-cover rounded-lg" />
            ))}
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 mt-10 px-5 lg:px-10 min-h-screen">
        {/* Left: Tour Details */}
        <div className="w-full lg:w-2/3">
          {/* Info Boxes */}
          <div className="flex w-full  gap-6 mb-10">
            {[
              { icon: <LuClock />, title: "Duration", value: data.durationHours },
              { icon: <IoFootsteps />, title: "Tour Type", value: "Daily Tour" },
              { icon: <FaUserFriends />, title: "Group Size", value: data.maxUsers },
              { icon: <VscActivateBreakpoints />, title: "points", value: data.points
 },
            ].map((item, i) => (
              <div key={i} className="flex w-full items-center gap-4 border border-one p-3 rounded-lg">
                <div className="text-one text-3xl">{item.icon}</div>
                <div>
                  <div className="font-semibold text-one">{item.title}</div>
                  <div className="text-one">{item.value}</div>
                  
                </div>
              </div>
            ))}
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {/* About */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-one mb-2">About This Tour</h2>
              <p className="text-one leading-relaxed">{data.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-one mb-2">Highlights</h2>
              <ul className="space-y-2">
                {data.highlights?.map((h, i) => (
                  <li key={i} className="flex items-center text-one">
                    <FaCheck className="text-four mr-2" /> {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Included/Excluded */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-one mb-4">Included / Excluded</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <ul className="space-y-2">
                  {data.includes?.map((inc, i) => (
                    <li key={i} className="flex items-center text-one">
                      <FaCheck className="text-four mr-2" /> {inc}aa
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {data.excludes?.map((exc, i) => (
                    <li key={i} className="flex items-center">
                      <VscError  className="mr-2  text-red-500" /> <span className="text-one">{exc} </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Booking Box */}
        <div className="w-full lg:w-1/3 bg-gray-50 border border-one rounded-3xl p-6 shadow-lg sticky top-6 max-h-[90vh] overflow-y-auto">
                  <h2 className="text-xl font-bold text-one mb-2">INFO</h2>

          <div className="mb-2 text-sm">
            {/* <span className="line-through text-gray-400 pl-12">${data?.price?.adult}</span> */}
            {/* <span className="block text-lg font-semibold text-gray-900">From: $225.00</span> */}
          </div>
          <div className="text-sm text-gray-500 mb-4">
            Destination: <span className="text-one font-medium">{data.country}, {data.city}</span>
          </div>

                  <div className="mb-4 flex gap-2">
            <div
        className="flex gap-2 cursor-pointer items-center"
        onClick={() => setShowPicker(!showPicker)}
      >
        <h4 className="font-medium text-white bg-one px-3 py-1 rounded-2xl text-3xl">Date</h4>
        <p className="text-one">
          {startDate.toISOString().split("T")[0]} {"->"} {endDate.toISOString().split("T")[0]}
        </p>
      </div>

   {showPicker && (
  <div className="fixed inset-0 bg-black/80  bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-lg shadow-lg relative">
      <div className="pointer-events-none">
        <DatePicker
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
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

          {/* People Counters */}
          {[["Adults", "Over 18+", adults, setAdults], ["Children", "Under 12", children, setChildren], ["Infant", "Under 3", infants, setInfants]].map(
            ([label, desc, count, setFn]) => (
              <div key={label} className="flex justify-between items-center border-t py-3">
                <div>
                  <p className="font-medium text-gray-800">{label}</p>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFn(count + 1)}
                    className="w-7 h-7 bg-one text-white rounded-full"
                  >
                    +
                  </button>
                  <span className="w-6 text-center">{count}</span>
                  <button
                    onClick={() => setFn(count > 0 ? count - 1 : 0)}
                    className="w-7 h-7 bg-one text-white rounded-full"
                  >
                    -
                  </button>
                </div>
              </div>
            )
          )}

     {/* Total */}
<div className="mt-6 border-t pt-4">
  <div className="flex justify-between text-base">
    <span>Subtotal:</span>
    <span>${(adultsTotal + childrenTotal + infantsTotal).toFixed(2)}</span>
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
      className="bg-one text-white px-4 py-2 rounded mt-6"
    >
      Book Now
    </button>
        </div>
      </div>

      {/* Tour Location */}
      <div className="px-5 lg:px-10 my-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-one">Tour's Location</h2>
          <div className="text-gray-600 flex items-center gap-2 mt-2 sm:mt-0">
            <FaMapMarkerAlt /> <span>{data.city}, {data.country}</span>
          </div>
        </div>
        <div className="w-full h-64 sm:h-80 lg:h-[400px]">
          <StaticMap />
        </div>
      </div>

      {/* Itinerary & FAQ */}
      <QuestionsWithimage data={data?.itinerary} />
      <div className="px-4 py-6">
        <p className=" text-one text-[30px] lg:text-[48px] font-normal ">
Discount      </p>
        <BulkDiscountTable title=" Discount Adult" data={data?.discounts?.filter(d => d.targetGroup === "adult")} />
        <BulkDiscountTable title=" Discount Children" data={data?.discounts?.filter(d => d.targetGroup === "child")} />
        <BulkDiscountTable title=" Discount Infant" data={data?.discounts?.filter(d => d.targetGroup === "infant")} />
      </div>
      <Questions data={data?.faq} stopstatus />
      <Footer />
    </div>
  );
};

export default TripDetails;
