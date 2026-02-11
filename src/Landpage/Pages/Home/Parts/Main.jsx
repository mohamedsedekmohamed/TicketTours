import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Nav from '../../../component/Nav';
import { FaLocationDot } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Main = ({ data }) => {
  const navigate = useNavigate();

  // states
  const [trips, setTrips] = useState([]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false); // ✅ حالة لمعرفة هل تم الضغط على بحث

  // dropdown lists
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  // AOS animation
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // جلب البيانات الأساسية عند تحميل الصفحة
  useEffect(() => {
    setLoadingTrips(true);
    axios
      .get("https://bcknd.tickethub-tours.com/api/user/landpage/toursEssential", {
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        const allTrips = res.data?.data || [];
        setTrips(allTrips);
        const uniqueCountries = [...new Set(allTrips.map((t) => t.country))];
        setCountries(uniqueCountries);
      })
      .catch((err) => {
        console.error("Error fetching trips:", err);
        toast.error("Failed to load trips data");
      })
      .finally(() => {
        setLoadingTrips(false);
      });
  }, []);

  // تحديث قائمة المدن بناءً على الدولة المختارة
  useEffect(() => {
    if (country) {
      const filteredCities = [
        ...new Set(trips.filter((t) => t.country === country).map((t) => t.city)),
      ];
      setCities(filteredCities);
      setCity(""); 
    } else {
      setCities([]);
      setCity("");
    }
  }, [country, trips]);

  // ✅ وظيفة البحث عند الضغط على الزر
  const handleSearch = () => {
    // فلترة البيانات
    const filtered = trips.filter((trip) => {
      const matchCountry = country ? trip.country === country : true;
      const matchCity = city ? trip.city === city : true;
      const matchDate = date
        ? trip.schedules.some((s) => s.date.slice(0, 10) === date)
        : true;

      return matchCountry && matchCity && matchDate;
    });

    setResults(filtered);
    setSearchClicked(true);

    // ✅ إظهار التوست في حالة عدم وجود نتائج
    if (filtered.length === 0) {
      toast('No trips found for this selection', {
        icon: '🔍',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      toast.success(`Found ${filtered.length} trips!`);
    }
  };

  return (
    <div>
      {/* مكون التوست ليظهر في الصفحة */}
      <ToastContainer position="top-center" reverseOrder={false} />

      <div className="w-screen h-screen relative flex flex-col items-center">
        <img
          src={data?.cover?.imagePath}
          alt="cover"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className='absolute top-7 lg:top-5 z-10 w-full'>
          <Nav />
        </div>

        <div className='flex flex-col gap-20 lg:gap-10 justify-center items-center px-4 mt-50 sm:mt-65 text-center z-10'>
          <h1
            data-aos="fade-down"
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white drop-shadow-lg'
          >
            Explore the World With Ticket Hub
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className='text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white drop-shadow'
          >
            Book unforgettable journeys tailored to your style, budget, and destination dreams.
          </p>

          <div
            data-aos="zoom-in"
            data-aos-delay="400"
            className="flex flex-col sm:flex-row gap-3 backdrop-blur-2xl bg-white/30 rounded-xl p-4 shadow-md items-stretch sm:items-end w-full max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"
          >
            {/* Country Selector */}
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2 border-b border-white pb-1">
                <FaLocationDot className="text-md text-white" />
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none text-white"
                >
                  <option className="text-black" value="">available Countries</option>
                  {countries.map((c, i) => (
                    <option key={i} value={c} className="text-black">{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* City Selector */}
            {country && (
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-2 border-b border-white pb-1">
                  <FaLocationDot className="text-md text-white" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none text-white"
                  >
                    <option className="text-black" value="">available Cities</option>
                    {cities.map((c, i) => (
                      <option key={i} value={c} className="text-black">{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Date Input */}
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2 border-b border-white pb-1">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none text-white cursor-pointer invert-[1] brightness-200"
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-1 bg-one hover:bg-one text-white text-sm px-5 py-2 rounded-lg h-[42px] transition-all active:scale-95"
            >
              <IoMdSearch className="text-lg " />   
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="p-6 max-w-6xl mx-auto min-h-[200px]">
        {loadingTrips ? (
          <p className="text-center text-gray-500">Loading trips...</p>
        ) : searchClicked ? (
          results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((trip, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/tripdetails/${trip.id}`)}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition duration-300 cursor-pointer"
                >
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={trip.mainImage || "/default-trip.jpg"}
                      alt={trip.title}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-110 transition duration-300"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <h2 className="font-bold text-lg text-gray-800">{trip.title}</h2>
                    <p className="text-gray-600 text-sm">📍 {trip.country}, {trip.city}</p>
                    <p className="text-gray-700 font-semibold">💵 {trip.price.adult} {trip.price.currency}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
                <p className="text-red-500 font-medium">No results found for your search.</p>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Main;