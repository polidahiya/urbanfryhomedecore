"use server";
import { getcollection } from "@/app/_connections/Mongodb";
import { unstable_cache } from "next/cache"; // ✅ built-in cache util

// ✅ Create a cached version of the query
const getRecentOrdersCached = unstable_cache(
  async () => {
    const { orderscollection } = await getcollection();

    // Fetch 10 most recent orders
    const orders = await orderscollection
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    // Convert Mongo ObjectIds to strings
    orders.forEach((order) => {
      order._id = order._id.toString();
    });

    return orders;
  },
  ["recent-orders"], // cache key
  {
    revalidate: 60 * 60 * 24, // 1 day
    tags: ["recent-orders"],
  }
);

export const GetRecentOrders = async () => {
  try {
    const data = await getRecentOrdersCached();
    return { status: 200, message: "", data };
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    return { status: 500, message: "Server Error!" };
  }
};
