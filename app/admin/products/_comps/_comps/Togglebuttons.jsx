import React from "react";

function Togglebuttons({
  titlename,
  value,
  positive,
  negative,
  positiveText,
  negativeText,
  colors = { positive: "text-green-500", negative: "text-red-500" },
}) {
  const handleToggle = () => {
    value ? negative() : positive();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {titlename}
        <span className={`ml-3 ${value ? colors?.positive : colors?.negative}`}>
          {value ? positiveText : negativeText}
        </span>
      </label>

      {/* Toggle Slider */}
      <div
        onClick={handleToggle}
        className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
          value ? "bg-blue-600" : "bg-gray-400"
        }`}
        role="switch"
        aria-checked={value}
        aria-label="Toggle Switch"
        title="Toggle Switch"
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
            value ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
}

export default Togglebuttons;
