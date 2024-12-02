"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PiMoon } from "react-icons/pi";
import { LuSearch } from "react-icons/lu";
import Underlineeffect from "./Underlineeffect";

function Navbar() {
  const [shownav, setshownav] = useState(true);
  const [transparentnav, settransparentnav] = useState(true);
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      // set transparency
      settransparentnav(window.scrollY > 50 ? false : true);
      //
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setshownav(false);
      } else if (currentScrollY < lastScrollY) {
        setshownav(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed navhover top-0 left-0 w-full flex items-center px-10 h-20  hover:text-inherit hover:bg-white tracking-wider text-xs z-20 duration-300
        ${transparentnav ? "text-white" : "bg-white text-inherit"} ${
        shownav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Link href={"/"}>
        <img
          src="https://loopsbylj.com/cdn/shop/files/LOOPS_LOGO_White_90x@2x.png?v=1699016384"
          alt=""
          className={`navhoverlogo h-10 mr-2 ${!transparentnav && "invert"}`}
        />
      </Link>
      <div className="flex items-center h-full">
        {[
          "HOME",
          "AREA RUGS",
          "JOURNAL",
          "SHOP",
          "READY TO SHIP",
          "CUSTOMISATION",
        ].map((item, i) => (
          <Link
            key={i}
            href={"/"}
            className="group flex items-center justify-center px-[14px] h-full"
          >
            <Underlineeffect title={item} />
          </Link>
        ))}
      </div>
      <div className="h-full ml-auto flex items-center gap-6">
        <button>
          <PiMoon className="text-xl" />
        </button>
        <button className="group flex items-center gap-2">
          <LuSearch className="text-base" />
          <Underlineeffect title={"SEARCH"} />
        </button>
        <Link href={"/"} className="group">
          <Underlineeffect title={"ACCOUNT"} />
        </Link>
        <Link href={"/cart"} className="group flex items-center ">
          <Underlineeffect title={"CART"} />
          (0)
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
