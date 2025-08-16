import React from "react";
import Clientpage from "./Clientpage";
import Verification from "@/app/_connections/Verifytoken";
import { notFound } from "next/navigation";
import { getcollection } from "@/app/_connections/Mongodb";

async function page({ searchParams }) {
  const { edit = null } = await searchParams;

  const tokenres = await Verification("Blogs_permission");
  if (!tokenres?.verified) notFound();

  let editdata = null;
  if (edit) {
    try {
      const { blogscollection, ObjectId } = await getcollection();
      const blog = await blogscollection.findOne({ _id: new ObjectId(edit) });
      blog._id = blog._id.toString();
      editdata = blog;
    } catch (error) {
      console.log(error);
    }
  }

  return <Clientpage editdata={editdata} />;
}

export default page;
