"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AppContextfn } from "@/app/Context";
import { useRouter } from "next/navigation";
import addorder from "@/app/_serveractions/addorders";
import Cookies from "js-cookie";
import Razorpayidcreate from "@/app/_serveractions/_razorpay/Razorpayidcreate";
import Verifyrazorpay from "@/app/_serveractions/_razorpay/Verifyrazorpay";
import { fbq } from "@/app/_connections/Fbpixel";

const Cartcontext = createContext({});

export function Cartcontextwrapper({
  ids,
  totalPrice,
  verified,
  userdata,
  children,
}) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("online");
  const { setcart, setmessagefn } = AppContextfn();

  const Ordersuccessmeasure = () => {
    fbq("track", "Purchase", {
      content_ids: ids,
      value: totalPrice,
      currency: "INR",
    });
  };

  const Order = async () => {
    if (!verified) {
      setmessagefn("Please login to order");
      router.push("/account/login?redirect=/cart");
      return;
    }

    if (
      // userdata?.phonenum.trim() === "" ||
      userdata?.address.trim() === "" ||
      userdata?.username.trim() === ""
    ) {
      setmessagefn("Update Your Details");
      router.push("/account?redirect=/cart");
      return;
    }

    const res = await addorder(paymentMethod);

    if (!(res?.status == 200 && paymentMethod == "online")) {
      setmessagefn(res?.message);
    }

    if (res.status === 200) {
      if (paymentMethod == "online") {
        loadRazorpay(res?.paymentGroupId);
      } else {
        Ordersuccessmeasure();
        setcart({});
        Cookies.remove("altcoupon");
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
          Ordersuccessmeasure();
          setcart({});
          Cookies.remove("altcoupon");
        }
      },
      prefill: {
        name: userdata?.username,
        email: userdata?.email,
        // contact: userdata?.phonenum,
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
    <Cartcontext.Provider value={{ Order, paymentMethod, setPaymentMethod }}>
      {children}
    </Cartcontext.Provider>
  );
}

export function Usecartcontext() {
  return useContext(Cartcontext);
}
