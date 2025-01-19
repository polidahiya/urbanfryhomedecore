"use server";
import { getcollection } from "@/app/_connections/Mongodb";
import Verification from "@/app/_connections/Verifytoken";

export const Getorders = async (
  ordertype = "all",
  search,
  limit,
  pagenumber
) => {
  try {
    const res = await Verification("View_admin_Orders");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { orderscollection } = await getcollection();

    const queries = {
      all: {},
      search: {
        $or: [
          { username: { $regex: new RegExp(search, "i") } },
          { email: { $regex: new RegExp(search, "i") } },
          { date: { $regex: new RegExp(search, "i") } },
        ],
      },
    };

    const allorders = await orderscollection
      .find(queries[ordertype])
      .sort({ date: -1 })
      .limit(limit)
      .skip((pagenumber - 1) * limit)
      .toArray();

    allorders.map((item) => (item._id = item._id.toString()));

    const totalOrders = await orderscollection.countDocuments(queries[ordertype]);

    return { status: 200, message: "", data: allorders, totalOrders };
  } catch (error) {
    return { status: 500, message: "Server Error!" };
  }
};
