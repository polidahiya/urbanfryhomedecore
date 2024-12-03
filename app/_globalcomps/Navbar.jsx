"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PiMoon } from "react-icons/pi";
import { LuSearch } from "react-icons/lu";
import Underlineeffect from "./Underlineeffect";
import { AppContextfn } from "../Context";
import { staticdata } from "../commondata";

function Navbar() {
  const { setshowsearchbar } = AppContextfn();
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

  const links = [
    { title: "LAST CHANCE", link: "/pages/test1" },
    { title: "NEW!", link: "/pages/test2" },
    { title: "SHOP", link: "/pages/test3" },
    { title: "READY TO SHIP", link: "/pages/test4" },
    { title: "CUSTOMISATION", link: "/pages/customization" },
  ];

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
        {links.map((item, i) => (
          <div
            key={i}
            className="shophover relative flex items-center justify-center  h-full"
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
        <Link href={"/"} className="underlineff">
          <Underlineeffect title={"ACCOUNT"} />
        </Link>
        <Link href={"/cart"} className="underlineff flex items-center ">
          <Underlineeffect title={"CART"} />
          (0)
        </Link>
      </div>
    </nav>
  );
}

const Categories = () => {
  return (
    <div className="shopcategoriesblock absolute top-full left-0  w-fit min-w-52 py-2 bg-white border border-slate-200 hidden">
      <div className="underlineff shopcategories w-full  relative px-5 py-3 whitespace-nowrap cursor-pointer">
        <Underlineeffect title={"Shop By Rooms"} />
        {/* subcat */}
        <Subcats item={staticdata.rooms} />
      </div>
      {/*  */}
      <div className="underlineff shopcategories w-full relative px-5 py-3 whitespace-nowrap cursor-pointer">
        <Underlineeffect title={"Shop By Categories"} />
        {/* subcat */}
        <Subcats item={staticdata.categories} />
      </div>
      <div className="underlineff shopcategories w-full relative px-5 py-3 whitespace-nowrap cursor-pointer">
        <Underlineeffect title={"All Products"} />
      </div>
    </div>
  );
};

const Subcats = ({ item }) => (
  <div className="shopsubcat flex-col absolute top-0 left-full w-fit min-w-52 py-2 bg-white border border-slate-200 hidden">
    {Object.keys(item).map((keys, i) => (
      <Link
        href={`/collections/${keys}`}
        key={i}
        className="underlineff relative px-5 py-3 whitespace-nowrap"
      >
        <Underlineeffect title={keys.replace(/_/g, " ")} />
      </Link>
    ))}
  </div>
);

export default Navbar;
