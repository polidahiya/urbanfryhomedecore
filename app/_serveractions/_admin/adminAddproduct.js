"use server";
import { uploadImage, Deleteiamgefromurl } from "@/app/_connections/Cloudinary";
import { Verification } from "@/app/_connections/Verifytoken";
import { getcollection } from "@/app/_connections/Mongodb";

export const Addproduct = async (data, imagesformdata, deletedimages) => {
  try {
    const { Productscollection, ObjectId } = await getcollection();
    const res = await Verification("Add_and_update_products");
    if (!res) {
      return { status: 400, message: "Invalid user" };
    }

    for (const variant of data.variants) {
      for (let j = 0; j < variant?.images?.length; j++) {
        const image = variant?.images[j];
        if (image.length < 15) {
          const arrayBuffer = await imagesformdata.get(image).arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const cloudinaryres = await uploadImage(
            buffer,
            "Altorganizer/products"
          );
          variant.images[j] = cloudinaryres.secure_url;
        }
      }
    }

    // delete previous images
    deletedimages.forEach((image) => {
      Deleteiamgefromurl(image, "Altorganizer/products");
    });

    const date = new Date().getTime();

    // Add to MongoDB
    if (data._id) {
      // to update a product
      const { _id, ...updateFields } = data;
      await Productscollection.updateOne(
        { _id: new ObjectId(data._id) },
        { $set: { ...updateFields, lastupdated: date } }
      );
      return { status: 200, message: "Updated successfully" };
    } else {
      // to add a product
      await Productscollection.insertOne({ ...data, lastupdated: date });
      return { status: 200, message: "Added successfully" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error!" };
  }
};

export const Deleteproduct = async (variants, id) => {
  const { Productscollection, ObjectId } = await getcollection();
  try {
    const res = await Verification("Delete_products");
    if (!res) {
      return { status: 400, message: "Invalid user" };
    }

    for (const item of variants) {
      for (let j = 0; j < item.images.length; j++) {
        const url = item.images[j];
        Deleteiamgefromurl(url, "Altorganizer/products");
      }
    }

    // delete form mongodb
    await Productscollection.findOneAndDelete({ _id: new ObjectId(id) });
    return { status: 200, message: "Deleted successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};
