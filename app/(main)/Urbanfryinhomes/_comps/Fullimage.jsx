"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { Inhomecontextfn } from "../Context";
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

export default function Fullimage() {
  const { fullimage, setfullimage, initialfullimagestate } = Inhomecontextfn();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <AnimatePresence>
      {fullimage.show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed min-h-dvh w-full top-0 left-0 flex flex-col items-center justify-center bg-black/85 z-30 px-10"
        >
          <div className="absolute top-0 left-0 w-full z-10 flex items-center justify-between gap-5 px-2 md:px-10 md:py-5">
            <p className="text-2xl text-white line-clamp-1 pl-3">
              {fullimage?.data?.title}
            </p>
            <button
              className="group h-14 aspect-square flex items-center justify-center z-10 text-white"
              onClick={() => setfullimage(initialfullimagestate)}
            >
              <RxCross1 className="text-2xl lg:group-hover:rotate-90 duration-300" />
            </button>
          </div>

          {/*  */}
          <Swiper
            ref={swiperRef} // ✅ Attach ref here
            effect="cards"
            grabCursor
            modules={[EffectCards]}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full max-w-96 overflow-hidden"
          >
            {fullimage.data.images.map((item, i) => (
              <SwiperSlide
                key={i}
                className="rounded-3xl overflow-hidden h-full w-full"
              >
                <img
                  src={item}
                  alt={`Slide ${i + 1}`}
                  className="w-full aspect-[3/4] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination Dots */}
          <div className="flex space-x-2 z-10 mt-5">
            {fullimage.data.images.map((_, i) => (
              <button
                key={i}
                className={`h-[5px] rounded-full transition-all ${
                  i === activeIndex ? "bg-white w-8" : "bg-white/50 w-[5px]"
                }`}
                onClick={() => swiperRef.current.swiper.slideTo(i)}
              ></button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
