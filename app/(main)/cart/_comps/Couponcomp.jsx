import React from "react";
import { BiSolidCoupon } from "react-icons/bi";
import Applycoupon from "@/app/_serveractions/applycoupons";
import { AppContextfn } from "@/app/Context";
import Cookies from "js-cookie";

function Couponcomp({ coupon, setcoupon, settotalPrice, getcouponprice }) {
  const { setmessagefn } = AppContextfn();

  const Applycouponfn = async () => {
    const coupondata = Cookies.get("altcoupon");

    if (coupondata) {
      setmessagefn("A coupon already applied");
      return;
    }

    const res = await Applycoupon(coupon);
    setmessagefn(res?.message);
    if (res.status === 200) {
      settotalPrice((pre) => {
        const newprice = getcouponprice(pre, res?.coupondata);
        return newprice || pre;
      });
    }
  };

  return (
    <div className="w-full md:w-fit flex flex-col gap-4">
      <div className="font-semibold">Coupons</div>
      <div className="space-y-2">
        <input
          type="text"
          value={coupon}
          onChange={(e) => setcoupon(e.target.value)}
          className="w-full h-11 border border-theme outline-none px-2"
          placeholder="Eg : ALT10"
        />
        <button
          className="w-full h-11 flex items-center justify-center gap-2 bg-theme text-white opacity-75 lg:hover:opacity-100"
          onClick={Applycouponfn}
        >
          <BiSolidCoupon />
          <span className="text-sm">Apply Coupon</span>
        </button>
      </div>
    </div>
  );
}

export default Couponcomp;
