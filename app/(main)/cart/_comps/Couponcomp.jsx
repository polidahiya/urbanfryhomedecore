"use client";
import React, { useState } from "react";
import { BiSolidCoupon } from "react-icons/bi";
import {
  Applycoupon,
  Removecoupon,
} from "@/app/_serveractions/_admin/Serveraction";
import { AppContextfn } from "@/app/Context";

function Couponcomp({ cartitems, totalPrice, couponcode }) {
  const { setmessagefn } = AppContextfn();
  const [coupon, setcoupon] = useState(couponcode || "");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    const res = couponcode
      ? await Removecoupon()
      : await Applycoupon(coupon.trim(), totalPrice, cartitems);
    setmessagefn(res?.message);
  };

  return (
    <div className="w-full md:w-fit flex flex-col gap-4">
      <div className="font-semibold">Coupons</div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={coupon}
          required
          disabled={couponcode}
          onChange={(e) => setcoupon(e.target.value)}
          className={`w-full h-11 border border-theme outline-none px-2 ${
            couponcode && "opacity-50"
          }`}
          placeholder="Eg : ALT10"
        />
        <button
          type="submit"
          className="w-full h-11 flex items-center justify-center gap-2 bg-theme text-white opacity-75 lg:hover:opacity-100"
        >
          <BiSolidCoupon />
          <span className="text-sm">
            {couponcode ? "Remove" : "Apply"} Coupon
          </span>
        </button>
      </form>
    </div>
  );
}

export default Couponcomp;
