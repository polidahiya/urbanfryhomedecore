"use server";
import { getcollection } from "../_connections/Mongodb";
import Verification from "../_connections/Verifytoken";
import formatDate from "../_globalcomps/_helperfunctions/formateddate";

async function addorder(cartitems, totalPrice, paymentMethod, userdata) {
  try {
    const res = await Verification("public");
    if (!res?.verified) {
      return { status: 400, message: "Invalid User" };
    }

    const { orderscollection } = await getcollection();

    const formattedDate = formatDate();
    delete userdata.usertype;
    delete userdata.permission;
    let data = {
      products: Object.values(cartitems).map((product) => ({
        ...product[1],
        status: 0,
      })),
      totalPrice,
      paymentMethod,
      ...userdata,
      orderstage: 0,
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

export default addorder;
