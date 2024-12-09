import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import Closeeffectlink from "../_globalcomps/Closeeffectlink";
import Productcard from "../_globalcomps/Productcard";

function Newarrivals() {
  return (
    <div className="py-14">
      <div className="flex flex-col md:flex-row md:items-center px-8">
        <h2 className="text-2xl md:text-6xl font-tenor">New Arrivals</h2>
        <div className="flex items-center gap-10 md:ml-auto mt-5 md:mt-0">
          <Closeeffectlink title="DESIGN LIBRARY" link={"/"} />
          <button className="lg:hover:-translate-x-1 duration-300 ml-auto md:ml-0">
            <IoIosArrowBack className="text-[#b0a099] text-3xl" />
          </button>
          <button className="lg:hover:translate-x-1 duration-300">
            <IoIosArrowBack className="text-[#b0a099] text-3xl rotate-180" />
          </button>
        </div>
      </div>
      <div className="px-5">
        <div className="overflow-x-scroll snap-x scroll-smooth snap-mandatory flex gap-[10px] mt-[30px] hidescroll">
          {new Array(20).fill(null).map((item, i) => (
            <div key={i} className="min-w-full md:min-w-72 snap-start">
              <Productcard/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Newarrivals;
