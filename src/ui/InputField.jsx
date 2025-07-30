import React from "react";

const InputField = ({
  placeholder = "",
  value,
  onChange,
  name,
  type = "text",
  disabled = false,
}) => {
  const maxLength =
    type === "number" ? 20 : type === "email" ? 45 : 200;

  const hasValue = value && value.trim() !== "";

  return (
    <div className="flex flex-col gap-2 items-start w-75">
      <label className="text-one font-normal text-[18px]">{placeholder}</label>
      <input
        type={type}
        name={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`w-full rounded-2xl border px-4 py-3 sm:text-sm transition-all
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
          ${hasValue ? 'border-one/50 bg-green-50' : 'border-gray-300 '}
          focus:outline-none focus:ring-2 focus:ring-one focus:border-one
          
        `}
      />
    </div>
  );
};

export default InputField;
