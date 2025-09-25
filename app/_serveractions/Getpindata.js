"use server";
import { availablepins } from "../_globalcomps/Availablepins";

export async function getpindata(pincode) {
  try {
    const pindata = availablepins[pincode];
    if (pindata) {
      return { status: 200 };
    } else {
      return { status: 404 };
    }
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
}
