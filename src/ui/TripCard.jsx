import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { IoMdClose, IoMdCalendar } from "react-icons/io"; 
import { FaCheckCircle } from "react-icons/fa"; // أيقونة لتمييز الاختيار

const TripCard = ({ trip }) => {
  const navigate = useNavigate();
  
  // State للتحكم في ظهور الـ Popup
  const [showModal, setShowModal] = useState(false);
  
  // State لتخزين الموعد الذي اختاره المستخدم مؤقتاً داخل الـ Popup
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  // تنسيق التاريخ
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // دالة اختيار الموعد (مجرد تحديد)
  const handleSelectOption = (schedule) => {
    setSelectedSchedule(schedule);
  };

  // دالة تأكيد الحجز والانتقال للصفحة التالية
  const handleProceedToBooking = () => {
    if (selectedSchedule) {
      setShowModal(false);
      navigate(`/tripdetails/${trip.id}`, { state: { scheduleId: selectedSchedule } });
    }
  };
const getDayName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-EG', { weekday: 'long' });
};
  return (
    <>
      {/* --- بداية الكارت (لم يتغير) --- */}
<div className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col h-[450px] w-full">
        
        {/* صورة الكارت */}
        <div className="relative h-48 w-full overflow-hidden shrink-0">
          <img
            src={trip.mainImage || "/default-trip.jpg"}
            alt={trip.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-gray-800 shadow">
            💵 {trip.price.adult} {trip.price.currencySymbol}
          </div>
        </div>

        {/* محتوى الكارت */}
        <div className="p-4 flex flex-col gap-3 flex-grow">
          <div>
            <h2 className="font-bold text-lg text-gray-800 line-clamp-1" title={trip.title}>
              {trip.title}
            </h2>
            <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
              📍 {trip.country}, {trip.city}
            </p>
        
          </div>

          {/* أيام الأسبوع */}
        
<p className="flex items-center gap-2 my-4 rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-800">
  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-700">
    ℹ️
  </span>
  Price includes VAT
</p>
          {/* زر فتح الـ Popup */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-one text-white font-semibold hover:bg-primary/90 transition shadow-sm active:scale-95"
          >
            <IoMdCalendar className="text-lg" />
            Check Availability
          </button>
        </div>
      </div>


      {/* --------------------------------------------------------- */}
      {/* POPUP MODAL */}
      {/* --------------------------------------------------------- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn">
          
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header */}
            <div className="bg-gray-50 p-4 border-b flex justify-between items-center shrink-0">
              <div>
                <h3 className="font-bold text-lg text-gray-800">Select Date</h3>
                <p className="text-xs text-gray-500">{trip.title}</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition text-gray-600"
              >
                <IoMdClose size={22} />
              </button>
            </div>

            {/* List Body (Scrollable) */}
            <div className="p-4 overflow-y-auto custom-scrollbar flex-grow">
              {trip.schedules && trip.schedules.length > 0 ? (
                <div className="grid gap-3">
                  {trip.schedules.map((schedule) => {
                    const isSoldOut = schedule.availableSeats === 0;
                    const isSelected = selectedSchedule?.id === schedule.id;
                    
                    return (
                      <div 
                        key={schedule.id}
                        onClick={() => !isSoldOut && handleSelectOption(schedule)}
                        className={`relative flex justify-between items-center p-3 border rounded-xl transition-all cursor-pointer
                          ${isSoldOut 
                            ? "bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed" 
                            : isSelected
                              ? "bg-blue-50 border-blue-500 shadow-md ring-1 ring-blue-500" // ستايل عند الاختيار
                              : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm"
                          }
                        `}
                      >
                        <div className="flex flex-col">
                          <span className={`font-semibold text-sm ${isSelected ? "text-blue-700" : "text-gray-800"}`}>
                            {formatDate(schedule.startDate)} {getDayName(schedule.startDate)}
                          </span>
                          {/* <span className="text-xs text-gray-500">
                             To {formatDate(schedule.endDate)}
                          </span> */}
                          <span className={`text-[10px] font-bold mt-1 ${isSoldOut ? "text-red-500" : "text-green-600"}`}>
                            {isSoldOut ? "SOLD OUT" : `${schedule.availableSeats} Seats Left`}
                          </span>
                        </div>

                        {/* دائرة الاختيار (Radio Button Simulation) */}
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"}
                        `}>
                          {isSelected && <FaCheckCircle className="text-white text-xs" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No schedules available currently.
                </div>
              )}
            </div>
            
            {/* Footer (زر التأكيد يظهر هنا) */}
            <div className="bg-white p-4 border-t shrink-0 flex flex-col gap-2 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
              {/* زر الحجز الرئيسي */}
              <button
                disabled={!selectedSchedule}
                onClick={handleProceedToBooking}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
                  ${selectedSchedule
                    ? "bg-primary text-one shadow-lg hover:bg-primary/90 hover:-translate-y-0.5"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                {selectedSchedule ? `Book for ${formatDate(selectedSchedule.startDate)}` : "Choose a date first"}
                {selectedSchedule && <span>➜</span>}
              </button>
              
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 text-xs hover:text-gray-800 underline text-center mt-1"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default TripCard;