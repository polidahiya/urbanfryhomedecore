"use client";
import React from "react";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Link from "next/link";
import { AppContextfn } from "@/app/Context";

function Coloroptions({ variants, color, pid, name }) {
  const { setquickview } = AppContextfn();
  return (
    <div className="mt-5">
      <p className="block text-sm">Color Options</p>
      <div className="flex gap-2 mt-2">
        {variants?.map((variant, index) => (
          <Link
            href={`/product/${pid}/${index}`}
            key={index}
            className={`border  outline-2 outline-theme overflow-hidden ${
              index == color ? "outline" : "lg:hover:outline"
            }`}
            onClick={() => {
              setquickview({ show: false, data: {} });
            }}
          >
            <Nextimage
              src={variant.images[0] || "/uiimages/404.jpg"}
              alt={`${name}-${variant.finish}`}
              height={100}
              width={100}
              loading="lazy"
              className="w-24 aspect-square"
            ></Nextimage>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Coloroptions;
