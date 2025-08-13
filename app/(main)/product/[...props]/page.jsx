import React from "react";
import Details from "./_comps/Details";
import Imagescomp from "./_comps/Imagescomp";
import Newarrivals from "../../../_comps/Newarrivals";
import Link from "next/link";
import { Cachedproducts } from "@/app/_connections/Getcachedata";
import Commentcomp from "./_comps/_commentcomp/Commentcomp";
import { Cachedreviews } from "@/app/_connections/Getcachedata";
import { cookies } from "next/headers";
import Faqs from "@/app/_comps/Faqs";
import { notFound } from "next/navigation";
import { MdModeEditOutline } from "react-icons/md";
import Underlineffect from "@/app/_globalcomps/Underlineffect";
import { faqlist } from "@/app/page";

async function page({ params }) {
  const allcookies = await cookies();
  const token = allcookies.get("token")?.value;
  const parseduserdata = allcookies.get("userdata")?.value;
  const userdata = parseduserdata ? JSON.parse(parseduserdata) : null;

  const props = (await params).props;
  const productid = props[0];
  const color = props[1] || 0;
  const products = await Cachedproducts();

  const product = products.find((product) => product?._id === productid);
  if (!product) notFound();

  const similarproducts = products
    .filter(
      (item) => item?.category === product?.category && item?._id !== productid
    )
    .slice(0, 15);

  const filteredreviews = await Cachedreviews(productid);

  return (
    <div className="min-h-screen">
      <div className="md:mt-8 flex flex-col lg:flex-row gap-10 px-5 md:px-10">
        <div className="w-full lg:w-1/2">
          <Imagescomp
            images={product?.variants[color]?.images}
            name={product?.productName}
          />
          {/* routes */}
          <div className="text-sm mt-10">
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
          <Newarrivals heading="Customers also loved" data={similarproducts} />
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
            className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-theme text-white border border-white rounded-full pl-5 pr-7 py-3 z-20"
          >
            <MdModeEditOutline />
            Edit
          </Link>
        )}
    </div>
  );
}

// export const generateMetadata = async ({ params }) => {
//   const props = (await params).props;
//   const sku = props[0];
//   const color = props[1] || 0;

//   const products = await Cachedproducts();
//   const product = products.filter((product) => product?.sku === sku)[0];

//   const title = product?.seotitle || "AltOrganisers - Explore Amazing Products";
//   const description =
//     product?.seodescription ||
//     "Check out this amazing product at AltOrganisers!";
//   const keywords = product?.seokeywords || "";
//   const image = product?.variants[color]?.images[0] || "/default-image.jpg"; // Default image if no variant image is found
//   const url = `https://altorganisers.com/product/${sku}/${color}`;

//   return {
//     title,
//     description,
//     keywords,
//     openGraph: {
//       title,
//       description,
//       images: [{ url: image }],
//       url, // URL of the page
//       site_name: "AltOrganisers",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: [image],
//     },
//     additionalMetaTags: [
//       { property: "og:type", content: "product" }, // Facebook Open Graph type
//       { property: "og:title", content: title },
//       { property: "og:description", content: description },
//       { property: "og:image", content: image },
//       { property: "og:url", content: url },
//       { name: "twitter:title", content: title },
//       { name: "twitter:description", content: description },
//       { name: "twitter:image", content: image },
//     ],
//   };
// };

export default page;
