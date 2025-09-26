"use server";
import Verification from "../_connections/Verifytoken";
import { getcollection } from "../_connections/Mongodb";
import { cookies } from "next/headers";
import { logintime } from "../commondata";

export default async function Updateuserdetails(userdata) {
  try {
    const res = await Verification("public");
    if (!res?.verified) {
      return { status: 400, message: "Invalid User" };
    }

    const newdata = {
      name: userdata.name || "",
      address: userdata.address || "",
      phonenum: userdata.phonenum || "",
    };
    
    const { userscollection } = await getcollection();
    await userscollection.updateOne(
      { email: res?.email },
      {
        $set: {
          ...newdata,
        },
      }
    );

    // set cookies
    const cookieStore = await cookies();
    const stringuserdata = cookieStore.get("userdata")?.value;
    const parseduserdata = stringuserdata ? JSON.parse(stringuserdata) : {};
    cookieStore.set(
      "userdata",
      JSON.stringify({
        ...parseduserdata,
        ...newdata,
      }),
      {
        maxAge: logintime,
      }
    );
    return { status: 200, message: "Updated Successfully" };
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
}
