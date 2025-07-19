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

async function page({ params }) {
  const allcookies = await cookies();
  const token = allcookies.get("token");
  const parseduserdata = allcookies.get("userdata")?.value;
  const userdata = parseduserdata ? JSON.parse(parseduserdata) : null;

  const props = (await params).props;
  const sku = props[0];
  const color = props[1] || 0;
  const products = await Cachedproducts();

  const filteredproducts = products.filter((product) => product?.sku === sku);
  if (filteredproducts.length == 0) notFound();
  const product = filteredproducts[0];

  const similarproducts = products.filter(
    (similarproduct) =>
      similarproduct?.categories === product?.categories &&
      similarproduct?.sku !== product?.sku
  );

  const allreviews = await Cachedreviews();
  const filteredreviews = allreviews.filter((item) => item.sku == sku);

  return (
    <div className="min-h-screen">
      <div className="mt-20 md:mt-28 flex flex-col lg:flex-row gap-10 px-5 md:px-10">
        <div className="flex-[3]">
          <Imagescomp
            images={product?.variants[color].images}
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
        <Details product={product} color={color} />
      </div>
      {/* comments */}
      <div>
        <Commentcomp
          sku={product?.sku}
          Comments={filteredreviews}
          token={token}
          userdata={userdata}
        />
      </div>
      {/* similar products */}
      <div>
        {similarproducts.length != 0 && (
          <Newarrivals heading="Similar Products" data={similarproducts} />
        )}
      </div>
      {/* faq */}
      <div>
        <Faqs
          faqlist={[
            {
              question: " What measurement units are used on the website?",
              answer: [
                "All dimensions and measurements on the website are provided in inches for accuracy and ease of use. Or else otherwise is mentioned in all our product descriptions. ",
              ],
            },
            {
              question: "Where are your products made?",
              answer: [
                "Our products are proudly designed and handcrafted in India, using high-quality materials sourced locally and responsibly. We work closely with skilled artisans to create durable, functional, and stylish space organizers.",
              ],
            },
            {
              question:
                "How do I clean and maintain my Alt Organisers products?",
              answer: [
                "• For wooden organizers: Wipe with a soft, dry cloth. Avoid using water or harsh cleaning agents.",
                "• For bamboo products: Clean with a damp cloth and dry immediately. Avoid prolonged exposure to moisture.",
                "• For fabric organizers: Spot clean with mild detergent and air dry.",
              ],
            },
            {
              question: "Are the products customizable?",
              answer: [
                "Yes, we offer customization for select products. If you need specific sizes, designs, or finishes, please reach out to us, and we’ll help create the perfect solution for your needs.",
              ],
            },
            {
              question: "Do the products require assembly?",
              answer: [
                "Most of our products are pre-assembled and ready to use. However, some larger items may require minimal assembly, which will be mentioned in the product description and accompanied by easy-to-follow instructions.",
              ],
            },
            {
              question: "Are your products eco-friendly?",
              answer: [
                "Yes, we prioritize sustainability. Many of our products are made using natural materials like bamboo, solid wood, and eco-friendly finishes. We strive to minimize waste in our production process and design durable products that stand the test of time.",
              ],
            },
          ]}
        />
      </div>
      {/* edit button */}
      {token &&
        (userdata?.usertype == "admin" ||
          userdata?.permission.includes("Products_permission")) && (
          <Link
            href={`/admin/products?sku=${product?.sku}`}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-theme text-white border border-white rounded-full pl-5 pr-7 py-3 z-20"
          >
            <MdModeEditOutline />
            Edit
          </Link>
        )}
    </div>
  );
}

export const generateMetadata = async ({ params }) => {
  const props = (await params).props;
  const sku = props[0];
  const color = props[1] || 0;

  const products = await Cachedproducts();
  const product = products.filter((product) => product?.sku === sku)[0];

  const title = product?.seotitle || "AltOrganisers - Explore Amazing Products";
  const description =
    product?.seodescription ||
    "Check out this amazing product at AltOrganisers!";
  const keywords = product?.seokeywords || "";
  const image = product?.variants[color]?.images[0] || "/default-image.jpg"; // Default image if no variant image is found
  const url = `https://altorganisers.com/product/${sku}/${color}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      url, // URL of the page
      site_name: "AltOrganisers",
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
  };
};

export default page;
