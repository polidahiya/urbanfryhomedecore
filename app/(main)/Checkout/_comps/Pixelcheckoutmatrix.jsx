"use client";
import { useEffect } from "react";
import { fbq } from "@/app/_connections/Fbpixel";

export default function Pixelcheckoutmatrix({
  pids,
  numberofproducts,
  totalPrice,
}) {
  useEffect(() => {
    fbq("track", "InitiateCheckout", {
      content_ids: pids,
      num_items: numberofproducts,
      value: totalPrice,
      currency: "INR",
    });
  }, []);

  return null;
}
