"use client";
import React from "react";
import Underlineeffect from "../Underlineeffect";
import Link from "next/link";

function Accountbutton() {
  return (
    <div className="relative hidden lg:block">
      <button className="underlineff" onClick={() => {}}>
        <Underlineeffect title={"ACCOUNT"} />
      </button>
      <div className="absolute top-full left-1/2 -translate-x-1/2 p-5 border border-slate-300 bg-white w-52 translate-y-5">
        <Link
          href={"/"}
          className="block px-10 py-3 bg-theme text-white bg-opacity-70 lg:hover:bg-opacity-100 text-center duration-300"
        >
          LOG IN
        </Link>
        <Link href={"/"} className="block text-theme text-sm mt-2 text-center">
          Create Account
        </Link>
      </div>
    </div>
  );
}

export default Accountbutton;
