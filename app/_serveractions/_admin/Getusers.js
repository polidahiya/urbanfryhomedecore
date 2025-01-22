"use server";
import { getcollection } from "@/app/_connections/Mongodb";
import Verification from "@/app/_connections/Verifytoken";

export const Getusers = async (
  userstype = "all",
  search,
  limit,
  pagenumber
) => {
  try {
    const res = await Verification("Users_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { userscollection } = await getcollection();

    const queries = {
      all: {},
      search: {
        $or: [
          { name: { $regex: new RegExp(search, "i") } },
          { email: { $regex: new RegExp(search, "i") } },
        ],
      },
    };

    const allusers = await userscollection
      .find(queries[userstype])
      .sort({ date: -1 })
      .limit(limit)
      .skip((pagenumber - 1) * limit)
      .toArray();

    allusers.map((item) => (item._id = item._id.toString()));

    const totalusers = await userscollection.countDocuments(queries[userstype]);

    return { status: 200, message: "", data: allusers, totalusers };
  } catch (error) {
    return { status: 500, message: "Server Error!" };
  }
};

export const updateuser = async (id, permissionsstate) => {
  try {
    const res = await Verification("Users_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { userscollection, ObjectId } = await getcollection();

    await userscollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { permission: permissionsstate } }
    );
    return { status: 200, message: "Update successful" };
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
};

export const Deleteuser = async (id, value) => {
  try {
    const res = await Verification("Users_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { userscollection, ObjectId } = await getcollection();

    await userscollection.deleteOne({ _id: new ObjectId(id) });

    return { status: 200, message: "Deleted successfully" };
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
};
