"use client";
import { LuSearch } from "react-icons/lu";

const Adminsearchbar = ({ search, setsearch, onsubmit, placeholder="Search" }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onsubmit();
      }}
      className="flex gap-2 border h-10 rounded-md overflow-hidden"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setsearch(e.target.value)}
        className="w-full px-5 outline-none"
        placeholder={placeholder}
      />
      <button
        className="px-5 h-full bg-theme text-white flex items-center gap-1 "
        type="submit"
      >
        <LuSearch className="inline-block" />
        <span className="hidden md:inline-block">Search</span>
      </button>
    </form>
  );
};

export default Adminsearchbar;
