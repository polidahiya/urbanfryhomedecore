import React from "react";
import Link from "next/link";
import Underlineeffect from "@/app/_globalcomps/Underlineeffect";
import Searchbar from "./_comps/Searchbar";
import Searchedproductsfn from "@/app/_globalcomps/_helperfunctions/Searchedproductsfn";
import Productcard from "@/app/_globalcomps/Productcard";

async function page({ searchParams }) {
  const allsearchParams = await searchParams;
  const searchtext = allsearchParams?.q || "";
  const searched = await Searchedproductsfn(searchtext);

  return (
    <div className="pt-32 px-5 md:px-8">
      {/* navigations */}
      <div className="flex items-center gap-2 text-sm">
        <Link href={"/"} className="">
          <Underlineeffect title={"Home"} />
        </Link>{" "}
        /{" "}
        <p className="capitalize text-theme">
          Search: {searched?.length} results found for &quot;{searchtext}&quot;
        </p>
      </div>
      <div>
        <h1 className="font-tenor text-4xl md:text-6xl pt-10 -tracking-wide">
          Search results :{" "}
          <span className="capitalize font-tenor">{searchtext}</span>
        </h1>
      </div>
      <div className="mt-10">
        <Searchbar />
      </div>
      {/* products */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center gap-x-2 gap-y-16 my-10">
        {searched.map((item, i) => (
          <Productcard key={i} product={item} />
        ))}
      </div>
    </div>
  );
}

export default page;
