import React from "react";
import Link from "next/link";

function Aboutus() {
  return (
    <div>
      <h2 className="font-tenor text-4xl md:text-6xl text-center pt-10">
        About Us
      </h2>
      <p className="text-justify md:text-center max-w-[900px] mx-auto px-5 mt-5">
        At Urbanfry Homes, we believe furniture is more than function—it’s a
        story of style, craft, and the warmth of a home well-lived. Born from a
        passion to bring timeless design and everyday utility together, we
        specialize in premium solid wood furniture that celebrates both
        durability and beauty.
      </p>
      <p className="text-justify md:text-center max-w-[900px] mx-auto px-5 mt-5">
        Every piece is thoughtfully designed to blend global aesthetics with
        Indian sensibilities—whether it’s the clean lines of Scandinavian
        minimalism, the cozy charm of bohemian spaces, or the natural textures
        of rattan and solid wood. Crafted with care and finished to perfection,
        our collections are made to last for generations.
      </p>
      <p className="text-justify md:text-center max-w-[900px] mx-auto px-5 mt-5">
        With Urbanfry Homes, you don’t just furnish a space—you curate an
        experience. From statement sideboards to cozy accent chairs, our designs
        add character, comfort, and aspiration to modern living.
      </p>
      <div className="flex items-center justify-center mt-8">
        <Link
          href={"/Aboutus"}
          className="mx-auto px-10 py-4 bg-theme bg-opacity-80 lg:hover:bg-opacity-100 duration-300 text-white"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}

export default Aboutus;
