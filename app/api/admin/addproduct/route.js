import { NextResponse } from "next/server";
import { uploadImage, Deleteiamgefromurl } from "@/app/_connections/Cloudinary";
import Verification from "@/app/_connections/Verifytoken";
import { getcollection } from "@/app/_connections/Mongodb";

export const runtime = "nodejs";
export const maxDuration = 60;
export const maxRequestBodySize = "25mb";
export async function POST(req) {
  try {
    const res = await Verification("Products_permission");
    if (!res?.verified) {
      return NextResponse.json({ message: "Invalid user" }, { status: 400 });
    }

    const formData = await req.formData();
    console.log(formData);
    const data = JSON.parse(formData.get("data"));
    const deletedimages = JSON.parse(formData.get("deletedimages"));

    const { Productscollection, ObjectId } = await getcollection();

    for (const variant of data.variants) {
      for (let j = 0; j < variant.images.length; j++) {
        const image = variant.images[j];
        if (image.length < 15) {
          const arrayBuffer = await formData.get(image).arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const cloudinaryres = await uploadImage(
            buffer,
            "Altorganizer/products"
          );
          variant.images[j] = cloudinaryres.secure_url;
        }
      }
    }

    deletedimages.forEach((img) =>
      Deleteiamgefromurl(img, "Altorganizer/products")
    );

    const date = Date.now();
    if (data._id) {
      const { _id, ...updateFields } = data;
      await Productscollection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { ...updateFields, lastupdated: date } }
      );
      return NextResponse.json(
        { message: "Updated successfully" },
        { status: 200 }
      );
    } else {
      await Productscollection.insertOne({ ...data, lastupdated: date });
      return NextResponse.json(
        { message: "Added successfully" },
        { status: 200 }
      );
    }
  } catch (err) {
    console.error("Upload API Error:", err);
    return NextResponse.json({ message: "Server Error!" }, { status: 500 });
  }
}
