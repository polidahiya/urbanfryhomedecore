"use client";
import React from "react";
import { AppContextfn } from "@/app/Context";
import { IoNewspaperSharp } from "react-icons/io5";

function Newslettersubscriblebutton() {
  const { setshownewsletter } = AppContextfn();
  return (
    <button
      className="w-full md:w-fit bg-theme text-white flex items-center justify-center gap-2 py-2 px-6 mt-5 md:mt-auto"
      onClick={() => setshownewsletter(true)}
    >
      <IoNewspaperSharp />
      Subscribe to Our Newsletter!
    </button>
  );
}

export default Newslettersubscriblebutton;
