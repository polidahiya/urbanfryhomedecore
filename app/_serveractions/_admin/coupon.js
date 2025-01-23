"use server";
import Verification from "@/app/_connections/Verifytoken";
import { getcollection } from "@/app/_connections/Mongodb";

export const getcoupons = async (gettype = "all", search) => {
  try {
    const res = await Verification("Coupons_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const queries = {
      all: {},
      search: {
        $or: [{ code: { $regex: new RegExp(search, "i") } }],
      },
    };

    const { couponscollection } = await getcollection();
    const allcoupons = await couponscollection.find(queries[gettype]).toArray();
    allcoupons.map((item) => (item._id = item._id.toString()));
    return { status: 200, message: "", data: allcoupons };
  } catch (error) {
    return { status: 500, message: "Server Error" };
  }
};

export const addcoupon = async (data) => {
  try {
    const res = await Verification("Coupons_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { couponscollection, ObjectId } = await getcollection();
    if (data?._id) {
      // update
      const { _id, ...updateFields } = data;
      await couponscollection.updateOne(
        { _id: new ObjectId(data?._id) },
        { $set: { ...updateFields } }
      );
      return { status: 200, message: "Update successfully" };
    } else {
      // add new
      const res = await couponscollection.findOne({ code: data?.code });

      if (res) {
        return { status: 400, message: "Coupon already exists" };
      }
      await couponscollection.insertOne(data);
      return { status: 200, message: "Added successfully" };
    }
  } catch (error) {
    return { status: 500, message: "Server Error" };
  }
};

export const deletecoupon = async (id) => {
  try {
    const res = await Verification("Coupons_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { couponscollection, ObjectId } = await getcollection();
    await couponscollection.deleteOne({ _id: new ObjectId(id) });
    return { status: 200, message: "Deleted successfully" };
  } catch (error) {
    console.log(error);

    return { status: 500, message: "Server Error" };
  }
};
