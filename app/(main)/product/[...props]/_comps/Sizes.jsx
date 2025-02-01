"use client";
import React from "react";
import { FaAngleDown } from "react-icons/fa6";
import { AppContextfn } from "@/app/Context";

function Sizes({ dimensions, cartproductname }) {
  const { cart, setcart } = AppContextfn();

  const handleChange = (event) => {
    setcart((pre) => {
      const updatedcart = { ...pre };
      updatedcart[cartproductname] = {
        ...updatedcart[cartproductname],
        dimension: event.target.value,
      };
      return updatedcart;
    });
  };

  return (
    <div className="mt-5">
      <div>
        <label htmlFor="menu" className="block text-sm">
          Size
        </label>
        <div className="relative w-fit mt-2">
          <select
            id="menu"
            value={cart[cartproductname]?.dimension}
            onChange={handleChange}
            className="relative p-5 pr-10  border border-theme  outline-none lg:hover:border-black appearance-none cursor-pointer"
          >
            {dimensions?.map((dimension, index) => (
              <option key={index} value={dimension} className="text-sm">
                {dimension}
              </option>
            ))}
          </select>
          <FaAngleDown className="absolute top-1/2 -translate-y-1/2 right-5 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

export default Sizes;
