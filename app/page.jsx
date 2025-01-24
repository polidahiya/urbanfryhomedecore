import React from "react";
import Herosection from "./_comps/Herosection";
import Marquebanner from "./_comps/Marquebanner";
import Newarrivals from "./_comps/Newarrivals";
// import Imagegallery from "./_comps/Imagegallery";
// import Featuredin from "./_comps/Featuredin";
// import Blogs from "./_comps/Blogs";
import Collections from "./_comps/Collections";
import Customerreviews from "./_comps/Customerreviews";
import Aboutus from "./_comps/Aboutus";
import Faqs from "./_comps/Faqs";
import Navbar from "./_globalcomps/Navbar";
import { cookies } from "next/headers";
import Footer from "./_globalcomps/Footer";
import Searchbarsection from "./_globalcomps/_navbarcomps/Searchbarsection";
import { Cachedproducts } from "./_connections/Getcachedata";
import Sidecart from "./_globalcomps/Sidecart";
import Imagetapcomp from "./_comps/Imagetapcomp";
import Madeinindia from "./_comps/Madeinindia";

async function page() {
  const allcookies = await cookies();
  const token = allcookies.get("token");
  const parseduserdata = allcookies.get("userdata")?.value;
  const userdata = parseduserdata ? JSON.parse(parseduserdata) : null;

  // new arrivals data
  const data = await Cachedproducts();
  const lastweek = new Date().getTime() - 1000 * 60 * 60 * 24 * 7;
  const newarrivals = data.filter((item) => item.lastupdated > lastweek);

  return (
    <div className="overflow-x-hidden">
      <Navbar navtype={true} token={token} userdata={userdata} />
      <Herosection />
      {/* marque section */}
      <section className="w-full bg-footercolor text-[#56473e] overflow-hidden relative flex items-center">
        <Marquebanner
          list={[
            "2025 Is Looking A Lot More Organized",
            'Use code "ALT10" for 10% off on your first order',
            "2025 Is Looking A Lot More Organized",
            'Use code "ALT10" for 10% off on your first order',
            "2025 Is Looking A Lot More Organized",
            'Use code "ALT10" for 10% off on your first order',
          ]}
        />
      </section>
      {/* quote */}
      {/* <div className="flex flex-col items-center py-8 ">
        <p className="text-5xl font-tenor rotate-180 italic">&quot; </p>
        <p className="max-w-[900px] text-center text-base md:text-3xl font-tenor px-5">
          Loops by Latika are by far one of the most explorative Indian brands
          that are giving a makeover to our rather drab home carpets.
        </p>
      </div> */}
      <Newarrivals heading="New Arrivals" data={newarrivals} />
      {/* marque section */}
      <Imagetapcomp />
      <section className="w-full text-[#56473e] overflow-hidden relative flex items-center">
        <Marquebanner
          list={[
            "2025 Is Looking A Lot More Organized",
            'Use code "ALT10" for 10% off on your first order',
            "2025 Is Looking A Lot More Organized",
            'Use code "ALT10" for 10% off on your first order',
            "2025 Is Looking A Lot More Organized",
            'Use code "ALT10" for 10% off on your first order',
          ]}
        />
      </section>
      <Collections />
      <Customerreviews />
      <Aboutus />
      <Madeinindia />
      <Faqs />
      <Footer />
      {/*  */}
      <Searchbarsection />
      <Sidecart />
    </div>
  );
}

export default page;
