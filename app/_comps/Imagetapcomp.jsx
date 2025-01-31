import React from "react";
import Image from "next/image";
import Productcard from "../_globalcomps/Productcard";
import Link from "next/link";
import { Cachedproducts } from "../_connections/Getcachedata";

async function Imagetapcomp() {
  const allprodcuts = await Cachedproducts();
  const selectedproduct = allprodcuts.filter((item) => item.sku == "ALT-COFF-02-BRN");
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-1 relative">
        <Image
          src="/uiimages/imagetapimage.jpg"
          alt="imagetapimage"
          height="800"
          width="800"
          className="w-full h-full"
        ></Image>
        {/* link 1 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-28 aspect-square">
          <Link
            href={"/"}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-14 aspect-square rounded-full bg-white z-10"
          >
            1
          </Link>
          <span
            className="block absolute top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2 w-14 aspect-square rounded-full bg-white bg-opacity-25 scale-[1.7]"
          ></span>
        </div>
        {/* link 2 */}
        <div className="absolute top-2/3 right-1/2 w-28 aspect-square">
          <Link
            href={"/"}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-14 aspect-square rounded-full bg-white z-10"
          >
            2
          </Link>
          <span className="blinkingdot block absolute top-1/2 left-1/2 w-14 aspect-square rounded-full bg-white bg-opacity-25"></span>
        </div>
        {/* link 3 */}
        <div className="absolute top-2/3 right-[15%]  w-28 aspect-square">
          <Link
            href={"/"}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-14 aspect-square rounded-full bg-white z-10"
          >
            3
          </Link>
          <span
            className="block absolute top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2 w-14 aspect-square rounded-full bg-white bg-opacity-25 scale-[1.7]"
          ></span>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-footercolor py-10 lg:py-0">
        <div className="max-w-80 overflow-hidden">
          <Productcard product={selectedproduct[0]} />
          <p className="max-w-fit line-clamp-4 text-sm px-4 text-justify mt-2 opacity-85">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            tenetur laudantium soluta. Eligendi aspernatur labore fuga
            perspiciatis delectus. Id quibusdam facilis quasi? Suscipit, eaque.
            Optio sint sapiente doloribus perspiciatis repudiandae deserunt
            voluptates facere, quisquam quod explicabo? Voluptate, deleniti
            harum neque dolores facere quam omnis accusantium aliquam, dolorum,
            provident voluptas adipisci.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Imagetapcomp;
