import React from "react";

const Searchbox = ({ searchtext, setsearchtext, setisfocused }) => {
  return (
    <div className="h-16 flex items-stretch justify-between gap-1 md:gap-5">
      <div className="relative h-full w-full">
        <input
          type="text"
          onFocus={() => setisfocused(true)}
          onBlur={() => setisfocused(false)}
          className="forminput h-full w-full px-4 border border-theme outline-none"
          value={searchtext}
          required
          onChange={(e) => setsearchtext(e.target.value)}
        />
        <label className="absolute top-0 left-0 text-theme flex items-center h-full w-full pointer-events-none  px-4  duration-300">
          What are you looking for?
        </label>
      </div>
      <button className="h-full px-5 md:px-11 bg-theme text-white bg-opacity-70 lg:hover:bg-opacity-100 duration-300">
        Search
      </button>
    </div>
  );
};

export default Searchbox;
