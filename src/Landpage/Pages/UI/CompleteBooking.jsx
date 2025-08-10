import React, { useEffect, useState } from "react";
import fawry from '../../../assets/fawry.png';
import instapay from '../../../assets/instapay.png';
import visa from '../../../assets/Visa.png';
import vodafone from '../../../assets/vodafone.png';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Navtwo from '../../component/Navtwo';
import axios from "axios";
import Loading from '../../../ui/Loading';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompleteBooking = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const bookingData =
    state || JSON.parse(localStorage.getItem("bookingData")) || {};

  const {
    adults = 0,
    children = 0,
    infants = 0,
    total = 0,
    adultsTotal = 0,
    childrenTotal = 0,
    infantsTotal = 0,
    adultsDiscount = 0,
    childrenDiscount = 0,
    infantsDiscount = 0
  } = bookingData;

  // Fetch tour data
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

  const [paymentOptions, setPaymentOptions] = useState([]);

useEffect(() => {
  const fetchPaymentMethods = async () => {
    try {
      const res = await axios.get(
        "https://bcknd.tickethub-tours.com/api/admin/paymentmethod/active"
      );
      if (res.data.success && res.data.data?.methods) {
        const formatted = res.data.data.methods.map((m) => ({
          id: m.id,
          label: m.name,
          description: m.describtion,
          image: m.logoPath
        }));
        setPaymentOptions(formatted);
      }
    } catch (err) {
      console.error("Error fetching payment methods:", err);
    }
  };
  fetchPaymentMethods();
}, []);

  if (loading || !data)
    return (
      <div className="h-screen w-screen">
        <Loading />
      </div>
    );

  // Payment options
 
  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warn("You need to log in first.");
      return;
    }

    if (!selectedPayment) {
      toast.warn("Please select a payment method.");
      return;
    }

    try {
      const payload = {
        tourId: id,
        ...formData,
        paymentMethod: selectedPayment,
        bookingDetails: {
          adults,
          children,
          infants,
          adultsTotal,
          childrenTotal,
          infantsTotal,
          adultsDiscount,
          childrenDiscount,
          infantsDiscount,
          total
        }
      };

      const res = await axios.post(
        "https://bcknd.tickethub-tours.com/api/user/booking", // غير الـ endpoint لو مختلف
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Booking completed successfully!");
      navigate("/success"); // صفحة النجاح
    } catch (err) {
      console.error(err);
      toast.error("Failed to complete booking.");
    }
  };

  // Prices
  const pricePerAdult = data.price?.adult || 0;
  const pricePerChild = data.price?.child || 0;
  const pricePerInfant = data.price?.infant || 0;

  return (
    <div>
      <ToastContainer />
      <Navtwo />
      <span className="px-3 text-[18px] font-normal text-ten">
        <button onClick={() => navigate(-1)}>{data.title} </button> /
        <span className="text-four"> Choose payment method </span>
      </span>
      <div className="flex flex-col lg:flex-row gap-6 px-4 py-8 max-w-7xl mx-auto">
        
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 bg-white text-white p-6 rounded-xl border border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-6 text-black">Your Info</h2>

          {[
            { label: 'Full Name', id: 'name', type: 'text', placeholder: 'Full Name' },
            { label: 'Email', id: 'email', type: 'email', placeholder: 'you@company.com' },
            { label: 'Phone', id: 'phone', type: 'tel', placeholder: 'Phone' },
            { label: 'Notes', id: 'notes', type: 'text', placeholder: 'Notes' }
          ].map(({ label, id, type, placeholder }) => (
            <div key={id} className="mb-4">
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {label}
              </label>
              <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={formData[id]}
                onChange={handleChange}
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
                <img
                  src={method.image}
                  alt={method.label}
                  className="w-12 h-12 object-contain mb-2"
                />
                <span
                  className={`text-sm ${
                    selectedPayment === method.id
                      ? 'text-one font-semibold'
                      : 'text-gray-600'
                  }`}
                >
                  {method.label}
                </span>
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-one hover:bg-one/95 hover:scale-105 text-white py-2 px-4 rounded-xl font-semibold"
          >
            Confirm & Pay
          </button>
        </form>

        {/* Summary */}
        <div className="w-full lg:w-1/2 bg-gray-200 rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-one mb-2">Complete Your Booking</h2>

          <div className="text-sm text-gray-500 mb-4">
            Destination:{" "}
            <span className="text-one font-medium">
              {data.country}, {data.city}
            </span>
          </div>

          <div className="text-sm text-gray-500 mb-4">
            Days:
            {data?.daysOfWeek?.map((item, index) => (
              <span key={index} className="text-one font-medium ml-1">
                {item}
              </span>
            ))}
          </div>

          <div className="mb-4 flex gap-2">
            <h4 className="font-medium text-gray-800">Date:</h4>
            <p className="text-one">
              {new Date(data.startDate).toISOString().split("T")[0]}
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
