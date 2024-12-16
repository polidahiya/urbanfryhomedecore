import React from "react";
import Navbar from "../../_globalcomps/Navbar";
import { cookies } from "next/headers";
import Details from "./_comps/Details";
import Imagescomp from "./_comps/Imagescomp";
import Newarrivals from "../../_comps/Newarrivals";
import Featuredin from "../../_comps/Featuredin";
import Underlineeffect from "../../_globalcomps/Underlineeffect";
import Link from "next/link";

async function page() {
  const allcookes = await cookies();
  const token = allcookes.get("token");
  return (
    <div className="min-h-screen">
      <Navbar navtype={false} token={token} />
      <div className="mt-20 md:mt-32 flex flex-col lg:flex-row gap-10 px-5 md:px-10">
        <div className="flex-[3]">
          <Imagescomp />
          {/* routes */}
          <div className="flex items-center gap-2 text-sm mt-10">
            <Link href={"/"} className="">
              <Underlineeffect title={"Home"} />
            </Link>{" "}
            /{" "}
            <Link href={"/"} className="">
              <Underlineeffect title={"Category"} />
            </Link>{" "}
            /{" "}
            <p className="capitalize text-[#a7a5a2]">{"yin and yang".replace(/-/g, " ")}</p>
          </div>
        </div>
        <Details />
      </div>
      <div className="">
        <Newarrivals heading="Similar Products" />
      </div>
      <Featuredin />
    </div>
  );
}

export default page;
