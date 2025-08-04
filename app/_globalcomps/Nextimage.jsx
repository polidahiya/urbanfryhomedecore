"use client";
import React, { useState } from "react";
import Image from "next/image";

function Nextimage({ ...props }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Image
      {...props}
      onError={() => setImgError(true)}
      loading={!props.priority ? "lazy" : "eager"}
      title={props?.alt || "Image"}
      unoptimized={imgError}
    />
  );
}

export default Nextimage;
