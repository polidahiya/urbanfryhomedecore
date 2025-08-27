"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AppContextfn } from "@/app/Context";
import { Productctxfn } from "../Productcontext";

function Options({ moreoptions, allsearchparams, productid, quickview }) {
  const { setSelectedImageIndex } = Productctxfn();
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

  return moreoptions?.length > 0 ? (
    <div className="mt-5 space-y-5">
      {moreoptions.map((moreoption, i) => (
        <div key={i}>
          <p>{moreoption?.name} : </p>
          <div className="flex gap-2 mt-1.5 overflow-x-scroll hidescroll">
            {moreoption?.options.map((option, j) => (
              <Link
                href={getLink({ [moreoption?.name]: j })}
                key={j}
                className={`flex items-center gap-2 flex-shrink-0 rounded-full  border whitespace-nowrap cursor-pointer ${
                  option?.image[0] ? "py-2 pl-[10px] pr-6" : "py-4 px-10"
                } ${
                  (allsearchparams?.[moreoption?.name] || 0) == j &&
                  "bg-gray-100"
                }`}
                scroll={false}
                onClick={() => {
                  setquickview({ show: false, data: {} });
                  if (!quickview) setSelectedImageIndex(option?.imageindex);
                }}
              >
                {option?.image[0] && (
                  <img
                    src={option?.image[0]}
                    alt=""
                    className="w-10 aspect-square rounded-full"
                  />
                )}
                {option?.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : null;
}

export default Options;
