"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// async function verifyToken(token) {
//   return new Promise((resolve) => {
//     jwt.verify(token, process.env.jwt_secret, async (err, decoded) => {
//       if (err) {
//         // const session = await getServerSession(authOptions);
//         // if (session) {
//         //   resolve({ message: "Token verified", email: session?.user?.email });
//         // }
//         resolve({ message: "Invalid token" });
//       } else {
//         resolve({ message: "Token verified", decoded: decoded });
//       }
//     });
//   });
// }

export const Verification = async (permission) => {
  try {
    const allcoookies = await cookies();
    const token = allcoookies.get("token")?.value;
    if (!token) return false;

    const decoded = jwt.verify(token, process.env.jwt_secret);
    
    if (
      decoded?.usertype === "admin" ||
      decoded?.permission?.includes(permission)
    )
      return true;
  } catch (error) {
    return false;
  }
};
