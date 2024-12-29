import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import scrollable from "../_helperfunctions/Scrollable";
import Link from "next/link";
import Underlineeffect from "../Underlineeffect";
import { MdKeyboardArrowDown } from "react-icons/md";
import Categories from "./Categories";

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

export default Sidemenu;
