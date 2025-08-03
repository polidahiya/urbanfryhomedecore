"use client";
import React, { useState } from "react";
import Image from "next/image";

function Nextimage({ blurDataURL = "/uiimages/loadingimage.gif", ...props }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Image
      {...props}
      onError={() => setImgError(true)}
      loading={!props.priority ? "lazy" : "eager"}
      title={props?.alt || "Image"}
      unoptimized={imgError}
      placeholder="blur"
      blurDataURL={blurDataURL}
    />
  );
}

export default Nextimage;
