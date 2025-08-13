"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
// import { LuMoon } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import Underlineffect from "./Underlineffect";
import { AppContextfn } from "../Context";
import Accountbutton from "./_navbarcomps/Accountbutton";
import { RiShoppingCartLine } from "react-icons/ri";
import Menubutton from "./_navbarcomps/Menubutton";
import Sidemenu from "./_navbarcomps/Sidemenu";
import Nextimage from "@/app/_globalcomps/Nextimage";

function Navbar({ token, userdata }) {
  const { setshowsearchbar } = AppContextfn();
  const [shodow, setshodow] = useState(true);
  const [sidemenutoggle, setsidemenutoggle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        if (!shodow) setshodow(true);
      } else {
        if (shodow) setshodow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shodow]);

  return (
    <nav
      className={`sticky top-0 w-full lg:max-w-[1920px] flex items-center px-5 md:px-8 h-20 bg-white tracking-wider text-xs z-20 duration-300 ${
        shodow && "shadow-md"
      }`}
    >
      <Menubutton
        sidemenutoggle={sidemenutoggle}
        setsidemenutoggle={setsidemenutoggle}
      />
      <Link
        href={"/"}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 md:w-64"
        onClick={() => {
          setsidemenutoggle(false);
        }}
      >
        <img src="/uiimages/logotext.png" alt="" />
        {/* <Nextimage
          src="/uiimages/logotext.png"
          alt="logo"
          className=""
          width={174}
          height={17}
          quality={100}
        /> */}
      </Link>
      {/* side menu */}
      <Sidemenu
        sidemenutoggle={sidemenutoggle}
        setsidemenutoggle={setsidemenutoggle}
        token={token}
        userdata={userdata}
      />
      <Moreoptions
        setshowsearchbar={setshowsearchbar}
        token={token}
        userdata={userdata}
      />
    </nav>
  );
}

const Moreoptions = ({ setshowsearchbar, token, userdata }) => {
  const { cart, setshowsidecart } = AppContextfn();
  const cartitems = Object.values(cart).filter((item) => item.added);

  const totalQuantity = cartitems.reduce(
    (total, value) => total + value.quantity,
    0
  );

  return (
    <div className="h-full ml-auto flex items-center gap-4 lg:gap-6">
      {/* <button>
        <LuMoon className="text-2xl" />
      </button> */}
      <Underlineffect
        Comp={({ innercomp }) => (
          <button
            className=" flex items-center gap-2"
            onClick={() => setshowsearchbar(true)}
          >
            <LuSearch className="text-2xl lg:text-base" />
            <span className="hidden lg:block underlineff">{innercomp}</span>
          </button>
        )}
        title={"SEARCH"}
        styles="w-fit"
      />

      <Accountbutton token={token} userdata={userdata} />
      <Underlineffect
        Comp={({ innercomp }) => (
          <Link href="/cart" className="flex items-center">
            <span className="hidden lg:block underlineff">{innercomp}</span>
            <RiShoppingCartLine className="text-2xl lg:hidden" />
            {`(${totalQuantity})`}
          </Link>
          // <button
          //   className="flex items-center"
          //   onClick={() => {
          //     setshowsidecart((pre) => ({ ...pre, show: true }));
          //     setTimeout(() => {
          //       setshowsidecart((pre) => ({ ...pre, effect: true }));
          //     }, 100);
          //   }}
          // >
          //   <span className="hidden lg:block underlineff">{innercomp}</span>
          //   <RiShoppingCartLine className="text-2xl lg:hidden" />
          //   {`(${totalQuantity})`}
          // </button>
        )}
        title="CART"
        styles="w-fit"
      />
    </div>
  );
};

export default Navbar;
