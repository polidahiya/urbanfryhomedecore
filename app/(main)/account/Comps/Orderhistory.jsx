"use client";
import Link from "next/link";
import React, { useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Image from "next/image";
import Showfullorder from "./Showfullorder";
import { FaAngleRight } from "react-icons/fa6";
import { Statuslists } from "@/app/commondata";

function Orderhistory({ orders }) {
  const [showfullorder, setshowfullorder] = useState({
    show: false,
    data: {},
  });
  return (
    <div className="lg:flex-[5] w-full">
      <p>Order History</p>
      {orders.length == 0 ? (
        <Noorders />
      ) : (
        <div className="mt-5">
          {orders?.map((order, i) => (
            <Orders key={i} order={order} setshowfullorder={setshowfullorder} />
          ))}
        </div>
      )}
      {showfullorder?.show && (
        <Showfullorder
          orderData={showfullorder?.data}
          setshowfullorder={setshowfullorder}
        />
      )}
    </div>
  );
}

const Orders = ({ order, setshowfullorder }) => {
  return (
    <div className="relative border-b border-theme first:border-t py-2">
      <div>
        {order?.products?.map((product, i) => {
          return (
            <div key={i} className="flex gap-5 my-2  p-2">
              <Image
                src={product?.image}
                alt={product.productName}
                className="w-24 h-w-24 aspect-square object-cover"
                height={500}
                width={500}
                loading="lazy"
              ></Image>
              <div>
                <p className="line-clamp-2">{product?.productName}</p>

                <p className="mt-1 text-theme text-sm">
                  Quantity : {product?.quantity}
                </p>
                <p className="mt-1 text-theme text-sm">
                  Dimension : {product?.dimension}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify- gap-5">
        <p className="text-theme text-sm">Ordered on {order?.date}</p>
        <p className="font-semibold">Total : ₹{order?.totalPrice}</p>
        <button
          className="flex items-center gap-2 text-theme text-sm"
          onClick={() => {
            setshowfullorder({ show: true, data: order });
          }}
        >
          View Details
          <FaAngleRight />
        </button>
      </div>
      <div className="flex items-center justify-evenly my-2">
        <div className="flex items-center justify-between w-full max-w-xl mx-auto mt-8">
          {Statuslists.map((status, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Circle */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-medium ${
                  index <= order?.orderstage
                    ? "border-theme bg-theme text-white"
                    : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                {index + 1}
              </div>
              {/* Label */}
              <span
                className={`mt-2 text-sm ${
                  index <= order?.orderstage ? "text-theme" : "text-gray-500"
                }`}
              >
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Noorders = () => {
  return (
    <div className="bg-footercolor mt-10 flex flex-col items-center justify-center p-12">
      <HiOutlineShoppingBag className="text-4xl" />
      <p className="text-sm mt-2">You haven{"'"}t placed any orders yet</p>
      <Link
        rel="stylesheet"
        href="/collections/special/all"
        className="mt-5 px-10 py-4 bg-theme text-white"
      >
        Start Shopping
      </Link>
    </div>
  );
};

export default Orderhistory;
