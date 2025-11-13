"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import { Googlereviews } from "./Googlereviewslist";
import { PiSealCheckFill } from "react-icons/pi";
import Link from "next/link";
import { RxCross1 } from "react-icons/rx";

function Staticgooglereview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const [showfullimage, setshowfullimage] = useState({
    show: false,
    index: 0,
    imageindex: 0,
  });

  const DOT_WINDOW = 7; // total dots to show at a time

  const start = Math.max(0, activeIndex - Math.floor(DOT_WINDOW / 2));
  const end = Math.min(Googlereviews.length, start + DOT_WINDOW);

  const visibleDots = Googlereviews.slice(start, end);

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div className="max-w-7xl w-full p-2 md:px-10">
          {/* header */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-0">
            <div className="flex items-center gap-2">
              <p className="text-5xl font-semibold">4.2</p>
              <div>
                <p>
                  ⭐⭐⭐⭐<span className="saturate-0">⭐</span>
                </p>
                <div className="text-sm">
                  175+ reviews on <GoogleLogo />
                </div>
              </div>
            </div>
            <div className="flex items-end">
              <Link
                href={
                  "https://www.google.com/search?sca_esv=b1a2f407046ddbac&hl=en-IN&gl=in&sxsrf=AE3TifP7Deo3cKKQxu5ewAzDzJClO8uPwQ:1763008175350&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E2xpsWdJePmn4ClPeQmYdO_gv4lcY_AJ_SNbrxm9ebNPOtsAZhjQLV8h3Ys_I6f9tRylupa5t7yl_1AduaOeTkM43Bgn&q=UrbanFry+Homes+Reviews&sa=X&ved=2ahUKEwiylZygpe6QAxXNzDgGHcG2JbgQ0bkNegQIJBAE&biw=1707&bih=735&dpr=1.13"
                }
                className="bg-blue-600 text-white px-5 py-2 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                Review us on Google
              </Link>
            </div>
          </div>
          {/* swiper */}
          <div className="relative w-full group mt-10">
            <Swiper
              ref={swiperRef}
              modules={[Navigation]}
              spaceBetween={20}
              breakpoints={{
                0: {
                  slidesPerView: 1, // Mobile
                },
                530: {
                  slidesPerView: 2, // Mobile
                },
                768: {
                  slidesPerView: 3, // Tablet
                },
                1024: {
                  slidesPerView: 5, // Desktop
                },
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
              {Googlereviews.map((review, i) => {
                const iscut = review?.comment?.length > 80;
                return (
                  <SwiperSlide key={i}>
                    <div
                      className={`w-full rounded-md bg-[#f6f6f8] p-5 min-h-[400px]`}
                    >
                      <Link
                        href={review.profilelink}
                        className="flex items-center gap-3"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="relative flex items-center justify-center w-10 aspect-square">
                          <img
                            src={review.profileimage}
                            alt={review.name}
                            className="h-full w-full rounded-full"
                          />
                          <img
                            src="data:image/png;base64,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"
                            alt=""
                            className="w-5 aspect-square rounded-full absolute -bottom-1 -right-1"
                          />
                        </div>
                        <div>
                          <p className="flex items-center gap-2">
                            <span className="font-semibold">
                              {review.name.length > 10
                                ? review.name.substring(0, 9) + "..."
                                : review.name}
                            </span>
                            <PiSealCheckFill className="text-blue-600" />
                          </p>
                          <p className="text-xs opacity-70">{review.date}</p>
                        </div>
                      </Link>
                      <p className="mt-3">
                        {new Array(review.rating).fill("").map((_, i) => (
                          <span key={i}>⭐</span>
                        ))}
                      </p>
                      <p
                        className={`whitespace-pre-line text-sm  ${
                          review.images.length > 0
                            ? iscut
                              ? "line-clamp-3"
                              : ""
                            : "line-clamp-[10]"
                        }`}
                      >
                        {review?.comment}
                      </p>
                      {iscut && (
                        <button
                          className="text-blue-600 text-sm hover:underline w-fit py-2"
                          onClick={() =>
                            setshowfullimage({
                              show: true,
                              index: i,
                              imageindex: 0,
                            })
                          }
                        >
                          Read more
                        </button>
                      )}
                      {review.images.length > 0 && (
                        <Imagescomp
                          images={review.images}
                          i={i}
                          setshowfullimage={setshowfullimage}
                        />
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
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
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex z-10">
              {visibleDots.map((_, i) => {
                const actualIndex = start + i;
                return (
                  <button
                    key={actualIndex}
                    onClick={() =>
                      swiperRef.current.swiper.slideToLoop(actualIndex)
                    }
                    className="p-1"
                  >
                    <span
                      className={`block h-1 rounded-full bg-theme duration-150 ${
                        actualIndex === activeIndex ? "w-8" : "w-1"
                      }`}
                    ></span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* fullimage preview */}
      <AnimatePresence>
        {showfullimage?.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 h-screen w-full top-0 left-0 z-20 bg-black/20 flex items-center justify-center p-2 md:p-10"
          >
            <Fullreview
              showfullimage={showfullimage}
              setshowfullimage={setshowfullimage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Imagescomp({ images, i, setshowfullimage }) {
  return (
    <div
      className={`w-full aspect-square mt-2 grid ${
        images.length == 1 ? "grid-cols-1" : "grid-cols-2"
      } gap-1`}
    >
      {images.slice(0, 4).map((image, index) => {
        const isTwo = images.length === 2;
        const isThree = images.length === 3 && index === 0;

        const aspectClass = isTwo
          ? "aspect-[1/2]"
          : isThree
          ? "aspect-[1/2]"
          : "aspect-square";

        const spanClass = isThree ? "row-span-2" : "";
        return (
          <div
            key={index}
            className={`relative w-full overflow-hidden rounded cursor-pointer ${aspectClass} ${spanClass}`}
            onClick={() => {
              setshowfullimage({ show: true, index: i, imageindex: index });
            }}
          >
            <img
              src={image.low}
              alt=""
              className={`w-full h-full object-cover `}
            />
            {images.length > 4 && index == 3 && (
              <div className="absolute h-full w-full top-0 left-0 z-10 bg-black/15 flex items-center justify-center font-semibold text-2xl text-white">
                +{images.length - 4}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function GoogleLogo() {
  return (
    <div
      className="inline-flex items-baseline gap-[0.02em] select-none"
      aria-label="Google logo"
    >
      <span className="text-[#4285F4] font-semibold">G</span>
      <span className="text-[#DB4437]">o</span>
      <span className="text-yellow-400">o</span>
      <span className="text-[#4285F4] font-semibold">g</span>
      <span className="text-[#0F9D58]">l</span>
      <span className="text-[#DB4437]">e</span>
    </div>
  );
}

function Fullreview({ showfullimage, setshowfullimage }) {
  const selectedreview = Googlereviews[showfullimage?.index];
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideToLoop(showfullimage.imageindex);
      setActiveIndex(showfullimage.imageindex);
    }
  }, [showfullimage.show]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.3 }}
      className="relative w-full max-w-5xl h-full bg-white py-10 px-5 md:px-10 md:py-10"
    >
      <div className="flex flex-col md:flex-row justify-center w-full h-full gap-5">
        {/* images */}
        {selectedreview.images.length > 0 && (
          <div className="flex-1 w-full md:w-1/2 aspect-square">
            {true && (
              <div className="relative w-full group">
                <Swiper
                  ref={swiperRef}
                  modules={[Navigation]}
                  spaceBetween={0}
                  slidesPerView={1}
                  loop
                  initialSlide={selectedreview.imageindex}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                >
                  {selectedreview.images.map((image, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className={`w-full aspect-square`}>
                          <img
                            src={image.high}
                            alt=""
                            className="w-full h-full object-contain bg-black"
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
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
                  {selectedreview.images.map((_, i) => (
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
            )}
          </div>
        )}
        {/* review */}
        <div className="w-full md:w-96 h-full overflow-y-auto">
          <Link
            href={selectedreview.profilelink}
            className="flex items-center gap-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="relative flex items-center justify-center w-10 aspect-square">
              <img
                src={selectedreview.profileimage}
                alt={selectedreview.name}
                className="h-full w-full rounded-full"
              />
              <img
                src="data:image/png;base64,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"
                alt=""
                className="w-5 aspect-square rounded-full absolute -bottom-1 -right-1"
              />
            </div>
            <div>
              <p className="flex items-center gap-2">
                <span className="font-semibold">{selectedreview.name}</span>
                <PiSealCheckFill className="text-blue-600" />
              </p>
              <p className="text-xs opacity-70">{selectedreview.date}</p>
            </div>
          </Link>
          <p className="mt-3">
            {new Array(selectedreview.rating).fill("").map((_, i) => (
              <span key={i}>⭐</span>
            ))}
          </p>
          <p className={`whitespace-pre-line text-sm`}>
            {selectedreview?.comment}
          </p>
          {/* reply */}
          {selectedreview?.reply && (
            <div className="border-l pl-5 mt-5">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-10 aspect-square">
                  <img
                    src="/uiimages/logo.png"
                    alt="Urbanfry Homes logo"
                    className="h-full w-full rounded-full"
                  />
                </div>
                <div>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">Urbanfry Homes</span>
                    <span className="text-[10px] bg-gray-200 py-0.5 px-2 rounded-lg font-semibold">
                      OWNER REPLY
                    </span>
                  </p>
                </div>
              </div>
              <p className="whitespace-pre-line text-sm">
                {selectedreview?.reply}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* cancel button */}
      <button
        className="group h-14 aspect-square absolute top-0 right-0 flex items-center justify-center z-10"
        onClick={() =>
          setshowfullimage({ show: false, index: 0, imageindex: 0 })
        }
      >
        <RxCross1 className="text-2xl lg:group-hover:rotate-90 duration-300" />
      </button>
    </motion.div>
  );
}

export default Staticgooglereview;
