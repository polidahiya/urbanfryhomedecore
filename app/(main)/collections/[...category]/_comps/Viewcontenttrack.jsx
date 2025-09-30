"use client";
import { useEffect } from "react";
import { fbq } from "@/app/_connections/Fbpixel";
import { event } from "nextjs-google-analytics";

export default function PixelCategoryView({ categoryName, pids }) {
  useEffect(() => {
    // ✅ FB Pixel: ViewContent
    fbq("track", "ViewContent", {
      content_category: categoryName,
      content_type: "product_group",
      content_ids: pids,
      content_name: categoryName,
    });

    // ✅ GA4: view_item_list
    event("view_item_list", {
      item_list_name: categoryName,
      items: pids?.map((id) => ({
        item_id: id,
        item_name: categoryName, // if you have actual product names, replace this
      })),
    });
  }, [categoryName, pids]);

  return null;
}
