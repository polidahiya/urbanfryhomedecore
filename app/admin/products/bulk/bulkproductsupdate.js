"use server";
import { getcollection } from "@/app/_connections/Mongodb";
import Verification from "@/app/_connections/Verifytoken";
import { revalidateTag } from "next/cache";
export async function bulkproductsupdate(products) {
  try {
    const res = await Verification("Products_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }
    const { Productscollection, ObjectId } = await getcollection();

    const operations = products.map((product) => ({
      updateOne: {
        filter: { _id: new ObjectId(product._id) },
        update: {
          $set: {
            productName: product.productName || "",
            mrp: product.mrp || 0,
            sellingprice: product.sellingprice || 0,
            stocks: product.stocks || 0,
            available: product.available || true,
          },
        },
      },
    }));

    await Productscollection.bulkWrite(operations);
    
    revalidateTag("products");

    return { status: 200, message: "Updated successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
}
