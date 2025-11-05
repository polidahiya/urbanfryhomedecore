"use client";
import React, { useState } from "react";
import Dateselector from "../../_comps/Dateselector";
import Link from "next/link";

const carttypes = ["all", "abandoned", "active"];
function Filtermenu({ type, from, to }) {
  const [show, setshow] = useState(false);
  const [selected, setselected] = useState(() => {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1); // subtract 1 month
    return {
      type: type || "all",
      from: from || oneMonthAgo,
      to: to || today,
    };
  });

  return (
    <>
      <button
        className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-100 active:scale-[0.96] transition-all duration-150 flex items-center justify-center text-sm"
        onClick={() => setshow(true)}
      >
        Filters
      </button>
      {show && (
        <div className="fixed top-0 left-0 h-screen w-full flex items-center justify-center bg-black/20 z-20">
          <div className="relative bg-white p-6 w-full max-w-xs">
            <div className="flex justify-between items-center">
              <p>Filters</p>
              <button
                type="button"
                onClick={() => setshow(false)}
                className="flex items-center justify-center w-8 aspect-square bg-gray-200"
              >
                x
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-5">
              {carttypes.map((item, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => {
                    setselected((pre) => ({ ...pre, type: item }));
                  }}
                  className="flex items-center gap-2 text-sm border border-slate-200 h-10 py-1 px-5 rounded-md"
                >
                  <span
                    className={`w-3 aspect-square ${
                      selected.type == item && "bg-theme"
                    }`}
                  ></span>
                  {item}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <Dateselector
                label="From"
                state={selected.from}
                setstate={(value) => {
                  setselected((pre) => ({ ...pre, from: value }));
                }}
                display={false}
              />
              <Dateselector
                label="TO"
                state={selected.to}
                setstate={(value) => {
                  setselected((pre) => ({ ...pre, to: value }));
                }}
                display={false}
              />
            </div>
            <div className="flex items-center justify-center mt-5">
              <Link
                className="bg-theme text-white px-6 py-2 flex items-center justify-center gap-2"
                href={`/admin/abandonedcart?type=${selected.type}&from=${selected.from}&to=${selected.to}`}
                onClick={() => setshow(false)}
              >
                Apply
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Filtermenu;
