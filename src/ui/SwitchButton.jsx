const SwitchButton = ({ value, setValue, title = "Status" }) => {
  const isBoolean = typeof value === "boolean";
  const isActive = isBoolean
    ? value
    : value === "active" || value === "available";

  const toggleValue = () => {
    if (isBoolean) {
      setValue(!value);
    } else {
      setValue(isActive ? "inactive" : "active");
    }
  };

  return (
    <div className="flex items-center  mt-5 justify-between w-75">
      <span className="text-[18px] font-bold text-one">{title}</span>

      <label
        htmlFor={`toggle-${title}`}
        className={`relative block h-8 w-14 rounded-full transition-colors cursor-pointer ${
          isActive ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <input
          id={`toggle-${title}`}
          type="checkbox"
          className="sr-only peer"
          checked={isActive}
          onChange={toggleValue}
        />

        <span
          className="absolute inset-y-0 start-0 m-1 grid size-6 place-content-center rounded-full bg-white text-gray-700 transition-all
            peer-checked:start-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 peer-checked:hidden"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 hidden peer-checked:block"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </span>
      </label>

      <span
        className={`${
          isActive ? "text-green-600" : "text-red-600"
        } font-semibold`}
      >
        {isBoolean ? (isActive ? "Yes" : "No") : value}
      </span>
    </div>
  );
};

export default SwitchButton;
