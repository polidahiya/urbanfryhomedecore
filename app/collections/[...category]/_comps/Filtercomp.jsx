"use client";
import React, { use, useState } from "react";
import { TbFilterSearch } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { GiCheckMark } from "react-icons/gi";

export default function Filtercomp({
  category,
  subcat,
  metadatares,
  min,
  max,
}) {
  const [open, setopen] = useState(false);
  const minPrice = 0;
  const maxPrice = 100000;
  const [range, setRange] = useState([min || 0, max || 100000]);
  const [selectedsubcat, setselectedsubcat] = useState(null);

  const params = new URLSearchParams();
  params.set("pricerange", `${range[0]}-${range[1]}`);

  let basePath = `/collections/${category}`;
  if (selectedsubcat) {
    basePath += `/${selectedsubcat}`;
  }

  const finalurl = `${basePath}?${params.toString()}`;

  return (
    <div>
      <button
        className="flex items-center gap-2 px-5 md:px-10"
        onClick={() => setopen(true)}
      >
        <TbFilterSearch />
        Filter
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed h-dvh w-full top-0 left-0 flex items-center justify-center bg-black/30 z-30 p-2 md:py-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.3 }}
              className="relative flex flex-col w-full max-w-xl max-h-full bg-white"
            >
              <div className="w-full h-full overflow-y-scroll py-10 px-5 md:px-10 md:py-10 themescroll">
                <p className="text-2xl font-semibold text-center">Filter</p>
                <div className="w-full max-w-md mx-auto p-4">
                  {/* Labels */}
                  <div className="flex justify-between mb-4">
                    <span>₹{range[0].toLocaleString()}</span>
                    <span>₹{range[1].toLocaleString()}</span>
                  </div>

                  {/* Slider */}
                  <Slider
                    range
                    min={minPrice}
                    max={maxPrice}
                    value={range}
                    step={100}
                    marks={{
                      0: "₹0",
                      20000: "₹20k",
                      40000: "₹40k",
                      60000: "₹60k",
                      80000: "₹80k",
                      100000: "₹100k",
                    }}
                    onChange={(val) => setRange(val)}
                  />
                </div>
                {metadatares.subcat && (
                  <div>
                    <p className="text-lg mt-10 text-center">
                      Select Subcategory
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {Object.entries(metadatares.subcat).map(
                        ([subcatkey, subcatvalue], i) => {
                          return (
                            <button
                              key={i}
                              className="group relative aspect-[4/3] md:aspect-[2/1] overflow-hidden"
                              onClick={() => setselectedsubcat(subcatkey)}
                            >
                              <Nextimage
                                src={subcatvalue.img}
                                alt={subcatkey}
                                width={240}
                                height={120}
                                className="h-full w-full object-cover lg:group-hover:scale-110 duration-500"
                              />
                              <p className="absolute bottom-0 left-0 w-full text-xl md:text-xl font-tenor text-white p-2 md:p-4 bg-gradient-to-b from-transparent to-black/75 text-start">
                                {subcatkey.replace(/-/g, " ")}
                              </p>
                              {selectedsubcat === subcatkey && (
                                <div className="absolute top-0 left-0 h-full w-full bg-black/50 flex items-center justify-center">
                                  <div className="bg-theme text-white p-5 rounded-full">
                                    <GiCheckMark />
                                  </div>
                                </div>
                              )}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-center mt-10">
                  <Link
                    href={finalurl}
                    className="px-10 py-3 bg-theme text-white"
                    onClick={() => setopen(false)}
                  >
                    Apply filters
                  </Link>
                </div>
              </div>
              {/* cancel button */}
              <button
                className="group h-14 aspect-square absolute top-0 right-0 flex items-center justify-center z-10"
                onClick={() => setopen(false)}
              >
                <RxCross1 className="text-2xl lg:group-hover:rotate-90 duration-300" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
