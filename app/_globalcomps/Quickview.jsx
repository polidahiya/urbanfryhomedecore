"use client";
import React from "react";
import { AppContextfn } from "../Context";
import { RxCross1 } from "react-icons/rx";
import Details from "../(main)/product/[...props]/_comps/Details";
import Imagescomp from "../(main)/product/[...props]/_comps/Imagescomp";
import Link from "next/link";

function Quickview() {
  const { quickview, setquickview } = AppContextfn();
  const product = quickview?.data;

  if (quickview?.show)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-20 z-40 p-5 md:p-10">
        <div className="relative h-full w-full max-w-5xl mx-auto">
          <div className="w-full h-full flex flex-col md:flex-row p-1 bg-white overflow-y-scroll themescroll">
            <div className="w-full md:w-1/2">
              <Imagescomp
                images={product.variants[0].images}
                name={product.productName}
              />
            </div>
            <div className="w-full md:w-1/2 p-8">
              <Details product={product} color="0" />
            </div>
          </div>
          {/* cancel button */}
          <button
            className="group h-14 aspect-square absolute top-0 right-0 flex items-center justify-center z-10"
            onClick={() => setquickview({ show: false, data: {} })}
          >
            <RxCross1 className="text-2xl lg:group-hover:rotate-90 duration-300" />
          </button>
          <Link
            href={`/product/${product._id}`}
            onClick={() => setquickview({ show: false, data: {} })}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 px-10 py-4 bg-theme text-white"
          >
            View Full
          </Link>
        </div>

        <button
          className="absolute inset-0 -z-10"
          onClick={() => setquickview({ show: false, data: {} })}
        ></button>
      </div>
    );
}

export default Quickview;
