"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { logintime } from "../commondata";
import { getcollection } from "../_connections/Mongodb";

const generateToken = async (data, userdata) => {
  const token = jwt.sign(data, process.env.jwt_secret, {
    expiresIn: logintime,
  });

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
    const user = await findUserByEmail(userdata.email);
    
    if (!user) {
      return { status: 400, message: "User not found" };
    }

    if (!user.password) {
      return { status: 400, message: "Wrong password" };
    }

    const isPasswordMatch = await bcrypt.compare(
      userdata.password,
      user.password
    );
    if (!isPasswordMatch) {
      return { status: 400, message: "Wrong password" };
    }

    await generateToken(
      { email: userdata.email },
      {
        username: userdata.name,
        email: userdata.email,
      }
    );

    return { status: 200, message: "Login successful" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Server error!" };
  }
};

export const signup = async (userdata) => {
  try {
    const { userscollection } = await getcollection();
    const existingUser = await findUserByEmail(userdata.email);
    if (existingUser) {
      return { status: 400, message: "User already registered" };
    }

    // Hash password
    userdata.password = await bcrypt.hash(userdata.password, 12);

    const insertedUser = await userscollection.insertOne(userdata);
    if (!insertedUser) {
      return { status: 500, message: "Failed to create user" };
    }

    await generateToken(
      { email: userdata.email },
      {
        username: userdata.name,
        email: userdata.email,
      }
    );

    return { status: 200, message: "Signup successful" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Server error!" };
  }
};

export const logout = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore?.delete("token");
    cookieStore?.delete("next-auth.csrf-token");
    cookieStore?.delete("userdata");
    cookieStore?.delete("cart");

    return { status: 200, message: "Logout successfully" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Server error" };
  }
};