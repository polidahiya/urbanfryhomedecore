"use client";
import React from "react";
import { Inhomecontextfn } from "../Context";
import Nextimage from "@/app/_globalcomps/Nextimage";

function Fullimage() {
  const { fullimage, setfullimage, initialfullimagestate } = Inhomecontextfn();

  return (
    <>
      {fullimage?.show && (
        <div className="fixed min-h-dvh w-full top-0 left-0 flex items-center justify-center bg-black/30 z-30 px-2">
          <div onClick={() => setfullimage(initialfullimagestate)}>
            <Nextimage
              src={fullimage?.data?.images[0]}
              alt={fullimage?.data?.title}
              width={500}
              height={500}
              className="w-full aspect-[3/4] object-cover cursor-zoom-in"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Fullimage;
