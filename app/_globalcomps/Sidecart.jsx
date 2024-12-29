"use client";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import { AppContextfn } from "../Context";
import Image from "next/image";

function Sidecart() {
  const { cart, showsidecart, setshowsidecart } = AppContextfn();
  const cartitems = Object.entries(cart).filter(([key, value]) => value.added);

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
        className={`w-full max-w-[500px] h-full  absolute top-0 right-0  bg-theme text-white z-30 duration-300 ease-out
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
            {cartitems.length}
            {")"}
          </span>
        </p>
        <hr className="opacity-15" />
        <div className="w-full flex flex-col gap-1">
          {cartitems.map(([key, value], i) => (
            <div key={i} className="p-5 w-full flex items-stretch">
              <Image
                src={value?.image}
                alt={value?.productName}
                height={100}
                width={100}
                className="min-w-24 aspect-square"
              ></Image>
              <div className="w-full pl-5">
                <div className="flex">
                  <p className="font-tenor">{value.productName}</p>
                  <p className=" ml-10">
                    ₹ {parseInt(value.sellingprice, 10).toLocaleString("en-IN")}
                  </p>
                </div>
                <p className="opacity-60">{value?.dimension}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 -z-10" onClick={closemenu}></div>
    </div>
  );
}

export default Sidecart;
