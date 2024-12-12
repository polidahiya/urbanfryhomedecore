import React from "react";

function Featuredin() {
  const list = [
    "https://loopsbylj.com/cdn/shop/files/Elle_Decor_Logo_230x@2x.jpg?v=1700665359",
    "https://loopsbylj.com/cdn/shop/files/Homegrown_Logo_230x@2x.jpg?v=1700665391",
    "https://loopsbylj.com/cdn/shop/files/Vogue_Logo_230x@2x.jpg?v=1706113045",
    "https://loopsbylj.com/cdn/shop/files/Livingetc_Logo_230x@2x.jpg?v=1700665440",
    "https://loopsbylj.com/cdn/shop/files/Architectural-Digest-logo-square-700x700_700x@2x.jpg?v=1720800241",
    "https://loopsbylj.com/cdn/shop/files/Screen_Shot_2024-07-12_at_9.48.04_PM_1368x@2x.png?v=1720801103",
  ];
  return (
    <div className="bg-theme">
      <h2 className="text-5xl md:text-6xl text-center text-white pt-16 font-tenor">
        Featured In
      </h2>
      <div className="flex flex-wrap place-content-center gap-1 py-16 mx-auto w-full px-5 md:px-10">
        {list.map((item, i) => (
          <img key={i} src={item} alt="test" className="w-24 md:w-44 aspect-square" />
        ))}
      </div>
    </div>
  );
}

export default Featuredin;
