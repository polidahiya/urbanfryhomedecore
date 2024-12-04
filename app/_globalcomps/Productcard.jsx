import React from "react";
import Link from "next/link";

function Productcard() {
  return (
    <div className="group relative w-full">
      <div className="relative">
        <Link
          className="w-full aspect-[4/5] relative block overflow-hidden"
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
      <div className="px-4 pt-4">
        <p className="text-sm text-theme mt-[6px] hidden lg:block">LOOPSBYLJ</p>
        <p className="flex items-center justify-between flex-wrap mt-[6px]">
          <span>Product name</span>
          <span>From ₹{parseInt(25000, 10).toLocaleString("en-IN")}</span>
        </p>
      </div>
    </div>
  );
}

export default Productcard;
