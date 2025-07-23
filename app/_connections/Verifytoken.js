"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const Verification = async (permission) => {
  try {
    const allcoookies = await cookies();
    const token = allcoookies.get("token")?.value;
    if (!token) return { verified: false };

    const decoded = jwt.verify(token, process.env.jwt_secret);

    if (
      decoded?.usertype === "admin" ||
      decoded?.permission?.includes(permission) ||
      permission == "public"
    ) {
      return { verified: true, email: decoded.email };
    }
    return { verified: false };
  } catch (error) {
    return { verified: false };
  }
};

export default Verification;
