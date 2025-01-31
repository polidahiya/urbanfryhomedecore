"use client";
import React from "react";
import { AppContextfn } from "@/app/Context";

function Quickviewbutton({ product }) {
  const { setquickview } = AppContextfn();
  return (
    <div className="absolute bottom-0 left-0 w-full p-2 hidden lg:group-hover:block z-10">
      <button
        className="w-full p-5 bg-white text-theme text-sm lg:hover:bg-theme lg:hover:text-white duration-300"
        onClick={() => setquickview({ show: true, data: product })}
      >
        Quick view
      </button>
    </div>
  );
}

export default Quickviewbutton;
