import React from "react";
import Link from "next/link";
import Image from "next/image";

function Productcard({ product }) {
  return (
    <div className="group relative w-full md:max-w-80">
      <div className="relative">
        <Link
          className="w-full aspect-square relative block overflow-hidden"
          href={`/product/${product?.sku}`}
        >
          <Image
            src={product?.variants[0]?.images[0] || ""}
            alt={product.productName}
            className="h-full w-full absolute  object-cover lg:group-hover:scale-105 lg:group-hover:opacity-0 duration-300"
            height={500}
            width={500}
            loading="lazy"
          ></Image>
          <Image
            src={product?.variants[0]?.images[1] || ""}
            alt={product.productName}
            className="h-full w-full absolute  object-cover opacity-0 lg:group-hover:scale-110 lg:group-hover:opacity-100 duration-300"
            height={500}
            width={500}
            loading="lazy"
          ></Image>
        </Link>
        {/* quick view button */}
        <div className="absolute bottom-0 left-0 w-full p-2 hidden lg:group-hover:block z-10">
          <button className="w-full p-5 bg-white text-theme text-sm lg:hover:bg-theme lg:hover:text-white duration-300">
            Quick view
          </button>
        </div>
      </div>
      {/* details */}
      <div className="px-4 pt-4">
        <p className="text-sm text-theme mt-[6px] hidden lg:block">{product?.theme}</p>
        <p className="flex items-center justify-between flex-wrap mt-[6px]">
          <span>{product?.productName}</span>
          <span>
            From ₹{parseInt(product?.sellingprice, 10).toLocaleString("en-IN")}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Productcard;
