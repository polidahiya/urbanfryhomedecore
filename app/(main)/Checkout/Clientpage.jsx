"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AppContextfn } from "@/app/Context";
import addorder from "@/app/_serveractions/addorders";
import Cookies from "js-cookie";
import Razorpayidcreate from "@/app/_serveractions/_razorpay/Razorpayidcreate";
import Verifyrazorpay from "@/app/_serveractions/_razorpay/Verifyrazorpay";
import { fbq } from "@/app/_connections/Fbpixel";
import { event } from "nextjs-google-analytics";
import Addressbar from "./_comps/Addressbar";
import Couponcomp from "./_comps/Couponcomp";
import PaymentMethod from "./_comps/Paymentmethod";
import Orderbutton from "./_comps/Orderbutton";

function Clientpage({
  ids,
  totalPrice,
  verified,
  userdata,
  cartitems,
  valuebeforecoupon,
  coupondata,
  maxcashpaymentavailable,
}) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("online");
  const { setcart, setmessagefn, pincode, pincoderef } = AppContextfn();
  const [shippingdetails, setshippingdetails] = useState({
    fullName: userdata?.name || "",
    email: userdata?.email || "",
    mobile: userdata?.phonenum || "",
    shipping: {
      address1: userdata?.address || "",
      address2: "",
      city: "",
      state: "",
    },
    billingSame: true,
    billing: {
      address1: "",
      address2: "",
      city: "",
      state: "",
    },
    orderNotes: "",
    termsAccepted: false,
  });
  const shippingformref = React.useRef(null);

  const Ordersuccess = () => {
    setmessagefn("Order Placed Successfully");
    setcart({});
    Cookies.set("cart", JSON.stringify({}), { expires: 1 });
    Cookies.remove("altcoupon");
    if (process.env.NODE_ENV === "development") {
      router.push("/");
      return;
    }

    // ✅ Facebook Pixel Purchase
    fbq("track", "Purchase", {
      content_ids: ids,
      value: totalPrice,
      currency: "INR",
    });

    // ✅ GA4 Purchase
    event("purchase", {
      transaction_id: crypto.randomUUID(), // generate or pass actual order ID
      value: totalPrice,
      currency: "INR",
      items: ids?.map((id) => ({
        item_id: id,
        quantity: 1, // replace with actual quantities if you have them
      })),
    });
    router.push("/");
  };

  const Order = async () => {
    if (!verified) {
      setmessagefn("Please login to order");
      router.push("/account/login?redirect=/cart");
      return;
    }

    if (
      !userdata?.phonenum?.trim() ||
      !userdata?.address?.trim() ||
      !userdata?.name?.trim()
    ) {
      setmessagefn("Update your details");
      router.push("/account?redirect=/cart");
      return;
    }

    shippingformref.current.requestSubmit();
    const isvalidshippingform = shippingformref.current.checkValidity();
    if (!isvalidshippingform) return;

    if (pincode.status != 200) {
      if (!pincode?.code) {
        setmessagefn("Enter your Pincode");
        pincoderef.current.focus();
        return;
      }
      if (!pincode?.available) {
        setmessagefn("Not available in your area");
        pincoderef.current.focus();
        return;
      }
    }

    const res = await addorder(
      paymentMethod,
      pincode?.code || "",
      shippingdetails
    );

    if (!(res?.status == 200 && paymentMethod == "online")) {
      setmessagefn(res?.message);
    }

    if (res.status === 200) {
      if (paymentMethod == "online") {
        loadRazorpay(res?.paymentGroupId);
      } else {
        Ordersuccess();
      }
    }
  };
  const loadRazorpay = async (paymentGroupId) => {
    const res = await Razorpayidcreate(totalPrice, "INR");
    if (res.status !== 200) {
      setmessagefn("Payment Failed!");
      return;
    }
    const order = res?.order;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: totalPrice, // Amount in paise
      currency: order.currency || "INR",
      name: "Urbanfry Homes",
      description: "Transaction",
      image: "/uiimages/logo.png",
      order_id: order.id, // Order ID generated from your backend
      handler: async (response) => {
        const res = await Verifyrazorpay(response, paymentGroupId);
        setmessagefn(res?.message);
        if (res.status == 200) {
          Ordersuccess();
        }
      },
      prefill: {
        name: userdata?.name,
        email: userdata?.email,
        contact: userdata?.phonenum,
        // contact: "",
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
    <div className="flex flex-col md:flex-row  gap-5 mt-14 md:mt-20 mb-5">
      {/* address */}
      <Addressbar
        verified={verified}
        shippingdetails={shippingdetails}
        setshippingdetails={setshippingdetails}
        shippingformref={shippingformref}
      />
      {/* checkout */}
      <div className="md:sticky top-24 w-full md:w-1/2 h-fit flex flex-col items-start justify-evenly gap-5 bg-footercolor bg-opacity-50 p-5 md:p-10">
        <Couponcomp
          cartitems={cartitems}
          totalPrice={totalPrice}
          couponcode={coupondata?.code}
        />
        <PaymentMethod
          totalPrice={totalPrice}
          maxcashpaymentavailable={maxcashpaymentavailable}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
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
          <Orderbutton Order={Order} paymentMethod={paymentMethod} />
        </div>
      </div>
    </div>
  );
}

export default Clientpage;
