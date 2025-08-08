"use client";
import React, { useRef, useState, useEffect } from "react";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { RxCross1 } from "react-icons/rx";

function Fullimage({ images, name, showfullimage, setshowfullimage }) {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(showfullimage.index || 0);

  // Function to scroll left
  const scrollLeft = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      scrollToImage(newIndex);
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (currentIndex < images.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      scrollToImage(newIndex);
    }
  };

  // Scroll to the image at the given index
  const scrollToImage = (index, behavior = true) => {
    if (scrollRef.current) {
      const imageElement = scrollRef.current.children[index];
      imageElement.scrollIntoView({
        behavior: behavior ? "smooth" : "auto",
        inline: "center", // This will scroll the image into view and center it
      });
    }
  };

  // Track scroll position and update currentIndex
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const imageWidth = scrollRef.current.children[0].offsetWidth;
      const newIndex = Math.round(scrollPosition / imageWidth);
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    //initial scroll to the image
    scrollToImage(showfullimage.index, false);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      <div
        className="flex items-center h-screen w-full overflow-x-scroll snap-x snap-mandatory hidescroll"
        ref={scrollRef}
      >
        {images.map((image, i) => (
          <Nextimage
            key={i}
            src={image}
            alt={name.replace(/-/g, " ")}
            height={1000}
            width={1000}
            quality={100}
            loading="lazy"
            className="min-w-full w-full h-full object-contain snap-center snap-always"
          />
        ))}
      </div>
      {/* Back button */}
      <button
        className="absolute top-0 right-0 p-5 md:p-10 group"
        onClick={() => setshowfullimage((pre) => ({ ...pre, show: false }))}
      >
        <RxCross1 className="text-3xl lg:group-hover:rotate-90 duration-300" />
      </button>
      {/* Left and Right scroll buttons */}
      <button
        className={`absolute left-2 md:left-10 top-1/2 transform -translate-y-1/2 p-5 lg:hover:-translate-x-1 duration-300 text-theme text-3xl z-10
            ${currentIndex === 0 && "hidden"}`}
        onClick={scrollLeft}
      >
        &lt; {/* Left Arrow */}
      </button>
      <button
        className={`absolute right-2 md:right-10 top-1/2 transform -translate-y-1/2 p-5 lg:hover:translate-x-1 duration-300 text-theme text-3xl z-10
            ${currentIndex === images.length - 1 && "hidden"}`}
        onClick={scrollRight}
      >
        &gt; {/* Right Arrow */}
      </button>
      {/* dots */}
      <div className="absolute bottom-5 left-0 w-full flex items-center justify-center">
        {images.map((_, i) => (
          <button
            key={i}
            className={`flex items-center justify-center p-1`}
            onClick={() => {
              setCurrentIndex(i);
              scrollToImage(i);
            }}
          >
            <span
              className={`block h-1 rounded-full bg-white duration-150 ${
                i === currentIndex ? "w-8" : "w-1"
              }`}
            ></span>
          </button>
        ))}
      </div>
    </>
  );
}

export default Fullimage;
