"use server";

import { getcollection } from "@/app/_connections/Mongodb";

export const Roomsearchproducts = async () => {
  try {
    const { Productscollection, ObjectId } = await getcollection();
    const allproducts = await Productscollection.find().toArray();
    allproducts.map((item) => (item._id = item._id.toString()));
    return { status: 500, message: "", data: allproducts };
  } catch (error) {
    return { status: 500, message: "Server Error!" };
  }
};
