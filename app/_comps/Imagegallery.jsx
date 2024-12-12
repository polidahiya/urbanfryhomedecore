"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";

function Imagegallery() {
  const imagesScrollRef = useRef();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const list = [
    {
      heading: "Homes of Loops",
      para: "This is a test para",
      img: "https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-33d65a4/www.decorilla.com/online-decorating/wp-content/uploads/2019/06/modern-interior-design-grey-living-room2-2048x1365.jpeg",
      link: "/",
    },
    {
      heading: "Homes of Loops",
      para: "This is a test para",
      img: "https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-33d65a4/www.decorilla.com/online-decorating/wp-content/uploads/2019/06/modern-interior-design-grey-living-room2-2048x1365.jpeg",
      link: "/",
    },
    {
      heading: "Homes of Loops",
      para: "This is a test para",
      img: "https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-33d65a4/www.decorilla.com/online-decorating/wp-content/uploads/2019/06/modern-interior-design-grey-living-room2-2048x1365.jpeg",
      link: "/",
    },
    {
      heading: "Homes of Loops",
      para: "This is a test para",
      img: "https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-33d65a4/www.decorilla.com/online-decorating/wp-content/uploads/2019/06/modern-interior-design-grey-living-room2-2048x1365.jpeg",
      link: "/",
    },
  ];

  const handleImageScroll = (e) => {
    const index = Math.floor(
      (e.target.scrollLeft + e.target.clientWidth / 2) / e.target.clientWidth
    );
    setActiveImageIndex(index);
  };

  const moveToSlide = (index) => {
    if (imagesScrollRef.current) {
      const scrollPosition = index * imagesScrollRef.current.clientWidth;
      imagesScrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setActiveImageIndex(index);
    }
  };

  return (
    <div className="relative w-full">
      <div
        className="w-full flex items-center overflow-x-scroll snap-x scroll-smooth snap-mandatory hidescroll"
        ref={imagesScrollRef}
        onScroll={handleImageScroll}
      >
        {list.map((item, i) => (
          <div
            key={i}
            className="relative min-w-full snap-center overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-white z-10">
              <p className="text-4xl md:text-7xl font-tenor whitespace-nowrap tracking-tight">
                {item?.heading}
              </p>
              <p className="mt-4 font-normal">{item?.para}</p>
              <Link
                href={"/"}
                className={`border border-white px-10 py-4 mt-6 text-sm lg:hover:text-black lg:hover:bg-white duration-300`}
              >
                GALLERY
              </Link>
            </div>
            <img
              src={item?.img}
              alt=""
              className={`aspect-[3/4] md:aspect-[4/3] duration-1000 ease-out object-cover ${
                activeImageIndex == i ? "scale-100" : "scale-125"
              }`}
            />
          </div>
        ))}
      </div>
      {/* dotss */}
      <div className="absolute bottom-5 left-0 w-full flex items-center justify-center gap-4">
        {list.map((_, i) => (
          <div
            key={i}
            className="group w-6 aspect-square cursor-pointer flex items-center justify-center"
            onClick={() => moveToSlide(i)}
          >
            <div
              className={`aspect-square rounded-full bg-white grid place-content-center duration-500 lg:group-hover:h-full lg:group-hover:bg-opacity-50 ${
                activeImageIndex == i
                  ? "bg-opacity-50 h-full"
                  : "bg-opacity-0 h-2"
              }`}
            >
              <div className="h-2 aspect-square bg-white rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Imagegallery;
