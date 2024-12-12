import React from "react";
import Link from "next/link";
import { IoLogoFacebook, IoLogoPinterest } from "react-icons/io5";
import { TbLink } from "react-icons/tb";
import { RiTwitterXLine } from "react-icons/ri";
import { GoShareAndroid } from "react-icons/go";
import Underlineeffect from "@/app/_globalcomps/Underlineeffect";

function Sharebutton() {
  const list = [
    {
      title: "Facebook",
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        "http://localhost:3000/product"
      )}`,
      icon: <IoLogoFacebook />,
    },
    {
      title: "Twitter",
      link: `https://twitter.com/share?url=${encodeURIComponent(
        "http://localhost:3000/product"
      )}&text=${encodeURIComponent("test description")}`,
      icon: <RiTwitterXLine />,
    },
    {
      title: "Pinterest",
      link: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
        "http://localhost:3000/product"
      )}&media=${encodeURIComponent(
        "https://m.media-amazon.com/images/I/71krpsKgcTL._AC_UF894,1000_QL80_.jpg"
      )}&description=${encodeURIComponent("test description")}`,
      icon: <IoLogoPinterest />,
    },
  ];
  return (
    <div className="group relative flex items-center gap-2 text-theme lg:hover:text-black cursor-pointer">
      <GoShareAndroid className="text-2xl" />
      <p className="relative">Share</p>
      <div className="absolute top-0 right-0 w-full hidden group-hover:block">
        <div className="w-44 mt-10 float-right px-5 py-4 bg-white text-theme border border-theme">
          {list.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 flex items-center gap-3"
            >
              <span>{item.icon}</span>
              <span className="text-black">
                <Underlineeffect title={item.title} />
              </span>
            </Link>
          ))}
          <div className="py-2 flex items-center gap-3">
            <TbLink />
            <Link href="" className="text-black">
              <Underlineeffect title={"Copy Link"} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sharebutton;
