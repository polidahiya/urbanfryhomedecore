"use client";
import { useEffect } from "react";
import { fbq } from "@/app/_connections/Fbpixel";
import { event } from "nextjs-google-analytics";

export default function Pixelcheckoutmatrix({
  pids,
  numberofproducts,
  totalPrice,
}) {
  useEffect(() => {
    // Facebook Pixel
    if (typeof fbq === "function") {
      fbq("track", "InitiateCheckout", {
        content_ids: pids,
        num_items: numberofproducts,
        value: totalPrice,
        currency: "INR",
      });
    }

    // GA4 begin_checkout
    event("begin_checkout", {
      currency: "INR",
      value: totalPrice,
      items: pids?.map((id) => ({
        item_id: id,
        quantity: 1, // update if you have actual quantities
      })),
    });
  }, [pids, numberofproducts, totalPrice]);

  return null;
}
