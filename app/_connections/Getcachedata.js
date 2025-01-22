"use server";
import { getcollection } from "./Mongodb";
import { unstable_cache } from "next/cache";
import { revalidateTag } from "next/cache";
import { CACHE_TIME } from "../commondata";

export const Cachedproducts = unstable_cache(
  async () => {
    const { Productscollection } = await getcollection();
    const productsList = await Productscollection.find().toArray();
    return productsList.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
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
export const Cachedreviews = unstable_cache(
  async () => {
    const { reviewscollection } = await getcollection();
    const reviewslist = await reviewscollection
      .find({ verified: true })
      .toArray();
    return reviewslist.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
  },
  ["reviews"],
  { revalidate: CACHE_TIME, tags: ["reviews"] }
);

export async function refreshreviewsnow() {
  try {
    revalidateTag("reviews");
    return { status: 200, message: "Reviews Refreshed on site" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error!" };
  }
}
