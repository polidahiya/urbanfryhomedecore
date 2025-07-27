"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Nextimage from "../_globalcomps/Nextimage";

const posts = [
  "https://www.instagram.com/p/DKW0dOMP9yl/?utm_source=ig_web_copy_link&igsh=eGY3emN2cjMzMzZ6",
  "https://www.instagram.com/p/DJJiAVBvjL6/?utm_source=ig_web_copy_link&igsh=OHZ4bDVwbzl0a3Ry",
  "https://www.instagram.com/p/DMDJVo0P6AT/?utm_source=ig_web_copy_link&igsh=MXUwcXdtMTB2cmp6NA==",
  "https://www.instagram.com/p/DIf0e6jPHXG/?utm_source=ig_web_copy_link&igsh=MTEyYXMwZnRreWpzZQ==",
  "https://www.instagram.com/p/DHaCd2INpOe/?utm_source=ig_web_copy_link&igsh=MTBzdWtpOGF5ZzBsNQ==",
  "https://www.instagram.com/p/DJL01gYPSna/?utm_source=ig_web_copy_link&igsh=MWVqbWg2MDRuZnc2Zw==",
];
const imagesizes = {
  mobile: { height: 400, width: 400 },
  tablet: { height: 400, width: 900 },
  desktop: { height: 400, width: 1920 },
};
function Madeinindia({ device }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="pt-10 w-full">
      {/* Hero Section */}
      <div className="relative w-full h-96">
        <Nextimage
          src="/uiimages/madeinindiaimage.jpg"
          alt="Made in India"
          height={imagesizes[device].height || 400}
          width={imagesizes[device].width || 400}
          className="absolute inset-0 h-full w-full object-cover brightness-50"
        />
        <div className="absolute flex flex-col justify-center lg:justify-end gap-5 inset-0 text-white p-5 md:p-10">
          <h2 className="font-tenor text-4xl md:text-6xl">
            Proudly Made in India!
          </h2>
          <p>
            We take great pride in relying solely on Indian resources and
            skilled manpower throughout our supply chain.
          </p>
        </div>
      </div>

      <div className="bg-theme w-full">
        <div className="flex items-center justify-center gap-1 w-full text-white font-semibold p-10">
          Follow us on instagram{" "}
          <Link
            href="https://www.instagram.com/urbanfryhomes?utm_source=ig_web_button_share_sheet&igsh=NW0wdGx5NXVoYzZm"
            className="underline"
          >
            @urbanfryhomes
          </Link>
        </div>
        <div className="flex items-start gap-5 px-5 w-full overflow-x-scroll snap-mandatory snap-x snap-always">
          {posts.map((postUrl, index) => (
            <div key={index} className="snap-center">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={postUrl}
                data-instgrm-version="14"
              ></blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Madeinindia;
