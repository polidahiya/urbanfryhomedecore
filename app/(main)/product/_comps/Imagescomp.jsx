import React from "react";

function Imagescomp() {
  const images = [
    "https://m.media-amazon.com/images/I/71krpsKgcTL._AC_UF894,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/71krpsKgcTL._AC_UF894,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/71krpsKgcTL._AC_UF894,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/71krpsKgcTL._AC_UF894,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/71krpsKgcTL._AC_UF894,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/71krpsKgcTL._AC_UF894,1000_QL80_.jpg",
  ];
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
  };

  return (
    <div className="grid grid-cols-4 gap-1 w-full">
      {images.map((image, i) => (
        <img
          src={image}
          key={i}
          className={`${imageclasses[images.length][i]} w-full`}
        />
      ))}
    </div>
  );
}

export default Imagescomp;
