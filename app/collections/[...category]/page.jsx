import React from "react";
import Link from "next/link";
import Underlineeffect from "@/app/_globalcomps/Underlineeffect";
import Productcard from "@/app/_globalcomps/Productcard";
import { staticdata } from "@/app/commondata";
import SortSelector from "./_comps/Sorting";
import { Cachedproducts } from "@/app/_connections/Getcachedata";

async function page({ params }) {
  const [type, category] = (await params).category;
  
  const products = await Cachedproducts();
  const filteredproducts = products.filter(
    (product) => product[type] === category
  );

  return (
    <div>
      {/* theme */}
      <div className="relative px-5 md:px-8 overflow-hidden">
        <div className="py-36 text-white tracking-wider">
          {/* routes */}
          <div className="flex items-center gap-2 text-sm">
            <Link href={"/"} className="">
              <Underlineeffect title={"Home"} />
            </Link>{" "}
            /{" "}
            <p className="capitalize text-[#a7a5a2]">
              {category.replace(/-/g, " ")}
            </p>
          </div>
          {/*  */}
          <h1 className="text-white mt-10 text-6xl font-tenor">
            {category.replace(/-/g, " ")}
          </h1>
          <p className="mt-6 w-full max-w-[500px] text-sm">
            {staticdata[type][category]?.desc}
          </p>
        </div>
        {/* background */}
        <img
          src={staticdata[type][category]?.img}
          alt=""
          className="absolute top-0 left-0 w-full min-h-full brightness-[0.35] object-cover max-h-screen -z-10"
        />
      </div>
      {/* body */}
      <div className="px-2 md:px-8  py-8">
        {/* sort */}
        <div>
          <SortSelector numberofproduct={filteredproducts.length}/>
        </div>
        {/* products  */}
        {filteredproducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 ">
            <img
              src="https://api.cuik-lulugroup2-p2-public.model-t.cc.commerce.ondemand.com/_ui/responsive/common/images/theme-lulu-en/images/no-products-found.jpg"
              alt=""
              className="w-full md:w-1/2"
            />
            <h1 className="text-2xl">No products found</h1>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center gap-x-2 gap-y-16 my-10">
            {filteredproducts.map((product, i) => (
              <Productcard key={i} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
