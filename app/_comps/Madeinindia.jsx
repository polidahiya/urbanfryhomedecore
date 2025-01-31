"use client";
import React, { useEffect } from "react";
import Link from "next/link";

function Madeinindia() {
  // Array of Instagram post URLs
  const posts = [
    "https://www.instagram.com/p/C73-KyDvV9g/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    "https://www.instagram.com/p/C7398BtP3U_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    "https://www.instagram.com/p/C739ulpvyqy/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    "https://www.instagram.com/p/C7uf47AyJ0G/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    "https://www.instagram.com/p/C7t281HP02V/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
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
            href="https://www.instagram.com/altorganisers/"
            className="underline"
          >
            @AltOrganisers
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
