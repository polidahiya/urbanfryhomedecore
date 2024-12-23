"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
// import { LuMoon } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import Underlineeffect from "./Underlineeffect";
import { AppContextfn } from "../Context";
import { staticdata } from "../commondata";
import { IoMenuOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import Accountbutton from "./_navbarcomps/Accountbutton";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiShoppingCartLine } from "react-icons/ri";

function Navbar({ navtype, token, userdata }) {
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
      className={`fixed navhover top-0 left-0 w-full flex items-center px-5 md:px-10 h-20  hover:text-inherit hover:bg-white tracking-wider text-xs z-20 duration-300
        ${navtype && transparentnav ? "text-white" : "bg-white text-inherit"} 
        ${shownav ? "translate-y-0" : "-translate-y-full"}`}
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

const Menubutton = ({ sidemenutoggle, setsidemenutoggle }) => (
  <button
    className="relative h-full w-5 text-2xl mr-5 lg:hidden"
    onClick={() => {
      setsidemenutoggle((pre) => !pre);
      if (sidemenutoggle) {
        scrollable();
      } else {
        document.body.classList.add(
          "overflow-hidden",
          "h-screen",
          "lg:overflow-auto"
        );
      }
    }}
  >
    <IoMenuOutline
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 ${
        sidemenutoggle ? "opacity-0 rotate-180" : "opacity-100 delay-300"
      }`}
    />
    <RxCross1
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 ${
        sidemenutoggle ? "opacity-100 delay-300" : "opacity-0 -rotate-180"
      }`}
    />
  </button>
);

