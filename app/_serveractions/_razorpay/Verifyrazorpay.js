"use server";
import { getcollection } from "@/app/_connections/Mongodb";
import crypto from "crypto";
import { Updatecouponusage } from "../addorders";
import { Send_mail_to_payment_group_id } from "../addorders";
import { Clear_cart_coupon_cookies } from "../addorders";

async function Verifyrazorpay(razorpaydata, paymentGroupId) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      razorpaydata;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.Razortpay_secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      // do payment verification
      const { orderscollection } = await getcollection();

      // Update all orders with this paymentGroupId
      const orderdata = await orderscollection.updateMany(
        { paymentGroupId },
        { $set: { paymentStatus: "success" } }
      );

      // update coupon usage
      if (orderdata?.coupondata)
        await Updatecouponusage(
          orderdata?.userdata?.email,
          orderdata?.coupondata?.code
        );

      // Send mail
      await Send_mail_to_payment_group_id(paymentGroupId);
      // clear cart cookies
      await Clear_cart_coupon_cookies();

      return { status: 200, message: "Payment verified successfully" };
    } else {
      return { status: 400, message: "Invalid signature" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server error" };
    
  }
}

export default Verifyrazorpay;
