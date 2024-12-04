import Link from "next/link";
import React from "react";
import Underlineeffect from "./Underlineeffect";
import { mobile, mail } from "../commondata";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import Quicklinks from "./_footerclientcomps/Quicklinks";

function Footer() {
  const whatwedolinks = [
    { title: "Unorthodox Design", link: "/" },
    { title: "Amalgamation of the old and new", link: "/" },
    { title: "Uncompromising Quality", link: "/" },
    { title: "Tailor Made for you", link: "/" },
  ];

  return (
    <footer className=" bg-footercolor px-8 py-10">
      <div className="flex flex-col lg:flex-row  lg:gap-24">
        <div className="flex-1">
          <p className="text-3xl font-tenor">Never Miss a Loop!</p>
        </div>
        <div className="w-full h-px bg-theme opacity-50 my-5 lg:hidden" />
        <Quicklinks />
        <div className="w-full h-px bg-theme opacity-50 my-5 lg:hidden" />
        <div className="flex-1 text-sm">
          <h3 className="mb-4 tracking-wider">WHAT WE DO?</h3>
          <div className="flex flex-col gap-3">
            {whatwedolinks.map((item, i) => (
              <p key={i}>{item?.title}</p>
            ))}
          </div>
          <div className="flex gap-5 text-3xl text-theme mt-10">
            <Link href={"/"}>
              <FaFacebook />
            </Link>
            <Link href={"/"}>
              <RiInstagramFill />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-theme opacity-50 my-10" />
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5 lg:gap-10 mt-10 text-theme">
        <Link href={"/"} className="underlineff">
          <Underlineeffect title={mobile} />
        </Link>
        <Link href={"/"} className="underlineff">
          <Underlineeffect title={mail} />
        </Link>
        <p className="lg:ml-auto">© Copyright, Loops by LJ, 2024</p>
      </div>
    </footer>
  );
}

export default Footer;
