"use client";
import React, { useState } from "react";

function Cartbutton() {
  const [quantity, setQuantity] = useState(1);
  const MAX_QUANTITY = 10; // Define the maximum quantity

  const handleIncrement = () => {
    if (quantity < MAX_QUANTITY) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      const newValue = Number(value) || 1;
      setQuantity(newValue > MAX_QUANTITY ? MAX_QUANTITY : newValue); // Ensure it doesn't exceed MAX_QUANTITY
    }
  };

  return (
    <div className="flex gap-4 h-16">
      <div className="flex items-stretch h-full w-fit border border-theme lg:hover:border-black">
        {/* Decrement Button */}
        <button
          onClick={handleDecrement}
          disabled={quantity <= 1}
          className={`flex items-center justify-center h-full aspect-square text-xl ${
            quantity <= 1 && "opacity-50"
          }`}
        >
          -
        </button>
        {/* Input Field */}
        <p className="flex items-center justify-center h-full w-5">
          {quantity}
        </p>
        {/* Increment Button */}
        <button
          onClick={handleIncrement}
          disabled={quantity >= MAX_QUANTITY}
          className={`flex items-center justify-center h-full aspect-square text-xl ${
            quantity >= MAX_QUANTITY && "opacity-50"
          }`}
        >
          +
        </button>
      </div>
      {/* add to cat button */}
      <button className="w-full h-full text-white bg-theme text-sm px-10">ADD TO CART</button>
    </div>
  );
}

export default Cartbutton;
