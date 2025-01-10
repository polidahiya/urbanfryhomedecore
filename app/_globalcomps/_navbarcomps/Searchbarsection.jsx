"use client";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AppContextfn } from "@/app/Context";
import Searchedproductsfn from "../_helperfunctions/Searchedproductsfn";
import Link from "next/link";
import { staticdata } from "@/app/commondata";
import Searchbox from "./_searchbarcomps/Searchbox";
import Searchedproductcard from "./_searchbarcomps/Searchedproductcard";

function Searchbarsection() {
  const { showsearchbar, setshowsearchbar } = AppContextfn();
  const [searchtext, setsearchtext] = useState("");
  const [searchedproducts, setsearchedproducts] = useState([]);
  const [isfocused, setisfocused] = useState(false);

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

    if (showsearchbar) {
      // Clear the previous timer and set a new one
      debounceTimeout = setTimeout(() => {
        fetchSearchedProducts();
      }, 500); // 500ms debounce delay
    }

    return () => {
      // Cleanup the timeout when searchtext or showsearchbar changes
      clearTimeout(debounceTimeout);
    };
  }, [searchtext, showsearchbar]);

  if (showsearchbar)
    return (
      <div className="fixed top-0 left-0 h-[100dvh]  bg-white  w-full z-30 px-5 md:px-10">
        {/* nav */}
        <div
          className={`w-full flex items-center justify-between  h-20 text-inherit text-xs`}
        >
          <img src="/logo.png" alt="" className={`h-10 mr-2 invert`} />
          <button
            className="group h-full"
            onClick={() => setshowsearchbar(false)}
          >
            <RxCross1 className="text-2xl lg:group-hover:rotate-90 duration-300" />
          </button>
        </div>
        {/* searchbox */}
        <Searchbox
          searchtext={searchtext}
          setsearchtext={setsearchtext}
          isfocused={isfocused}
          setisfocused={setisfocused}
        />

        <div className="mt-5 max-h-[calc(100dvh-160px)] overflow-y-scroll themescroll pb-5">
          {searchedproducts.length === 0 ? (
            <>
              <div>
                <Categoriesoptions
                  title="Categories"
                  linkto="categories"
                  data={staticdata.categories}
                  setshowsearchbar={setshowsearchbar}
                />
              </div>
              <div className="mt-5">
                <Categoriesoptions
                  title="Rooms"
                  linkto="rooms"
                  data={staticdata.rooms}
                  setshowsearchbar={setshowsearchbar}
                />
              </div>
            </>
          ) : (
            <Searchedproductcard searchedproducts={searchedproducts} />
          )}
        </div>
      </div>
    );
}

const Categoriesoptions = ({ title, data, linkto, setshowsearchbar }) => {
  return (
    <>
      <div className="underline text-theme font-semibold ml-5">{title}</div>
      <div className="flex flex-wrap gap-2 mt-2">
        {Object.keys(data).map((category, index) => (
          <Link
            href={`/collections/${linkto}/${category}`}
            key={index}
            className="px-5 py-2 border text-xs rounded-full"
            onClick={() => {
              setshowsearchbar(false);
            }}
          >
            {category.replace(/-/g, " ")}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Searchbarsection;
