"use client";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

function Herosection() {
  const [slide, setlide] = useState(0);
  return (
    <div className="flex items-stretch w-full max-h-[550px] h-[550px] overflow-hidden">
      <section className="flex-1 h-full">
        <div
          className={`flex items-center h-full w-full min-w-full max-w-full duration-300 `}
        >
          <img
            src="https://loopsbylj.com/cdn/shop/files/Screen_Shot_2024-10-07_at_11.09.29_PM.png?v=1728322797&width=2000"
            alt=""
            className=" h-full min-w-full object-cover"
          />
          <img
            src="https://loopsbylj.com/cdn/shop/files/Screen_Shot_2024-06-27_at_12.36.25_PM.png?v=1719472033&width=2000"
            alt=""
            className=" h-full min-w-full object-cover"
          />
        </div>
      </section>
      <section className="relative flex-1 flex overflow-x-hidden bg-theme text-white text-center">
        <div className="w-full h-full flex">
          <div className="min-w-full h-full flex flex-col items-center justify-center px-20 ">
            <h2 className="text-6xl font-tenor">Looped in details, Built on Vision</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero
              dolor voluptates ab veniam dicta natus necessitatibus placeat
              corrupti
            </p>
          </div>
          <div className="min-w-full h-full flex flex-col items-center justify-center px-20 ">
            <h2 className="text-6xl font-tenor">Looped in details, Built on Vision</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero
              dolor voluptates ab veniam dicta natus necessitatibus placeat
              corrupti
            </p>
          </div>
        </div>
        {/* buttons */}
        <button className="flex items-center justify-center absolute top-1/2 left-5 -translate-y-1/2 text-3xl lg:hover:-translate-x-1 duration-300 text-white">
          <IoIosArrowBack />
        </button>
        <button className="flex items-center justify-center absolute top-1/2 right-5 -translate-y-1/2 text-3xl lg:hover:translate-x-1 duration-300 text-white rotate-180">
          <IoIosArrowBack />
        </button>
      </section>
    </div>
  );
}

export default Herosection;
