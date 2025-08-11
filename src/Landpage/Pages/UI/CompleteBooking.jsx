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
import FileUploadButtontype from './FileUploadButtontype'
const CompleteBooking = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [image, setimage] = useState(null);
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

  // **(1) Updated to retrieve `selectedExtras` from bookingData**
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
    infantsDiscount = 0,
    selectedExtras = []
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
          "https://bcknd.tickethub-tours.com/api/user/landPage/active"
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

 if (loading) {
  return (
    <div className="h-screen w-screen">
      <Loading />
    </div>
  );
}

if (!data) {
  navigate(-1);
  return null; 
}

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

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
            tourId: Number(data.tourScheduleId), 
            fullName: formData.name, 
            email: formData.email,
            phone: formData.phone,
            notes: formData.notes,
            adultsCount: Number(adults), 
            childrenCount: Number(children),
            infantsCount: Number(infants),
            totalAmount: total,
            paymentMethodId: selectedPayment,
            proofImage:image,

            extras: selectedExtras.map(extra => ({
                id: extra.id,
                count: {
                    adult: String(extra.counts.adults),
                    child: String(extra.counts.children), 
                    infant: String(extra.counts.infants) 
                }
            }))
        };

        const res = await axios.post(
            "https://bcknd.tickethub-tours.com/api/user/landpage/book-tour",
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
localStorage.removeItem("bookingData");

        toast.success("Booking completed successfully!");
          navigate("/");
    } catch (err) {
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
<FileUploadButtontype 
          onFileChange={setimage}
          pic={image}
          des={`Payment receipt image  `}
        
/>
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
            <h3 className="text-md font-semibold text-one mb-2">Pricing Details:</h3>

            {/* Main tour prices */}
            <div className="flex justify-between text-sm py-1">
              <span>Adults ({adults} x ${pricePerAdult}):</span>
              <span>${adultsTotal.toFixed(2)}</span>
            </div>
            {adultsDiscount > 0 && (
              <div className="flex justify-between text-sm py-1 text-red-500">
                <span>Adult Discount:</span>
                <span>-${adultsDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-sm py-1">
              <span>Children ({children} x ${pricePerChild}):</span>
              <span>${childrenTotal.toFixed(2)}</span>
            </div>
            {childrenDiscount > 0 && (
              <div className="flex justify-between text-sm py-1 text-red-500">
                <span>Children Discount:</span>
                <span>-${childrenDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-sm py-1">
              <span>Infants ({infants} x ${pricePerInfant}):</span>
              <span>${infantsTotal.toFixed(2)}</span>
            </div>
            {infantsDiscount > 0 && (
              <div className="flex justify-between text-sm py-1 text-red-500">
                <span>Infants Discount:</span>
                <span>-${infantsDiscount.toFixed(2)}</span>
              </div>
            )}

            {/* **(3) Display selected extras** */}
            {selectedExtras.length > 0 && (
              <>
                <h3 className="text-md font-semibold text-one mt-4 mb-2 border-t pt-4">Extras:</h3>
                {selectedExtras.map((extra) => (
                  <div key={extra.id} className="mb-2">
                    <h4 className="font-medium text-gray-800">{extra.name}</h4>
                    {extra.counts.adults > 0 && (
                      <div className="flex justify-between text-sm py-1 pl-4">
                        <span>Adults ({extra.counts.adults} x ${extra.price.adult}):</span>
                        <span>${(extra.counts.adults * extra.price.adult).toFixed(2)}</span>
                      </div>
                    )}
                    {extra.counts.children > 0 && (
                      <div className="flex justify-between text-sm py-1 pl-4">
                        <span>Children ({extra.counts.children} x ${extra.price.child}):</span>
                        <span>${(extra.counts.children * extra.price.child).toFixed(2)}</span>
                      </div>
                    )}
                    {extra.counts.infants > 0 && (
                      <div className="flex justify-between text-sm py-1 pl-4">
                        <span>Infants ({extra.counts.infants} x ${extra.price.infant}):</span>
                        <span>${(extra.counts.infants * extra.price.infant).toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                ))}
              </>
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