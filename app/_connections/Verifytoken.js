"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function verifyToken(token) {
  return new Promise((resolve) => {
    jwt.verify(token, process.env.jwt_secret, async (err, decoded) => {
      if (err) {
        // const session = await getServerSession(authOptions);
        // if (session) {
        //   resolve({ message: "Token verified", email: session?.user?.email });
        // }
        resolve({ message: "Invalid token" });
      } else {
        resolve({ message: "Token verified", email: decoded?.email });
      }
    });
  });
}

export const Adminverification = async () => {
  if (!cookies().get("admintoken")) {
    return false;
  }

  let token = cookies().get("admintoken").value;
  let result = await verifyToken(token);

  if (result.email == process.env.admin_email) {
    return true;
  }
};

export const Userification = async () => {
  try {
    if (!cookies().get("token")) {
      return false;
    }

    let token = cookies().get("token").value;
    let result = await verifyToken(token);

    return { email: result.email };
  } catch (error) {
    return false;
  }
};
