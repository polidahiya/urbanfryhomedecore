"use client";
import React, { useRef, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import Productcard from "../../_globalcomps/_productcard/Productcard";

function Rightproducts({ selectedproducts }) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        speed={1300}
        className="w-full h-full"
      >
        {selectedproducts.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="flex items-center justify-center">
              <Productcard product={item} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        className="hidden absolute left-5 top-1/2 transform -translate-y-1/2 w-12 aspect-square text-theme md:flex items-center justify-center z-10"
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Scroll Left"
        title="Scroll Left"
      >
        <FaAngleLeft />
      </button>
      <button
        className="hidden absolute right-5 top-1/2 transform -translate-y-1/2 w-12 aspect-square text-theme md:flex items-center justify-center rotate-180 z-10"
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Scroll Right"
        title="Scroll Right"
      >
        <FaAngleLeft />
      </button>

      {/* Custom Pagination */}
      <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex z-10">
        {selectedproducts.map((_, i) => (
          <button
            key={i}
            className="flex items-center justify-center p-1"
            onClick={() => swiperRef.current?.slideToLoop(i)}
            aria-label="Index"
            title={`Go to slide ${i + 1}`}
          >
            <span
              className={`block h-1 rounded-full bg-theme duration-150 ${
                i === activeIndex ? "w-8" : "w-1"
              }`}
            ></span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Rightproducts;
