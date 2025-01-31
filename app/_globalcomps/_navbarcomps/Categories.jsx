import React, { useState } from "react";
import Link from "next/link";
import Underlineeffect from "../Underlineeffect";
import { MdKeyboardArrowDown } from "react-icons/md";
import { staticdata } from "@/app/commondata";

const Categories = ({ open }) => {
  const [togglecategories, settogglecategories] = useState({
    rooms: false,
    categories: false,
  });
  return (
    <div
      className={`lg:absolute top-full left-0 w-full lg:w-fit lg:min-w-52 py-2 bg-white lg:border lg:border-slate-200 shopcategoriesblock ${
        open ? "block lg:hidden" : "hidden"
      }`}
    >
      <div className="underlineff shopcategories relative px-5 py-3 whitespace-nowrap cursor-pointer">
        <div
          className="underlineff h-full w-full flex items-center"
          onClick={() =>
            settogglecategories((pre) => ({
              categories: false,
              rooms: !pre.rooms,
            }))
          }
        >
          <Underlineeffect title={"Shop By Rooms"} />
          <MdKeyboardArrowDown
            className={`ml-5 duration-300 text-lg lg:hidden ${
              togglecategories.rooms && "rotate-180"
            }`}
          />
        </div>
        {/* subcat */}
        <Subcats
          item={staticdata.rooms}
          type="rooms"
          togglecategories={togglecategories.rooms}
        />
      </div>
      {/*  */}
      <div className="underlineff shopcategories w-full relative px-5 py-3 whitespace-nowrap cursor-pointer">
        <div
          className="underlineff h-full w-full flex items-center"
          onClick={() =>
            settogglecategories((pre) => ({
              rooms: false,
              categories: !pre.categories,
            }))
          }
        >
          <Underlineeffect title={"Shop By Categories"} />
          <MdKeyboardArrowDown
            className={`ml-5 duration-300 text-lg lg:hidden ${
              togglecategories.categories && "rotate-180"
            }`}
          />
        </div>
        {/* subcat */}
        <Subcats
          item={staticdata.categories}
          type="categories"
          togglecategories={togglecategories.categories}
        />
      </div>
      <Link
        href="/collections/all"
        className="block underlineff shopcategories w-full relative px-5 py-3 whitespace-nowrap cursor-pointer"
      >
        <Underlineeffect title={"All Products"} />
      </Link>
    </div>
  );
};

const Subcats = ({ item, type, togglecategories }) => (
  <div
    className={`shopsubcat flex-col lg:absolute top-0 left-full w-fit min-w-52 py-2 bg-white lg:border lg:border-slate-200 ${
      togglecategories ? "flex lg:hidden" : "hidden"
    }`}
  >
    {Object.keys(item).map((keys, i) => (
      <Link
        href={`/collections/${type}/${keys}`}
        key={i}
        className="underlineff relative px-5 py-3 whitespace-nowrap"
      >
        <Underlineeffect title={keys.replace(/-/g, " ")} />
      </Link>
    ))}
  </div>
);
export default Categories;
