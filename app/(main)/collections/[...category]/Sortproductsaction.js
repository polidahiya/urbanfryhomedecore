"use server";
import { getcollection } from "@/app/_connections/Mongodb";
import Verification from "@/app/_connections/Verifytoken";
import { revalidateTag } from "next/cache";
export async function Sortproductsaction(products, sortkey) {
  try {
    const res = await Verification("Products_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }
    const { Productscollection, ObjectId } = await getcollection();
    
    const operations = products.map((product, i) => ({
      updateOne: {
        filter: { _id: new ObjectId(product._id) },
        update: { $set: { [sortkey]: i } },
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
