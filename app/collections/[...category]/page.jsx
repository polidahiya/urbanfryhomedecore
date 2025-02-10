import React from "react";
import Link from "next/link";
import Underlineeffect from "@/app/_globalcomps/Underlineeffect";
import Productcard from "@/app/_globalcomps/_productcard/Productcard";
import { staticdata } from "@/app/commondata";
import SortSelector from "./_comps/Sorting";
import { Cachedproducts } from "@/app/_connections/Getcachedata";
import Image from "next/image";
import { collections } from "@/app/commondata";

async function page({ params, searchParams }) {
  const [type, category] = (await params).category;
  const { sort = 0 } = await searchParams;

  const renderdata = {
    desc:
      type == "custom"
        ? collections[category].desc
        : staticdata[type][category]?.desc,
    image:
      type == "custom"
        ? collections[category].img
        : staticdata[type][category]?.img,
  };
  const products = await Cachedproducts();

  // filter
  const filteredproducts = filterProducts(products, type, category);
  const sortedproducts = getSortedProducts(filteredproducts, sort);

  return (
    <div>
      {/* theme */}
      <div className="relative px-5 md:px-8 overflow-hidden h-fit">
        <div className="py-36 text-white tracking-wider">
          {/* routes */}
          <div className="flex items-center gap-2 text-sm">
            <Link href={"/"} className="">
              <Underlineeffect title={"Home"} />
            </Link>{" "}
            /{" "}
            <p className="capitalize text-[#a7a5a2]">
              {category?.replace(/-/g, " ")}
            </p>
          </div>
          {/*  */}
          <h1 className="text-white mt-10 text-6xl font-tenor capitalize">
            {category?.replace(/-/g, " ")}
          </h1>
          <p className="mt-6 w-full max-w-[500px] text-sm text-justify">
            {renderdata?.desc}
          </p>
        </div>
        {/* background */}
        <Image
          height={1000}
          width={1000}
          src={renderdata.image}
          alt={category}
          quality={100}
          className="block absolute top-0 left-0 w-full min-h-screen brightness-[0.35] object-cover -z-10"
        />
      </div>
      {/* body */}
      <div className="px-2 md:px-8  py-8">
        {/* sort */}
        <div>
          <SortSelector sort={sort} numberofproduct={sortedproducts.length} />
        </div>
        {/* products  */}
        {sortedproducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 ">
            <Image
              src="/uiimages/notfoundimage.jpg"
              alt="notfound image"
              width={480}
              height={410}
            ></Image>
            <h3 className="text-2xl">No products found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center gap-x-2 gap-y-16 my-10">
            {sortedproducts.map((product, i) => (
              <Productcard key={i} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function filterProducts(products, type, category) {
  if (type === "custom") {
    return products.filter((product) =>
      product?.collections?.includes(category)
    );
  } else if (category === "all") {
    return products;
  } else if (category === "new") {
    const lastWeek = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return products.filter((item) => item.lastupdated > lastWeek);
  } else {
    return products.filter((product) => product[type] === category);
  }
}

function getSortedProducts(products, sort) {
  const sortFunctions = {
    1: (a, b) => b.lastupdated - a.lastupdated,
    2: (a, b) => a.lastupdated - b.lastupdated,
    3: (a, b) => a.sellingprice - b.sellingprice,
    4: (a, b) => b.sellingprice - a.sellingprice,
    5: (a, b) => a.weight - b.weight,
    6: (a, b) => b.weight - a.weight,
  };

  return sortFunctions[sort] ? products.sort(sortFunctions[sort]) : products;
}

export default page;
