import React from "react";
import Link from "next/link";
import Quickviewbutton from "./Quickviewbutton";
import Nextimage from "../Nextimage";

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
        {!product?.available && (
          <div className="absolute bottom-0 p-2 w-full lg:group-hover:bottom-16 duration-300">
            <p className="w-full text-center bg-white bg-opacity-75 py-3 lg:group-hover:bg-opacity-100">
              Available Soon{"!"}
            </p>
          </div>
        )}
      </div>
      {/* details */}
      <div className="px-4 pt-4">
        <p className="text-sm text-theme mt-[6px] hidden lg:block">
          {product?.theme}
        </p>
        <p className="flex items-center justify-between flex-wrap mt-[6px]">
          <span className="line-clamp-2">{product?.productName}</span>
          <span className="">
            From ₹{parseInt(product?.sellingprice, 10).toLocaleString("en-IN")}
            &#47;&#45;
          </span>
        </p>
      </div>
    </div>
  );
}

export default Productcard;
