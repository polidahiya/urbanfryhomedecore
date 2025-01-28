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
    const allorders = await orderscollection
      .find({
        $or: [{ paymentMethod: "cod" }, { payment: "successful" }],
        email: res?.email,
      })
      .toArray();

    const orders = allorders.map((order) => ({
      ...order,
      _id: order?._id.toString(),
    }));

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
