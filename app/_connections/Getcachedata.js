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

// blogs
export const Cachedblogs = unstable_cache(
  async () => {
    const { blogscollection } = await getcollection();
    const blogs = await blogscollection.find({}).sort({ _id: -1 }).toArray();
    return blogs.map((item) => ({ ...item, _id: item._id.toString() }));
  },
  ["blogs"],
  { revalidate: CACHE_TIME, tags: ["blogs"] }
);

export async function refreshblogsnow() {
  try {
    revalidateTag("blogs");
    return { status: 200, message: "Blogs Refreshed on site" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error!" };
  }
}
