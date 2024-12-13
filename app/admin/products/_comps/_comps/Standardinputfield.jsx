import React from "react";

function Standardinputfield({ titlename, value, onchange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">
        {titlename}
      </label>
      <input
        type="text"
        value={value}
        onChange={onchange}
        required
        className="w-full mt-1 p-2 border rounded-md outline-none"
      />
    </div>
  );
}

export default Standardinputfield;
