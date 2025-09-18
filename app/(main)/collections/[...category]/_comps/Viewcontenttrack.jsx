"use client";
import { useEffect } from "react";
import { fbq } from "@/app/_connections/Fbpixel";

export default function PixelCategoryView({ categoryName, pids }) {
  useEffect(() => {
    fbq("track", "ViewContent", {
      content_category: categoryName,
      content_type: "product_group",
      content_ids: pids,
      content_name: categoryName,
    });
  }, [categoryName]);

  return null;
}
