import React from "react";
import Link from "next/link";

function Aboutus() {
  return (
    <div>
      <h2 className="font-tenor text-4xl md:text-6xl text-center pt-10">
        About Us
      </h2>
      <p className="text-justify md:text-center max-w-[900px] mx-auto px-5 mt-5">
        At Altorganisers, we are passionate about creating beautifully designed,
        functional storage solutions that enhance the lives of modern Indian
        women. We are a homegrown brand and we love bringing organization and
        aesthetic appeal to homes using eco-friendly, sustainable materials.
        Seeing our products make a positive impact on families and helping them
        create serene, organized spaces is what drives us every day.
      </p>
      <div className="flex items-center justify-center mt-8">
        <Link
          href={"/"}
          className="mx-auto px-10 py-4 bg-theme bg-opacity-80 lg:hover:bg-opacity-100 duration-300 text-white"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}

export default Aboutus;
