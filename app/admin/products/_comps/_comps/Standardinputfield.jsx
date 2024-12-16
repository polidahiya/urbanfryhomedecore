import React from "react";
import { RiDeleteBackFill } from "react-icons/ri";

function Standardinputfield({ titlename, value, onchange, clear }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">
        {titlename}
      </label>
      <div className="flex items-stretch gap-2 mt-1">
        <input
          type="text"
          value={value}
          onChange={onchange}
          // required
          className="w-full h-full p-2 border rounded-md outline-none"
        />
        <button
          type="button"
          className="px-4 py-2 border  text-red-500 rounded-md "
          onClick={clear}
        >
          <RiDeleteBackFill className="h-full w-full" />
        </button>
      </div>
    </div>
  );
}

export default Standardinputfield;
