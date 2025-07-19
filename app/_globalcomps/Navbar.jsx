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

function Navbar({ navtype, token, userdata }) {
  const { setshowsearchbar } = AppContextfn();
  const [transparentnav, settransparentnav] = useState(true);
  const [sidemenutoggle, setsidemenutoggle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        if (transparentnav) settransparentnav(false);
      } else {
        if (!transparentnav) settransparentnav(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparentnav]);

  return (
    <nav
      className={`fixed navhover top-0 left-1/2 -translate-x-1/2 w-full lg:max-w-[1920px] flex items-center px-5 md:px-10 h-20 lg:hover:text-inherit hover:bg-white tracking-wider text-xs z-20 duration-300
        ${navtype && transparentnav ? "text-white hover:text-inherit" : "bg-white text-inherit"}`}
    >
      <Link
        href={"/"}
        className="scale-125"
        onClick={() => {
          setsidemenutoggle(false);
        }}
      >
        <Nextimage
          src="/uiimages/logo.png"
          alt="logo"
          className="w-16 aspect-square mr-2"
          width={200}
          height={200}
          quality={100}
        />
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
        sidemenutoggle={sidemenutoggle}
        setsidemenutoggle={setsidemenutoggle}
      />
    </nav>
  );
}

const Moreoptions = ({
  setshowsearchbar,
  token,
  userdata,
  sidemenutoggle,
  setsidemenutoggle,
}) => {
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
          <button
            className="flex items-center"
            onClick={() => {
              setshowsidecart((pre) => ({ ...pre, show: true }));
              setTimeout(() => {
                setshowsidecart((pre) => ({ ...pre, effect: true }));
              }, 100);
            }}
          >
            <span className="hidden lg:block underlineff">{innercomp}</span>
            <RiShoppingCartLine className="text-2xl lg:hidden" />
            {`(${totalQuantity})`}
          </button>
        )}
        title="CART"
        styles="w-fit"
      />
      <Menubutton
        sidemenutoggle={sidemenutoggle}
        setsidemenutoggle={setsidemenutoggle}
      />
    </div>
  );
};

export default Navbar;
