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

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    data.verified = false;
    data.date = formattedDate;
    await reviewscollection.insertOne(data);

    return { status: 200, message: "Review submitted successfully" };
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
}

export default addreview;
