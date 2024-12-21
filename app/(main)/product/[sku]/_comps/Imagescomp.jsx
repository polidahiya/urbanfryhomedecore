import React from "react";
import Image from "next/image";

function Imagescomp({ images, name }) {
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
    <div className="grid grid-cols-4 gap-1 w-full">
      {images.map((image, i) => (
        <Image
          src={image}
          alt={name.replace(/-/g, " ")}
          key={i}
          height={800}
          width={800}
          className={`${
            images.length <= 7 ? imageclasses[images.length][i] : " col-span-1"
          } w-full aspect-square object-cover  border`}
        />
      ))}
    </div>
  );
}

export default Imagescomp;
