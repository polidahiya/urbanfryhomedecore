"use server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.Razortpay_secret,
});

async function Razorpayidcreate(amount, currency) {
  try {
    const options = {
      amount: amount * 100, // Amount in paise
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    return { order, status: 200 };
  } catch (error) {
    return { status: 500 };
  }
}

export default Razorpayidcreate;
