"use server";
import { unstable_cache, revalidateTag } from "next/cache";
import { getcollection } from "../_connections/Mongodb";
import Verification from "../_connections/Verifytoken";
import { CACHE_TIME } from "../commondata";

export async function savedata(data) {
  try {
    const res = await Verification("Seo_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid User" };
    }

    const { seodata } = await getcollection();

    await seodata.updateOne(
      { seokey: data.seokey },
      {
        $set: {
          ...data,
        },
      },
      { upsert: true }
    );
    revalidateTag(data.seokey);
    return { status: 200, message: "Saved successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server error" };
  }
}

export async function getseodata(seokey) {
  return unstable_cache(
    async () => {
      const { seodata } = await getcollection();
      const data = await seodata.findOne({ seokey });
      if (data) data._id = data._id.toString();
      return data;
    },
    [`${seokey}`],
    {
      revalidate: CACHE_TIME,
      tags: [`${seokey}`],
    }
  )();
}
