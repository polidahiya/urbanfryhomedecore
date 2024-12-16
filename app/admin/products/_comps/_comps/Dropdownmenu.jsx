import React from "react";

function Dropdownmenu({ title, state, onchange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 outline-none">
        {title}
      </label>
      <select
        value={state}
        onChange={(e) => onchange(e.target.value)}
        className="mt-1 block w-full p-2 border rounded-md"
      >
        {options.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdownmenu;
