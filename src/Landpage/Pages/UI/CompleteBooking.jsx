import React, { useEffect, useState } from "react";
import fawry from '../../../assets/fawry.png';
import instapay from '../../../assets/instapay.png';
import visa from '../../../assets/Visa.png';
import vodafone from '../../../assets/vodafone.png';
import { useLocation, useParams } from "react-router-dom";
import Navtwo from '../../component/Navtwo';
import axios from "axios";
import Loading from '../../../ui/Loading';
import { useNavigate } from 'react-router-dom'

const CompleteBooking = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();
  const { state } = useLocation();

  const {
 
    adults,
    children,
    infants,
    
  } = state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://bcknd.tickethub-tours.com/api/user/landpage/category-tours/category/${id}`
        );
        setData(res.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading || !data) return <div className="h-screen w-screen"><Loading /></div>;

  
  const paymentOptions = [
    { id: 'fawry', label: 'Fawry', image: fawry },
    { id: 'visa', label: 'Visa', image: visa },
    { id: 'vodafone', label: 'Vodafone Cash', image: vodafone },
    { id: 'instapay', label: 'InstaPay', image: instapay }
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted with payment method: ${selectedPayment}`);
  };
  
 // Prices
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



  return (
    <div>
      <Navtwo />
       <span className="px-3 text-[18px] font-normal text-ten">
       <botton onClick={()=>navigate(-1) }>{data.title} </botton> / <span className="text-four">Choose payment method </span>
      </span>
      <div className="flex flex-col lg:flex-row gap-6 px-4 py-8 max-w-7xl mx-auto">
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full lg:w-1/2 bg-white text-white p-6 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-black">Your Info</h2>

          {[
            { label: 'Full Name', id: 'name', type: 'text', placeholder: 'Full Name' },
            { label: 'Email', id: 'email', type: 'email', placeholder: 'you@company.com' },
            { label: 'Phone', id: 'phone', type: 'tel', placeholder: 'Phone' },
            { label: 'Notes', id: 'notes', type: 'text', placeholder: 'Notes' }
          ].map(({ label, id, type, placeholder }) => (
            <div key={id} className="mb-4">
              <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                id={id}
                placeholder={placeholder}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <h3 className="text-xl font-semibold text-black mt-6 mb-3">Payment</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {paymentOptions.map((method) => (
              <button
                type="button"
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`flex flex-col items-center justify-center rounded-lg p-2 border transition transform ${
                  selectedPayment === method.id
                    ? 'border-one scale-105 bg-blue-50'
                    : 'border-gray-300'
                }`}
              >
                <img src={method.image} alt={method.label} className="w-12 h-12 object-contain mb-2" />
                <span className={`text-sm ${selectedPayment === method.id ? 'text-one font-semibold' : 'text-gray-600'}`}>
                  {method.label}
                </span>
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-one hover:bg-one/95 hover:scale-105 text-white py-2 px-4 rounded-xl font-semibold"
            disabled={!selectedPayment}
          >
            Confirm & Pay
          </button>
        </form>

        {/* Summary */}
        <div className="w-full lg:w-1/2 bg-gray-200 rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-one mb-2">Complete Your Booking</h2>

          <div className="text-sm text-gray-500 mb-4">
            Destination: <span className="text-one font-medium">{data.country}, {data.city}</span>
          </div>

          <div className="text-sm text-gray-500 mb-4">
            Days:
            {data?.daysOfWeek?.map((item, index) => (
              <span key={index} className="text-one font-medium ml-1">{item}</span>
            ))}
          </div>

          <div className="mb-4 flex gap-2">
            <h4 className="font-medium text-gray-800">Date:</h4>
            <p className="text-one">
              { new Date(data.startDate).toISOString().split('T')[0] }
            </p>
          </div>

          <div className="mt-6 border-t pt-4">
            <h3 className="text-md font-semibold text-one mb-2">Price:</h3>

        <div className="flex justify-between text-sm py-1">
  <span>Adults ({adults} x ${pricePerAdult}):</span>
  <span>${adultsTotal}</span>
</div>
{adultsDiscount > 0 && (
  <div className="flex justify-between text-sm py-1 text-red-500">
    <span>Adult Discount:</span>
    <span>-${adultsDiscount.toFixed(2)}</span>
  </div>
)}

<div className="flex justify-between text-sm py-1">
  <span>Children ({children} x ${pricePerChild}):</span>
  <span>${childrenTotal}</span>
</div>
{childrenDiscount > 0 && (
  <div className="flex justify-between text-sm py-1 text-red-500">
    <span>Children Discount:</span>
    <span>-${childrenDiscount.toFixed(2)}</span>
  </div>
)}

<div className="flex justify-between text-sm py-1">
  <span>Infants ({infants} x ${pricePerInfant}):</span>
  <span>${infantsTotal}</span>
</div>
{infantsDiscount > 0 && (
  <div className="flex justify-between text-sm py-1 text-red-500">
    <span>Infants Discount:</span>
    <span>-${infantsDiscount.toFixed(2)}</span>
  </div>
)}

<div className="flex justify-between text-base font-semibold border-t pt-4 mt-3">
  <span>Total:</span>
  <span>${total.toFixed(2)}</span>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteBooking;
