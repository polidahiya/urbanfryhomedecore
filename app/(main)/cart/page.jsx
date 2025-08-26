import React from "react";
import Verification from "@/app/_connections/Verifytoken";
import Getcart from "@/app/_serveractions/Getcart";
import { Cartcontextwrapper } from "./Cartcontext";
import Underlineffect from "@/app/_globalcomps/Underlineffect";
import { FaOpencart } from "react-icons/fa";
import { BsCartX } from "react-icons/bs";
import Link from "next/link";
import Addressbar from "./_comps/Addressbar";
import Product from "./_comps/Product";
import PaymentMethod from "./_comps/Paymentmethod";
import Couponcomp from "./_comps/Couponcomp";
import Orderbutton from "./_comps/Orderbutton";

async function page() {
  const { verified } = await Verification("public");

  const { userdata, cartitems, valuebeforecoupon, coupondata, totalPrice } =
    await Getcart();
  const maxcashpaymentavailable = 100000;

  return (
    <Cartcontextwrapper
      totalPrice={totalPrice}
      verified={verified}
      userdata={userdata}
    >
      <div className="pt-16 px-5 md:px-8">
        {/* navigations */}
        <div className="flex items-center gap-2 text-sm">
          <Underlineffect
            Comp={({ innercomp }) => <Link href="/">{innercomp}</Link>}
            title="Home"
            styles="w-fit"
          />{" "}
          / <p className="capitalize text-theme">Your Shopping Cart</p>
        </div>
        <div>
          <h1 className="font-tenor text-4xl md:text-6xl capitalize pt-10">
            Shopping Cart <FaOpencart className="inline-block ml-5" />
          </h1>
        </div>
        {cartitems.length == 0 ? (
          <Emptycart />
        ) : (
          <>
            {/* products */}
            <div className="mt-10 lg:mt-20 border-collapse w-full text-center">
              <div className="justify-between border-b border-t font-bold py-2 hidden lg:flex">
                <p className="text-center flex-[3]">Product</p>
                <p className="text-center flex-1">Price</p>
                <p className="text-center flex-1">Quantity</p>
                <p className="text-center flex-1">Total</p>
                <p className="text-center flex-1">Remove</p>
              </div>
              <div>
                {cartitems.map(([key, item], index) => (
                  <Product key={index} item={item} cartproductid={key} />
                ))}
              </div>
            </div>
            {/* address */}
            <Addressbar verified={verified} userdata={userdata} />
            {/* checkout */}
            <div className="flex flex-col md:flex-row items-start justify-evenly gap-5 bg-footercolor bg-opacity-50 p-5 md:p-10 my-10">
              <Couponcomp
                cartitems={cartitems}
                totalPrice={totalPrice}
                couponcode={coupondata?.code}
              />
              <PaymentMethod
                totalPrice={totalPrice}
                maxcashpaymentavailable={maxcashpaymentavailable}
              />
              <div className="w-full md:w-fit flex flex-col gap-4">
                <div className="font-semibold">
                  Total :{" "}
                  {valuebeforecoupon && (
                    <span className="text-gray-400 line-through mr-3">
                      ₹{valuebeforecoupon.toLocaleString("en-IN")}
                    </span>
                  )}
                  <span>₹{totalPrice.toLocaleString("en-IN")}/-</span>
                </div>
                <Orderbutton />
              </div>
            </div>
          </>
        )}
      </div>
    </Cartcontextwrapper>
  );
}

const Emptycart = () => {
  return (
    <div className="flex flex-col items-center justify-center my-10 h-[400px] bg-footercolor">
      <BsCartX className="text-6xl" />
      <p className="mt-5 text-center text-xl">
        You haven’t added <br /> anything to cart.
      </p>
      <Link
        href="/collections/all"
        className="py-3 px-10 mt-5 bg-theme text-white lg:hover:opacity-75"
      >
        Explore
      </Link>
    </div>
  );
};

export default page;
