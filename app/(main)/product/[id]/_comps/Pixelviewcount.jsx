"use client";
import { useEffect } from "react";
import { fbq } from "@/app/_connections/Fbpixel";

export default function Pixelviewcount({ id, name, price }) {
  useEffect(() => {
    fbq("track", "ViewContent", {
      content_ids: [id],
      content_name: name,
      content_type: "product",
      value: price,
      currency: "INR",
    });
  }, [id, name, price]);

  return <></>;
}
