import React from "react";
import Link from "next/link";

function Aboutus() {
  return (
    <div>
      <h2 className="font-tenor text-4xl md:text-6xl text-center pt-10">About Us</h2>
      <p className="text-justify md:text-center max-w-[900px] mx-auto px-5 mt-5">
        Loops by LJ is a brand based in India, focusing on creating
        contemporary, handmade rugs and textile art for you and your space. The
        brand follows- handcrafted, local and responsible production. Loops has
        a crisp, creative, yet off-beat approach to home furnishings and decor.
        We offer custom service and a better price point than our competitors
        with out-of-the-box designs.
      </p>
      <div className="flex items-center justify-center mt-8">
        <Link href={"/"} className="mx-auto px-10 py-4 bg-theme bg-opacity-80 lg:hover:bg-opacity-100 duration-300 text-white">
          Learn More
        </Link>
      </div>
    </div>
  );
}

export default Aboutus;
