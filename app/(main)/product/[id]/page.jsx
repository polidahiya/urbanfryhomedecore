import React from "react";
import Details from "./_comps/Details";
import Imagescomp from "./_comps/Imagescomp";
import Link from "next/link";
import { Cachedproducts } from "@/app/_connections/Getcachedata";
import { Cachedreviews } from "@/app/_connections/Getcachedata";
import { cookies } from "next/headers";
import Faqs from "@/app/_comps/Faqs";
import { notFound } from "next/navigation";
import { MdModeEditOutline } from "react-icons/md";
import Underlineffect from "@/app/_globalcomps/Underlineffect";
import { faqlist } from "@/app/page";
import { Productctxwrapper } from "./Productcontext";
import dynamic from "next/dynamic";
const Commentcomp = dynamic(() => import("./_comps/_commentcomp/Commentcomp"));
const Newarrivals = dynamic(() => import("../../../_comps/Newarrivals"));

async function page({ params, searchParams }) {
  const allcookies = await cookies();
  const token = allcookies.get("token")?.value;
  const parseduserdata = allcookies.get("userdata")?.value;
  const userdata = parseduserdata ? JSON.parse(parseduserdata) : null;

  const { id: productid } = await params;
  const allsearchparams = await searchParams;
  const color = allsearchparams.vcolor || 0;

  const products = await Cachedproducts();

  const product = products.find((product) => product?._id === productid);
  if (!product) notFound();

  //
  const cartproductname =
    `_id:${product?._id}|vcolor:${color}|` +
    (product?.moreoptions || [])
      .sort()
      .map(
        (moreoption) =>
          `${moreoption?.name}:${allsearchparams[moreoption?.name] || 0}`
      )
      .join("|");

  // prices
  let rawmrp = Number(product?.mrp);
  let rawprice = Number(product?.sellingprice);
  product?.moreoptions?.forEach((moreoption) => {
    const selectedoption =
      moreoption?.options[allsearchparams[moreoption?.name] || 0];
    rawmrp += Number(selectedoption?.mrp) || 0;
    rawprice += Number(selectedoption?.price) || 0;
  });

  //
  const similarproducts = products
    .filter(
      (item) => item?.category === product?.category && item?._id !== productid
    )
    .slice(0, 15);

  //
  const filteredreviews = await Cachedreviews(productid);

  return (
    <Productctxwrapper>
      <div className="min-h-screen">
        <div className="md:mt-8 flex flex-col lg:flex-row gap-10 md:px-10">
          <div className="w-full lg:w-1/2">
            <Imagescomp
              images={product?.variants[color]?.images}
              name={product?.productName}
            />
            {/* routes */}
            <div className="text-sm mt-10 px-5">
              <Underlineffect
                Comp={({ innercomp }) => <Link href="/">{innercomp}</Link>}
                title="Home"
                styles="w-fit"
              />{" "}
              <span className="select-none pointer-events-none">/ </span>
              <Underlineffect
                Comp={({ innercomp }) => (
                  <Link href={`/collections/${product?.category}`}>
                    {innercomp}
                  </Link>
                )}
                title={product?.category.replace(/-/g, " ")}
                styles="w-fit"
              />{" "}
              <span className="select-none pointer-events-none">/ </span>
              <Underlineffect
                Comp={({ innercomp }) => (
                  <Link
                    href={`/collections/${product?.category}/${product?.subcat}`}
                  >
                    {innercomp}
                  </Link>
                )}
                title={product?.subcat.replace(/-/g, " ")}
                styles="w-fit"
              />{" "}
              <span className="select-none pointer-events-none">/ </span>
              <span className="capitalize text-[#a7a5a2]">
                {product?.productName.replace(/-/g, " ")}
              </span>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <Details
              product={product}
              color={color}
              productid={productid}
              token={token}
              cartproductname={cartproductname}
              allsearchparams={allsearchparams}
              rawprice={rawprice}
              rawmrp={rawmrp}
            />
          </div>
        </div>
        {/* comments */}
        <div>
          <Commentcomp
            productid={productid}
            Comments={filteredreviews}
            token={token}
            userdata={userdata}
          />
        </div>
        {/* similar products */}
        <div>
          {similarproducts.length != 0 && (
            <Newarrivals
              heading="Customers also loved"
              data={similarproducts}
            />
          )}
        </div>
        {/* faq */}
        <div>
          <Faqs faqlist={faqlist} />
        </div>
        {/* edit button */}
        {token &&
          (userdata?.usertype == "admin" ||
            userdata?.permission.includes("Products_permission")) && (
            <Link
              href={`/admin/products/add?edit=${product?._id}`}
              className="fixed top-24 right-5  bg-theme text-white border border-white rounded-full w-10 aspect-square flex items-center justify-center z-20"
            >
              <MdModeEditOutline />
            </Link>
          )}
      </div>
    </Productctxwrapper>
  );
}

export const generateMetadata = async ({ params, searchParams }) => {
  const { id: productid } = await params;
  const allsearchparams = await searchParams;
  const color = allsearchparams.vcolor || 0;

  const products = await Cachedproducts();
  const product = products.find((product) => product?._id === productid);
  const title = product?.seotitle || "Urbanfryhomes - Explore Amazing Products";
  const description =
    product?.seodescription ||
    "Check out this amazing product at Urbanfryhomes!";
  const keywords = product?.seokeywords || "";
  const image = product?.variants[color]?.images[0] || "/default-image.jpg"; // Default image if no variant image is found
  const url = `https://urbanfryhomes.com/product/${productid}/${color}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      url, // URL of the page
      site_name: "Urbanfryhomes",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    additionalMetaTags: [
      { property: "og:type", content: "product" }, // Facebook Open Graph type
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    alternates: {
      canonical: url,
    },
  };
};

export default page;
