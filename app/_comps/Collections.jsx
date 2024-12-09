import React from "react";
import Link from "next/link";
import { staticdata } from "../commondata";

function Collections() {
  const list = [
    {
      title: "Moss Mania",
      img: "https://loopsbylj.com/cdn/shop/files/Screen_Shot_2024-10-07_at_11.09.29_PM.png?v=1728322797&width=2000",
      link: "/",
    },
    {
      title: "Moss Mania",
      img: "https://loopsbylj.com/cdn/shop/files/Screen_Shot_2024-10-07_at_11.09.29_PM.png?v=1728322797&width=2000",
      link: "/",
    },
    {
      title: "Moss Mania",
      img: "https://loopsbylj.com/cdn/shop/files/Screen_Shot_2024-10-07_at_11.09.29_PM.png?v=1728322797&width=2000",
      link: "/",
    },
    {
      title: "Moss Mania",
      img: "https://loopsbylj.com/cdn/shop/files/Screen_Shot_2024-10-07_at_11.09.29_PM.png?v=1728322797&width=2000",
      link: "/",
    },
    {
      title: "Moss Mania sdfdsfd dsfsdf",
      img: "https://loopsbylj.com/cdn/shop/files/Screen_Shot_2024-10-07_at_11.09.29_PM.png?v=1728322797&width=2000",
      link: "/",
    },
    {
      title: "Moss Mania",
      img: "https://loopsbylj.com/cdn/shop/files/Screen_Shot_2024-10-07_at_11.09.29_PM.png?v=1728322797&width=2000",
      link: "/",
    },
  ];
  return (
    <div className="p-5 md:p-8">
      <h2 className="text-4xl md:text-6xl font-tenor">Collections</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-1 mt-10">
        {Object.entries(staticdata.categories).map(([key, value], i) => (
          <Link
            key={i}
            href={`/collections/categories/${key}`}
            className="group relative aspect-[2/1] overflow-hidden"
          >
            <img
              src={value.img}
              alt=""
              className="h-full w-full object-cover lg:group-hover:scale-110 duration-500"
            />
            <p className="absolute bottom-0 left-0 w-full text-3xl font-tenor text-white p-2">
              {key.replace(/_/g, " ")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Collections;
