"use client";
import React from "react";
import Upioptions from "@/app/_svgs/Upioptions";
import { FiChevronRight } from "react-icons/fi";
import { Usecartcontext } from "../Cartcontext";

function Orderbutton() {
  const { Order, paymentMethod } = Usecartcontext();
  return (
    <button
      className="w-full md:min-w-56 flex items-center justify-center gap-2 bg-theme px-6 py-3 text-sm text-white bg-opacity-60 lg:hover:bg-opacity-100 duration-300"
      onClick={Order}
    >
      {paymentMethod == "online" ? "Pay Now" : "Place Order"}
      {paymentMethod == "online" && <Upioptions />}

      <FiChevronRight />
    </button>
  );
}

export default Orderbutton;
