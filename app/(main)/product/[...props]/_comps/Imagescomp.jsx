"use client";
import React, { useState } from "react";
import Image from "next/image";
import Fullimage from "./Fullimage";

function Imagescomp({ images, name }) {
  const [showfullimage, setshowfullimage] = useState({ show: false, index: 0 });
  const imageclasses = {
    1: ["col-span-4"],
    2: ["col-span-2", "col-span-2"],
    3: ["col-span-2", "col-span-2", "col-span-4"],
    4: ["col-span-2", "col-span-2", "col-span-2", "col-span-2"],
    5: ["col-span-4", "col-span-1", "col-span-1", "col-span-1", "col-span-1"],
    6: [
      "col-span-2",
      "col-span-2",
      "col-span-1",
      "col-span-1",
      "col-span-1",
      "col-span-1",
    ],
    7: [
      "col-span-4",
      "col-span-2",
      "col-span-2",
      "col-span-1",
      "col-span-1",
      "col-span-1",
      "col-span-1",
    ],
  };

  return (
    <div className="grid grid-cols-4 gap-1">
      {images?.map((image, i) => (
        <Image
          src={image || "/uiimages/404.avif"}
          alt={name.replace(/-/g, " ")}
          key={i}
          height={800}
          width={800}
          className={`${
            images.length <= 7 ? imageclasses[images.length][i] : " col-span-2"
          } w-full aspect-square object-cover  border cursor-zoom-in`}
          onClick={() => setshowfullimage({ show: true, index: i })}
        />
      ))}
      {/* fullimage preview */}
      {showfullimage.show && (
        <Fullimage
          images={images}
          name={name}
          showfullimage={showfullimage}
          setshowfullimage={setshowfullimage}
        />
      )}
    </div>
  );
}

export default Imagescomp;
