"use client";
import React from "react";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Ordersuccessmenu() {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[999] p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="flex flex-col items-center justify-center w-full max-w-xl bg-white rounded-[15px] p-6 shadow-xl text-center relative"
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          <Nextimage
            src="/uiimages/ordersuccess.gif"
            alt="Order placed animation"
            height={100}
            width={100}
            className="h-[100px] object-cover my-4"
            unoptimized={true}
          />
          <p className="text-lg font-semibold text-gray-800">
            Order Placed Successfully 🎉
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Thank you for shopping with us.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 text-center mt-6 w-full">
            <Link
              replace
              href="/collections/all"
              className="text-theme font-medium lg:hover:opacity-75"
            >
              Continue Shopping
            </Link>
            <Link
              replace
              href="/account"
              className="text-theme font-medium lg:hover:opacity-75"
            >
              Order History
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
