"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
// import { LuMoon } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import Underlineeffect from "./Underlineeffect";
import { AppContextfn } from "../Context";
import Accountbutton from "./_navbarcomps/Accountbutton";
import { RiShoppingCartLine } from "react-icons/ri";
import Menubutton from "./_navbarcomps/Menubutton";
import Sidemenu from "./_navbarcomps/Sidemenu";

function Navbar({ navtype, token, userdata }) {
  const { setshowsearchbar } = AppContextfn();
  const [transparentnav, settransparentnav] = useState(true);
  const [sidemenutoggle, setsidemenutoggle] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      settransparentnav(window.scrollY > 50 ? false : true);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed navhover top-0 left-0 w-full flex items-center px-5 md:px-10 h-20  hover:text-inherit hover:bg-white tracking-wider text-xs z-20 duration-300
        ${navtype && transparentnav ? "text-white" : "bg-white text-inherit"} 
        `}
    >
      <Menubutton
        sidemenutoggle={sidemenutoggle}
        setsidemenutoggle={setsidemenutoggle}
      />
      <Link href={"/"}>
        <img
          src="/logo.png"
          alt=""
          className={`navhoverlogo h-10 mr-2 ${!navtype && "invert"} ${
            !transparentnav && "invert"
          }`}
        />
      </Link>
      {/* side menu */}
      <Sidemenu
        sidemenutoggle={sidemenutoggle}
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
      <button
        className=" flex items-center gap-2"
        onClick={() => setshowsearchbar(true)}
      >
        <LuSearch className="text-2xl lg:text-base" />
        <span className="hidden lg:block underlineff">
          <Underlineeffect title={"SEARCH"} />
        </span>
      </button>
      <Accountbutton token={token} userdata={userdata} />
      <button
        className="flex items-center"
        onClick={() => {
          setshowsidecart((pre) => ({ ...pre, show: true }));
          setTimeout(() => {
            setshowsidecart((pre) => ({ ...pre, effect: true }));
          }, 100);
        }}
      >
        <span className="hidden lg:block underlineff">
          <Underlineeffect title={"CART"} />
        </span>
        <RiShoppingCartLine className="text-2xl lg:hidden" />
        {`(${totalQuantity})`}
      </button>
    </div>
  );
};

export default Navbar;
