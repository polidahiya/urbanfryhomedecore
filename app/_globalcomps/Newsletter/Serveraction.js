"use server";
import { getcollection } from "@/app/_connections/Mongodb";
// import Verification from "@/app/_connections/Verifytoken";

export async function Adduser(data) {
  const { name = "", email = "" } = data;
  // const res = await Verification("public");
  // if (!res?.verified) {
  //   return { status: 400, message: "Invalid User" };
  // }

  if (!email || typeof email !== "string") {
    return { status: 400, message: "Email is required and must be a string" };
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const { Newslettersubscriberscollection } = await getcollection();

    await Newslettersubscriberscollection.insertOne({
      name: name.trim(),
      email: normalizedEmail,
      rawEmail: email.trim(),
      subscribedAt: new Date(),
    });

    return { status: 200, message: "You have been subscribed!" };
  } catch (error) {
    if (error.code === 11000) {
      return { status: 409, message: "This email is already subscribed." };
    }

    return {
      status: 500,
      message: "Subscription failed",
      error: error.message,
    };
  }
}
