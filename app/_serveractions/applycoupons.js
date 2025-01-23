"use server";
import Verification from "../_connections/Verifytoken";
import { getcollection } from "../_connections/Mongodb";

export default async function Applycoupon(coupon) {
  try {
    const res = await Verification("public");
    if (!res?.verified) {
      return { status: 400, message: "Invalid User" };
    }
    const { couponscollection, orderscollection } = await getcollection();
    const coupondata = await couponscollection.findOne({
      code: coupon,
      isActive: true,
    });

    if (!coupondata) {
      return { status: 400, message: "Invalid Coupon" };
    }

    const currentDate = new Date();
    const validFrom = new Date(coupondata.validFrom);
    const validTo = new Date(coupondata.validTo);

    if (currentDate < validFrom || currentDate > validTo) {
      return { status: 400, message: "Coupon Expired" };
    }

    const orders = await orderscollection
      .find({ email: res?.email, appliedcoupon: coupon })
      .toArray();
    if (orders.length >= coupondata?.usagetimes) {
      return { status: 400, message: "Coupon reached max limit" };
    }

    return {
      status: 200,
      message: "Coupon Applied",
      coupondata: { ...coupondata, _id: coupondata?._id.toString() },
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error!" };
  }
}
