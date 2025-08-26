"use client";
import React, { useRef, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Controller, Parallax } from "swiper/modules"; // Import modules
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import RatingStars from "../(main)/product/[id]/_comps/_commentcomp/RatingStars";

function Customerreviews({ fivestarreviews }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      setTimeout(() => {
        if (swiperRef.current.navigation) {
          swiperRef.current.params.navigation.prevEl = prevRef.current;
          swiperRef.current.params.navigation.nextEl = nextRef.current;
          swiperRef.current.navigation.init();
          swiperRef.current.navigation.update();
        }
      });
    }
  }, []);

  return (
    <div className="my-12 relative max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-6xl font-tenor text-center">
        Let customers speak for us
      </h2>
      <p className="flex items-center justify-center mt-10">
        <RatingStars rating={5} />
      </p>
      <p className="text-center">From {fivestarreviews?.length} reviews</p>

      {/* Reviews */}
      <div className="my-8 mx-auto relative">
        <Swiper
          modules={[Navigation, Controller, Parallax]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          speed={1300}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => (swiperRef.current = swiper)} // Store swiper instance
          parallax={true}
          className="mySwiper flex-1 w-full"
        >
          {fivestarreviews.map((comment, i) => (
            <SwiperSlide key={i}>
              <div className="flex-1 min-w-full md:min-w-fit flex flex-col items-center gap-2 snap-center">
                <RatingStars rating={comment?.star} />
                <p className="text-theme mt-auto">{comment?.name}</p>
                <p className="text-center">{comment?.comment}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div
          ref={prevRef}
          className="custom-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-2xl text-theme"
        >
          <FaArrowLeft />
        </div>
        <div
          ref={nextRef}
          className="custom-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-2xl text-theme"
        >
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
}

export default Customerreviews;
