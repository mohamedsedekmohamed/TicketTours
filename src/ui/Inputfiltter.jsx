import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const Inputfiltter = ({ placeholder, value, onChange, name, shara }) => {
  const [options, setOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (name === "gender") {
      setOptions([
        { name: "male", id: "male" },
        { name: "female", id: "female" }
      ])}
      else if(name==="discountType"){
         setOptions([
        { name: "percentage", id: "percentage" },
        { name: "amount", id: "amount" }
      ]);
      }
      else if(name==="role"){
         setOptions([
        { name: "admin", id: "admin" },
        { name: "superAdmin", id: "superAdmin" }
      ]);
      }
  else  {
      axios.get(`https://backndVoo.voo-hub.com/api/admin/${name}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          if (name === "city") {
            const cities = response.data.cities
              .filter(city => city.country_id == shara)
              .map(city => ({ name: city.name, id: city.id }));
            setOptions(cities);
          } else if (name === "zone") {
            const zones = response.data[0]?.zones || [];
            const filteredZones = zones
              .filter(zone => zone.city_id == shara)
              .map(zone => ({ name: zone.name, id: zone.id }));
            setOptions(filteredZones);
          }
        })
        .catch(error => console.log(error));
    }
  }, [name, shara]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 

  const selectedItem = options.find(item => item.id == value);
  const hasValue = value && value !== '';

  return (
  <div ref={containerRef} className="relative w-75">
  <label className="text-one font-normal text-[18px] mb-1 block">{placeholder}</label>

  <div
    className="relative w-full"
    onClick={() => setShowDropdown(!showDropdown)}
  >
    <input
      type="text"
      readOnly
      value={selectedItem?.name || ''}
      placeholder={placeholder}
      className={`w-full rounded-2xl border px-4 py-3 sm:text-sm transition-all
        ${hasValue ? 'border-one/50 bg-green-50' : 'border-gray-300'}
        focus:outline-none focus:ring-2 focus:ring-one focus:border-one
      `}
    />
    <IoIosArrowDown className="absolute top-1/2 right-3 -translate-y-1/2 text-one" />
  </div>

  {showDropdown && options.length > 0 && (
    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto shadow-md">
      {options.map((option) => (
        <li
          key={option.id}
          onClick={() => {
            onChange(option.id);
            setShowDropdown(false);
          }}
          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
            option.id == value ? "bg-gray-200 font-medium" : ""
          }`}
        >
          {option.name}
        </li>
      ))}
    </ul>
  )}
</div>

  );
};

export default Inputfiltter;
