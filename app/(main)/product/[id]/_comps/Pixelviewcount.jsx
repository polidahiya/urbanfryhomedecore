"use client";
import { useEffect } from "react";
import { fbq } from "@/app/_connections/Fbpixel";
import { event } from "nextjs-google-analytics";

export default function Pixelviewcount({ id, name, price }) {
  useEffect(() => {
    // Facebook Pixel
    fbq("track", "ViewContent", {
      content_ids: [id],
      content_name: name,
      content_type: "product",
      value: price,
      currency: "INR",
    });

    // GA4
    event("view_item", {
      currency: "INR",
      value: price,
      items: [
        {
          item_id: id,
          item_name: name,
          price: price,
        },
      ],
    });
  }, [id, name, price]);

  return null;
}
