import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navtwo from "../../component/Navtwo";
import Card from '../../../ui/Card';
import Loading from '../../../ui/Loading';
import Footer from '../Footer'
import Religiouss from '../../../assets/Religious.png'
const Religious = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  const [uniqueCities, setUniqueCities] = useState([]);
  const [uniqueDurations, setUniqueDurations] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('https://bcknd.tickethub-tours.com/api/user/landpage/category-tours/Religious%20Tourism');

      const toursData = response.data.data.tours.map((item) => ({
        id: item.id,
        title: item.title,
        country: item.country,
        city: item.city,
        image: item.imagePath,
        price: parseFloat(item.price),
        discount: parseFloat(item.discount),
        description: item.discribtion,
        duration: parseInt(item.duration),
      }));

const uniqueTours = Array.from(
  new Map(
    toursData.map(tour => [tour.id, tour])
  ).values()
);
console.log(response.data.data)

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
      const price = tour.price;
      const duration = tour.duration;
      const city = tour.city;
      
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      const priceMatch = (
        (isNaN(min) || price >= min) &&
        (isNaN(max) || price <= max)
      );
      
      const durationMatch =
        selectedDurations.length === 0 || selectedDurations.includes(duration);
      
      const cityMatch =
        selectedCities.length === 0 || selectedCities.includes(city);
      
      return priceMatch && durationMatch && cityMatch;
    });

    setFilteredData(filtered);

    const citiesSet = new Set(filtered.map((item) => item.city));
    setUniqueCities([...citiesSet]);

    const durationsSet = new Set(filtered.map((item) => item.duration));
    setUniqueDurations([...durationsSet].sort((a, b) => a - b));
    
  }, [data, minPrice, maxPrice, selectedDurations, selectedCities]);
  
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
<div className="">
      <Navtwo />
      <div className="bg-nine w-[95%] py-4 mx-auto flex justify-between items-center">
        <span className='p-10 font-semibold text-2xl text-one'> Religious Tourism</span>
          <img src={Religiouss} className="w-1/2 max-w-xs" 
          alt="Religiouss"
          />
                   </div>
          <span className='p-10 font-semibold text-2xl text-one '>Found {data.length} results</span>
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

        {/* Cards Section */}
        <div className="w-full flex flex-wrap justify-center gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((tour) => (
              <Card
                key={`${tour.id}-${tour.title}`}
                image={tour.image}
                title={tour.title}
                description={tour.description}
                duration={tour.duration}
                price={tour.price}
                discount={tour.discount}
           id={tour.id}

              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No tours found matching filters.</p>
          )}
        </div>
      </div>
      <Footer/>
    </div>  )
}

export default Religious