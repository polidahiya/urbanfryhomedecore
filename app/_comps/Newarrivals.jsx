import React from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import Closeeffectlink from "../_globalcomps/Closeeffectlink";

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
            <div className="group relative min-w-96" key={i}>
              <div className="relative">
                <Link
                  className="min-w-96 aspect-[4/5] relative block overflow-hidden"
                  href={"/"}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-EFscwqb1Mclk_LZVGWI-uoFnfxDb7KU25w&s"
                    alt=""
                    className="h-full w-full absolute  object-cover lg:group-hover:scale-105 duration-300"
                  />
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrqeb8WcPLsIuM-ZlNZRrbMrQoxyQUkUJrlA&s"
                    alt=""
                    className="h-full w-full absolute  object-cover opacity-0 lg:group-hover:scale-110 lg:group-hover:opacity-100 duration-300"
                  />
                </Link>
                {/* quick view button */}
                <div className="absolute bottom-0 left-0 w-full p-2 hidden lg:group-hover:block z-10">
                  <button className="w-full p-5 bg-white text-theme text-sm lg:hover:bg-theme lg:hover:text-white duration-300">
                    Quick view
                  </button>
                </div>
              </div>
              {/* details */}
              <div className="px-4">
                <p className="text-sm text-theme mt-[6px]">LOOPSBYLJ</p>
                <p className="flex items-center justify-between flex-wrap mt-[6px]">
                  <span>Product name</span>
                  <span>
                    From ₹{parseInt(25000, 10).toLocaleString("en-IN")}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Newarrivals;
