import React from "react";

function Underlineeffect({ title }) {
  return (
    <div className="relative w-fit">
      <span className="peer">{title}</span>
      <span className="absolute bottom-0 right-0 h-[1px] w-0 bg-[#56473e] lg:peer-hover:left-0 lg:peer-hover:w-full  duration-300"></span>
    </div>
  );
}

export default Underlineeffect;
