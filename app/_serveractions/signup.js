"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { logintime } from "../commondata";
import { getcollection } from "../_connections/Mongodb";

const generateToken = async (userdata) => {
  const token = jwt.sign(
    {
      email: userdata?.email,
      usertype: userdata?.usertype,
      permission: userdata?.permission,
    },
    process.env.jwt_secret,
    {
      expiresIn: logintime,
    }
  );

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    maxAge: logintime,
    httpOnly: true,
    secure: true,
  });
  cookieStore.set("userdata", JSON.stringify(userdata), {
    maxAge: logintime,
  });
};

const findUserByEmail = async (email) => {
  const { userscollection } = await getcollection();
  return await userscollection.findOne({ email });
};

export const login = async (userdata) => {
  try {
    if (!userdata.email) {
      return { status: 400, message: "Email is required" };
    }

    const user = await findUserByEmail(userdata.email);

    if (!user) {
      return { status: 400, message: "User not found" };
    }

    if (!userdata.password) {
      return { status: 400, message: "Wrong password" };
    }

    const isPasswordMatch = await bcrypt.compare(
      userdata.password,
      user.password
    );

    if (!isPasswordMatch) {
      return { status: 400, message: "Wrong password" };
    }

    await generateToken({
      name: user?.name || "",
      email: user?.email,
      usertype: user?.usertype || "user",
      address: user?.address || "",
      phonenum: user?.phonenum || "",
      permission: user?.permission || [],
    });

    return { status: 200, message: "Login successful" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Server error!" };
  }
};

export const signup = async (userdata) => {
  try {
    const existingUser = await findUserByEmail(userdata.email);
    if (existingUser) {
      return { status: 400, message: "User already registered" };
    }

    // Hash password
    userdata.password = await bcrypt.hash(userdata.password, 12);
    userdata.usertype = "user";
    userdata.permission = [];

    const { userscollection } = await getcollection();
    const insertedUser = await userscollection.insertOne(userdata);
    if (!insertedUser) {
      return { status: 500, message: "Failed to create user" };
    }

    await generateToken({
      name: userdata?.name || "",
      email: userdata?.email,
      usertype: userdata?.usertype,
      address: userdata?.address || "",
      phonenum: userdata?.phonenum || "",
      permission: [],
    });

    return { status: 200, message: "Signup successful" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Server error!" };
  }
};

export const logout = async () => {
  try {
    const cookieStore = await cookies();
    ["token", "next-auth.csrf-token", "userdata", "cart", "altcoupon"].forEach(
      (name) => cookieStore.delete(name)
    );

    return { status: 200, message: "Logout successfully" };
  } catch (error) {
    console.error("Logout Error:", error);
    return { status: 500, message: "Server error" };
  }
};
