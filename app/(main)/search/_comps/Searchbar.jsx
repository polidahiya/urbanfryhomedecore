"use client";
import React, { useEffect, useState } from "react";
import Searchbox from "@/app/_globalcomps/_navbarcomps/_searchbarcomps/Searchbox";
import Searchedproductcard from "@/app/_globalcomps/_navbarcomps/_searchbarcomps/Searchedproductcard";
import Searchedproductsfn from "@/app/_globalcomps/_helperfunctions/Searchedproductsfn";

function Searchbar() {
  const [searchtext, setsearchtext] = useState("");
  const [searchedproducts, setsearchedproducts] = useState([]);
  const [isfocused, setisfocused] = useState(false);
  const [debouncedText, setDebouncedText] = useState("");

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(searchtext);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchtext]);

  // Effect for fetching data based on debounced text
  useEffect(() => {
    (async () => {
      if (!isfocused || debouncedText.trim() === "") {
        setsearchedproducts([]);
        return;
      }
      const searched = await Searchedproductsfn(debouncedText);
      setsearchedproducts(searched);
    })();
  }, [debouncedText, isfocused]);

  return (
    <div className="relative">
      <Searchbox
        searchtext={searchtext}
        setsearchtext={setsearchtext}
        isfocused={isfocused}
        setisfocused={setisfocused}
      />
      {isfocused && debouncedText.trim() !== "" ? (
        <div className="absolute top-full left-0 w-full bg-white z-10 p-5 max-h-96 border-x border-b border-theme overflow-y-scroll themescroll">
          <Searchedproductcard searchedproducts={searchedproducts} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Searchbar;
