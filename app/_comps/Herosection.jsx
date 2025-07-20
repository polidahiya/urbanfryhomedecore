"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { FaAngleLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Controller, Autoplay, Parallax } from "swiper/modules"; // Import Controller module
import "swiper/css";

const slides = [
  {
    heading: "Altorganisers : Redefining Spaces",
    para: "Get ready to organize your space like never before",
    image: "/heroimages/1.jpg",
    link: "/collections/all",
  },
  {
    heading: "Nursery, Crafted with love",
    para: "Keep your little one’s space tidy and adorable with our wooden nursery organizers",
    image: "/heroimages/2.jpg",
    link: "/collections/rooms/Nursery",
  },
  {
    heading: "Brew in Style with Our Coffee Organizers",
    para: "Stylish wooden organizers for the ultimate home coffee bar.",
    image: "/heroimages/3.jpg",
    link: "/collections/rooms/Living-Room",
  },
  {
    heading: "AltOrganisers Wall Art",
    para: "Minimalist art that speaks volumes",
    image: "/heroimages/4.jpg",
    link: "/collections/categories/Photo-Frames",
  },
  {
    heading: "Style up with our shelves",
    para: "Bring home pieces that bring joy to everyday moments",
    image: "/heroimages/5.jpg",
    link: "/collections/categories/Wall-Shelves",
  },
];

function ImageSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const textSwiperRef = useRef(null);
  const imageSwiperRef = useRef(null);

  // Sync controllers after both swipers are initialized
  useEffect(() => {
    if (textSwiperRef.current && imageSwiperRef.current) {
      textSwiperRef.current.controller.control = imageSwiperRef.current;
      imageSwiperRef.current.controller.control = textSwiperRef.current;
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full h-svh">
      <div className="w-full md:w-1/2 h-full">
        <Swiper
          onSwiper={(swiper) => (imageSwiperRef.current = swiper)}
          modules={[Navigation, Autoplay, Parallax, Controller]}
          spaceBetween={0}
          slidesPerView={1}
          loop
          speed={1300}
          parallax={true}
          className="w-full h-full"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <Nextimage
                height={600}
                width={600}
                src={slide.image}
                alt={slide.heading}
                priority={i == 0 ? true : false}
                loading={i == 0 ? "eager" : "lazy"}
                className="h-full min-w-full object-cover"
              ></Nextimage>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Second Swiper (with controls) */}
      <div className="relative w-full md:w-1/2 h-full">
        <Swiper
          onSwiper={(swiper) => (textSwiperRef.current = swiper)}
          modules={[Navigation, Autoplay, Parallax, Controller]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          speed={1300}
          parallax={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                key={index}
                className="w-full h-full px-14 flex flex-col items-center justify-center bg-theme text-white"
              >
                <h2 className="text-4xl lg:text-6xl font-tenor w-full min-w-full text-center">
                  {slide.heading}
                </h2>
                <p
                  className="mt-5 lg:mt-3 w-full min-w-full text-sm lg:text-base text-center"
                  data-swiper-parallax="-150"
                >
                  {slide.para}
                </p>

                {/* Slide in the link with delay */}
                <div
                  className="w-full min-w-full mt-10 flex items-center justify-center"
                  data-swiper-parallax="-300"
                >
                  <Link
                    href={slide.link}
                    className="bg-white text-theme px-10 py-4 border block w-fit border-white lg:hover:bg-transparent lg:hover:text-white duration-300"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          className="hidden absolute left-5 top-1/2 transform -translate-y-1/2 w-12 aspect-square text-white md:flex items-center justify-center z-10"
          onClick={() => textSwiperRef.current?.slidePrev()}
          aria-label="Scroll Left"
          title="Scroll Left"
        >
          <FaAngleLeft />
        </button>
        <button
          className="hidden absolute right-5 top-1/2 transform -translate-y-1/2 w-12 aspect-square text-white md:flex items-center justify-center rotate-180 z-10"
          onClick={() => textSwiperRef.current?.slideNext()}
          aria-label="Scroll Right"
          title="Scroll Right"
        >
          <FaAngleLeft />
        </button>

        {/* custom pagination */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`flex items-center justify-center p-1`}
              onClick={() => {
                if (textSwiperRef.current) {
                  textSwiperRef.current.slideTo(i);
                }
              }}
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
    </div>
  );
}

export default ImageSwiper;
