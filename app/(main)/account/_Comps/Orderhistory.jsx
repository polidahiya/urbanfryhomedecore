"use client";
import Link from "next/link";
import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { Statuslists } from "@/app/commondata";
import formatDate from "@/app/_globalcomps/_helperfunctions/formateddate";
import Couponedprice from "@/app/_globalcomps/_helperfunctions/Couponedprice";

function Orderhistory({ orders }) {
  return (
    <div className="lg:flex-[5] w-full">
      <p>Order History</p>
      {orders.length == 0 ? (
        <Noorders />
      ) : (
        <div className="mt-5">
          {orders?.map((order, i) => (
            <Orders key={i} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

const statuscolors = {
  4: "bg-red-50",
  5: "bg-yellow-50",
};

const Orders = ({ order }) => {
  // console.log(order);
  const product = order?.product;
  const orderstatuslimit = 4;
  const coupon = order?.coupondata;

  const { formattedPrice, originalPriceFormatted } = Couponedprice(
    product?.price,
    coupon
  );

  return (
    <div
      className={`relative border-b border-theme first:border-t py-2 ${
        statuscolors[order?.status]
      }`}
    >
      <div>
        <div className="flex gap-5 my-2  p-2">
          <Nextimage
            src={product?.image}
            alt={product?.name}
            className="w-24 h-w-24 aspect-square object-cover"
            height={100}
            width={100}
            loading="lazy"
          />
          <div>
            <p className="line-clamp-2">{product?.name}</p>
            <p className="mt-1 text-theme text-sm">
              Quantity : {product?.quantity}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify- gap-5">
        <p className="text-theme text-sm">
          Ordered on {formatDate(order?.createdAt, false)}
        </p>
        <p className="font-semibold">
          Total :{" "}
          <span className="text-green-600 font-semibold">{formattedPrice}</span>
          {coupon && (
            <span className="ml-2 text-gray-500 line-through text-sm">
              {originalPriceFormatted}
            </span>
          )}{" "}
        </p>
      </div>
      {order?.status < orderstatuslimit && (
        <div className="flex items-center justify-evenly my-2">
          <div className="flex items-center justify-between w-full max-w-xl mx-auto mt-8">
            {Statuslists.slice(0, orderstatuslimit).map((status, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-medium ${
                    index <= order?.status
                      ? "border-theme bg-theme text-white"
                      : "border-gray-300 bg-white text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                {/* Label */}
                <span
                  className={`mt-2 text-sm ${
                    index <= order?.status ? "text-theme" : "text-gray-500"
                  }`}
                >
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Noorders = () => {
  return (
    <div className="bg-footercolor mt-5 flex flex-col items-center justify-center p-12">
      <HiOutlineShoppingBag className="text-4xl" />
      <p className="text-sm mt-2">You haven{"'"}t placed any orders yet</p>
      <Link
        rel="stylesheet"
        href="/collections/all"
        className="mt-5 px-10 py-4 bg-theme text-white"
      >
        Start Shopping
      </Link>
    </div>
  );
};

export default Orderhistory;
