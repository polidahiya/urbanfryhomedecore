import React from "react";
import { AppContextfn } from "@/app/Context";
import { useRouter } from "next/navigation";

const Searchbox = ({ searchtext, setsearchtext, setisfocused }) => {
  const { setshowsearchbar } = AppContextfn();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setshowsearchbar(false);
    router.push(`/search?q=${searchtext}`);
  };

  return (
    <form 
      className="h-16 flex items-stretch justify-between gap-1 md:gap-5"
      onSubmit={handleSubmit}
    >
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
        <label className="absolute top-0 left-0 text-theme flex items-center h-full w-full pointer-events-none px-4 duration-300">
          What are you looking for?
        </label>
      </div>
      <button
        type="submit"
        className="flex items-center justify-center h-full px-5 md:px-11 bg-theme text-white bg-opacity-70 lg:hover:bg-opacity-100 duration-300"
      >
        Search
      </button>
    </form>
  );
};

export default Searchbox;
