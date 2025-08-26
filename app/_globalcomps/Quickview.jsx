"use client";
import React from "react";
import { AppContextfn } from "../Context";
import { RxCross1 } from "react-icons/rx";
import Details from "../(main)/product/[id]/_comps/Details";
import Imagescomp from "../(main)/product/[id]/_comps/Imagescomp";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function Quickview() {
  const { quickview, setquickview } = AppContextfn();

  const product = quickview?.data;
  const cartproductname =
    `_id:${product?._id}|vcolor:${0}|` +
    (product?.moreoptions || [])
      .sort()
      .map((moreoption) => `${moreoption?.name}:${0}`)
      .join("|");

  let rawprice = Number(product?.sellingprice);
  let rawmrp = Number(product?.mrp);
  product?.moreoptions?.forEach((moreoption) => {
    const selectedoption = moreoption?.options[0];
    rawprice += Number(selectedoption?.price);
    rawmrp += Number(selectedoption?.mrp);
  });

  const allsearchparams = product?.moreoptions?.map((moreoption) => {
    return { [moreoption?.name]: 0 };
  });

  return (
    <AnimatePresence>
      {quickview?.show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/20 z-40 p-5 md:p-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3 }}
            className="relative h-full w-full max-w-5xl mx-auto"
          >
            <div className="w-full h-full flex flex-col md:flex-row p-1 bg-white overflow-y-scroll themescroll">
              <div className="w-full md:w-1/2 md:sticky top-0 z-10">
                <Imagescomp
                  images={product.variants[0].images}
                  name={product.productName}
                />
              </div>
              <div className="w-full md:w-1/2 px-2 md:px-8 py-8">
                <Details
                  product={product}
                  color={0}
                  productid={product?._id}
                  cartproductname={cartproductname}
                  allsearchparams={allsearchparams}
                  rawprice={rawprice}
                  rawmrp={rawmrp}
                />
                {/* view full button */}
                <div className="pb-2 md:pb-8 pt-5">
                  <Link
                    href={`/product/${product._id}`}
                    onClick={() => setquickview({ show: false, data: {} })}
                    className="py-4 flex items-center justify-center bg-theme text-white w-full"
                  >
                    View Full
                  </Link>
                </div>
              </div>
            </div>
            {/* cancel button */}
            <button
              className="group h-14 aspect-square absolute top-0 right-0 flex items-center justify-center z-10"
              onClick={() => setquickview({ show: false, data: {} })}
            >
              <RxCross1 className="text-2xl lg:group-hover:rotate-90 duration-300" />
            </button>
          </motion.div>

          <button
            className="absolute inset-0 -z-10"
            onClick={() => setquickview({ show: false, data: {} })}
          ></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Quickview;
