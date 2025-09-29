import React from "react";
import Clientpage from "./Clientpage";
import Verification from "@/app/_connections/Verifytoken";
import Getcart from "@/app/_serveractions/Getcart";
import Pixelcheckoutmatrix from "./_comps/Pixelcheckoutmatrix";
import Underlineffect from "@/app/_globalcomps/Underlineffect";
import Link from "next/link";
import { redirect } from "next/navigation";

async function page() {
  const { verified } = await Verification("public");

  const { userdata, cartitems, valuebeforecoupon, coupondata, totalPrice } =
    await Getcart();
  const maxcashpaymentavailable = 10000;

  let numberofproducts = 0;

  const ids = cartitems.map(([_, item]) => {
    numberofproducts += item.quantity;
    return item._id;
  });

  if (numberofproducts == 0) redirect("/");

  return (
    <div className="pt-12 px-5 md:px-8">
      {/* navigations */}
      <div className="flex items-center gap-2 text-sm">
        <Underlineffect
          Comp={({ innercomp }) => <Link href="/">{innercomp}</Link>}
          title="Home"
          styles="w-fit"
        />{" "}
        / <p className="capitalize text-theme">Checkout</p>
      </div>
      <div>
        <h1 className="font-tenor text-4xl md:text-6xl capitalize pt-10">
          Checkout
        </h1>
      </div>
      <Clientpage
        ids={ids}
        totalPrice={totalPrice}
        verified={verified}
        userdata={userdata}
        cartitems={cartitems}
        coupondata={coupondata}
        valuebeforecoupon={valuebeforecoupon}
        maxcashpaymentavailable={maxcashpaymentavailable}
      />
      <Pixelcheckoutmatrix
        ids={ids}
        numberofproducts={numberofproducts}
        totalPrice={totalPrice}
      />
    </div>
  );
}

export default page;
