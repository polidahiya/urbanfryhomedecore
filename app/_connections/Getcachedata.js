"use server";
import { getcollection } from "./Mongodb";
import { unstable_cache } from "next/cache";
import { revalidateTag } from "next/cache";
import { CACHE_TIME } from "../commondata";

export const Cachedproducts = unstable_cache(
  async () => {
    const { Productscollection } = await getcollection();
    const productsList = await Productscollection.find().toArray();
    productsList.forEach((item) => {
      item._id = item._id.toString();
    });
    return productsList;
  },
  ["products"],
  { revalidate: CACHE_TIME, tags: ["products"] }
);

export async function refreshproductsnow() {
  try {
    revalidateTag("products");
    return { status: 200, message: "Products Refreshed on site" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error!" };
  }
}

// reviews
export async function Cachedreviews(productid) {
  const quersies = {
    "5stars": { verified: true, star: 5 },
  };
  return unstable_cache(
    async () => {
      const { reviewscollection } = await getcollection();
      const reviewslist = await reviewscollection
        .find(quersies[productid] || { verified: true, productid })
        .toArray();

      reviewslist.forEach((item) => {
        item._id = item._id.toString();
      });
      return reviewslist;
    },
    [`reviews-${productid}`],
    { revalidate: CACHE_TIME, tags: [`reviews-${productid}`] }
  )();
}
export async function refreshreviewsnow(productid) {
  try {
    revalidateTag(`reviews-${productid}`);
    return { status: 200, message: "Reviews refreshed for product." };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error!" };
  }
}
