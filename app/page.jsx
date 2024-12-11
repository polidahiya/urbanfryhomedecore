import React from "react";
import Herosection from "./_comps/Herosection";
import Marquebanner from "./_comps/Marquebanner";
import Newarrivals from "./_comps/Newarrivals";
import Imagegallery from "./_comps/Imagegallery";
import Featuredin from "./_comps/Featuredin";
import Blogs from "./_comps/Blogs";
import Collections from "./_comps/Collections";
import Customerreviews from "./_comps/Customerreviews";
import Aboutus from "./_comps/Aboutus";
import Faqs from "./_comps/Faqs";
import Navbar from "./_globalcomps/Navbar";
import { cookies } from "next/headers";

async function page() {
  const allcookes = await cookies();
  const token = allcookes.get("token");

  return (
    <div>
      <Navbar navtype={true} token={token}/>
      <Herosection />
      {/* marque section */}
      <section className="w-full bg-footercolor text-[#56473e] overflow-hidden relative flex items-center">
        <Marquebanner
          list={[
            "this is a para this is a para this is a para",
            "this is a para this is a para this is a para",
            "this is a para this is a para this is a para",
            "this is a para this is a para this is a para",
          ]}
        />
      </section>
      {/* quote */}
      <div className="flex flex-col items-center py-8 ">
        <p className="text-5xl font-tenor rotate-180 italic">&quot; </p>
        <p className="max-w-[900px] text-center text-base md:text-3xl font-tenor px-5">
          Loops by Latika are by far one of the most explorative Indian brands
          that are giving a makeover to our rather drab home carpets.
        </p>
      </div>
      <Newarrivals />
      <Imagegallery />
      <Featuredin />
      {/* marque section */}
      <section className="w-full text-[#56473e] overflow-hidden relative flex items-center">
        <Marquebanner
          list={[
            "this is a para this is a para this is a para",
            "this is a para this is a para this is a para",
            "this is a para this is a para this is a para",
            "this is a para this is a para this is a para",
          ]}
        />
      </section>
      <Blogs />
      <Collections />
      <Customerreviews />
      <Aboutus />
      <Faqs />
    </div>
  );
}

export default page;
