import React from "react";
import Link from "next/link";
import Underlineffect from "@/app/_globalcomps/Underlineffect";
import Productcard from "@/app/_globalcomps/_productcard/Productcard";
import SortSelector from "./_comps/Sorting";
import { Cachedproducts } from "@/app/_connections/Getcachedata";
import Nextimage from "@/app/_globalcomps/Nextimage";
import {
  staticdata,
  collections,
  specialcategories,
  CACHE_TIME,
} from "@/app/commondata";
import DeviceDetector from "@/app/_globalcomps/_helperfunctions/Devicedetector";
import { unstable_cache } from "next/cache";
import Filtercomp from "./_comps/Filtercomp";
import { notFound } from "next/navigation";
import Verification from "@/app/_connections/Verifytoken";
import Seoeditbutton from "./_comps/Seoeditbutton";
import { getseodata } from "@/app/_serveractions/Seodata";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import PixelCategoryView from "./_comps/Viewcontenttrack";
import Sortablegrid from "./_comps/Sortablegrid/Sortablegrid";
import Productgrid from "./_comps/Productgrid";

const imageDimensions = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 800, height: 1280 },
  desktop: { width: 1920, height: 1080 },
};

const getseokey = (category, subcat) => {
  return `${category || "Home"}-${subcat || "All"}`;
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
  const seopermission = await Verification("Seo_permission");
  const Productspermission = await Verification("Products_permission");

  const device = await DeviceDetector();

  const [category, subcat] = (await params).category;
  const { sort = 0, min = 0, max = 100000 } = await searchParams;
  if (isNaN(min) || isNaN(max) || min < 0 || max > 1000000 || min >= max) {
    return notFound();
  }

  const metadatares = metadata(category, subcat);
  const { title, img } = metadatares;
  const sortkey = getseokey(category, subcat).replace(/-/g, "");

  const getCachedSortedProducts = (category, subcat, sort, min, max, sortkey) =>
    unstable_cache(
      async () => {
        const products = await Cachedproducts();
        const filteredproducts = filterProducts(
          products,
          category,
          subcat,
          min,
          max
        );
        const sortedproducts = getSortedProducts(
          filteredproducts,
          sort,
          sortkey
        );
        return sortedproducts;
      },
      [
        `sorted-products2-${category || "all"}-${subcat || "all"}-${
          sort || "default"
        }-pricerange-${min}-${max}`,
      ],
      {
        revalidate: CACHE_TIME,
        tags: ["products"],
      }
    )();

  const cachedfilteredproducts = await getCachedSortedProducts(
    category,
    subcat,
    sort,
    min,
    max,
    sortkey
  );

  const seokey = getseokey(category, subcat);
  const seodata = await getseodata(seokey);
  const converter = new QuillDeltaToHtmlConverter(seodata?.delta, {});
  const html = converter.convert();

  return (
    <div>
      <PixelCategoryView
        categoryName={seokey}
        pids={cachedfilteredproducts.map((p) => p?._id)}
      />
      {/* theme */}
      <div className="relative px-5 md:px-8 overflow-hidden h-fit lg:min-h-[calc(100dvh-80px)]">
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
            {seodata?.about}
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
        {/* seo edit button */}
        {seopermission?.verified && (
          <Seoeditbutton editdata={seodata} seokey={seokey} />
        )}
      </div>
      {/* body */}
      <div className="px-2 md:px-8  py-8">
        {/* sort */}
        <div className="flex items-center justify-between">
          <SortSelector
            sort={sort}
            numberofproduct={cachedfilteredproducts.length}
          />
          <Filtercomp
            category={category}
            subcat={subcat}
            metadatares={metadatares}
            min={min}
            max={max}
          />
        </div>
        {/* products  */}
        {cachedfilteredproducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 ">
            <Nextimage
              src="/uiimages/notfoundimage.jpg"
              alt="notfound image"
              width={480}
              height={410}
            ></Nextimage>
            <h3 className="text-2xl">No products found</h3>
          </div>
        ) : Productspermission?.verified ? (
          <Sortablegrid
            initialProducts={cachedfilteredproducts}
            sortkey={sortkey}
          />
        ) : (
          <Productgrid products={cachedfilteredproducts} />
        )}
        {/* description */}
        <div dangerouslySetInnerHTML={{ __html: html }} className="mt-10" />
      </div>
    </div>
  );
}
function filterProducts(products, category, subcat, min, max) {
  // Helper to check price range
  const inPriceRange = (p) => {
    const price = Number(p?.sellingprice) || 0;
    return price >= min && price <= max;
  };

  let filtered = [];

  if (category == "Last-Chance") {
    filtered = products.filter(
      (product) => product?.stocks == 1 && inPriceRange(product)
    );
  } else if (category === "all") {
    filtered = products.filter(inPriceRange);
  } else if (category === "new") {
    const lastmonth = Date.now() - 30 * 24 * 60 * 60 * 1000;
    filtered = products.filter(
      (item) => item.lastupdated > lastmonth && inPriceRange(item)
    );
  } else if (subcat) {
    filtered = products.filter(
      (product) => product?.subcat == subcat && inPriceRange(product)
    );
  } else {
    filtered = products.filter(
      (product) => product?.category == category && inPriceRange(product)
    );
  }

  return filtered;
}

function getSortedProducts(products, sort = 0, sortkey) {
  const sortFunctions = {
    0: (a, b) => a[sortkey] - b[sortkey],
    1: (a, b) => b.lastupdated - a.lastupdated,
    2: (a, b) => a.lastupdated - b.lastupdated,
    3: (a, b) => a.sellingprice - b.sellingprice,
    4: (a, b) => b.sellingprice - a.sellingprice,
    5: (a, b) => a.weight - b.weight,
    6: (a, b) => b.weight - a.weight,
  };

  return products.sort(sortFunctions[sort]);
}

export const generateMetadata = async ({ params }) => {
  const [category, subcat] = (await params).category;
  const metadatares = metadata(category, subcat);
  const { title, img } = metadatares;

  const seokey = getseokey(category, subcat);
  const seodata = await getseodata(seokey);

  const image = img || "/default-image.jpg";
  const url = `https://urbanfryhomes.com/collections/${category}${
    subcat ? "/" + subcat : ""
  }`;

  return {
    title: seodata?.title || `${title} Collection | Urbanfry Homes`,
    description: seodata?.metadesc,
    keywords: seodata?.keywords,

    openGraph: {
      title: seodata?.title || `${title} Collection | Urbanfry Homes`,
      description: seodata?.metadesc,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} category preview`,
        },
      ],
      url,
      siteName: "Urbanfry Homes",
    },

    twitter: {
      card: "summary_large_image",
      title: seodata?.title || `${title} Collection | Urbanfry Homes`,
      description: seodata?.metadesc,
      images: [image],
    },

    alternates: {
      canonical: url,
    },
  };
};

export default page;
