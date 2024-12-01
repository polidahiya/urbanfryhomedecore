import React from "react";
import Link from "next/link";
import { PiMoon } from "react-icons/pi";
import { LuSearch } from "react-icons/lu";

function Navbar() {
  return (
    <nav className="test flex items-center md: px-10 h-20 bg-white tracking-wider text-xs ">
      <img
        src="https://loopsbylj.com/cdn/shop/files/LOOPS_LOGO_White_90x@2x.png?v=1699016384"
        alt=""
        className="h-10 mr-2 invert"
      />
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
            <Effectlink title={item} />
          </Link>
        ))}
      </div>
      <div className="h-full ml-auto flex items-center gap-6">
        <button>
          <PiMoon className="text-xl" />
        </button>
        <button className="group flex items-center gap-2">
          <LuSearch className="text-base" />
          <Effectlink title={"SEARCH"} />
        </button>
        <Link href={"/"} className="group">
          <Effectlink title={"ACCOUNT"} />
        </Link>
        <Link href={"/cart"} className="group flex items-center ">
          <Effectlink title={"CART"} />
          (0)
        </Link>
      </div>
    </nav>
  );
}

const Effectlink = ({ title }) => (
  <span className="relative ">
    {title}
    <span className="absolute bottom-0 right-0 h-[1px] w-0 bg-theme lg:group-hover:w-full lg:group-hover:left-0 duration-300"></span>
  </span>
);

export default Navbar;
