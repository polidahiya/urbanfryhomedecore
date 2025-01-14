"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

function Herosection() {
  const [slidenumber, setslidenumber] = useState(0);
  const sliderRef = useRef(null);
  const [isLocked, setIsLocked] = useState(false);
  const timerref = useRef(null);
  const autoscrolltime = 5000;

  const slides = [
    {
      heading: "Altorganisers : Redefining Spaces",
      para: "Get ready to organize your space like never before",
      image: "/heroimages/1.jpg",
      link: "/",
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

  const handleSlide = (direction) => {
    if (isLocked) return;
    setIsLocked(true);
    setTimeout(() => setIsLocked(false), 1300);
    starttimer();

    let newIndex = (slidenumber + direction + slides.length) % slides.length;
    setslidenumber(newIndex);

    // Scroll programmatically
    const slider = sliderRef.current;
    if (slider) {
      const slideWidth = slider.offsetWidth;
      slider.scrollTo({
        left: newIndex * slideWidth,
        behavior: "smooth",
      });
    }
  };

  const starttimer = () => {
    clearInterval(timerref.current);
    timerref.current = setInterval(() => {
      setslidenumber((pre) => (pre == slides.length - 1 ? 0 : pre + 1));
    }, autoscrolltime);
  };

  useEffect(() => {
    starttimer();
    return () => clearInterval(timerref.current);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-stretch w-full h-screen lg:max-h-screen min-h-[550px] overflow-hidden">
      {/* Image Section */}
      <section className="flex-1 lg:h-full overflow-hidden">
        <div
          ref={sliderRef}
          className="flex items-center h-full w-full"
          style={{
            transform: `translateX(-${slidenumber * 100}%)`,
            transition: "transform 1.2s ease",
          }}
        >
          {slides.map((slide, i) => (
            <img
              key={i}
              src={slide.image}
              alt={slide.heading}
              className="h-full min-w-full object-cover"
            />
          ))}
        </div>
      </section>
      {/* Content Section */}
      <section className="relative flex-1 flex overflow-x-hidden bg-theme text-white text-center">
        <div className="w-full lg:h-full flex">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="w-full min-w-full h-full flex flex-col items-center justify-center"
            >
              <h2
                className="text-2xl lg:text-6xl font-tenor w-full min-w-full px-10"
                style={{
                  transform: `translateX(-${slidenumber * 100}%)`,
                  transition:
                    slidenumber == i
                      ? "transform 1.2s ease"
                      : "transform 1.2s ease",
                }}
              >
                {slide.heading}
              </h2>
              <p
                className="mt-2 w-full min-w-full px-10 text-sm lg:text-base"
                style={{
                  transform: `translateX(-${slidenumber * 100}%)`,
                  transition:
                    slidenumber == i
                      ? "transform 1.2s 0.05s ease"
                      : "transform 1.2s 0s ease",
                }}
              >
                {slide.para}
              </p>

              {/* Slide in the link with delay */}
              <div
                className="w-full min-w-full px-10 mt-7 flex items-center justify-center"
                style={{
                  transform: `translateX(-${slidenumber * 100}%)`,
                  transition:
                    slidenumber == i
                      ? "transform 1.2s 0.1s ease"
                      : "transform 1.2s 0s ease",
                }}
              >
                <Link
                  href={slide.link}
                  className="bg-white text-theme px-10 py-4 border block w-fit border-white lg:hover:bg-transparent lg:hover:text-white duration-300"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <button
          className="flex items-center justify-center absolute top-1/2 left-5 -translate-y-1/2 text-3xl lg:hover:-translate-x-1 duration-300 text-white"
          onClick={() => handleSlide(-1)}
        >
          <IoIosArrowBack />
        </button>
        <button
          className="flex items-center justify-center absolute top-1/2 right-5 -translate-y-1/2 text-3xl lg:hover:translate-x-1 duration-300 text-white rotate-180"
          onClick={() => handleSlide(1)}
        >
          <IoIosArrowBack />
        </button>
        {/* dots */}
        <div className="absolute bottom-5 left-0 w-full flex items-center justify-center gap-4">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`relative group w-6 aspect-square cursor-pointer flex items-center justify-center`}
              onClick={() => setslidenumber(i)}
            >
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full  rounded-full bg-white duration-500 lg:group-hover:scale-100 lg:group-hover:bg-opacity-50 ${
                  slidenumber == i
                    ? "bg-opacity-50 scale-100"
                    : "bg-opacity-0 scale-0"
                }`}
              ></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 aspect-square bg-white rounded-full"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Herosection;
