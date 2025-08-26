"use client";
import React from "react";
import Link from "next/link";
import { IoLogoFacebook, IoLogoPinterest } from "react-icons/io5";
import { TbLink } from "react-icons/tb";
import { RiTwitterXLine } from "react-icons/ri";
import { GoShareAndroid } from "react-icons/go";
import Underlineffect from "@/app/_globalcomps/Underlineffect";
import useDomain from "@/app/_globalcomps/_helperfunctions/Origin";
import copytoclipboard from "@/app/_globalcomps/_helperfunctions/Copytoclipboard";
import { AppContextfn } from "@/app/Context";

function Sharebutton({ sku, description, image }) {
  const { setmessagefn } = AppContextfn();
  const domain = useDomain();
  const list = [
    {
      title: "Facebook",
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        `${domain}/product/${sku}`
      )}`,
      icon: <IoLogoFacebook />,
    },
    {
      title: "Twitter",
      link: `https://twitter.com/share?url=${encodeURIComponent(
        `${domain}/product/${sku}`
      )}&text=${encodeURIComponent(description)}`,
      icon: <RiTwitterXLine />,
    },
    {
      title: "Pinterest",
      link: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
        `${domain}/product/${sku}`
      )}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(
        description
      )}`,
      icon: <IoLogoPinterest />,
    },
  ];
  // share page
  const handleSharePage = () => {
    const link = typeof window !== "undefined" ? new URL(location.href) : "";
    copytoclipboard(link, () => {
      setmessagefn("Link copied!");
    });
  };

  return (
    <div className="group relative flex items-center gap-2 text-theme lg:hover:text-black cursor-pointer mt-4 w-fit">
      <GoShareAndroid className="text-2xl" />
      <p className="relative">Share</p>
      <div className="absolute top-0 right-0 w-full hidden group-hover:block">
        <div className="w-44 mt-10 float-left px-5 py-4 bg-white text-theme text-sm border border-theme">
          {list.map((item, i) => (
            <Underlineffect
              key={i}
              Comp={({ innercomp }) => (
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 flex items-center gap-3"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-black">{innercomp}</span>
                </Link>
              )}
              title={item.title}
            />
          ))}
          <Underlineffect
            Comp={({ innercomp }) => (
              <div className="py-2 flex items-center gap-3">
                <TbLink className="text-lg" />
                <button className="text-black w-full" onClick={handleSharePage}>
                  {innercomp}
                </button>
              </div>
            )}
            title="Copy Link"
          />
        </div>
      </div>
    </div>
  );
}

export default Sharebutton;
