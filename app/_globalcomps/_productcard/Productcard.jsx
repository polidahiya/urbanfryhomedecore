import React from "react";
import Link from "next/link";
import Quickviewbutton from "./Quickviewbutton";
import Nextimage from "../Nextimage";
import { FaStar, FaHourglassHalf, FaTags } from "react-icons/fa";

function Productcard({ product }) {
  const firstimage = product?.variants[0]?.images[0] || "/uiimages/404.jpg";
  return (
    <div className="group relative w-full h-full md:max-w-80">
      <div className="relative">
        <Link
          className="w-full aspect-square relative block overflow-hidden"
          href={`/product/${product?._id}`}
        >
          <Nextimage
            src={firstimage}
            alt={product?.productName}
            className="h-full w-full absolute  object-cover lg:group-hover:scale-105 lg:group-hover:opacity-0 duration-300"
            height={500}
            width={500}
            loading="lazy"
          ></Nextimage>
          <Nextimage
            src={product?.variants[0]?.images[1] || firstimage}
            alt={product?.productName}
            className="hidden lg:block h-full w-full absolute  object-cover opacity-0 lg:group-hover:scale-110 lg:group-hover:opacity-100 duration-300"
            height={500}
            width={500}
            loading="lazy"
          ></Nextimage>
        </Link>
        {/* quick view button */}
        <Quickviewbutton product={product} />
        {/* available tag */}
        {!product?.available && (
          <div className="absolute bottom-0 p-2 w-full lg:group-hover:bottom-16 duration-300">
            <p className="w-full text-center bg-white bg-opacity-75 py-3 lg:group-hover:bg-opacity-100">
              Available Soon{"!"}
            </p>
          </div>
        )}
        {/* tags */}
        <div className="absolute top-2 left-2 flex flex-col gap-2 text-[10px] z-10">
          {product?.tags && product?.tags?.includes("Best Seller") && (
            <div className="flex items-center gap-1 bg-white/75 py-0.5 px-1 w-fit">
              <FaStar className="w-3 h-3" />
              <span className="font-medium">Best Seller</span>
            </div>
          )}

          {/* Last Chance */}
          {product?.stocks == 1 && (
            <div className="flex items-center gap-1 bg-white/75 py-0.5 px-1 w-fit">
              <FaHourglassHalf className="w-3 h-3" />
              <span className="font-medium">Last Chance</span>
            </div>
          )}

          {/* On Sale */}
          {product?.tags && product?.tags?.includes("Sale") && (
            <div className="flex items-center gap-1 bg-white/75 py-0.5 px-1 w-fit">
              <FaTags className="w-3 h-3" />
              <span className="font-medium">On Sale</span>
            </div>
          )}
        </div>
      </div>
      {/* details */}
      <div className="px-0 pt-4">
        <p className="text-sm text-theme mt-[6px] hidden lg:block">
          {product?.theme}
        </p>
        <p className="flex items-center justify-between flex-wrap mt-[6px]">
          <span className="line-clamp-2">{product?.productName}</span>
          <span className="">
            From{" "}
            <span className="text-theme">
              ₹{parseInt(product?.sellingprice, 10).toLocaleString("en-IN")}
              &#47;&#45;
            </span>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Productcard;
