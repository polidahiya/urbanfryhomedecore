"use server";
import { getcollection } from "../_connections/Mongodb";
import Verification from "../_connections/Verifytoken";
import order_confiramtion_mail_template from "../_mailtemplate/orderconfirmationmail";
import sendEmail from "../_connections/Sendmail";
import Getcart from "./Getcart";
import { v4 as uuidv4 } from "uuid";
import { getYYMMDD } from "../_globalcomps/_helperfunctions/Yymmdd";
import { refreshproductsnow } from "../_connections/Getcachedata";

async function addorder(paymentMethod, pincode = "", shippingdetails) {
  try {
    const res = await Verification("public");
    if (!res?.verified) {
      return { status: 400, message: "Invalid User" };
    }

    const { orderscollection, Admindatacollection } = await getcollection();
    const { cartitems, userdata, totalPrice, coupondata } = await Getcart();
    userdata.pincode = pincode;

    const paymentGroupId = uuidv4();
    const createdAt = new Date();

    for (let [key, product] of cartitems) {
      const updatedsitedata = await Admindatacollection.findOneAndUpdate(
        {},
        { $inc: { orderNumber: 1 } },
        { returnDocument: "after", upsert: true }
      );
      const pid = product?._id;
      const finalproductdata = {
        pid,
        color: product.selectedvariant?.finish,
        price: product.rawprice,
        quantity: product.quantity,
        name: product.productName,
        image: product.selectedvariant?.image,
        moreoptions: product.moreoptions,
        selecteddata: product.selecteddata,
      };

      let order = {
        paymentGroupId,
        orderNumber: `Urbanfry${getYYMMDD()}-${updatedsitedata?.orderNumber}`,
        paymentMethod,
        status: 0,
        userdata,
        shippingdetails,
        product: finalproductdata,
        totalPrice,
        note: "",
        createdAt: createdAt,
      };
      // add coupon data
      if (coupondata)
        order.coupondata = {
          code: coupondata?.code,
          discountType: coupondata?.discountType,
          discountValue: coupondata?.discountValue,
          share: cartitems.length,
        };
      // add payment status for online
      if (paymentMethod == "online") {
        order.paymentStatus = "pending";
      }
      await orderscollection.insertOne(order);
    }

    // send mail
    if (paymentMethod == "cod") {
      // update coupon usage
      if (coupondata)
        await Updatecouponusage(userdata?.email, coupondata?.code);
      // send mail and stoks update
      await Moreupdate(paymentGroupId);
    }

    return {
      status: 200,
      message: "Order Placed Successfully",
      paymentGroupId,
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server error" };
  }
}

export async function Moreupdate(paymentGroupId) {
  try {
    if (!paymentGroupId) return;
    const { orderscollection, Productscollection, ObjectId } =
      await getcollection();
    const res = await orderscollection.find({ paymentGroupId }).toArray();

    if (res?.length < 0) return;

    // update stocks
    res.forEach(async (order) => {
      const { pid, quantity } = order.product;

      const product = await Productscollection.findOne({
        _id: new ObjectId(pid),
      });

      if (!product) return;

      const currentStock = parseInt(product.stocks || "0", 10);
      const newStock = Math.max(currentStock - quantity, 0);

      await Productscollection.updateOne(
        { _id: new ObjectId(pid) },
        { $set: { stocks: newStock.toString() } } // keep as string
      );
    });

    // send mail
    const firstorder = res[0];
    const products = res.map((order) => order.product);

    const mailtemplate = order_confiramtion_mail_template(
      products,
      firstorder?.totalPrice,
      firstorder?.userdata?.name
    );

    sendEmail(
      "Order confirmation",
      ["urbanfryhome@gmail.com", firstorder?.userdata?.email],
      mailtemplate
    );

    // refresh products now
    await refreshproductsnow();
  } catch (error) {
    console.log(error);
  }
}

export async function Updatecouponusage(email, couponCode) {
  const { userscollection, couponscollection } = await getcollection();

  // update the usage count for coupon
  const coupondata = await couponscollection.findOne({ code: couponCode });
  if (coupondata) {
    if (coupondata.usageLimit > 0) {
      await couponscollection.updateOne(
        { code: couponCode },
        { $set: { usageLimit: coupondata.usageLimit - 1 } }
      );
    }
  }

  // update the usage count for user
  await userscollection.updateOne(
    { email },
    {
      $inc: { [`couponusage.${couponCode}`]: 1 }, // increment the count
    }
  );
}

export default addorder;
