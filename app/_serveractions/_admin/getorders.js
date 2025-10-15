"use server";
import { getcollection } from "@/app/_connections/Mongodb";
import Verification from "@/app/_connections/Verifytoken";
import { revalidateTag } from "next/cache";

export const Getorders = async (
  ordertype = "all",
  search,
  limit,
  pagenumber
) => {
  try {
    const res = await Verification("Order_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { orderscollection } = await getcollection();

    const queries = {
      all: {},
      search: {
        $or: [
          { [`userdata.name`]: { $regex: new RegExp(search, "i") } },
          { [`userdata.email`]: { $regex: new RegExp(search, "i") } },
          { createdAt: { $regex: new RegExp(search, "i") } },
        ],
      },
    };

    const allorders = await orderscollection
      .find(queries[ordertype])
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((pagenumber - 1) * limit)
      .toArray();

    allorders.forEach((item) => {
      item._id = item?._id.toString();
    });

    const totalOrders = await orderscollection.countDocuments(
      queries[ordertype]
    );

    return { status: 200, message: "", data: allorders, totalOrders };
  } catch (error) {
    return { status: 500, message: "Server Error!" };
  }
};

export const updateorderstatus = async (id, value) => {
  try {
    const res = await Verification("Order_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { orderscollection, ObjectId } = await getcollection();

    await orderscollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: value } }
    );
    return { status: 200, message: "Update successful" };
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
};
export const Deleteorder = async (id) => {
  try {
    const res = await Verification("Order_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { orderscollection, ObjectId } = await getcollection();

    await orderscollection.deleteOne({ _id: new ObjectId(id) });

    revalidateTag("recent-orders");
    return { status: 200, message: "Deleted successfully" };
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
};

export const updateordernote = async (id, value) => {
  try {
    const res = await Verification("Order_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { orderscollection, ObjectId } = await getcollection();

    await orderscollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { note: value } }
    );

    revalidateTag("recent-orders");
    return { status: 200, message: "Update successful" };
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
};
