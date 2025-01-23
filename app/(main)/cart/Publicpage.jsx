"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Underlineeffect from "@/app/_globalcomps/Underlineeffect";
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

function Publicpage({ userdata, token }) {
  const [paymentMethod, setPaymentMethod] = useState("online");
  const { cart, setcart, setmessagefn } = AppContextfn();
  const cartitems = Object.entries(cart).filter(([key, value]) => value.added);
  const [totalPrice, settotalPrice] = useState(0);
  const [coupon, setcoupon] = useState("");
  const [appliedcoupondata, setappliedcoupondata] = useState();

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

    setmessagefn(res?.message);

    if (res.status === 200) {
      if (paymentMethod == "online") {
        loadRazorpay(res.id);
      } else {
        setcart({});
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
        <Link href={"/"} className="">
          <Underlineeffect title={"Home"} />
        </Link>{" "}
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
          {/* checkout */}
          <div className="flex flex-col md:flex-row items-start justify-center gap-5 bg-footercolor bg-opacity-50 p-5 md:p-10 my-10">
            <Couponcomp
              coupon={coupon}
              setcoupon={setcoupon}
              settotalPrice={settotalPrice}
              getcouponprice={getcouponprice}
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

const PaymentMethod = ({ paymentMethod, setPaymentMethod, totalPrice }) => {
  const handleToggle = (method) => {
    if (method === "cod" && totalPrice >= 10000) return;
    setPaymentMethod(method);
  };

  useEffect(() => {
    if (paymentMethod === "cod" && totalPrice >= 10000)
      setPaymentMethod("online");
  }, [totalPrice]);

  return (
    <div className="w-full md:w-fit flex flex-col gap-4">
      <span className="font-semibold">Payment Method</span>
      <div className="w-full flex flex-col gap-2 text-sm">
        {/* Online Payment Option */}
        <label
          className={`w-full flex items-center gap-3 p-3 border cursor-pointer transition ${
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
            className="w-5 h-5 accent-theme cursor-pointer"
          />
          <span className="text-gray-700">Pay Online</span>
        </label>

        {/* COD Option */}
        <label
          className={`w-full flex items-center gap-3 p-3 border cursor-pointer transition ${
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
            className="w-5 h-5 accent-theme cursor-pointer"
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

export default Publicpage;
