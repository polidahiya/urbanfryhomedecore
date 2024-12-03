import React from "react";
import Link from "next/link";
import Underlineeffect from "@/app/_globalcomps/Underlineeffect";
import Productcard from "@/app/_globalcomps/Productcard";

async function page({ params }) {
  const allparams = await params;
  return (
    <div>
      <div className="relative h-screen px-8">
        <img
          src="https://loopsbylj.com/cdn/shop/collections/Timber_waves_Rug_Img_4.jpg?v=1708355436&width=1920"
          alt=""
          className="absolute top-0 left-0 w-full h-full brightness-[0.4] object-cover max-h-screen -z-10"
        />
        <div className="pt-36 text-white tracking-wider">
          {/* routes */}
          <div className="flex items-center gap-2 text-sm">
            <Link href={"/"} className="underlineff">
              <Underlineeffect title={"Home"} />
            </Link>{" "}
            /{" "}
            <p className="capitalize text-[#a7a5a2]">
              {allparams.category.replace(/_/g, " ")}
            </p>
          </div>
          {/*  */}
          <h1 className="text-white mt-10 text-6xl font-tenor">
            {allparams.category.replace(/_/g, " ")}
          </h1>
          <p className="mt-6 w-full max-w-[500px] text-sm">
            Our collection of hand-tufted rugs embodies the perfect blend of
            traditional techniques and contemporary designs, offering you
            luxurious textures and unique patterns for your space. Explore our
            selection and discover how these hand-tufted masterpieces can
            transform your home with their rich, tactile beauty and bespoke
            charm.
          </p>
        </div>
      </div>
      {/*  */}
      <div className="px-8">
        <div></div>
        {/* products  */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-2 gap-y-16 my-10">
          {new Array(20).fill(null).map((item, i) => (
            <Productcard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
