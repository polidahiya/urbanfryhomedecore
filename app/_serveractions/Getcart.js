"use server";
import { cookies } from "next/headers";
import { Cachedproducts } from "@/app/_connections/Getcachedata";
import { getcollection } from "../_connections/Mongodb";

export default async function Getcart() {
  try {
    const products = await Cachedproducts();
    const allcookies = await cookies();
    const rawuserdata = allcookies?.get("userdata")?.value;
    const userdata = rawuserdata ? JSON.parse(rawuserdata) : null;
    const coupon = allcookies?.get("altcoupon")?.value;
    const rawcart = allcookies?.get("cart")?.value;
    const cart = rawcart ? JSON.parse(rawcart) : {};
    const filteredcart = Object.entries(cart).filter(
      ([key, item]) => item.added
    );
    //
    const productMap = new Map(
      products.map((product) => [product._id, product])
    );
    const cartitems = filteredcart.map(([key, item]) => {
      const productid = key.split("-")[0];
      const productData = productMap.get(productid) || {};
      return [key, { ...item, ...productData }];
    });
    // total price
    let totalPrice = cartitems.reduce(
      (total, [key, value]) => total + value.quantity * value.sellingprice,
      0
    );

    // coupon
    let valuebeforecoupon = null;
    let coupondata = null;

    if (coupon) {
      const { couponscollection, ObjectId } = await getcollection();
      coupondata = await couponscollection.findOne({
        _id: new ObjectId(coupon),
      });
      valuebeforecoupon = totalPrice;

      if (coupondata.discountType == "percentage") {
        const discount = (totalPrice * coupondata.discountValue) / 100;
        totalPrice = totalPrice - discount;
      } else if (coupondata.discountType == "fixed amount") {
        totalPrice = totalPrice - coupondata.discountValue;
      }
    }

    return {
      userdata,
      cartitems,
      filteredcart,
      valuebeforecoupon,
      coupondata,
      totalPrice,
    };
  } catch (error) {
    console.log(error);
    return { cartitems: [], filteredcart: [] };
  }
}
