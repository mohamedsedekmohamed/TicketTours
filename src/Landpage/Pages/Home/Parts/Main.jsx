import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navtwo from '../../../component/Navtwo';
import Nav from '../../../component/Nav';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import Loading from '../../../../ui/Loading';
import { useNavigate } from "react-router-dom"; // ✅ import
import axios from "axios";

const Main = ({ data }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate(); // ✅ init navigator

  // states
  const [trips, setTrips] = useState([]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(false);

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

  // تحميل صورة الخلفية
  useEffect(() => {
    if (data?.cover?.imagePath) {
      const img = new Image();
      img.src = data.cover.imagePath;
      img.onload = () => setIsImageLoaded(true);
    }
  }, [data]);

   useEffect(() => {
    const fetchTrips = async () => {
      setLoadingTrips(true);
      try {
       
        const res = await axios.get(
          "http://bcknd.tickethub-tours.com/api/user/landpage/tours-with-essential-info",{
    headers: {

      
      Accept: "application/json",
    },
  }
        );

        setTrips(res.data?.data || []);

        const uniqueCountries = [
          ...new Set((res.data?.data || []).map((t) => t.country)),
        ];
        setCountries(uniqueCountries);
      } catch (err) {
        console.error("Error fetching trips:", err);
      } finally {
        setLoadingTrips(false);
      }
    };

    fetchTrips();
  }, []);

  useEffect(() => {
    if (country) {
      const filteredCities = [
        ...new Set(trips.filter((t) => t.country === country).map((t) => t.city)),
      ];
      setCities(filteredCities);
      setCity(""); // reset city
    } else {
      setCities([]);
      setCity("");
    }
  }, [country, trips]);
// فلترة البحث دايناميك
useEffect(() => {
  const filtered = trips.filter((trip) => {
    const matchCountry = country ? trip.country === country : true;
    const matchCity = city ? trip.city === city : true;

    // ✅ الفلترة من schedules.date
    const matchDate = date
      ? trip.schedules.some((s) => s.date.slice(0, 10) === date)
      : true;

    return matchCountry && matchCity && matchDate;
  });

  setResults(filtered);
}, [country, city, date, trips]);

  if (!isImageLoaded) {
    return (
      <div className=" max-w-screen flex flex-col gap-3 h-screen  bg-gray-100">
        <Navtwo />
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div
        className="w-screen h-screen bg-cover bg-center relative flex flex-col items-center"
        style={{ backgroundImage: `url(${data.cover.imagePath})` }}
      >
        <div className='absolute top-7 lg:top-5 z-10 w-full'>
          <Nav />
        </div>

        <div className='flex flex-col gap-20 lg:gap-10 justify-center items-center px-4 mt-50 sm:mt-65 text-center'>
          <h1
            data-aos="fade-down"
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white drop-shadow-lg'
          >
            Explore the World With Ease
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
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2 border-b border-white pb-1">
                <FaLocationDot className="text-md text-white" />
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none text-white"
                >
                  <option className="text-black" value="">All Countries</option>
                  {countries.map((c, i) => (
                    <option key={i} value={c} className="text-black">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
{country&&(
<div className="flex flex-col w-full">
              <div className="flex items-center gap-2 border-b border-white pb-1">
                <FaLocationDot className="text-md text-white" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={!country}
                  className="w-full bg-transparent text-sm outline-none text-white"
                >
                  <option className="text-black"  value="">All Cities</option>
                  {cities.map((c, i) => (
                    <option key={i} value={c} className="text-black">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>  
)}
            

        <div className="flex flex-col w-full">
  <div className="flex items-center gap-2 border-b border-white pb-1">
  <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    className="w-full bg-transparent text-sm outline-none text-white cursor-pointer
      [&::-webkit-calendar-picker-indicator]:invert
      [&::-webkit-calendar-picker-indicator]:cursor-pointer
      [&::-moz-calendar-picker-indicator]:invert
      [&::-moz-calendar-picker-indicator]:cursor-pointer"
  />
</div>

</div>

            <button
              disabled
              className="flex items-center justify-center gap-1 bg-one/70 text-white text-sm px-5 py-2 rounded-lg h-[42px] cursor-not-allowed"
            >
              <IoMdSearch className="text-lg " />
              Search
            </button>
          </div>
        </div>
      </div>

    <div className="p-6 max-w-6xl mx-auto">
      {loadingTrips ? (
        <p className="text-center">Loading trips...</p>
      ) : (country || city || date) ? (
        results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((trip, i) => (
              <div
                key={i}
                onClick={() => navigate(`/tripdetails/${trip.id}`)} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden 
                           hover:shadow-2xl hover:scale-[1.02] 
                           transition duration-300 cursor-pointer"
              >
                {/* صورة الرحلة */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={trip.mainImage || "/default-trip.jpg"}
                    alt={trip.title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  />
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <h2 className="font-bold text-lg text-gray-800">{trip.title}</h2>
                  <p className="text-gray-600 text-sm">
                    📍 {trip.country}, {trip.city}
                  </p>
                  <p className="text-gray-700 font-semibold">
                    💵 {trip.price.adult} {trip.price.currency}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {/* 🗓{" "}
                    {trip.schedules.map((s) => (
                      <span key={s.id} className="mr-2">
                        {new Date(s.startDate).toLocaleDateString()}
                      </span>
                    ))} */}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-red-500">No trips found</p>
        )
      ) : (
     null
      )}
    </div>

    </div>
  );
};

export default Main;
