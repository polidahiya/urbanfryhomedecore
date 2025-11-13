import React from "react";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Link from "next/link";
import { Cachedproducts } from "../../_connections/Getcachedata";
import { unstable_cache } from "next/cache";
import { CACHE_TIME } from "../../commondata";
import Rightproducts from "./Rightproducts";
import DeviceDetector from "@/app/_globalcomps/_helperfunctions/Devicedetector";

const imageDimensions = {
  mobile: { width: 390, height: 390 },
  tablet: { width: 600, height: 600 },
  desktop: { width: 1000, height: 1000 },
};

const itemlist = [
  { productid: "68d5135437e5648bc97235f7", pos: "top-[35%] left-[40%]" },
  { productid: "67ac9fefb04e50a1ab0b7da8", pos: "top-[25%] left-[60%]" },
  { productid: "6890bae074146d81a3740ca8", pos: "top-1/2 left-[5%]" },
  { productid: "68d517c0945f4f04d00f7cf2", pos: "top-[55%] left-[30%]" },
  { productid: "68d521f073e8db9ae70293fd", pos: "top-[70%] left-[50%]" },
];

const getFilteredCachedProducts = unstable_cache(
  async () => {
    const allproducts = await Cachedproducts();
    const idsFromList = [...new Set(itemlist.map((item) => item.productid))];
    const filtered = allproducts.filter((p) => idsFromList.includes(p._id));

    // Order them according to itemlist
    const ordered = itemlist
      .map((item) => filtered.find((p) => p._id === item.productid))
      .filter(Boolean);

    return ordered;
  },
  ["Cache-products-imagetap"],
  {
    revalidate: CACHE_TIME,
    tags: ["products", "imagetap"],
  }
);

async function Imagetapcomp() {
  const device = await DeviceDetector();
  const selectedproducts = await getFilteredCachedProducts();

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 w-full md:w-1/2 relative">
        <Nextimage
          src="/uiimages/imagetapimage.jpg"
          alt="imagetapimage"
          height={imageDimensions[device].height}
          width={imageDimensions[device].width}
          className="w-full h-full"
        ></Nextimage>
        {itemlist.map((item, i) => (
          <div key={i} className={`absolute w-28 aspect-square ${item?.pos}`}>
            <Link
              href={`/product/${item?.productid}`}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-8 aspect-square rounded-full bg-white z-10`}
            >
              {/* {i + 1} */}+
            </Link>
            <span
              className="blinkingdot block absolute top-1/2 left-1/2 w-14 aspect-square rounded-full bg-white bg-opacity-25"
            ></span>
          </div>
        ))}
      </div>
      <div className="relative flex-1 w-full md:w-1/2 flex items-center justify-center bg-footercolor p-10 lg:p-0">
        <Nextimage
          className="absolute top-0 left-0 w-full h-full object-cover mix-blend-color-burn"
          src="/uiimages/shopthelookrightbackground.jpg"
          alt="background image"
          height={imageDimensions[device].height}
          width={imageDimensions[device].width}
        />
        <Rightproducts selectedproducts={selectedproducts} />
      </div>
    </div>
  );
}

export default Imagetapcomp;
