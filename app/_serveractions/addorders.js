"use server";
import { getcollection } from "../_connections/Mongodb";
import Verification from "../_connections/Verifytoken";
import formatDate from "../_globalcomps/_helperfunctions/formateddate";

async function addorder(
  cartitems,
  totalPrice,
  paymentMethod,
  userdata,
  appliedcoupondata
) {
  try {
    const res = await Verification("public");
    if (!res?.verified) {
      return { status: 400, message: "Invalid User" };
    }

    const { orderscollection, couponscollection } = await getcollection();

    // order validation
    const totalofcart = cartitems.reduce(
      (total, [key, value]) => total + value.quantity * value.sellingprice,
      0
    );
    if (appliedcoupondata) {
      const coupondata = await couponscollection.findOne({
        code: appliedcoupondata?.code,
        isActive: true,
      });

      if (!coupondata) {
        return { status: 400, message: "Invalid Coupon" };
      }
      const priceaftercoupon = getcouponprice(totalofcart, coupondata);

      if (priceaftercoupon != totalPrice) {
        return { status: 400, message: "Invalid Order" };
      }
    } else {
      if (totalofcart != totalPrice) {
        return { status: 400, message: "Invalid Order" };
      }
    }

    const formattedDate = formatDate();
    delete userdata?.usertype;
    delete userdata?.permission;
    let data = {
      products: Object.values(cartitems).map((product) => ({
        ...product[1],
        status: 0,
      })),
      totalPrice,
      paymentMethod,
      ...userdata,
      orderstage: 0,
      appliedcoupon: appliedcoupondata?.code, //use in coupon checking
      coupondata: appliedcoupondata,
      date: formattedDate,
    };

    if (paymentMethod == "online") {
      data.payment = "pending";
    }

    const result = await orderscollection.insertOne(data);

    return {
      status: 200,
      id: result.insertedId.toString(),
      message: "Order Placed Successfully",
    };
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
}

const getcouponprice = (pre, coupondata) => {
  if (coupondata?.discountType == "percentage") {
    return Math.floor(pre - (pre * coupondata?.discountValue) / 100);
  } else if (coupondata?.discountType == "fixed amount") {
    return Math.floor(pre - coupondata?.discountValue);
  }
};

export default addorder;
