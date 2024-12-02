import React from "react";

function Marquebanner({list}) {
  return (
    <div className="flex items-center gap-8 w-fit marquee-content py-3">
        {list.map((item, i) => (
          <div key={i} className="flex items-center gap-8">
            <p className="whitespace-nowrap text-2xl ">{item}</p>
            <div className="h-2 aspect-square bg-[#56473e] rounded-full"></div>
          </div>
        ))}
        {/* Duplicate the list to create seamless effect */}
        {list.map((item, i) => (
          <div key={i} className="flex items-center gap-8">
            <p className="whitespace-nowrap text-2xl ">{item}</p>
            <div className="h-2 aspect-square bg-[#56473e] rounded-full"></div>
          </div>
        ))}
      </div>
    
  );
}

export default Marquebanner;
