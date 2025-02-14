"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AppContextfn } from "@/app/Context";
import Product from "./_comps/Product";
import Upioptions from "@/app/_svgs/Upioptions";
import { FiChevronRight } from "react-icons/fi";
import { FaOpencart } from "react-icons/fa";
import Razorpayidcreate from "@/app/_serveractions/_razorpay/Razorpayidcreate";
import Verifyrazorpay from "@/app/_serveractions/_razorpay/Verifyrazorpay";
import addorder from "@/app/_serveractions/addorders";
import { BsCartX } from "react-icons/bs";
import Couponcomp from "./_comps/Couponcomp";
import Cookies from "js-cookie";
import PaymentMethod from "./_comps/Paymentmethod";
import Addressbar from "./_comps/Addressbar";
import Underlineffect from "@/app/_globalcomps/Underlineffect";

function Publicpage({ userdata, token }) {
  const [paymentMethod, setPaymentMethod] = useState("online");
  const { cart, setcart, setmessagefn } = AppContextfn();
  const cartitems = Object.entries(cart).filter(([key, value]) => value.added);
  const [totalPrice, settotalPrice] = useState(0);
  const [coupon, setcoupon] = useState("");
  const [appliedcoupondata, setappliedcoupondata] = useState(null);

  const getcouponprice = (pre, coupondata) => {
    if (coupondata?.discountType == "percentage") {
      Cookies.set("altcoupon", JSON.stringify(coupondata));
      return Math.floor(pre - (pre * coupondata?.discountValue) / 100);
    } else if (coupondata?.discountType == "fixed amount") {
      Cookies.set("altcoupon", JSON.stringify(coupondata));
      return Math.floor(pre - coupondata?.discountValue);
    }
  };
  // update total price when cart items change
  useEffect(() => {
    const coupondata = Cookies.get("altcoupon");

    if (coupondata) {
      const coupon = JSON.parse(coupondata);
      setappliedcoupondata(coupon);
      setcoupon(coupon?.code);

      const totaprice = cartitems.reduce(
        (total, [key, value]) => total + value.quantity * value.sellingprice,
        0
      );
      const newprice = getcouponprice(totaprice, coupon);

      settotalPrice(newprice);
    } else {
      settotalPrice(
        cartitems.reduce(
          (total, [key, value]) => total + value.quantity * value.sellingprice,
          0
        )
      );
    }
  }, [cart]);

  const Order = async () => {
    if (!token) {
      setmessagefn("Please login to order");
      return;
    }
    const res = await addorder(
      cartitems,
      totalPrice,
      paymentMethod,
      userdata,
      appliedcoupondata
    );

    if (!(res?.status == 200 && paymentMethod == "online")) {
      setmessagefn(res?.message);
    }

    if (res.status === 200) {
      if (paymentMethod == "online") {
        loadRazorpay(res.id);
      } else {
        setcart({});
        Cookies.remove("altcoupon");
      }
    }
  };

  // load razor pay
  const loadRazorpay = async (id) => {
    const res = await Razorpayidcreate(totalPrice, "INR");
    if (res.status !== 200) {
      setmessagefn("Payment Failed!");
      return;
    }
    const order = res?.order;

    const options = {
      key: process.env.Razortpay_Key,
      amount: totalPrice, // Amount in paise
      currency: order.currency || "INR",
      name: "AltOrganisers",
      description: "Transaction",
      image: "/uiimages/logo.png",
      order_id: order.id, // Order ID generated from your backend
      handler: async (response) => {
        const res = await Verifyrazorpay(response, id);
        if (res.status == 200) {
          setcart({});
          Cookies.remove("altcoupon");
          setmessagefn("Order Placed Successfully");
        }
      },
      prefill: {
        name: userdata?.username,
        email: userdata?.email,
        contact: "",
      },
      theme: {
        color: "#8e766e",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      console.error("Payment failed", response.error);
    });
    paymentObject.open();
  };

  // razorpay
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="pt-32 px-5 md:px-8">
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
                <Product key={index} item={item} cartproductname={key} />
              ))}
            </div>
          </div>
          {/* address */}
          <Addressbar />
          {/* checkout */}
          <div className="flex flex-col md:flex-row items-start justify-evenly gap-5 bg-footercolor bg-opacity-50 p-5 md:p-10 my-10">
            <Couponcomp
              coupon={coupon}
              setcoupon={setcoupon}
              settotalPrice={settotalPrice}
              getcouponprice={getcouponprice}
              setappliedcoupondata={setappliedcoupondata}
            />
            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              totalPrice={totalPrice}
            />
            <div className="w-full md:w-fit flex flex-col gap-4">
              <div className="font-semibold">
                Total : ₹ {parseInt(totalPrice, 10).toLocaleString("en-IN")}/-
              </div>

              <button
                className="w-full flex items-center justify-center gap-2 bg-theme px-6 py-3 text-sm text-white bg-opacity-60 lg:hover:bg-opacity-100 duration-300"
                onClick={Order}
              >
                {paymentMethod == "online" ? "Pay Now" : "Place Order"}
                {paymentMethod == "online" && <Upioptions />}

                <FiChevronRight />
              </button>
            </div>
          </div>
        </>
      )}
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
      <Link
        href="/collections/special/all"
        className="py-3 px-10 mt-5 bg-theme text-white lg:hover:opacity-75"
      >
        Explore
      </Link>
    </div>
  );
};

export default Publicpage;
