"use client";
import React, { useState } from "react";
import Link from "next/link";
import Underlineeffect from "../Underlineeffect";
import { RiArrowDownSLine } from "react-icons/ri";

function Quicklinks() {
  const [showlinks, setshowlinks] = useState(false);
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

  return (
    <div className="flex-1 text-sm">
      <h3
        className={`flex items-center tracking-wider lg:mb-4 select-none ${showlinks && "mb-4"}`}
        onClick={() => {
          setshowlinks((pre) => !pre);
        }}
      >
        QUICK LINKS
        <RiArrowDownSLine
          className={`inline ml-auto text-xl lg:hidden ${
            showlinks ? "rotate-180" : "rotate-0"
          }`}
        />
      </h3>
      <div
        className={`flex-col gap-3 ${showlinks ? "flex" : "hidden lg:flex"}`}
      >
        {quicklink1.map((item, i) => (
          <Link key={i} href={item.link} className="underlineff">
            <Underlineeffect title={item?.title} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Quicklinks;
