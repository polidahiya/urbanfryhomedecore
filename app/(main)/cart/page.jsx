import React from "react";
import Getcart from "@/app/_serveractions/Getcart";
import Underlineffect from "@/app/_globalcomps/Underlineffect";
import { FaOpencart } from "react-icons/fa";
import { BsCartX } from "react-icons/bs";
import Link from "next/link";
import Product from "./_comps/Product";
import { FaChevronRight } from "react-icons/fa6";

async function page() {
  const { cartitems, totalPrice } = await Getcart();

  return (
    <div>
      <div className="pt-12 px-5 md:px-8">
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
            <div className="flex justify-end my-5">
              <Link
                href={"/Checkout"}
                className="w-full md:w-fit py-3 px-10 bg-theme text-white lg:hover:opacity-75 flex items-center gap-2"
              >
                Proceed to Checkout <FaChevronRight />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const Emptycart = () => {
  return (
    <div className="flex flex-col items-center justify-center my-10 h-[400px] bg-footercolor">
      <BsCartX className="text-6xl" />
      <p className="mt-5 text-center text-xl">
        You haven’t added <br /> anything to cart.
      </p>
      <div className="flex flex-col md:flex-row items-center gap-2 text-center mt-5">
        <Link
          href="/collections/all"
          className="w-full min-w-48 py-3 px-10  bg-theme text-white lg:hover:opacity-75"
        >
          Explore
        </Link>
        <Link
          href="/account"
          className="w-full min-w-48 py-3 px-10  bg-theme text-white lg:hover:opacity-75"
        >
          Order History
        </Link>
      </div>
    </div>
  );
};

export default page;
