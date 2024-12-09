"use server";

export default async function signup() {
  try {
    return { status: 200, message: "Signup successfull!" };
  } catch (error) {
    return { status: 200, message: "Something went wrong" };
  }
}
