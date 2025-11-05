"use server";
import { getcollection } from "@/app/_connections/Mongodb";
import Verification from "@/app/_connections/Verifytoken";
import abandoned_cart_mail_template from "@/app/_mailtemplate/abandonedcartmail";
import sendEmail from "@/app/_connections/Sendmail";

export async function Getservercart(type, from, to) {
  try {
    const res = await Verification("Seo_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid User" };
    }

    const { servercart } = await getcollection();

    // Base query
    const query = {};

    // Filter by type (status)
    if (type && type !== "all") {
      query.status = type; // assuming `status` field holds "abandoned" or "active"
    }

    // Handle date filters
     const today = new Date();
    const defaultFrom = new Date();
    defaultFrom.setMonth(today.getMonth() - 1); // one month ago

    const fromDate = from ? new Date(from) : defaultFrom;
    const toDate = to ? new Date(to) : today;

    // normalize toDate to end of day
    toDate.setHours(23, 59, 59, 999);

    query.updatedAt = { $gte: fromDate, $lte: toDate };

    const cart = await servercart.find(query).toArray();

    cart.forEach((element) => {
      element._id = element._id.toString();
    });

    return { status: 200, cart };
  } catch (error) {
    console.error("Error getting server cart", error);
    return { status: 500, message: "Failed to Get cart data" };
  }
}


export async function Reminduser(data) {
  try {
    const res = await Verification("Seo_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid User" };
    }

    const { servercart } = await getcollection();

    const date = new Date();

    for (const user of data) {
      if (
        Object.keys(user.cartItems).length == 0 ||
        user.status !== "abandoned"
      )
        if (data.length == 1) {
          return { status: 200, message: "Already Reminded" };
        } else {
          continue;
        }

      if (user?.lastreminded) {
        const diffHours =
          (date - new Date(lastCart.lastreminded)) / (1000 * 60 * 60);

        if (diffHours < 24) {
          if (data.length == 1) {
            return { status: 200, message: "Already Reminded" };
          } else {
            continue;
          }
        }
      }

      await sendEmail(
        "Your Cart is Waiting 🛒",
        user.email,
        abandoned_cart_mail_template("https://urbanfryhomes.com/cart")
      );

      await servercart.updateOne(
        { email: user.email, status: "abandoned" },
        { $set: { lastreminded: date } }
      );
    }

    return { status: 200, message: "Reminders sent successfully" };
  } catch (error) {
    console.error("Error sending reminder emails:", error);
    return { status: 500, message: "Error sending reminder emails" };
  }
}
