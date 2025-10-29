"use server";
import { getcollection } from "@/app/_connections/Mongodb";
import Verification from "@/app/_connections/Verifytoken";
import order_confiramtion_mail_template from "@/app/_mailtemplate/orderconfirmationmail";
import sendEmail from "@/app/_connections/Sendmail";
import { v4 as uuidv4 } from "uuid";
import { getYYMMDD } from "@/app/_globalcomps/_helperfunctions/Yymmdd";
import { refreshproductsnow } from "@/app/_connections/Getcachedata";
import { revalidateTag } from "next/cache";

async function addorder(data, productsdata, sendmail) {
  try {
    const res = await Verification("public");
    if (!res?.verified) {
      return { status: 400, message: "Invalid User" };
    }

    const {
      orderscollection,
      Admindatacollection,
      Productscollection,
      userscollection,
      couponscollection,
      ObjectId,
    } = await getcollection();
    const edit = data._id ? true : false;
    const paymentGroupId = edit ? data?.paymentGroupId : uuidv4();
    const createdAt = edit ? data.createdAt : new Date();

    for (let product of productsdata) {
      let updatedsitedata;
      if (!edit) {
        updatedsitedata = await Admindatacollection.findOneAndUpdate(
          {},
          { $inc: { orderNumber: 1 } },
          { returnDocument: "after", upsert: true }
        );
      }

      const vcolor = product.selecteddata?.vcolor || 0;
      const selectedvariant = product?.variants[vcolor];
      const finalproductdata = {
        pid: product?._id,
        color: selectedvariant?.finish,
        price: product.sellingprice,
        quantity: product.quantity,
        name: product.productName,
        image: selectedvariant?.images[0],
        moreoptions: product.moreoptions,
        selecteddata: product.selecteddata,
      };

      let order = {
        paymentGroupId,
        orderNumber: edit
          ? data.orderNumber
          : `Urbanfry${getYYMMDD()}-${updatedsitedata?.orderNumber}`,
        paymentMethod: data.paymentMethod || "cod",
        status: data.status || 0,
        userdata: data.userdata,
        shippingdetails: data.shippingdetails,
        product: finalproductdata,
        totalPrice: data.totalPrice,
        note: data.note || "",
        createdAt: createdAt,
      };
      if (data.coupondata) {
        order.coupondata = data.coupondata;
      } else {
        order.coupondata = null;
      }
      if (data.paymentStatus) {
        order.paymentStatus = data.paymentStatus;
      }
      if (edit) {
        await orderscollection.updateOne(
          { orderNumber: data.orderNumber },
          { $set: order }
        );
      } else {
        await orderscollection.insertOne(order);
      }
    }

    // send mail
    try {
      if (sendmail) {
        const mailtemplate = order_confiramtion_mail_template(
          productsdata,
          data?.totalPrice,
          data?.userdata?.name
        );

        sendEmail(
          "Order confirmation",
          [ data?.userdata?.email],
          mailtemplate
        );
      }
    } catch (error) {
      console.log(error);
    }

    // stocks update
    try {
      if (!edit) {
        productsdata.forEach(async (product) => {
          const { quantity = 1, stocks = "0" } = product;

          const currentStock = parseInt(stocks || "0", 10);
          const newStock = Math.max(currentStock - quantity, 0);

          await Productscollection.updateOne(
            { _id: new ObjectId(product?._id) },
            { $set: { stocks: newStock.toString() } }
          );
        });
      }
    } catch (error) {
      console.log(error);
    }

    // update coupon usage
    if (data.coupondata && !edit) {
      try {
        // update the usage count for coupon
        const coupondata = await couponscollection.findOne({
          code: data?.coupondata?.code,
        });

        if (coupondata) {
          if (coupondata.usageLimit > 0) {
            await couponscollection.updateOne(
              { code: data?.coupondata?.code },
              { $set: { usageLimit: coupondata.usageLimit - 1 } }
            );
          }
        }

        // update the usage count for user
        await userscollection.updateOne(
          { email: data.userdata.email },
          {
            $inc: { [`couponusage.${data?.coupondata?.code}`]: 1 }, // increment the count
          }
        );
      } catch (error) {
        console.log(error);
      }
    }

    revalidateTag("recent-orders");
    await refreshproductsnow();
    return {
      status: 200,
      message: edit
        ? "Order Updated Successfully"
        : "Order Placed Successfully",
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server error" };
  }
}

export default addorder;
