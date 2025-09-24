"use client";
import React from "react";
import Script from "next/script";

function Tawk() {
  return (
    <Script
      id="tawk-script"
      strategy="afterInteractive" // ensures script runs only after hydration
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
          (function(){
            var s1 = document.createElement("script"),
                s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/68d3cab5a63efd1920230089/1j5tkvlmu';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1, s0);
          })();
        `,
      }}
    />
  );
}

export default Tawk;
