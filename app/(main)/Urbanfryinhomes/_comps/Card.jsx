"use client";
import React from "react";
import { MdModeEdit } from "react-icons/md";
import { Inhomecontextfn } from "../Context";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { AiOutlineDelete } from "react-icons/ai";
import { AppContextfn } from "@/app/Context";
import { Deletepost } from "../Serveraction";
import Revalidatepathfn from "@/app/_serveractions/Revalidatepathpn";

function Card({ haveaccess, post }) {
  const { setshowdialog } = AppContextfn();
  const { setshowinhomeform, setdata, setfullimage } = Inhomecontextfn();
  return (
    <div className="relative group">
      <div
        onClick={() => setfullimage({ show: true, data: post })}
      >
        <Nextimage
          src={post?.images[0]}
          alt={post?.title}
          width={300}
          height={300}
          className="w-full aspect-[3/4] object-cover cursor-zoom-in"
        />
      </div>
      <p className="text-center py-2 line-clamp-2">{post?.title}</p>
      {haveaccess && (
        <div className="absolute top-0 right-0 flex flex-col gap-2 lg:hidden lg:group-hover:flex p-1">
          <button
            className="bg-theme text-white rounded-full p-2"
            onClick={() => {
              setshowinhomeform(true);
              setdata(post);
            }}
          >
            <MdModeEdit />
          </button>
          <button
            className="bg-red-600 text-white rounded-full p-2"
            onClick={() => {
              setshowdialog({
                show: true,
                title: "Delete Post?",
                continue: async () => {
                  await Deletepost(post);
                  await Revalidatepathfn("/Urbanfryinhomes");
                },
                type: false,
              });
            }}
          >
            <AiOutlineDelete />
          </button>
        </div>
      )}
    </div>
  );
}

export default Card;
