import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

const InputArrowarray = ({
  placeholder,
  value = [], // IDs المختارة
  onChange,
  name,
  namedata,
  disabled = false,
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get(`https://bcknd.tickethub-tours.com/api/admin/${name}`)
      .then((response) => {
        const list = response.data.data[namedata];
        setOptions(
          list.map((item) => ({
            value: item.id,
            label: item.code,
          }))
        );
      })
      .catch((error) => console.log(error));
  }, [name, namedata]);

  // نحول الـ value (array من IDs) لشكل {value,label} علشان react-select يفهمه
  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  const handleChange = (selected) => {
    // نرجع بس المصفوفة IDs زي ما الكومبوننت الأب متوقع
    onChange(selected ? selected.map((item) => item.value) : []);
  };

  return (
    <div className="w-75 flex flex-col gap-2">
      <label className="text-one font-normal text-[18px]">{placeholder}</label>
      <Select
        isMulti
        isDisabled={disabled}
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        placeholder={placeholder}
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default InputArrowarray;
