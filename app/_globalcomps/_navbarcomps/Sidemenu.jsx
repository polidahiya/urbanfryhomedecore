import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";
import Categories from "./Categories";
import { logout } from "@/app/_serveractions/signup";
import { AppContextfn } from "@/app/Context";
import Underlineffect from "../Underlineffect";

const Sidemenu = ({ sidemenutoggle, setsidemenutoggle, token, userdata }) => {
  const { setmessagefn, cart } = AppContextfn();
  const [open, setopen] = useState(false);
  const cartitems = Object.values(cart).filter((item) => item.added);

  const totalQuantity = cartitems.reduce(
    (total, value) => total + value.quantity,
    0
  );

  const logoutfn = async () => {
    const res = await logout();
    setmessagefn(res?.message);
    if (res?.status == 200) {
      window.location.reload();
    }
  };

  return (
    <div
      className={`absolute lg:static top-full left-0 w-full lg:w-fit flex flex-col lg:flex-row items-center h-[calc(100dvh-80px)] max-h-[calc(100dvh-80px)] overflow-y-scroll lg:overflow-y-visible lg:h-full bg-white lg:bg-transparent px-4 lg:px-0 duration-300 transition-transform lg:duration-0 ${
        sidemenutoggle
          ? "translate-x-0 opacity-100"
          : "-translate-x-full lg:translate-x-0 opacity-0 lg:opacity-100"
      }`}
    >
      <div className="relative flex lg:flex-row items-center justify-start lg:justify-center lg:h-full border-t border-theme border-opacity-50 lg:border-none w-full lg:w-fit">
        <Underlineffect
          Comp={({ innercomp }) => (
            <Link
              href={"/collections/custom/Last-Chance"}
              className="h-full w-full py-4 lg:py-0 flex items-center px-3"
              onClick={() => {
                setsidemenutoggle(false);
              }}
            >
              {innercomp}
            </Link>
          )}
          title="LAST CHANCE"
        />
      </div>
      <div className="relative flex lg:flex-row items-center justify-start lg:justify-center lg:h-full border-t border-theme border-opacity-50 lg:border-none w-full lg:w-fit">
        <Underlineffect
          Comp={({ innercomp }) => (
            <Link
              href={"/collections/special/new"}
              className="h-full w-full py-4 lg:py-0 flex items-center px-3"
              onClick={() => {
                setsidemenutoggle(false);
              }}
            >
              {innercomp}
            </Link>
          )}
          title={"NEW!"}
        />
      </div>
      <div className="group/shop cursor-pointer relative flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-center lg:h-full border-t border-theme border-opacity-50 lg:border-none w-full lg:w-fit">
        <Underlineffect
          Comp={({ innercomp }) => (
            <div
              className="h-full w-full flex items-center px-3 py-4 lg:py-0"
              onClick={() => setopen((pre) => !pre)}
            >
              {innercomp}
              <MdKeyboardArrowDown
                className={`ml-5 duration-300 text-lg lg:hidden ${
                  open && "rotate-180"
                }`}
              />
            </div>
          )}
          title={"SHOP"}
        />

        <Categories open={open} />
      </div>
      <div className="relative flex lg:flex-row items-center justify-start lg:justify-center lg:h-full border-t border-theme border-opacity-50 lg:border-none w-full lg:w-fit">
        <Underlineffect
          Comp={({ innercomp }) => (
            <Link
              href={"/collections/custom/Ready-To-Ship"}
              className="h-full w-full py-4 lg:py-0 flex items-center px-3"
              onClick={() => {
                setsidemenutoggle(false);
              }}
            >
              {innercomp}
            </Link>
          )}
          title="READY TO SHIP"
        />
      </div>
      <div
        className="relative flex lg:flex-row items-center justify-start lg:justify-center lg:h-full border-t border-theme border-opacity-50 lg:border-none w-full lg:w-fit"
        onClick={() => {
          setsidemenutoggle(false);
        }}
      >
        <Underlineffect
          Comp={({ innercomp }) => (
            <Link
              href={"/customization"}
              className="h-full w-full py-4 lg:py-0 flex items-center px-3"
            >
              {innercomp}
            </Link>
          )}
          title="CUSTOMISATION"
        />
      </div>
      {/* mobile only div */}
      <div className="lg:hidden mt-auto pb-10 w-full">
        {token ? (
          <div className="flex flex-col gap-5 px-3">
            <div className="flex justify-between">
              <p>User - {userdata?.username}</p>
              <button className="underline" onClick={logoutfn}>
                Log Out
              </button>
            </div>
            <Link
              href={"/cart"}
              className="flex justify-between"
              onClick={() => {
                setsidemenutoggle(false);
              }}
            >
              <span className="underline">Shopping cart</span>
              <span className="px-5">{totalQuantity}</span>
            </Link>
            <Link
              href={"/account"}
              className="underline"
              onClick={() => {
                setsidemenutoggle(false);
              }}
            >
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
            >
              LOG IN
            </Link>
            <p className="mt-5 whitespace-nowrap w-full  text-center">
              No account yet?{" "}
              <Link
                href={"/account/signup"}
                className="relative inline-block underline"
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
