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

function page() {
  return (
    <div>
      <Herosection />
      <section className="w-full bg-[#e7e2de] text-[#56473e] overflow-hidden relative flex items-center">
        <Marquebanner
          list={[
            "this is a para this is a para this is a para",
            "this is a para this is a para this is a para",
            "this is a para this is a para this is a para",
            "this is a para this is a para this is a para",
          ]}
        />
      </section>
      <div className="flex flex-col items-center py-8 ">
        <p className="text-5xl font-tenor rotate-180 italic">&quot;</p>
        <p className="max-w-[900px] text-center text-3xl font-tenor">
          Loops by Latika are by far one of the most explorative Indian brands
          that are giving a makeover to our rather drab home carpets.
        </p>
      </div>
      <Newarrivals />
      <Imagegallery />
      <Featuredin />
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
