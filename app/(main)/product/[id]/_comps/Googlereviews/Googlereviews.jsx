"use client";
import { useEffect } from "react";

export default function GoogleReviews() {
  useEffect(() => {
    // Check if script already exists
    if (document.getElementById("elfsight-platform-script")) return;

    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    script.id = "elfsight-platform-script";
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full mt-10">
      <div
        className="elfsight-app-40e0e9b6-11b4-48dc-8b33-69fcbb3c6d39"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
}
