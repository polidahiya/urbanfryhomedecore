"use client";
import React from "react";
import { GrView } from "react-icons/gr";
import { AppContextfn } from "@/app/Context";

function Quickviewbutton({ product }) {
  const { setquickview } = AppContextfn();
  return (
    <div className="absolute top-0 lg:top-auto lg:bottom-0 right-0  w-fit lg:w-full p-2 lg:hidden lg:group-hover:block z-10">
      <button
        className="w-full p-3 lg:p-5 bg-white text-theme rounded-full lg:rounded-none opacity-50 lg:opacity-100 lg:hover:bg-theme lg:hover:text-white duration-300"
        onClick={() => setquickview({ show: true, data: product })}
      >
        <span className="lg:hidden text-xl">
          <GrView />
        </span>
        <span className="hidden lg:block text-sm"> Quick view</span>
      </button>
    </div>
  );
}

export default Quickviewbutton;
