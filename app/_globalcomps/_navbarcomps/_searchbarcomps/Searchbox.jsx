"use client";
import React, { useEffect, useState } from "react";
import { AppContextfn } from "@/app/Context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { staticdata } from "@/app/commondata";
import Searchedproductcard from "./Searchedproductcard";
import Searchedproductsfn from "../../_helperfunctions/Searchedproductsfn";

const Searchbox = ({ autoFocus = false }) => {
  const router = useRouter();
  const { showsearchbar, setshowsearchbar } = AppContextfn();
  const [searchedproducts, setsearchedproducts] = useState([]);
  const [isfocused, setisfocused] = useState(false);
  const [searchtext, setsearchtext] = useState("");

  // Add debounce logic
  useEffect(() => {
    let debounceTimeout;
    const fetchSearchedProducts = async () => {
      if (searchtext.trim() === "") {
        setsearchedproducts([]);
        return;
      }

      const searched = await Searchedproductsfn(searchtext);
      setsearchedproducts(searched);
    };

    debounceTimeout = setTimeout(() => {
      fetchSearchedProducts();
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchtext, showsearchbar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setshowsearchbar(false);
    setisfocused(false);
    router.push(`/search?q=${searchtext}`);
  };

  return (
    <>
      <form
        className="h-16 flex items-stretch justify-between gap-1 md:gap-5"
        onSubmit={handleSubmit}
      >
        <div className="relative h-full w-full">
          <input
            type="text"
            onFocus={() => setisfocused(true)}
            onBlur={() => {
              setTimeout(() => {
                setisfocused(false);
              }, 100);
            }}
            className="forminput h-full w-full px-4 border border-theme outline-none"
            value={searchtext}
            required
            autoFocus={autoFocus}
            onChange={(e) => {
              setisfocused(true);
              setsearchtext(e.target.value);
            }}
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
      <div className="mt-5 max-h-[calc(100dvh-160px)] overflow-y-scroll themescroll pb-5">
        {searchedproducts.length === 0 ? (
          <>
            {/* category  */}
            <div className="underline text-theme font-semibold ml-5">
              Categories
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.keys(staticdata).map((categorykey, index) => (
                <Link
                  href={`/collections/${categorykey}`}
                  key={index}
                  className="px-5 py-2 border text-xs rounded-full"
                  onClick={() => {
                    setTimeout(() => {
                      setshowsearchbar(false);
                    }, 100);
                  }}
                >
                  {categorykey.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </>
        ) : (
          isfocused && (
            <Searchedproductcard searchedproducts={searchedproducts} />
          )
        )}
      </div>
    </>
  );
};

export default Searchbox;
