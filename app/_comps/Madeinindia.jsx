"use client";
import React, { useEffect } from "react";
import Link from "next/link";

function Madeinindia() {
  // Array of Instagram post URLs
  const posts = [
    "https://www.instagram.com/reel/DJ1PYaWvduu/?utm_source=ig_web_copy_link&igsh=MWNocDdndzU1N3R2dA==",
    "https://www.instagram.com/reel/DKmW_51Pfz8/?utm_source=ig_web_copy_link&igsh=azZ5NncyOWZyeWdm",
    "https://www.instagram.com/reel/DLy_adZvUfa/?utm_source=ig_web_copy_link&igsh=bW1iODltZXA4cXh6",
    "https://www.instagram.com/reel/DLo17A9P9fG/?utm_source=ig_web_copy_link&igsh=MTR4NTlqNjNwdzVyOA==",
    "https://www.instagram.com/reel/DLmSVUdvxG8/?utm_source=ig_web_copy_link&igsh=aTNuYjFmajY5enM4",
    "https://www.instagram.com/reel/DLZr10fv9-Y/?utm_source=ig_web_copy_link&igsh=d2FjcGgzZGQzeHlh",
  ];

  // Function to load Instagram Embed Script
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
        <img
          src="/uiimages/madeinindiaimage.jpg"
          alt="Made in India"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute flex flex-col justify-center gap-5 inset-0 text-white p-5 md:p-10">
          <h2 className="font-tenor text-4xl md:text-6xl">
            Proudly Made in India!
          </h2>
          <p>
            We take great pride in relying solely on Indian resources and
            skilled manpower throughout our supply chain.
          </p>
        </div>
      </div>

      {/* Instagram Section */}
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
          {/* Dynamically map posts */}
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
