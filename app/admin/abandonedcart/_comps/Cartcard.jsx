"use client";
import React, { useState } from "react";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";
import Reminderbutton from "./Reminderbutton";
import formatDate from "@/app/_globalcomps/_helperfunctions/formateddate";

function Cartcard({ cart }) {
  const [showdata, setshowdata] = useState(false);

  const parseKey = (key) => {
    const parts = key.split("|").filter(Boolean);
    const data = {};
    parts.forEach((part) => {
      const [k, v] = part.split(":");
      if (k && v) data[k] = v;
    });
    return data;
  };

  const handleViewDetails = async () => {
    setshowdata(!showdata);
  };

  return (
    <div key={cart._id} className="p-6 border rounded-xl bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b pb-3">
        <div>
          <p className="font-semibold text-lg text-gray-800">{cart.email}</p>
          {showdata && (
            <p className="text-sm text-gray-500">
              last updated: {formatDate(cart.updatedAt, true)}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`block h-3 w-3 rounded-full ${
              cart.status === "abandoned"
                ? "bg-red-500"
                : "bg-green-500 animate-pulse"
            }`}
          ></span>
          <span className="capitalize text-sm">{cart.status}</span>
        </div>
      </div>

      {/* User Data Section */}
      {showdata && (
        <div className="mt-4 border-b pb-3 text-sm text-gray-700">
          <p>
            <span className="font-medium">Name:</span>{" "}
            {cart?.userdata?.name || "—"}
          </p>
          <p>
            <span className="font-medium">Phone:</span>{" "}
            {cart?.userdata?.phonenum || "—"}
          </p>
          <p>
            <span className="font-medium">Address:</span>{" "}
            {cart?.userdata?.address || "—"}
          </p>
        </div>
      )}

      {/* Cart Items */}
      {showdata && (
        <div className="mt-4 space-y-3">
          {Object.keys(cart.cartItems).map((key) => {
            const item = cart.cartItems[key];
            const { _id, vcolor, Size } = parseKey(key);

            const query = new URLSearchParams();
            if (Size) query.append("Size", Size);
            if (vcolor) query.append("vcolor", vcolor);

            const productUrl = `/product/${_id}${
              query.toString() ? `?${query.toString()}` : ""
            }`;

            return (
              <div
                key={key}
                className="flex items-center justify-between bg-gray-50 rounded-md px-4 py-2 hover:bg-gray-100"
              >
                <p>
                  Product: {_id}, Qty: {item.quantity}
                </p>
                <Link
                  href={productUrl}
                  target="_blank"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <LuExternalLink />
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-5">
        <button
          className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50"
          onClick={handleViewDetails}
        >
          {showdata ? "Hide Details" : "View Details"}
        </button>
        <Reminderbutton cart={cart} />
      </div>
    </div>
  );
}

export default Cartcard;
