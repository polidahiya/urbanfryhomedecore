import React from "react";
import Link from "next/link";

function Closeeffectlink({ title, link }) {
  return (
    <Link href={link} className="relative text-[#b0a099] group text-sm">
      {title}
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#b0a099] group-hover:w-0 duration-300"></span>
    </Link>
  );
}

export default Closeeffectlink;
