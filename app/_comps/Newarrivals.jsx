import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import Closeeffectlink from "../_globalcomps/Closeeffectlink";
import Productcard from "../_globalcomps/Productcard";

function Newarrivals() {
  return (
    <div className="py-14">
      <div className="flex items-center px-8">
        <h2 className="text-6xl font-tenor">New Arrivals</h2>
        <div className="flex items-center gap-10 ml-auto">
          <Closeeffectlink title="DESIGN LIBRARY" link={"/"} />
          <button className="lg:hover:-translate-x-1 duration-300">
            <IoIosArrowBack className="text-[#b0a099] text-3xl" />
          </button>
          <button className="lg:hover:translate-x-1 duration-300">
            <IoIosArrowBack className="text-[#b0a099] text-3xl rotate-180" />
          </button>
        </div>
      </div>
      <div>
        <div className="overflow-x-scroll snap-x scroll-smooth snap-mandatory flex gap-[10px] mt-[30px] hidescroll">
          {new Array(20).fill(null).map((item, i) => (
            <Productcard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Newarrivals;
