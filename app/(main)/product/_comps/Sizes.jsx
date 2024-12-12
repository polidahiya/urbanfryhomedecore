"use client";
import React, { useState } from "react";

function Sizes() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div>
      <div>
        <label htmlFor="menu" className="block text-sm">
          Size
        </label>
        <select
          id="menu"
          value={selectedOption}
          onChange={handleChange}
          className="p-5 mt-2 border border-theme appearance-none outline-none lg:hover:border-black cursor-pointer"
        >
          <option value="option1" className="text-sm">
            5x8 ft (Ready To Ship)
          </option>
          <option value="option2" className="text-sm">
            10x80 ft (Ready To Ship)
          </option>
          <option value="option3" className="text-sm">
            500x800 ft (Ready To Ship)
          </option>
        </select>
      </div>
    </div>
  );
}

export default Sizes;
