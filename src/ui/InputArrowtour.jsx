import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const InputArrowtour = ({
  placeholder,
  value,
  onChange,
  options = [], // استقبال الخيارات من الخارج
  disabled = false,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  // إغلاق القائمة عند الضغط خارج المكون
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // العثور على العنصر المختار بناءً على الـ id الممرر في الـ value
  const selectedItem = options.find(item => String(item.id) === String(value));
  const hasValue = value && value !== "";

  return (
    <div ref={containerRef} className="relative w-75 flex gap-2 flex-col">
      <label className="text-one font-normal text-[18px]">{placeholder}</label>

      <div
        className={`relative w-full ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={() => !disabled && setShowDropdown(!showDropdown)}
      >
        <input
          type="text"
          readOnly
          value={selectedItem?.name || ''}
          placeholder={placeholder}
          className={`w-full rounded-2xl border px-4 py-3 sm:text-sm transition-all cursor-pointer
            ${disabled ? 'opacity-60 bg-gray-50' : ''}
            ${hasValue ? 'border-one/50 bg-green-50' : 'border-gray-300'}
            focus:outline-none focus:ring-2 focus:ring-one focus:border-one
          `}
        />
        <IoIosArrowDown className={`absolute top-1/2 right-3 -translate-y-1/2 text-one transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
      </div>

      {showDropdown && (
        <ul className="absolute z-[100] w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-xl max-h-60 overflow-y-auto top-[100%]">
          {options.length > 0 ? (
            options.map((option) => (
              <li
                key={option.id}
                onClick={() => {
                  onChange(option.id);
                  setShowDropdown(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-one/10 transition-colors ${String(value) === String(option.id) ? 'bg-one/5 font-bold text-one' : ''}`}
              >
                {option.name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-400 text-sm">No options available</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default InputArrowtour;