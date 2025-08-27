"use client";
import React, { useState, useRef, useEffect } from "react";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Fullimage from "./Fullimage";
import { FaAngleLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { AppContextfn } from "@/app/Context";
import { Productctxfn } from "../Productcontext";
import "swiper/css";

function Imagescomp({ images, name }) {
  const { setquickviewclosebutton } = AppContextfn();
  const { selectedImageIndex } = Productctxfn();
  images.length == 0 ? (images = ["/uiimages/404.jpg"]) : images;
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const [showfullimage, setshowfullimage] = useState({ show: false, index: 0 });

  useEffect(() => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideToLoop(selectedImageIndex);
      setActiveIndex(selectedImageIndex);
    }
  }, [selectedImageIndex]);

  useEffect(() => {
    setquickviewclosebutton(!showfullimage.show);
  }, [showfullimage.show]);

  return (
    <>
      <div className="">
        <div className="relative w-full group ">
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            speed={1000}
            loop
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {images.map((image, i) => (
              <SwiperSlide key={i}>
                <Nextimage
                  src={image || "/uiimages/404.jpg"}
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
                onClick={() => swiperRef.current.swiper.slideToLoop(i)}
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
      {/* mini images */}
      <div className="grid grid-cols-5 md:grid-cols-6 gap-2 w-full mt-5 px-5 md:px-10">
        {images.map((image, i) => (
          <Nextimage
            key={i}
            src={image || "/uiimages/404.jpg"}
            alt={name.replace(/-/g, " ") + i}
            height={100}
            width={100}
            className={`w-full aspect-square object-cover border cursor-pointer ${
              activeIndex === i && "border-theme"
            }`}
            onClick={() => swiperRef.current.swiper.slideToLoop(i)}
          />
        ))}
      </div>
      {/* fullimage preview */}
      <AnimatePresence>
        {showfullimage?.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 left-0 z-20 bg-white"
          >
            <Fullimage
              images={images}
              name={name}
              showfullimage={showfullimage}
              setshowfullimage={setshowfullimage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Imagescomp;
