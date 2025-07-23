import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const InputArrow = ({
  placeholder,
  value,
  onChange,
  name,
  namedata,
  disabled = false,
}) => {
  const [options, setOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    axios.get(`https://tickethub-tours.com/api/admin/${name}`)
      .then(response => {
        const list = response.data.data[namedata]; // dynamic key
        if (Array.isArray(list)) {
          setOptions(list.map(item => ({
            id: item.id,
            name: item.name
          })));
        }
      })
      .catch(error => console.log(error));
  }, [name]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedItem = options.find(item => item.id === value);
  const hasValue = value && value !== "";

  return (
    <div ref={containerRef} className="relative w-75 flex gap-2 flex-col ">
      <label className="text-one font-normal  text-[18px]">{placeholder}</label>

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
            ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
            ${hasValue ? 'border-one/50 bg-green-50' : 'border-gray-300 '}
            focus:outline-none focus:ring-2 focus:ring-one focus:border-one
          `}
        />
        <IoIosArrowDown className="absolute top-1/2 right-3 -translate-y-1/2 text-one" />
      </div>

      {showDropdown && (
        <ul className="absolute z-10 w-full mt-20 bg-white  rounded-lg shadow max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => {
                onChange(option.id);
                setShowDropdown(false);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-one/10"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputArrow;