const Sidemenu = ({ sidemenutoggle, token, userdata }) => {
  const [open, setopen] = useState(false);

  return (
    <div
      className={`absolute lg:static top-full left-0 w-full lg:w-fit flex flex-col lg:flex-row items-center h-[calc(100dvh-80px)] max-h-[calc(100dvh-80px)] overflow-y-scroll lg:overflow-y-visible lg:h-full bg-white lg:bg-transparent px-4 lg:px-0 duration-300 transition-transform lg:duration-0 ${
        sidemenutoggle
          ? "translate-x-0 opacity-100"
          : "-translate-x-full lg:translate-x-0 opacity-0 lg:opacity-100"
      }`}
    >
      <div
        className="relative flex lg:flex-row items-center justify-start lg:justify-center lg:h-full border-t border-theme border-opacity-50 lg:border-none w-full lg:w-fit"
        onClick={scrollable}
      >
        <Link
          href={"/"}
          className="underlineff h-full w-full py-4 lg:py-0 flex items-center px-3"
        >
          <Underlineeffect title={"LAST CHANCE"} />
        </Link>
      </div>
      <div
        className="relative flex lg:flex-row items-center justify-start lg:justify-center lg:h-full border-t border-theme border-opacity-50 lg:border-none w-full lg:w-fit"
        onClick={scrollable}
      >
        <Link
          href={"/"}
          className="underlineff h-full w-full py-4 lg:py-0 flex items-center px-3"
        >
          <Underlineeffect title={"NEW!"} />
        </Link>
      </div>
      <div className="shophover py-4 lg:py-0 px-3 cursor-pointer relative flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-center lg:h-full border-t border-theme border-opacity-50 lg:border-none w-full lg:w-fit">
        <div
          className="underlineff h-full w-full flex items-center"
          onClick={() => setopen((pre) => !pre)}
        >
          <Underlineeffect title={"SHOP"} />
          <MdKeyboardArrowDown
            className={`ml-5 duration-300 text-lg lg:hidden ${
              open && "rotate-180"
            }`}
          />
        </div>
        <Categories open={open} />
      </div>
      <div
        className="relative flex lg:flex-row items-center justify-start lg:justify-center lg:h-full border-t border-theme border-opacity-50 lg:border-none w-full lg:w-fit"
        onClick={scrollable}
      >
        <Link
          href={"/"}
          className="underlineff h-full w-full py-4 lg:py-0 flex items-center px-3"
        >
          <Underlineeffect title={"READY TO SHIP"} />
        </Link>
      </div>
      <div
        className="relative flex lg:flex-row items-center justify-start lg:justify-center lg:h-full border-t border-theme border-opacity-50 lg:border-none w-full lg:w-fit"
        onClick={scrollable}
      >
        <Link
          href={"/customization"}
          className="underlineff h-full w-full py-4 lg:py-0 flex items-center px-3"
        >
          <Underlineeffect title={"CUSTOMISATION"} />
        </Link>
      </div>
      {/* mobile only div */}
      <div className="lg:hidden mt-auto pb-10 w-full">
        {token ? (
          <div className="flex flex-col gap-5 px-3">
            <div className="flex justify-between">
              <p>User - {userdata?.username}</p>
              <button className="underline">Log Out</button>
            </div>
            <Link href={"/"} className="flex justify-between">
              <span className="underline">Shopping cart</span>
              <span className="px-5">1</span>
            </Link>
            <Link href={"/"} className="underline">
              My account
            </Link>
            {userdata?.usertype === "admin" && (
              <Link href={"/admin"} className="underline">
                Admin Dashboard
              </Link>
            )}
          </div>
        ) : (
          <>
            <Link
              href={"/account/login"}
              className="block px-10 py-3 bg-theme text-white text-center duration-300"
              onClick={scrollable}
            >
              LOG IN
            </Link>
            <p className="mt-5 whitespace-nowrap w-full  text-center">
              No account yet?{" "}
              <Link
                href={"/account/signup"}
                className="relative inline-block underline"
                onClick={scrollable}
              >
                Create Account
              </Link>
            </p>
          </>
        )}

        {/* socials */}
        <div className="flex justify-center items-center gap-5 text-3xl text-theme mt-5">
          <Link href={"/"}>
            <FaFacebook />
          </Link>
          <Link href={"/"}>
            <RiInstagramFill />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Categories = ({ open }) => {
  const [togglecategories, settogglecategories] = useState({
    rooms: false,
    categories: false,
  });
  return (
    <div
      className={`lg:absolute top-full left-0 w-full lg:w-fit lg:min-w-52 py-2 bg-white lg:border lg:border-slate-200 shopcategoriesblock ${
        open ? "block lg:hidden" : "hidden"
      }`}
    >
      <div className="underlineff shopcategories relative px-5 py-3 whitespace-nowrap cursor-pointer">
        <div
          className="underlineff h-full w-full flex items-center"
          onClick={() =>
            settogglecategories((pre) => ({
              categories: false,
              rooms: !pre.rooms,
            }))
          }
        >
          <Underlineeffect title={"Shop By Rooms"} />
          <MdKeyboardArrowDown
            className={`ml-5 duration-300 text-lg lg:hidden ${
              togglecategories.rooms && "rotate-180"
            }`}
          />
        </div>
        {/* subcat */}
        <Subcats
          item={staticdata.rooms}
          type="rooms"
          togglecategories={togglecategories.rooms}
        />
      </div>
      {/*  */}
      <div className="underlineff shopcategories w-full relative px-5 py-3 whitespace-nowrap cursor-pointer">
        <div
          className="underlineff h-full w-full flex items-center"
          onClick={() =>
            settogglecategories((pre) => ({
              rooms: false,
              categories: !pre.categories,
            }))
          }
        >
          <Underlineeffect title={"Shop By Categories"} />
          <MdKeyboardArrowDown
            className={`ml-5 duration-300 text-lg lg:hidden ${
              togglecategories.categories && "rotate-180"
            }`}
          />
        </div>
        {/* subcat */}
        <Subcats
          item={staticdata.categories}
          type="categories"
          togglecategories={togglecategories.categories}
        />
      </div>
      <div
        className="underlineff shopcategories w-full relative px-5 py-3 whitespace-nowrap cursor-pointer"
        onClick={scrollable}
      >
        <Underlineeffect title={"All Products"} />
      </div>
    </div>
  );
};

const Subcats = ({ item, type, togglecategories }) => (
  <div
    className={`shopsubcat flex-col lg:absolute top-0 left-full w-fit min-w-52 py-2 bg-white lg:border lg:border-slate-200 ${
      togglecategories ? "flex lg:hidden" : "hidden"
    }`}
  >
    {Object.keys(item).map((keys, i) => (
      <Link
        href={`/collections/${type}/${keys}`}
        key={i}
        className="underlineff relative px-5 py-3 whitespace-nowrap"
        onClick={scrollable}
      >
        <Underlineeffect title={keys.replace(/-/g, " ")} />
      </Link>
    ))}
  </div>
);

const Moreoptions = ({ setshowsearchbar, token, userdata }) => {
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
      <Link href={"/cart"} className=" flex items-center ">
        <span className="hidden lg:block underlineff">
          <Underlineeffect title={"CART"} />
        </span>
        <RiShoppingCartLine className="text-2xl lg:hidden" />
        (0)
      </Link>
    </div>
  );
};

const scrollable = () => {
  document.body.classList.remove(
    "overflow-hidden",
    "h-screen",
    "lg:overflow-auto"
  );
};

export default Navbar;
