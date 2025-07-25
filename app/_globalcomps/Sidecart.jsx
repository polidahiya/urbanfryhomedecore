"use client";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import { AppContextfn } from "../Context";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Sidecarteditbuttons from "./_sidecart/Sidecarteditbuttons";
import Link from "next/link";
import { BsCartX } from "react-icons/bs";

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
    <div className="w-full h-dvh fixed top-0 left-0 bg-black bg-opacity-0 z-30">
      <div
        className={`w-full max-w-[500px] h-full flex flex-col  absolute top-0 right-0  bg-theme text-white z-30 duration-300 ease-out md:border-l border-white overflow-y-scroll themescroll
        ${showsidecart?.effect ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="sticky top-0 text-5xl p-10 font-tenor italic border-b border-white border-opacity-15 bg-theme">
          Cart
          <span className="text-2xl pl-3 italic font-serif">
            {"("}
            {totalQuantity}
            {")"}
          </span>
          <button
            className="group absolute top-0 right-0 p-5"
            onClick={closemenu}
          >
            <RxCross1 className="text-2xl lg:group-hover:rotate-90 duration-300" />
          </button>
        </div>
        {cartitems.length != 0 ? (
          <>
            {/* products */}
            <div className="w-full flex-1 flex flex-col gap-1">
              {cartitems.map(([key, value], i) => (
                <div key={i} className="p-5 w-full flex items-center">
                  <div className="min-w-[100px] aspect-square">
                    <Nextimage
                      src={value?.image}
                      alt={value?.productName}
                      height={100}
                      width={100}
                      className="h-full w-full object-contain"
                    ></Nextimage>
                  </div>

                  <div className="w-full pl-5">
                    <div className="flex">
                      <p className="font-tenor">{value.productName}</p>
                      <p className="ml-auto whitespace-nowrap">
                        ₹{" "}
                        {parseInt(value.sellingprice, 10).toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>
                    <p className="opacity-60">{value?.dimension}</p>
                    {/* increment and decrement buttons */}
                    <Sidecarteditbuttons cartproductname={key} />
                  </div>
                </div>
              ))}
            </div>
            {/* bottom section */}
            <div className="sticky bottom-0 px-5 pt-5 font-semibold border-t border-white border-opacity-15 bg-theme">
              <div className="flex items-center justify-center gap-10">
                <p className="font-tenor tracking-widest">Total</p>
                <p className="font-tenor tracking-widest">:</p>
                <p className="font-tenor tracking-widest">
                  ₹ {parseInt(totalPrice, 10).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="flex items-center justify-center mt-7 mb-10">
                <Link
                  href="/cart"
                  className="py-2 relative font-normal tracking-widest bg-white bg-opacity-75 lg:hover:bg-opacity-100 duration-300 text-theme w-full text-center"
                  onClick={closemenu}
                >
                  VIEW CART
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center my-20">
            <BsCartX className="text-5xl" />
            <p className="mt-5 text-center text-sm">
              You haven’t added <br /> anything to cart.
            </p>
            <Link
              href="/collections/all"
              onClick={closemenu}
              className="py-3 px-10 mt-5 bg-white text-theme lg:hover:text-white lg:hover:bg-transparent duration-300 lg:hover:opacity-75"
            >
              Explore
            </Link>
          </div>
        )}
      </div>
      <div className="absolute inset-0 -z-10" onClick={closemenu}></div>
    </div>
  );
}

export default Sidecart;
