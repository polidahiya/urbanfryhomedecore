"use server";
import { getcollection } from "@/app/_connections/Mongodb";
import Verification from "@/app/_connections/Verifytoken";
import { cookies } from "next/headers";

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
    const allcoupons = await couponscollection
      .find(queries[gettype])
      .sort({ lastupdate: -1 })
      .toArray();
    allcoupons.forEach((item) => (item._id = item._id.toString()));
    return { status: 200, message: "", data: allcoupons };
  } catch (error) {
    return { status: 500, message: "Server Error" };
  }
};

export async function Addcoupon(coupondata) {
  try {
    const tokenres = await Verification("Coupons_permission");
    if (!tokenres?.verified) {
      return { status: 400, message: "Please login first" };
    }

    const { couponscollection, ObjectId } = await getcollection();

    const date = new Date().getTime();
    if (coupondata._id) {
      // update coupon
      const filter = { _id: new ObjectId(coupondata._id) };
      const { _id, ...updatedCouponData } = coupondata;
      await couponscollection.updateOne(filter, {
        $set: { ...updatedCouponData, lastupdate: date },
      });
      return { status: 200, message: "Updated successfully" };
    } else {
      // create new coupon
      await couponscollection.insertOne({ ...coupondata, lastupdate: date });
      return { status: 200, message: "Added successfully" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
}

export async function Deletecoupon(id) {
  try {
    const tokenres = await Verification("Coupons_permission");
    if (!tokenres?.verified) {
      return { status: 400, message: "Please login first" };
    }
    const { couponscollection, ObjectId } = await getcollection();
    const filter = { _id: new ObjectId(id) };
    await couponscollection.deleteOne(filter);
    return { status: 200, message: "Deleted successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
}

export async function Applycoupon(coupon, totalPrice) {
  try {
    const tokenres = await Verification("public");
    if (!tokenres?.verified) {
      return { status: 400, message: "Please login to apply coupon" };
    }

    const { couponscollection, userscollection } = await getcollection();

    const coupondata = await couponscollection.findOne({ code: coupon });

    if (!coupondata) return { status: 400, message: "Invalid coupon code" };
    else if (!coupondata.isActive)
      return { status: 400, message: "Coupon is not active" };
    else if (!Checkcoupondate(coupondata.validFrom, coupondata.validTo))
      return { status: 400, message: "Coupon is expired" };
    else if (coupondata.maxAmount && coupondata.maxAmount < totalPrice)
      return {
        status: 400,
        message: `Order amount Exceed - Rs ${coupondata.maxAmount}`,
      };
    else if (coupondata.minAmount > totalPrice)
      return {
        status: 400,
        message: `Min amount not met - Rs ${coupondata.minAmount}`,
      };
    else if (coupondata.usageLimit <= 0 && coupondata.usageLimit != -1)
      return {
        status: 400,
        message: "Coupon usage limit exceeded",
      };
    else {
      const user = await userscollection.findOne({ email: tokenres.email });
      const usercoupondata = user.couponusage;
      const timesUsed = usercoupondata ? usercoupondata[coupondata?.code] : 0;
      if (
        timesUsed >= coupondata?.usageLimitperuser &&
        coupondata?.usageLimitperuser != -1
      ) {
        return {
          status: 400,
          message: "Coupon usage limit exceeded",
        };
      } else {
        const allcookies = await cookies();
        allcookies.set("altcoupon", coupondata._id.toString(), {
          maxAge: 60 * 60 * 24,
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "lax",
        });
        return {
          status: 200,
          message: "Coupon applied successfully",
        };
      }
    }
    // }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
}

const Checkcoupondate = (validFrom, validTo) => {
  const now = new Date();
  const start = new Date(validFrom);
  const end = new Date(validTo);
  return now >= start && now <= end;
};

export async function Removecoupon() {
  try {
    const tokenres = await Verification("public");
    if (!tokenres?.verified) {
      return { status: 400, message: "Please login to apply coupon" };
    }
    const allcookies = await cookies();
    allcookies.delete("altcoupon");
    return { status: 200, message: "Removed successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
}
// test1,RB00R1
