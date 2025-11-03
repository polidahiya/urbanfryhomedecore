"use server";
import { getcollection } from "@/app/_connections/Mongodb";
import Verification from "@/app/_connections/Verifytoken";
import abandoned_cart_mail_template from "@/app/_mailtemplate/abandonedcartmail";
import sendEmail from "@/app/_connections/Sendmail";

export async function Getservercart() {
  try {
    const res = await Verification("Seo_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid User" };
    }

    const { servercart } = await getcollection();

    const cart = await servercart
      .find
      // { status: "abandoned" }
      ()
      .toArray();

    cart.forEach((element) => {
      element._id = element._id.toString();
    });

    return { status: 200, cart };
  } catch (error) {
    console.error("Error getting server cart", error);
    return { status: 500, message: "Failed to Get cart data" };
  }
}

export async function Getcartuserdata(email) {
  try {
    const res = await Verification("Seo_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid User" };
    }

    const { userscollection } = await getcollection();

    const userdata = await userscollection.findOne(
      { email: email }, // filter
      {
        projection: {
          name: 1,
          address: 1,
          phonenum: 1,
          email: 1,
          _id: 0,
        },
      }
    );

    return { status: 200, userdata };
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
