import React from "react";
import Navbar from "../../../_globalcomps/Navbar";
import { cookies } from "next/headers";
import Details from "./_comps/Details";
import Imagescomp from "./_comps/Imagescomp";
import Newarrivals from "../../../_comps/Newarrivals";
import Featuredin from "../../../_comps/Featuredin";
import Underlineeffect from "../../../_globalcomps/Underlineeffect";
import Link from "next/link";
import { Cachedproducts } from "@/app/_connections/Getcachedata";

async function page({ params,searchParams }) {
  
  // const color = 1;
  const sku = (await params).sku;
  const color = (await searchParams).color;
  const allcookes = await cookies();
  const token = allcookes.get("token");
  const products = await Cachedproducts();

  const product = products.filter((product) => product.sku === sku)[0];
  const similarproducts = products.filter(
    (similarproduct) =>
      similarproduct.categories === product.categories &&
      similarproduct.sku !== product.sku
  );

  return (
    <div className="min-h-screen">
      <Navbar navtype={false} token={token} />
      <div className="mt-20 md:mt-32 flex flex-col lg:flex-row gap-10 px-5 md:px-10">
        <div className="flex-[3]">
          <Imagescomp
            images={product.variants[color].images}
            name={product.productName}
          />
          {/* routes */}
          <div className="flex items-center gap-2 text-sm mt-10">
            <Link href={"/"} className="">
              <Underlineeffect title={"Home"} />
            </Link>{" "}
            /{" "}
            <Link href={"/"} className="">
              <Underlineeffect title={product.categories} />
            </Link>{" "}
            /{" "}
            <p className="capitalize text-[#a7a5a2]">
              {product.productName.replace(/-/g, " ")}
            </p>
          </div>
        </div>
        <Details product={product} color={color} />
      </div>
      <div className="">
        <Newarrivals heading="Similar Products" data={similarproducts} />
      </div>
      <Featuredin />
    </div>
  );
}

export default page;
