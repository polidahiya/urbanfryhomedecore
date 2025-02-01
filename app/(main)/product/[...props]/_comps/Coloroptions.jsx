import React from "react";
import Image from "next/image";
import Link from "next/link";

function Coloroptions({ variants, color, sku, name }) {
  return (
    <div className="mt-5">
      <p className="block text-sm">Color Options</p>
      <div className="flex gap-2 mt-2">
        {variants?.map((variant, index) => (
          <Link
            href={`/product/${sku}/${index}`}
            key={index}
            className={`border  outline-2 outline-theme overflow-hidden ${
              index == color ? "outline" : "lg:hover:outline"
            }`}
          >
            <Image
              src={variant.images[0]}
              alt={`${name}-${variant.finish}`}
              width={500}
              height={500}
              loading="lazy"
              className="w-24 aspect-square"
            ></Image>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Coloroptions;
