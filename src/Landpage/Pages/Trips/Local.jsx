import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navtwo from "../../component/Navtwo";
import local from '../../../assets/local.png';
// استبدلنا Card بـ TripCard
import TripCard from '../../../ui/TripCard'; // تأكد من المسار الصحيح
import Loading from '../../../ui/Loading';
import Footer from '../Footer'

const Local = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  const [uniqueCities, setUniqueCities] = useState([]);
  const [uniqueDurations, setUniqueDurations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://bcknd.tickethub-tours.com/api/user/landpage/category-tours/Local%20Tourism');

        const toursData = response.data.data.map((item) => ({
          id: item.id,
          title: item.title,
          country: item.country,
          city: item.city,
          startDate: item.startDate,
          endDate: item.endDate,

          mainImage: item.mainImage, 
         
          price: { 
            adult:item.price.adult, 
            currencySymbol: item.currencySymbol // أو جلبه من الـ API لو متاح
          },
          discount: parseFloat(item.discount),
          description: item.discribtion,
          duration: parseInt(item.duration),
          // أضفنا البيانات المطلوبة للـ Popup
          schedules: item.schedules || [], 
          daysOfWeek: item.daysOfWeek || []
        }));

        const uniqueTours = Array.from(
          new Map(
            toursData.map(tour => [tour.id, tour])
          ).values()
        );

        setData(uniqueTours);
        setFilteredData(uniqueTours);

      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

useEffect(() => {
    const filtered = data.filter((tour) => {
      // 1. Price Filter
      const price = tour.price.adult; 
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      const priceMatch =
        (isNaN(min) || price >= min) &&
        (isNaN(max) || price <= max);

      // 2. Duration Filter
      const duration = tour.duration;
      const durationMatch =
        selectedDurations.length === 0 || selectedDurations.includes(duration);

      // 3. City Filter
      const city = tour.city;
      const cityMatch =
        selectedCities.length === 0 || selectedCities.includes(city);

      // 4. Date Filter (✅ تم التعديل هنا)
// 4. Date Filter
      const dateMatch =
        !filterDate ||
        (tour.schedules &&
          tour.schedules.some((schedule) => {
             // toDateString() يحول التاريخ لنص مقروء (مثلا: "Mon Oct 25 2023")
             // ويقارن التاريخين بناءً على توقيت جهاز المستخدم المحلي
             return new Date(schedule.startDate).toDateString() === new Date(filterDate).toDateString();
          }));

      return priceMatch && durationMatch && cityMatch && dateMatch;
    });

    setFilteredData(filtered);

    const citiesSet = new Set(filtered.map((item) => item.city));
    setUniqueCities([...citiesSet]);

    const durationsSet = new Set(filtered.map((item) => item.duration));
    setUniqueDurations([...durationsSet].sort((a, b) => a - b));
    
  }, [data, minPrice, maxPrice, selectedDurations, selectedCities, filterDate]);
  const handleDurationChange = (value) => {
    setSelectedDurations((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
    );
  };
  
  const handleCityChange = (city) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };
  
  if (loading) {
    return (
      <div className="w-screen h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <Navtwo />

      <div className="bg-nine w-[95%] py-4 mx-auto flex justify-between items-center">
        <span className="text-3xl font-semibold px-5 text-one">Local Tourism</span>
        <img src={local} alt="local" className="w-1/2 max-w-xs" />
      </div>

      <span className='p-10 font-semibold text-2xl text-one '>Found {filteredData.length} results</span>
      
      <div className="flex flex-col md:flex-row gap-8 p-4">
        {/* Filters Section */}
        <div className="w-full md:w-1/4 bg-white border-r shadow-md rounded-lg p-4 sticky top-24 h-fit max-h-[80vh] overflow-y-auto">
          <h2 className="font-semibold mb-2">Price, $</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 border p-2 rounded"
            />
          </div>

          <h2 className="font-semibold mb-2">Duration</h2>
          <div className="flex flex-col gap-2 mb-4">
            {uniqueDurations.map((d) => (
              <label key={d} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={selectedDurations.includes(d)}
                  onChange={() => handleDurationChange(d)}
                />
                {`${d} day${d > 1 ? 's' : ''}`}
              </label>
            ))}
          </div>
            
          <h2 className="font-semibold mb-2">Date</h2>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border p-2 rounded mb-4 w-full"
          />

          <h2 className="font-semibold mb-2">Governorate / Location</h2>
          <div className="flex flex-col gap-2">
            {uniqueCities.map((city) => (
              <label key={city} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={selectedCities.includes(city)}
                  onChange={() => handleCityChange(city)}
                />
                {city}
              </label>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="w-full md:w-3/4 flex flex-wrap justify-center gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((tour) => (
              /* هنا نستخدم الكارت الجديد */
              <TripCard
                key={`${tour.id}-${tour.title}`}
                trip={tour}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center w-full py-20 text-gray-500">
               <p className="text-lg">No tours found matching filters.</p>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Local;