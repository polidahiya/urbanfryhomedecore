"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";

const Descriptionitem = ({ heading, details }) => {
  const [open, setopen] = useState(false);
  return (
    <div
      className={`pt-5 cursor-pointer border-t border-theme px-2`}
      onClick={() => {
        setopen((pre) => !pre);
      }}
    >
      <p className="flex items-start">
        <span className="font-tenor">{heading}</span>
        <MdKeyboardArrowDown
          className={`ml-auto duration-300 ${open && "rotate-180"}`}
        />
      </p>
      <div
        className={`font-tenor mt-5 ${
          open ? "max-h-screen duration-1000" : "max-h-0 duration-500"
        }  overflow-hidden`}
      >
        {details.map((detail, index) => (
          <p key={index} className="text-sm pb-3">
            <IoIosArrowRoundForward className="inline-block mr-2" />
            {detail}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Descriptionitem;
