import React from "react";
import Link from "next/link";
import Underlineeffect from "@/app/_globalcomps/Underlineeffect";
import Productcard from "@/app/_globalcomps/Productcard";
import { staticdata } from "@/app/commondata";
import SortSelector from "./_comps/Sorting";
import { Cachedproducts } from "@/app/_connections/Getcachedata";
import Image from "next/image";

async function page({ params }) {
  const [type, category] = (await params).category;
  let specialrender = true;
  const products = await Cachedproducts();

  let productstoshow;
  if (type == "all") {
    productstoshow = products;
  } else {
    specialrender = false;
    productstoshow = products.filter((product) => product[type] === category);
  }

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
              {specialrender
                ? type.replace(/-/g, " ")
                : category.replace(/-/g, " ")}
            </p>
          </div>
          {/*  */}
          <h1 className="text-white mt-10 text-6xl font-tenor">
            {specialrender
              ? type.replace(/-/g, " ")
              : category.replace(/-/g, " ")}
          </h1>
          <p className="mt-6 w-full max-w-[500px] text-sm text-justify">
            {specialrender
              ? staticdata[type]?.desc
              : staticdata[type][category]?.desc}
          </p>
        </div>
        {/* background */}
        <Image
          height={1000}
          width={1000}
          src={
            specialrender
              ? staticdata[type]?.img
              : staticdata[type][category]?.img
          }
          alt={specialrender ? type : category}
          quality={100}
          className="block absolute top-0 left-0 w-full min-h-screen brightness-[0.35] object-cover -z-10"
        />
      </div>
      {/* body */}
      <div className="px-2 md:px-8  py-8">
        {/* sort */}
        <div>
          <SortSelector numberofproduct={productstoshow.length} />
        </div>
        {/* products  */}
        {productstoshow.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 ">
            <Image
              src="/uiimages/notfoundimage.jpg"
              alt="notfound image"
              width={480}
              height={410}
            ></Image>
            <h1 className="text-2xl">No products found</h1>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center gap-x-2 gap-y-16 my-10">
            {productstoshow.map((product, i) => (
              <Productcard key={i} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
