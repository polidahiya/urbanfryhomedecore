"use server";
import { getcollection } from "../_connections/Mongodb";
import Verification from "../_connections/Verifytoken";

export async function Savecart(cart) {
  try {
    const res = await Verification("public");
    if (!res?.verified) {
      return { status: 400, message: "Invalid User" };
    }

    const { servercart } = await getcollection();

    await servercart.updateOne(
      { email: res.email },
      {
        $set: {
          email: res.email,
          cartItems: cart,
          updatedAt: new Date(),
          status: "active",
        },
      },
      { upsert: true }
    );

    return { status: 200, message: "Cart saved successfully" };
  } catch (error) {
    console.error("Error saving cart:", error);
    return { status: 500, message: "Failed to save cart" };
  }
}

export async function Deletecart(email) {
  try {
    const { servercart } = await getcollection();
    await servercart.deleteOne({ email });

    return { status: 200, message: "Cart deleted successfully" };
  } catch (error) {
    console.error("Error deleting cart:", error);
    return { status: 500, message: "Failed to delete cart" };
  }
}
