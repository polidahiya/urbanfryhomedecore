"use client";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AppContextfn } from "@/app/Context";

function Searchbarsection() {
  const { showsearchbar, setshowsearchbar } = AppContextfn();
  const [searchtext, setsearchtext] = useState("");
  if (showsearchbar)
    return (
      <div className="fixed top-0 left-0 h-[100dvh]  bg-white  w-full z-30 px-10">
        <div
          className={`w-full flex items-center justify-between  h-20 text-inherit text-xs`}
        >
          <img
            src="https://loopsbylj.com/cdn/shop/files/LOOPS_LOGO_White_90x@2x.png?v=1699016384"
            alt=""
            className={`h-10 mr-2 invert`}
          />
          <button
            className="group h-full"
            onClick={() => setshowsearchbar(false)}
          >
            <RxCross1 className="text-2xl lg:group-hover:rotate-90 duration-300" />
          </button>
        </div>
        {/* searchbox */}
        <div className="h-16 flex items-stretch justify-between gap-5">
          <div className="relative h-full w-full">
            <input
              type="text"
              className="forminput h-full w-full px-4 border border-theme outline-none"
              value={searchtext}
              required
              onChange={(e) => setsearchtext(e.target.value)}
            />
            <label className="absolute top-0 left-0 text-theme flex items-center h-full w-full pointer-events-none z-50  px-4  duration-300">
              What are you looking for?
            </label>
          </div>
          <button className="h-full px-11 bg-theme text-white bg-opacity-70 lg:hover:bg-opacity-100 duration-300">
            Search
          </button>
        </div>
      </div>
    );
}

export default Searchbarsection;
