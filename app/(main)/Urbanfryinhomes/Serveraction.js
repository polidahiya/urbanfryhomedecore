"use server";
import { getcollection } from "@/app/_connections/Mongodb";
import { revalidateTag } from "next/cache";
import Verification from "@/app/_connections/Verifytoken";
import { Deleteiamgefromurl } from "@/app/_connections/Cloudinary";

export const Addpost = async (data, deletedimages) => {
  try {
    const res = await Verification("Urbanfry_in_homes_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { inhomecollection, ObjectId } = await getcollection();

    // delete previous images
    deletedimages.forEach(async (image) => {
      await Deleteiamgefromurl(image, "Altorganizer/inhome");
    });

    const date = new Date().getTime();

    // Add to MongoDB
    if (data._id) {
      // to update a post
      const { _id, ...updateFields } = data;
      await inhomecollection.updateOne(
        { _id: new ObjectId(data._id) },
        { $set: { ...updateFields, lastupdated: date } }
      );
      revalidateTag("inhomeposts");
      return { status: 200, message: "Updated successfully" };
    } else {
      // to add a post
      await inhomecollection.insertOne({ ...data, lastupdated: date });
      revalidateTag("inhomeposts");
      return { status: 200, message: "Added successfully" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error!" };
  }
};

export const Deletepost = async (data) => {
  try {
    const res = await Verification("Urbanfry_in_homes_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }
    const { inhomecollection, ObjectId } = await getcollection();

    data.images.forEach(async (image) => {
      await Deleteiamgefromurl(image, "Altorganizer/inhome");
    });

    // delete form mongodb
    await inhomecollection.findOneAndDelete({ _id: new ObjectId(data._id) });
    revalidateTag("inhomeposts");
    return { status: 200, message: "Deleted successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};
