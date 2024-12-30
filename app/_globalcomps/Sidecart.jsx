"use client";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import { AppContextfn } from "../Context";
import Image from "next/image";
import Sidecarteditbuttons from "./_sidecart/Sidecarteditbuttons";
import Link from "next/link";
import Upioptions from "../_svgs/Upioptions";
import { FiChevronRight } from "react-icons/fi";

function Sidecart() {
  const { cart, showsidecart, setshowsidecart } = AppContextfn();
  const cartitems = Object.entries(cart).filter(([key, value]) => value.added);
  const totalPrice = cartitems.reduce(
    (total, [key, value]) => total + value.quantity * value.sellingprice,
    0
  );

  const totalQuantity = cartitems.reduce(
    (total, [key, value]) => total + value.quantity,
    0
  );

  const closemenu = () => {
    setshowsidecart((pre) => ({ ...pre, effect: false }));
    setTimeout(() => {
      setshowsidecart((pre) => ({ ...pre, show: false }));
    }, 300);
  };

  if (!showsidecart.show) return null;
  return (
    <div className="w-full h-screen fixed top-0 left-0 bg-black bg-opacity-0 z-30">
      <div
        className={`w-full max-w-[500px] h-full  absolute top-0 right-0  bg-theme text-white z-30 duration-300 ease-out border-l border-white overflow-y-scroll
        ${showsidecart?.effect ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          className="group absolute top-0 right-0 p-5"
          onClick={closemenu}
        >
          <RxCross1 className="text-2xl lg:group-hover:rotate-90 duration-300" />
        </button>
        <p className="text-5xl p-10 font-tenor italic">
          Cart
          <span className="text-2xl pl-3 italic font-serif">
            {"("}
            {totalQuantity}
            {")"}
          </span>
        </p>
        <hr className="opacity-15" />
        {/* products */}
        <div className="w-full flex flex-col gap-1">
          {cartitems.map(([key, value], i) => (
            <div key={i} className="p-5 w-full flex items-center">
              <div className="min-w-[100px] aspect-square">
                <Image
                  src={value?.image}
                  alt={value?.productName}
                  height={100}
                  width={100}
                  quality={10}
                  className="h-full w-full object-contain"
                ></Image>
              </div>

              <div className="w-full pl-5">
                <div className="flex">
                  <p className="font-tenor">{value.productName}</p>
                  <p className="ml-auto whitespace-nowrap">
                    ₹ {parseInt(value.sellingprice, 10).toLocaleString("en-IN")}
                  </p>
                </div>
                <p className="opacity-60">{value?.dimension}</p>
                {/* increment and decrement buttons */}
                <Sidecarteditbuttons cartproductname={key} />
              </div>
            </div>
          ))}
        </div>
        <hr className="opacity-15" />
        {/* bottom section */}
        <div className="px-5 mt-5 font-semibold">
          <div className="flex items-center justify-center gap-10">
            <p className="font-tenor tracking-widest">Total</p>
            <p className="font-tenor tracking-widest">:</p>
            <p className="font-tenor tracking-widest">
              ₹ {parseInt(totalPrice, 10).toLocaleString("en-IN")}
            </p>
          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-white bg-opacity-30 py-3 text-sm text-white  mt-5">
            BUY NOW
            <Upioptions />
            <FiChevronRight />
          </button>
          <div className="flex items-center justify-center mt-5 mb-10">
            <Link
              href="/cart"
              className="py-1 relative group tracking-widest"
              onClick={closemenu}
            >
              VIEW CART
              <span className="absolute bottom-0 left-0 h-px w-full bg-white lg:group-hover:w-0 duration-300"></span>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10" onClick={closemenu}></div>
    </div>
  );
}

export default Sidecart;
