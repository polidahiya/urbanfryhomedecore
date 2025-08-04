import React from "react";
import Link from "next/link";
import Underlineffect from "@/app/_globalcomps/Underlineffect";
import Productcard from "@/app/_globalcomps/_productcard/Productcard";
import SortSelector from "./_comps/Sorting";
import { Cachedproducts } from "@/app/_connections/Getcachedata";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { staticdata, collections, specialcategories } from "@/app/commondata";
import DeviceDetector from "@/app/_globalcomps/_helperfunctions/Devicedetector";

const imageDimensions = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 800, height: 1280 },
  desktop: { width: 1920, height: 1080 },
};

const metadata = (category, subcat) => {
  if (Object.keys(collections).includes(category)) {
    return { title: category?.replace(/-/g, " "), ...collections[category] };
  } else if (Object.keys(specialcategories).includes(category)) {
    return {
      title: category?.replace(/-/g, " "),
      ...specialcategories[category],
    };
  } else if (subcat) {
    return {
      title: subcat?.replace(/-/g, " "),
      ...staticdata[category]?.subcat?.[subcat],
    };
  } else {
    return { title: category?.replace(/-/g, " "), ...staticdata[category] };
  }
};

async function page({ params, searchParams }) {
  const device = await DeviceDetector();

  const [category, subcat] = (await params).category;
  const { sort = 0 } = await searchParams;

  const { title, desc, img } = metadata(category, subcat);

  const products = await Cachedproducts();

  // filter
  const filteredproducts = filterProducts(products, category, subcat);
  const sortedproducts = getSortedProducts(filteredproducts, sort);

  return (
    <div>
      {/* theme */}
      <div className="relative px-5 md:px-8 overflow-hidden h-fit lg:min-h-dvh">
        <div className="py-36 text-white tracking-wider">
          {/* routes */}
          <div className="flex items-center gap-2 text-sm">
            <Underlineffect
              Comp={({ innercomp }) => <Link href="/">{innercomp}</Link>}
              title="Home"
              styles="w-fit"
              linecolor="bg-white"
            />{" "}
            /{" "}
            {subcat && (
              <>
                <Underlineffect
                  Comp={({ innercomp }) => (
                    <Link href={`/collections/${category}`}>{innercomp}</Link>
                  )}
                  title={category.replace(/-/g, " ")}
                  styles="w-fit"
                  linecolor="bg-white"
                />{" "}
                /{" "}
              </>
            )}
            <p className="capitalize text-[#a7a5a2]">{title}</p>
          </div>
          {/*  */}
          <h1 className="text-white mt-10 text-5xl md:text-7xl font-tenor capitalize">
            {title}
          </h1>
          <p className="mt-6 w-full max-w-[500px] text-sm text-justify md:text-start">
            {desc}
          </p>
        </div>
        {/* background */}
        <Nextimage
          height={imageDimensions[device].height}
          width={imageDimensions[device].width}
          src={img}
          alt={title}
          quality={100}
          className="block absolute top-0 left-0 w-full h-full brightness-[0.35] object-cover -z-10"
        />
      </div>
      {/* body */}
      <div className="px-2 md:px-8  py-8">
        {/* sort */}
        <div>
          <SortSelector sort={sort} numberofproduct={sortedproducts.length} />
        </div>
        {/* products  */}
        {sortedproducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 ">
            <Nextimage
              src="/uiimages/notfoundimage.jpg"
              alt="notfound image"
              width={480}
              height={410}
            ></Nextimage>
            <h3 className="text-2xl">No products found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center gap-x-2 gap-y-16 my-10">
            {sortedproducts.map((product, i) => (
              <Productcard key={i} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function filterProducts(products, category, subcat) {
  if (Object.keys(collections).includes(category)) {
    return products.filter((product) =>
      product?.collections?.includes(category)
    );
  } else if (category === "all") {
    return products;
  } else if (category === "new") {
    const lastmonth = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return products.filter((item) => item.lastupdated > lastmonth);
  } else if (subcat) {
    return products.filter((product) => product?.subcat == subcat);
  } else {
    return products.filter((product) => product?.category == category);
  }
}

function getSortedProducts(products, sort) {
  const sortFunctions = {
    1: (a, b) => b.lastupdated - a.lastupdated,
    2: (a, b) => a.lastupdated - b.lastupdated,
    3: (a, b) => a.sellingprice - b.sellingprice,
    4: (a, b) => b.sellingprice - a.sellingprice,
    5: (a, b) => a.weight - b.weight,
    6: (a, b) => b.weight - a.weight,
  };

  return sortFunctions[sort] ? products.sort(sortFunctions[sort]) : products;
}

export default page;
