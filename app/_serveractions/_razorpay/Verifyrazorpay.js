"use server";
import { getcollection } from "@/app/_connections/Mongodb";
import crypto from "crypto";
import sendEmail from "@/app/_connections/Sendmail";
import order_confiramtion_mail_template from "@/app/_mailtemplate/orderconfirmationmail";

async function Verifyrazorpay(razorpaydata, id) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      razorpaydata;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.Razortpay_secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      // do payment verification
      const { orderscollection, ObjectId } = await getcollection();
      const orderdata = await orderscollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { payment: "successful" } }
      );

      // send mail
      const mailtemplate = order_confiramtion_mail_template(
        orderdata?.products,
        orderdata?.totalPrice,
        orderdata?.username
      );

      sendEmail("Order Confirmation!", orderdata?.email, mailtemplate);

      return { status: 200, message: "Payment verified successfully" };
    } else {
      return { status: 400, message: "Invalid signature" };
    }
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
}

export default Verifyrazorpay;
