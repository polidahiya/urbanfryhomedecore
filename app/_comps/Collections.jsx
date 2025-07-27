import React from "react";
import Link from "next/link";
import { staticdata } from "../commondata";
import Nextimage from "@/app/_globalcomps/Nextimage";

function Collections() {
  return (
    <div className="p-5 md:p-8">
      <h2 className="text-4xl md:text-6xl font-tenor">Collections</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mt-5 md:mt-10">
        {Object.entries(staticdata).map(([key, value], i) => (
          <Link
            key={i}
            href={`/collections/${key}`}
            className="group relative aspect-[4/3] md:aspect-[2/1] overflow-hidden"
          >
            <Nextimage
              src={value.img}
              alt={key}
              width={240}
              height={120}
              quality={30}
              className="h-full w-full object-cover lg:group-hover:scale-110 duration-500"
            />
            <p className="absolute bottom-0 left-0 w-full text-xl md:text-2xl font-tenor text-white p-2 md:p-4 bg-gradient-to-b from-transparent to-black/75">
              {key.replace(/-/g, " ")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Collections;
