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
      heading: "Test heading test heading1",
      para: "test para test this is a para this is a para this is a para para1",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-5Ji2hus-Az7tBv90olflynKz9CFQp-HcSA&s",
      link: "/",
    },
    {
      heading: "Test heading test heading this is a heading this is a heading2",
      para: "test para test this is a para this is a para this is a para para2",
      image:
        "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      link: "/",
    },
    {
      heading: "Test heading test heading3",
      para: "test para test this is a para this is a para this is a para para3",
      image:
        "https://imgmedia.lbb.in/media/2022/01/61daa11cd966c63a4d39fd17_1641718044595.jpg",
      link: "/",
    },
    {
      heading: "Test heading test heading4",
      para: "test para test this is a para this is a para this is a para para4",
      image:
        "https://www.jiomart.com/images/product/original/rvxl0fngu9/overspread-interior-hub-stylish-flower-design-metal-wall-art-decor-for-living-room-bedroom-kids-room-kitchen-office-wall-hanging-decoration-items-for-home-decor-size-45-x-38-cm-black-medium-product-images-orvxl0fngu9-p604578094-2-202309221750.png?im=Resize=(420,420)",
      link: "/",
    },
    {
      heading: "Test heading test heading5",
      para: "test para test this is a para this is a para this is a para para5",
      image:
        "https://images.jdmagicbox.com/rep/b2b/wall-paper/wall-paper-11.jpg",
      link: "/",
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
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`group w-6 aspect-square cursor-pointer flex items-center justify-center`}
              onClick={() => setslidenumber(i)}
            >
              <div
                className={`aspect-square rounded-full bg-white grid place-content-center duration-500 lg:group-hover:h-full lg:group-hover:bg-opacity-50 ${
                  slidenumber == i ? "bg-opacity-50 h-full" : "bg-opacity-0 h-2"
                }`}
              >
                <div className="h-2 aspect-square bg-white rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Herosection;
