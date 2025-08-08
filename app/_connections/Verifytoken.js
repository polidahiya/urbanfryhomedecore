"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const Verification = async (permission) => {
  try {
    const allCookies = await cookies();
    const token = allCookies.get("token")?.value;
    if (!token) return { verified: false };

    const decoded = jwt.verify(token, process.env.jwt_secret);

    // Normalize permission to array
    const requiredPermissions = Array.isArray(permission)
      ? permission
      : [permission];

    // Check if permission includes 'public' (bypass)
    if (requiredPermissions.includes("public")) {
      return {
        verified: true,
        email: decoded.email,
        permission: decoded.permission,
        usertype: decoded.usertype,
      };
    }

    const userIsAdmin = decoded?.usertype === "admin";
    const userHasPermission = requiredPermissions.some((p) =>
      decoded?.permission?.includes(p)
    );

    if (userIsAdmin || userHasPermission) {
      return {
        verified: true,
        email: decoded.email,
        permission: decoded.permission,
        usertype: decoded.usertype,
      };
    }

    return { verified: false };
  } catch (error) {
    return { verified: false };
  }
};

export default Verification;
