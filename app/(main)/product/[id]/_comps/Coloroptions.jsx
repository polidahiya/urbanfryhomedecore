"use client";
import React from "react";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Link from "next/link";
import { AppContextfn } from "@/app/Context";
import { useSearchParams } from "next/navigation";

function Coloroptions({ variants, color, name, productid }) {
  const searchParams = useSearchParams();
  const { setquickview } = AppContextfn();

  function getLink(newParams) {
    const params = new URLSearchParams(searchParams.toString());

    // Add/Update params
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        params.delete(key); // remove param if value is null
      } else {
        params.set(key, value); // update/add param
      }
    });

    return `/product/${productid}?${params.toString()}`;
  }

  return (
    <div className="mt-5">
      <p className="block text-sm">Color Options</p>
      <div className="flex gap-2 mt-2">
        {variants?.map((variant, index) => (
          <Link
            href={getLink({ vcolor: index })}
            key={index}
            className={`border overflow-hidden ${
              index == color && "border-theme"
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
