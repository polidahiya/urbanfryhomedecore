"use client";
import React, { useState } from "react";
import Link from "next/link";
import Underlineffect from "../Underlineffect";
import { RiArrowDownSLine } from "react-icons/ri";

function Quicklinks() {
  const [showlinks, setshowlinks] = useState(false);
  const quicklink1 = [
    { title: "About Us", link: "/Aboutus" },
    { title: "Core Values", link: "/" },
    { title: "Returns", link: "/" },
    { title: "Urbanfry in Homes", link: "/Urbanfryinhomes" },
    { title: "Blogs", link: "/Blogs" },
  ];

  return (
    <div className="flex-1 text-sm">
      <h3
        className={`flex items-center tracking-wider lg:mb-4 select-none ${
          showlinks && "mb-4"
        }`}
        onClick={() => {
          setshowlinks((pre) => !pre);
        }}
      >
        Our Company
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
          <Underlineffect
            key={i}
            Comp={({ innercomp }) => (
              <Link href={item.link} className="underlineff">
                {innercomp}
              </Link>
            )}
            title={item?.title}
            styles="w-fit"
          />
        ))}
      </div>
    </div>
  );
}

export default Quicklinks;
