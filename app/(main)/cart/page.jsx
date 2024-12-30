"use client";
import React, { useState } from "react";
import Link from "next/link";
import Underlineeffect from "@/app/_globalcomps/Underlineeffect";
import { AppContextfn } from "@/app/Context";
import Product from "./_comps/Product";
import Upioptions from "@/app/_svgs/Upioptions";
import { FiChevronRight } from "react-icons/fi";
import { FaOpencart } from "react-icons/fa";

function Page() {
  const [paymentMethod, setPaymentMethod] = useState("online");
  const { cart } = AppContextfn();
  const cartitems = Object.entries(cart).filter(([key, value]) => value.added);
  const totalPrice = cartitems.reduce(
    (total, [key, value]) => total + value.quantity * value.sellingprice,
    0
  );

  return (
    <div className="pt-32 px-5 md:px-8">
      {/* navigations */}
      <div className="flex items-center gap-2 text-sm">
        <Link href={"/"} className="">
          <Underlineeffect title={"Home"} />
        </Link>{" "}
        / <p className="capitalize text-theme">Your Shopping Cart</p>
      </div>
      <div>
        <h1 className="font-tenor text-4xl md:text-6xl capitalize pt-10">
          Shopping Cart <FaOpencart  className="inline-block ml-5"/>
        </h1>
      </div>
      {/* products */}
      <div className="mt-10 lg:mt-20 border-collapse w-full text-center">
        <div className="justify-between border-b border-t font-bold py-2 hidden lg:flex">
          <p className="text-center flex-[3]">Product</p>
          <p className="text-center flex-1">Price</p>
          <p className="text-center flex-1">Quantity</p>
          <p className="text-center flex-1">Total</p>
          <p className="text-center flex-1"></p>
        </div>
        <div>
          {cartitems.map(([key, item], index) => (
            <Product key={index} item={item} cartproductname={key} />
          ))}
        </div>
      </div>
      {/* checkout */}
      <div className="flex flex-col md:flex-row items-start justify-center gap-5 bg-footercolor bg-opacity-50 p-5 md:p-10 my-10">
        <PaymentMethod
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          totalPrice={totalPrice}
        />
        <div className="w-full md:w-fit flex flex-col gap-4">
          <div className="font-semibold">
            Total : ₹ {parseInt(totalPrice, 10).toLocaleString("en-IN")}
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-theme px-6 py-3 text-sm text-white bg-opacity-60 lg:hover:bg-opacity-100 duration-300">
            BUY NOW
            <Upioptions />
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

const PaymentMethod = ({ paymentMethod, setPaymentMethod, totalPrice }) => {
  const handleToggle = (method) => {
    if (method === "cod" && totalPrice >= 10000) {
      alert("COD is only available for orders below ₹10,000.");
      return;
    }
    setPaymentMethod(method);
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="font-semibold">Payment Method</span>
      <div className="flex flex-col gap-2 text-sm">
        {/* Online Payment Option */}
        <label
          className={`flex items-center gap-3 p-3 border  cursor-pointer transition ${
            paymentMethod === "online"
              ? "bg-white border-theme"
              : "bg-gray-100 border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="online"
            checked={paymentMethod === "online"}
            onChange={() => handleToggle("online")}
            className="w-5 h-5 accent-theme"
          />
          <span className="text-gray-700">Pay Online</span>
        </label>

        {/* COD Option */}
        <label
          className={`flex items-center gap-3 p-3 border  cursor-pointer transition ${
            paymentMethod === "cod"
              ? "bg-white border-theme"
              : "bg-gray-100 border-gray-300"
          } ${totalPrice >= 10000 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => handleToggle("cod")}
            disabled={totalPrice >= 10000}
            className="w-5 h-5 accent-theme"
          />
          <span className="text-gray-700">Cash on Delivery (COD)</span>
        </label>
      </div>

      {/* Disabled Message */}
      {totalPrice >= 10000 && (
        <p className="text-xs text-gray-500">
          * COD is available only for orders below ₹10,000.
        </p>
      )}
    </div>
  );
};
// cod below 10,000

export default Page;
