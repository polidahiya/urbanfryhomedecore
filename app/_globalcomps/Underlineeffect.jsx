import React from "react";

function Underlineeffect({ title }) {
  return (
    <span className="relative ">
      {title}
      <span className="absolute bottom-0 right-0 h-[1px] w-0 bg-[#56473e] lg:group-hover:w-full lg:group-hover:left-0 duration-300"></span>
    </span>
  );
}

export default Underlineeffect;
