import Link from "next/link";
import React from "react";
import Underlineeffect from "./Underlineeffect";
import { mobile, mail } from "../commondata";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import Quicklinks from "./_footerclientcomps/Quicklinks";

function Footer() {
  const whatwedolinks = [
    { title: "ABOUT US", link: "/" },
    { title: "THE ALT METHOD", link: "/" },
    { title: "THE JOURNEY TO ORGANISATION", link: "/" },
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
          <h3 className="mb-4 tracking-wider">ABOUT</h3>
          <div className="flex flex-col gap-3">
            {whatwedolinks.map((item, i) => (
              <Link href={item?.link} key={i}>
                <Underlineeffect title={item?.title} />
              </Link>
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
        <Link href={`tel:${mobile}`}>
          <Underlineeffect title={mobile} />
        </Link>
        <Link href={`mailto:${mail}`}>
          <Underlineeffect title={mail} />
        </Link>
        <p className="lg:ml-auto">
          © Copyright, AltOrganisers, {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
