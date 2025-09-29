"use server";
import Verification from "../_connections/Verifytoken";
import { getcollection } from "../_connections/Mongodb";

export default async function Getuserorders() {
  try {
    const res = await Verification("public");
    if (!res?.verified) {
      return { status: 400, message: "Invalid User" };
    }

    const { orderscollection } = await getcollection();
    const orders = await orderscollection
      .find({
        $or: [{ paymentMethod: "cod" }, { paymentStatus: "success" }],
        [`userdata.email`]: res.email,
      })
      .sort({ createdAt: -1 })
      .toArray();

    orders.forEach((order) => {
      order._id = order?._id.toString();
    });

    return {
      status: 200,
      message: "",
      orders,
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error!" };
  }
}
