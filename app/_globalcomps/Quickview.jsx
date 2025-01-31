"use client";
import React from "react";
import { AppContextfn } from "../Context";
import { RxCross1 } from "react-icons/rx";
import Details from "../(main)/product/[...props]/_comps/Details";
import Imagescomp from "../(main)/product/[...props]/_comps/Imagescomp";

function Quickview() {
  const { quickview, setquickview } = AppContextfn();
  const product = quickview?.data;

  if (quickview?.show)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-20 z-40 p-5 md:p-10">
        <div className="relative flex flex-col md:flex-row p-1 bg-white h-full w-full max-w-5xl mx-auto overflow-y-scroll themescroll">
          <div className="flex-1">
            <Imagescomp
              images={product.variants[0].images}
              name={product.productName}
            />
          </div>
          <div className="flex-1 p-8">
            <Details product={product} color="0" />
          </div>
          {/* cancel button */}
          <button
            className="group h-14 aspect-square absolute top-0 right-0 flex items-center justify-center"
            onClick={() => setquickview({ show: false, data: {} })}
          >
            <RxCross1 className="text-2xl lg:group-hover:rotate-90 duration-300" />
          </button>
        </div>
        <button
          className="absolute inset-0 -z-10"
          onClick={() => setquickview({ show: false, data: {} })}
        ></button>
      </div>
    );
}

export default Quickview;
