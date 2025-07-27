"use server";
import { getcollection } from "../_connections/Mongodb";
import Verification from "../_connections/Verifytoken";

async function addreview(data) {
  try {
    const res = await Verification("public");
    if (!res?.verified) {
      return { status: 400, message: "Invalid User" };
    }
    const { reviewscollection } = await getcollection();

    const currentDate = new Date();
    data.verified = false;
    data.date = currentDate;
    await reviewscollection.insertOne(data);

    return { status: 200, message: "Review submitted successfully" };
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
}

export default addreview;
