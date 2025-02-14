import React, { useState } from "react";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";
import { staticdata } from "@/app/commondata";
import Underlineffect from "../Underlineffect";

const Categories = ({ open }) => {
  const [togglecategories, settogglecategories] = useState({
    rooms: false,
    categories: false,
  });
  return (
    <div
      className={`lg:group-hover/shop:block lg:absolute top-full left-0 w-full lg:w-fit lg:min-w-52 py-2 bg-white lg:border lg:border-slate-200  ${
        open ? "block lg:hidden" : "hidden"
      }`}
    >
      <div className="group/subcat">
        <Underlineffect
          Comp={({ innercomp }) => (
            <div className="relative px-5 py-3 whitespace-nowrap cursor-pointer">
              <div
                className="h-full w-full flex items-center"
                onClick={() =>
                  settogglecategories((pre) => ({
                    categories: false,
                    rooms: !pre.rooms,
                  }))
                }
              >
                {innercomp}
                <MdKeyboardArrowDown
                  className={`ml-5 duration-300 text-lg lg:hidden ${
                    togglecategories.rooms && "rotate-180"
                  }`}
                />
              </div>
              {/* subcat */}
            </div>
          )}
          title="Shop By Categories"
        />
        <Subcats
          item={staticdata.rooms}
          type="rooms"
          togglecategories={togglecategories.rooms}
        />
      </div>

      {/*  */}
      <div className="group/subcat">
        <Underlineffect
          Comp={({ innercomp }) => (
            <div className="shopcategories w-full relative px-5 py-3 whitespace-nowrap cursor-pointer">
              <div
                className="h-full w-full flex items-center"
                onClick={() =>
                  settogglecategories((pre) => ({
                    rooms: false,
                    categories: !pre.categories,
                  }))
                }
              >
                {innercomp}
                <MdKeyboardArrowDown
                  className={`ml-5 duration-300 text-lg lg:hidden ${
                    togglecategories.categories && "rotate-180"
                  }`}
                />
              </div>
            </div>
          )}
          title="Shop By Categories"
        />
        {/* subcat */}
        <Subcats
          item={staticdata.categories}
          type="categories"
          togglecategories={togglecategories.categories}
        />
      </div>

      <Underlineffect
        Comp={({ innercomp }) => (
          <Link
            href="/collections/special/all"
            className="block shopcategories w-full relative px-5 py-3 whitespace-nowrap cursor-pointer"
          >
            {innercomp}
          </Link>
        )}
        title="All Products"
      />
    </div>
  );
};

const Subcats = ({ item, type, togglecategories }) => (
  <div
    className={`lg:group-hover/subcat:flex flex-col lg:absolute top-0 left-full w-full lg:w-fit  min-w-52 pl-5 lg:pl-0 py-2 bg-white lg:border lg:border-slate-200 lg:max-h-96 lg:overflow-y-scroll themescroll ${
      togglecategories ? "flex lg:hidden" : "hidden"
    }`}
  >
    {Object.keys(item).map((keys, i) => (
      <Underlineffect
        key={i}
        Comp={({ innercomp }) => (
          <Link
            href={`/collections/${type}/${keys}`}
            className="relative block px-5 py-3 whitespace-nowrap"
          >
            {innercomp}
          </Link>
        )}
        title={keys.replace(/-/g, " ")}
      />
    ))}
  </div>
);
export default Categories;
