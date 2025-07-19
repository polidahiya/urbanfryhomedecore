"use client";
import React, { useState, useRef } from "react";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Fullimage from "./Fullimage";
import { FaAngleLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";

function Imagescomp({ images, name }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const [showfullimage, setshowfullimage] = useState({ show: false, index: 0 });

  return (
    <>
      <div className="relative w-full group">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          speed={1000}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {images.map((image, i) => (
            <SwiperSlide key={i}>
              <Nextimage
                src={image || "/uiimages/404.avif"}
                alt={name.replace(/-/g, " ") + i}
                height={500}
                width={500}
                className={`w-full aspect-square object-cover  border cursor-zoom-in`}
                onClick={() => setshowfullimage({ show: true, index: i })}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          className="hidden  absolute left-5 top-1/2 transform -translate-y-1/2 w-12 aspect-square md:flex items-center justify-center bg-white text-theme opacity-30 lg:group-hover:opacity-100 duration-300 rounded-full z-10"
          onClick={() => swiperRef.current.swiper.slidePrev()}
          aria-label="Scroll Left"
          title="Scroll Left"
        >
          <FaAngleLeft />
        </button>
        <button
          className="hidden  absolute right-5 top-1/2 transform -translate-y-1/2 w-12 aspect-square md:flex items-center justify-center bg-white text-theme opacity-30 lg:group-hover:opacity-100 duration-300 rounded-full  rotate-180 z-10"
          onClick={() => swiperRef.current.swiper.slideNext()}
          aria-label="Scroll Right"
          title="Scroll Right"
        >
          <FaAngleLeft />
        </button>

        {/* custom pagination */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex z-10">
          {images.map((_, i) => (
            <button
              key={i}
              className={`flex items-center justify-center p-1`}
              onClick={() => swiperRef.current.swiper.slideTo(i)}
              aria-label="Index"
              title="Index"
            >
              <span
                className={`block h-1 rounded-full bg-white duration-150 ${
                  i === activeIndex ? "w-8" : "w-1"
                }`}
              ></span>
            </button>
          ))}
        </div>
      </div>
      {/* mini images */}
      <div className="grid grid-cols-5 md:grid-cols-6 gap-2 w-full mt-5">
        {images.map((image, i) => (
          <Nextimage
            key={i}
            src={image || "/uiimages/404.avif"}
            alt={name.replace(/-/g, " ") + i}
            height={100}
            width={100}
            className={`w-full aspect-square object-cover border cursor-pointer ${
              activeIndex === i && "border-theme"
            }`}
            onClick={() => swiperRef.current.swiper.slideTo(i)}
          />
        ))}
      </div>
      {/* fullimage preview */}
      {showfullimage.show && (
        <Fullimage
          images={images}
          name={name}
          showfullimage={showfullimage}
          setshowfullimage={setshowfullimage}
        />
      )}
    </>
  );
}

export default Imagescomp;
