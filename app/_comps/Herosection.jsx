"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  Controller,
  Autoplay,
  Parallax,
} from "swiper/modules"; // Import Controller module
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "./ImageSwiper.css";

function ImageSwiper() {
  const swiper1Ref = useRef(null);
  const swiper2Ref = useRef(null);
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

  // Synchronize the two Swipers after both are mounted
  useEffect(() => {
    if (swiper1Ref.current && swiper2Ref.current) {
      swiper1Ref.current.controller.control = swiper2Ref.current;
      swiper2Ref.current.controller.control = swiper1Ref.current;
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <Swiper
        modules={[Controller, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        speed={1300}
        onSwiper={(swiper) => {
          swiper1Ref.current = swiper;
        }}
        className="mySwiper flex-1 w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <Image
              height={600}
              width={600}
              src={slide.image}
              alt={slide.heading}
              priority={i == 0 ? true : false}
              loading={i == 0 ? "eager" : "lazy"}
              className="h-full min-w-full object-cover"
            ></Image>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Second Swiper (with controls) */}
      <Swiper
        modules={[Pagination, Navigation, Controller, Autoplay, Parallax]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        speed={1300}
        pagination={{ clickable: true }}
        navigation
        onSwiper={(swiper) => {
          swiper2Ref.current = swiper;
        }}
        parallax={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="mySwiper flex-1 w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              key={index}
              className="w-full min-w-full h-full px-14 flex flex-col items-center justify-center bg-theme text-white"
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
    </div>
  );
}

export default ImageSwiper;
