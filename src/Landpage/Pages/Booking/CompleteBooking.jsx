import React, {  useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Navtwo from "../../component/Navtwo";
import axios from "axios";
import Loading from "../../../ui/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileUploadButtontype from "./FileUploadButtontype";
import MapPicker from "../../../ui/MapPicker";
import { FaCheckCircle, FaTimesCircle, FaPercent, FaTag } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
const CompleteBooking = () => {
    const token = localStorage.getItem("tokenuser");
// --- PDF Generation Function ---
  const generateBookingPDF = (apiData, localBookingData, tourDetails) => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.setTextColor(41, 128, 185);
    doc.text("Booking Confirmation", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Booking Date: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Tour Name: ${tourDetails.title}`, 14, 38);
    doc.text(`Location: ${tourDetails.country}, ${tourDetails.city}`, 14, 46);

    const mainData = [
      ["Customer Name", user.name || "N/A"],
      ["Email", user.email || "N/A"],
      ["Phone", formData.phone || "N/A"],
      ["Tour Date", localBookingData.tourScheduldate || "N/A"],
      ["Address/Meeting Point", description || "N/A"],
    ];

    autoTable(doc, {
      startY: 55,
      head: [["Detail", "Description"]],
      body: mainData,
      theme: 'striped',
      headStyles: { fillColor: [41, 128, 185] }
    });

    const pricingData = [
      ["Adults", `${localBookingData.adults} x $${tourDetails.price?.adult}`, `$${localBookingData.adultsTotal}`],
      ["Children", `${localBookingData.children} x $${tourDetails.price?.child}`, `$${localBookingData.childrenTotal}`],
      ["Infants", `${localBookingData.infants} x $${tourDetails.price?.infant}`, `$${localBookingData.infantsTotal}`],
    ];

    if (localBookingData.selectedExtras?.length > 0) {
      localBookingData.selectedExtras.forEach(extra => {
        pricingData.push([`Extra: ${extra.name}`, "Included", "Included in Total"]);
      });
    }

    pricingData.push([{ content: "Final Total Amount", colSpan: 2, styles: { fontStyle: 'bold' } }, `$${calculateFinalTotal()}`]);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Category", "Details", "Price"]],
      body: pricingData,
      headStyles: { fillColor: [46, 204, 113] }
    });

    doc.save(`Booking_${tourDetails.title}_${new Date().getTime()}.pdf`);
  };
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [image, setimage] = useState(null);
  const [description, setDescription] = useState("");
const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : { name: "", email: "" };
  const [meetingPointLocation, SetMeetingPointLocation] = useState({
    lat: 31.200092,
    lng: 29.918739,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [code, setCode] = useState("");
  const [discountcode, setDiscountcode] = useState("");
  // const [numbercode, setNumbercode] = useState("");
  const [errorcode, setErrorcode] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [codeid, setcodeid] = useState("");
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
    infantsDiscount = 0,
    tourScheduleId = 0,
    tourScheduldate = "",
    selectedExtras = [],
  } = bookingData;

  const [hasMeetingPointFromApi, setHasMeetingPointFromApi] = useState(false);

  // Fetch tour data
  useEffect(() => {
  console.log("BookingData in CompleteBooking:", tourScheduldate);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://bcknd.tickethub-tours.com/api/user/landpage/category-tours/category/${id}`
        );
        const tourData = res.data.data;
        setData(tourData);

        if (tourData?.meetingPointAddress && tourData?.meetingPointLocation) {
          setDescription(tourData.meetingPointAddress);
          // لو جاي كرابط Google Maps
          if (
            typeof tourData.meetingPointLocation === "string" &&
            tourData.meetingPointLocation.includes("maps?q=")
          ) {
            const coords = tourData.meetingPointLocation
              .split("maps?q=")[1]
              .split(",");
            SetMeetingPointLocation({
              lat: parseFloat(coords[0]),
              lng: parseFloat(coords[1]),
            });
          } else {
            SetMeetingPointLocation(tourData.meetingPointLocation);
          }

          setHasMeetingPointFromApi(true);
        }
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
            image: m.logoPath,
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
  const calculateFinalTotal = () => {
    if (!discountcode || !discountType) {
      return total;
    }

    let finalAmount;
    if (discountType === "amount") {
      finalAmount = Math.max(total - discountcode, 0);
    } else if (discountType === "percentage") {
      finalAmount = Math.max(total - (total * discountcode) / 100, 0);
    } else {
      finalAmount = total;
    }

    return finalAmount;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.warn("You need to login in first.");
      return;
    }

    if (!selectedPayment) {
      toast.warn("Please select a payment method.");
      return;
    }
    if (!description) {
      toast.warn("description is required .");
      return;
    }
    if (!meetingPointLocation) {
      toast.warn("meetingPointLocation is required .");
      return;
    }
    if (!image) {
      toast.warn("image is required .");
      return;
    }

    const finalTotal = calculateFinalTotal();

    try {
      const payload = {
        tourId: tourScheduleId,
        fullName: user.name,
        email: user.email,
        phone: formData.phone,
        notes: formData.notes,
        adultsCount: Number(adults),
        childrenCount: Number(children),
        infantsCount: Number(infants),
        totalAmount: finalTotal,
        paymentMethodId: selectedPayment,
        proofImage: image,
        discount: Number(adultsDiscount),
        address: description,
        location: `https://www.google.com/maps?q=${meetingPointLocation.lat},${meetingPointLocation.lng}`,
      };

      if (codeid) {
        payload.promoCodeId = codeid;
      }

      if (selectedExtras && selectedExtras.length > 0) {
        payload.extras = selectedExtras.map((extra) => ({
          id: extra.id,
          count: {
            adult: String(extra.counts.adults),
            child: String(extra.counts.children),
            infant: String(extra.counts.infants),
          },
        }));
      }

    const res =  await axios.post(
        "https://bcknd.tickethub-tours.com/api/user/landpage/book-tour",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const apiData = res.data;
if (apiData?.success) {
  generateBookingPDF(res.data.data, bookingData, data);
  toast.success("Booking successful! PDF downloaded.");
}
      localStorage.removeItem("bookingData");
      toast.success("Booking completed successfully!");
   
      setFormData({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  setimage(null);
  setDescription("");
  setCode("");
  setDiscountcode("");
  setDiscountType("");
  setcodeid("");
  setSelectedPayment(null);
    } catch (error) {
 const err =
  error?.response?.data?.error ||
  error?.response?.error ||
  error?.response?.data ||
  error;

if (err?.details && Array.isArray(err.details)) {
  err.details.forEach((detail) => {
    toast.error(`${detail.field}: ${detail.message}`);
  });
} else if (Array.isArray(err?.errors)) {
  // بعض الـ APIs بترجع errors كـ array
  err.errors.forEach((e) => {
    toast.error(e.message || e);
  });
} else if (typeof err === "string") {
  toast.error(err);
} else if (err?.message) {
  toast.error(err.message);
} else {
  toast.error("Something went wrong. Please try again.");
}

}

  };

  const pricePerAdult = data.price?.adult || 0;
  const pricePerChild = data.price?.child || 0;
  const pricePerInfant = data.price?.infant || 0;

  const handleApply = async () => {
    if (!token) {
      toast.warn("You need to login in first.");
      return;
    }
    if (!code) {
      toast.warn("You should write code");
      return;
    }

    try {
      setErrorcode("");
      const res = await axios.post(
        "https://bcknd.tickethub-tours.com/api/user/landpage/apply-promo-code",
        { code: code, tourId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success && res.data.data?.promoCodeData) {
        const promo = res.data.data.promoCodeData;
        setDiscountcode(promo.discountValue);
        // setNumbercode(promo.usageLimit);
        setDiscountType(promo.discountType);
        setcodeid(promo.id);
      } else {
        setErrorcode("Invalid promo code");
      }
    } catch (err) {
      setErrorcode(
        err.response?.data?.error?.message ||
          err.response?.data?.message ||
          err.message ||
          "Something went wrong, try again."
      );
      setcodeid("");
      setDiscountcode("");
      // setNumbercode("");
      setDiscountType("");
    }
  };
const startDayName = new Date(tourScheduldate).toLocaleDateString('en-US', { weekday: 'long' });
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
            // {
            //   label: "Full Name",
            //   id: "name",
            //   type: "text",
            //   placeholder: "Full Name",
            // },
            // {
            //   label: "Email",
            //   id: "email",
            //   type: "email",
            //   placeholder: "you@gmail.com",
            // },
            { label: "Phone", id: "phone", type: "tel", placeholder: "Phone" },
            { label: "Notes", id: "notes", type: "text", placeholder: "Notes" },
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

          <div>
            {/* Label */}
            <label
              htmlFor="promo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              If you have a Promo code, enter it
            </label>

            {/* Input + Button */}
            <div className="flex gap-2">
              <input
                type="text"
                id="promo"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 
                 text-gray-800 placeholder-gray-400 focus:outline-none 
                 focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleApply}
                type="button"
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-one 
                 text-white hover:bg-one disabled:bg-gray-400"
              >
                Apply
                <MdLocalOffer className="text-lg" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-2 mt-3 text-sm">
              {/* Error */}
              {errorcode && (
                <span className="flex items-center gap-2 text-red-600">
                  <FaTimesCircle className="text-lg" />
                  {errorcode}
                </span>
              )}

              {/* Discount value */}
              {discountcode && (
                <span className="flex items-center gap-2 text-green-600">
                  <FaCheckCircle className="text-lg" />
                  You will get a discount: {discountcode}
                </span>
              )}

              {/* Discount type */}
              {discountType && (
                <span className="flex items-center gap-2 text-green-600">
                  <FaPercent className="text-lg" />
                  Discount Type: {discountType}
                </span>
              )}

              {/* {numbercode && (
                <span className="flex items-center gap-2 text-gray-600">
                  <FaTag className="text-lg" />
                  Usage limit: {numbercode}
                </span>
              )} */}
            </div>
          </div>
          {/* Meeting Point Address */}
          {hasMeetingPointFromApi ? (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                value={description}
                readOnly
                className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 text-gray-800"
              />
              <MapPicker location={meetingPointLocation} readOnly />
            </>
          ) : (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                placeholder="Description of the Address"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-800"
              />
              <div className="my-3">
                <MapPicker
                  location={meetingPointLocation}
                  onLocationChange={(newLocation) =>
                    SetMeetingPointLocation(newLocation)
                  }
                />
              </div>
            </>
          )}

          {/* Payment */}
          <h3 className="text-xl font-semibold text-black mt-6 mb-3">
            Payment
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {paymentOptions.map((method) => (
              <button
                type="button"
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`flex flex-col items-center justify-center rounded-lg p-2 border transition transform ${
                  selectedPayment === method.id
                    ? "border-one scale-105 bg-blue-50"
                    : "border-gray-300"
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
                      ? "text-one font-semibold"
                      : "text-gray-600"
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
            des={`Payment receipt image`}
          />

          <button
            type="submit"
className="
  mt-4 w-full 
  bg-one 
  text-white 
  py-2.5 px-4 
  rounded-2xl 
  font-semibold 
  shadow-lg shadow-black/20
  transition-all duration-200 ease-out
  hover:bg-one/95 
  hover:-translate-y-0.5 
  hover:shadow-xl hover:shadow-black/30
  active:scale-[0.98]
  focus:outline-none focus:ring-2 focus:ring-one/50 focus:ring-offset-2
"
          >
            Confirm Booking
          </button>
        </form>

        {/* Summary */}
        <div className="w-full lg:w-1/2 bg-gray-200 h-fit py-10 rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-one mb-2">
            Complete Your Booking
          </h2>

          <div className="text-sm text-gray-500 mb-4">
            Destination:{" "}
            <span className="text-one font-medium">
              {data.country}, {data.city}
            </span>
          </div>
{/* <div className="text-sm text-gray-500 mb-4">
  Days:
  {data?.daysOfWeek?.map((item, index) => {
    // 2. مقارنة اليوم الحالي في الـ Map مع يوم البداية
    const isStartDay = item.toLowerCase() === startDayName.toLowerCase();
    
    return (
      <span 
        key={index} 
        className={`ml-1 px-2 py-0.5 rounded-md transition-colors ${
          isStartDay 
            ? "bg-one text-white font-bold shadow-sm" // لون مميز ليوم البداية
            : "text-one font-medium" // الشكل العادي لباقي الأيام
        }`}
      >
        {item}
      </span>
    );
  })}
</div> */}

<div className="mb-4 flex gap-2 items-center">
  <h4 className="text-gray-500">Start Date:</h4>
  <p className="text-one font-bold bg-one/10 px-2 rounded">
    {/* حماية: لو مفيش تاريخ، اعرض N/A */}
    {tourScheduldate ? new Date(tourScheduldate).toISOString().split("T")[0] : "N/A"} 
    <span className="text-xs ml-1">({startDayName})</span>
  </p>
</div>

 <div className="text-sm text-gray-500 mb-4">
            Currency:{" "}
            <span className="text-one font-medium">
              {data.price.currency}, 
            </span>
          </div>
          <div className="mt-6 border-t pt-4">
            <h3 className="text-md font-semibold text-one mb-2">
              Pricing Details:
            </h3>

            <div className="flex justify-between text-sm py-1">
              <span>
                Adults ({adults} x ${pricePerAdult}):
              </span>
              <span>${adultsTotal.toFixed(2)}</span>
            </div>
            {adultsDiscount > 0 && (
              <div className="flex justify-between text-sm py-1 text-red-500">
                <span>Adult Discount:</span>
                <span>-${adultsDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-sm py-1">
              <span>
                Children ({children} x ${pricePerChild}):
              </span>
              <span>${childrenTotal.toFixed(2)}</span>
            </div>
            {childrenDiscount > 0 && (
              <div className="flex justify-between text-sm py-1 text-red-500">
                <span>Children Discount:</span>
                <span>-${childrenDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-sm py-1">
              <span>
                Infants ({infants} x ${pricePerInfant}):
              </span>
              <span>${infantsTotal.toFixed(2)}</span>
            </div>
            {infantsDiscount > 0 && (
              <div className="flex justify-between text-sm py-1 text-red-500">
                <span>Infants Discount:</span>
                <span>-${infantsDiscount.toFixed(2)}</span>
              </div>
            )}

            {selectedExtras.length > 0 && (
              <>
                <h3 className="text-md font-semibold text-one mt-4 mb-2 border-t pt-4">
                  Extras:
                </h3>
                {selectedExtras.map((extra) => (
                  <div key={extra.id} className="mb-2">
                    <h4 className="font-medium text-gray-800">{extra.name}</h4>
                    {extra.counts.adults > 0 && (
                      <div className="flex justify-between text-sm py-1 pl-4">
                        <span>
                          Adults ({extra.counts.adults} x ${extra.price.adult}):
                        </span>
                        <span>
                          $
                          {(extra.counts.adults * extra.price.adult).toFixed(2)}
                        </span>
                      </div>
                    )}
                    {extra.counts.children > 0 && (
                      <div className="flex justify-between text-sm py-1 pl-4">
                        <span>
                          Children ({extra.counts.children} x $
                          {extra.price.child}):
                        </span>
                        <span>
                          $
                          {(extra.counts.children * extra.price.child).toFixed(
                            2
                          )}
                        </span>
                      </div>
                    )}
                    {extra.counts.infants > 0 && (
                      <div className="flex justify-between text-sm py-1 pl-4">
                        <span>
                          Infants ({extra.counts.infants} x $
                          {extra.price.infant}):
                        </span>
                        <span>
                          $
                          {(extra.counts.infants * extra.price.infant).toFixed(
                            2
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
            <div className="flex flex-col gap-2 mt-3 border-t pt-4">
              <div className="flex justify-between text-base font-semibold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Check if number of people bigger than code limit */}

              {discountcode && (
                <div className="flex justify-between text-base text-green-600">
                  <span>Discount Code:</span>
                  {discountType === "amount" ? (
                    <span>- ${discountcode}</span>
                  ) : (
                    <span>- {discountcode}%</span>
                  )}
                </div>
              )}

              <div className="flex justify-between text-lg font-bold text-one">
                <span>Final Total:</span>
                <span>${calculateFinalTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteBooking;
