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
      const { _id, ...rest } = key.split("|").reduce((acc, part) => {
        const [key, value] = part.split(":");
        acc[key] = value;
        return acc;
      }, {});

      const productData = productMap.get(_id) || {};
      //
      let rawprice = Number(productData?.sellingprice);
      productData?.moreoptions?.forEach((moreoption) => {
        const selectedoption = moreoption?.options[rest[moreoption?.name] || 0];
        rawprice += Number(selectedoption?.price);
      });
      const { productName, moreoptions, variants } = productData;
      //
      return [
        key,
        {
          ...item,
          _id,
          productName,
          moreoptions,
          selectedvariant: {
            image:
              variants[rest?.vcolor || 0]?.images[0] || "/uiimages/404.jpg",
            finish: variants[rest?.vcolor || 0]?.finish,
          },
          rawprice,
          selecteddata: { ...rest },
        },
      ];
    });

    // total price
    let totalPrice = cartitems.reduce(
      (total, [key, value]) => total + value.quantity * Number(value.rawprice),
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
      totalPrice: Math.floor(totalPrice),
    };
  } catch (error) {
    console.log(error);
    return { cartitems: [], filteredcart: [] };
  }
}
