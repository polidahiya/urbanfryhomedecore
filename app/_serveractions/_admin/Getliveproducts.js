"use server";
import { getcollection } from "@/app/_connections/Mongodb";
import Verification from "@/app/_connections/Verifytoken";

export const Roomsearchproducts = async (ordertype = "all", search) => {
  try {
    const res = await Verification("Products_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { Productscollection } = await getcollection();

    const queries = {
      all: {},
      rooms: {
        rooms: search,
      },
      category: {
        categories: search,
      },
      search: {
        $or: [
          { categories: { $regex: new RegExp(search, "i") } },
          { rooms: { $regex: new RegExp(search, "i") } },
          { productName: { $regex: new RegExp(search, "i") } },
          { sku: { $regex: new RegExp(search, "i") } },
          { Material: { $regex: new RegExp(search, "i") } },
          { theme: { $regex: new RegExp(search, "i") } },
        ],
      },
    };

    const allproducts = await Productscollection.find(
      queries[ordertype]
    ).toArray();
    allproducts.map((item) => (item._id = item._id.toString()));

    return { status: 200, message: "", data: allproducts };
  } catch (error) {
    return { status: 500, message: "Server Error!" };
  }
};
