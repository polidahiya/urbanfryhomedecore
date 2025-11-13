"use server";
import { getcollection } from "../_connections/Mongodb";
import Verification from "../_connections/Verifytoken";
import { refreshreviewsnow } from "../_connections/Getcachedata";

async function addreview(data) {
  try {
    const res = await Verification("public");
    if (!res?.verified) {
      return { status: 400, message: "Invalid User" };
    }

    const isadmin =
      res.usertype == "admin" || res.permission.includes("Reviews_permission");

    const { reviewscollection } = await getcollection();

    const currentDate = new Date();
    data.verified = isadmin ? true : false;
    data.date = currentDate;
    data.email = isadmin ? data.email : res.email;
    await reviewscollection.insertOne(data);
    
    if (isadmin) {
      refreshreviewsnow(data.productid);
    }

    return { status: 200, message: "Review submitted successfully" };
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
}

export default addreview;
