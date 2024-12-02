import Link from "next/link";
import React from "react";
import Underlineeffect from "./Underlineeffect";
import { mobile, mail } from "../commondata";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

function Footer() {
  const quicklink1 = [
    { title: "Terms & Conditions", link: "/" },
    { title: "Privacy Policy", link: "/" },
    { title: "Shipping Policy", link: "/" },
    { title: "Return & Exchange Policy", link: "/" },
    { title: "Rug Guide", link: "/" },
    { title: "FAQs", link: "/" },
    { title: "Become a Retailer", link: "/" },
    { title: "Contact Us", link: "/" },
  ];
  const whatwedolinks = [
    { title: "Unorthodox Design", link: "/" },
    { title: "Amalgamation of the old and new", link: "/" },
    { title: "Uncompromising Quality", link: "/" },
    { title: "Tailor Made for you", link: "/" },
  ];

  return (
    <footer className=" bg-[#e7e2de] px-8 py-10">
      <div className="flex gap-24">
        <div className="flex-1">
          <p className="text-3xl font-tenor">Never Miss a Loop!</p>
        </div>
        <div className="flex-1 text-sm ">
          <h3 className="mb-4 tracking-wider">QUICK LINKS</h3>
          <div className="flex flex-col gap-[10px]">
            {quicklink1.map((item, i) => (
              <Link key={i} href={item.link} className="group">
                <Underlineeffect title={item?.title} />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-1 text-sm">
          <h3 className="mb-4 tracking-wider">QUICK LINKS</h3>
          <div className="flex flex-col gap-[10px]">
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
      <hr className="w-full h-px bg-theme" />
      <div className="flex items-center gap-10 mt-10 text-theme">
        <Link href={"/"} className="group">
          <Underlineeffect title={mobile} />
        </Link>
        <Link href={"/"} className="group">
          <Underlineeffect title={mail} />
        </Link>
        <p className="ml-auto">© Copyright, Loops by LJ, 2024</p>
      </div>
    </footer>
  );
}

export default Footer;
