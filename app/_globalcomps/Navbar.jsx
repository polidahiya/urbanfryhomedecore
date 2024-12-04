"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PiMoon } from "react-icons/pi";
import { LuSearch } from "react-icons/lu";
import Underlineeffect from "./Underlineeffect";
import { AppContextfn } from "../Context";
import { staticdata } from "../commondata";
import { IoMenuOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import Accountbutton from "./_navbarcomps/Accountbutton";

function Navbar({ navtype }) {
  const { setshowsearchbar } = AppContextfn();
  const [shownav, setshownav] = useState(true);
  const [transparentnav, settransparentnav] = useState(true);
  const [sidemenutoggle, setsidemenutoggle] = useState(false);

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
        ${navtype && transparentnav ? "text-white" : "bg-white text-inherit"} 
        ${shownav ? "translate-y-0" : "-translate-y-full"}`}
    >
      <Menubutton
        sidemenutoggle={sidemenutoggle}
        setsidemenutoggle={setsidemenutoggle}
      />
      <Link href={"/"}>
        <img
          src="https://loopsbylj.com/cdn/shop/files/LOOPS_LOGO_White_90x@2x.png?v=1699016384"
          alt=""
          className={`navhoverlogo h-10 mr-2 ${!navtype && "invert"} ${
            !transparentnav && "invert"
          }`}
        />
      </Link>
      {/* side menu */}
      <Sidemenu sidemenutoggle={sidemenutoggle} />
      <Moreoptions setshowsearchbar={setshowsearchbar} />
    </nav>
  );
}

const Menubutton = ({ sidemenutoggle, setsidemenutoggle }) => (
  <button
    className="relative h-full text-2xl mr-5 lg:hidden"
    onClick={() => {
      setsidemenutoggle((pre) => !pre);
      if (sidemenutoggle) {
        hidescroll(false);
        document.body.classList.remove(
          "overflow-hidden",
          "h-screen",
          "lg:overflow-auto"
        );
      } else {
        hidescroll(true);
        document.body.classList.add(
          "overflow-hidden",
          "h-screen",
          "lg:overflow-auto"
        );
      }
    }}
  >
    <IoMenuOutline
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300  ${
        sidemenutoggle ? "opacity-0 rotate-180" : "opacity-100 delay-300"
      }`}
    />
    <RxCross1
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300  ${
        sidemenutoggle ? "opacity-100 delay-300" : "opacity-0 -rotate-180"
      }`}
    />
  </button>
);

const Sidemenu = ({ sidemenutoggle }) => {
  const links = [
    { title: "LAST CHANCE", link: "/pages/test1" },
    { title: "NEW!", link: "/pages/test2" },
    { title: "SHOP", link: "/pages/test3" },
    { title: "READY TO SHIP", link: "/pages/test4" },
    { title: "CUSTOMISATION", link: "/pages/customization" },
  ];

  return (
    <div
      className={`absolute lg:static top-full left-0 w-full lg:w-fit flex flex-col lg:flex-row items-center lg:h-full bg-white lg:bg-transparent px-4 lg:px-0 duration-300 transition-transform lg:duration-0 ${
        sidemenutoggle
          ? "translate-x-0 opacity-100"
          : "-translate-x-full lg:translate-x-0 opacity-0 lg:opacity-100"
      }`}
    >
      {links.map((item, i) => (
        <div
          key={i}
          className="shophover relative flex items-center justify-start lg:justify-center h-full border-t border-theme border-opacity-50 lg:border-none py-4 lg:py-0 w-full lg:w-fit"
        >
          <Link
            href={item?.link}
            className="underlineff h-full flex items-center px-3"
          >
            <Underlineeffect title={item.title} />
          </Link>
          {item?.title == "SHOP" && <Categories />}
        </div>
      ))}
    </div>
  );
};

const Categories = () => {
  return (
    <div className="shopcategoriesblock absolute top-full left-0  w-fit min-w-52 py-2 bg-white border border-slate-200 hidden">
      <div className="underlineff shopcategories w-full  relative px-5 py-3 whitespace-nowrap cursor-pointer">
        <Underlineeffect title={"Shop By Rooms"} />
        {/* subcat */}
        <Subcats item={staticdata.rooms} type="rooms" />
      </div>
      {/*  */}
      <div className="underlineff shopcategories w-full relative px-5 py-3 whitespace-nowrap cursor-pointer">
        <Underlineeffect title={"Shop By Categories"} />
        {/* subcat */}
        <Subcats item={staticdata.categories} type="categories" />
      </div>
      <div className="underlineff shopcategories w-full relative px-5 py-3 whitespace-nowrap cursor-pointer">
        <Underlineeffect title={"All Products"} />
      </div>
    </div>
  );
};

const Subcats = ({ item, type }) => (
  <div className="shopsubcat flex-col absolute top-0 left-full w-fit min-w-52 py-2 bg-white border border-slate-200 hidden">
    {Object.keys(item).map((keys, i) => (
      <Link
        href={`/collections/${type}/${keys}`}
        key={i}
        className="underlineff relative px-5 py-3 whitespace-nowrap"
      >
        <Underlineeffect title={keys.replace(/_/g, " ")} />
      </Link>
    ))}
  </div>
);

const Moreoptions = ({ setshowsearchbar }) => {
  return (
    <div className="h-full ml-auto flex items-center gap-6">
      <button>
        <PiMoon className="text-xl" />
      </button>
      <button
        className="underlineff flex items-center gap-2"
        onClick={() => setshowsearchbar(true)}
      >
        <LuSearch className="text-base" />
        <Underlineeffect title={"SEARCH"} />
      </button>
      <Accountbutton />
      <Link href={"/cart"} className="underlineff flex items-center ">
        <Underlineeffect title={"CART"} />
        (0)
      </Link>
    </div>
  );
};

export default Navbar;
