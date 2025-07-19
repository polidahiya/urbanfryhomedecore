import React, { useState } from "react";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";
import { staticdata } from "@/app/commondata";
import Underlineffect from "../Underlineffect";

const Categories = ({ open }) => {
  const [togglecategories, settogglecategories] = useState(0);
  return (
    <div
      className={`lg:group-hover/shop:block lg:absolute top-full left-0 w-full lg:w-fit lg:min-w-52 py-2 bg-white lg:border lg:border-slate-200  ${
        open ? "block lg:hidden" : "hidden"
      }`}
    >
      {Object.entries(staticdata).map(([categorykey, category], i) => {
        return (
          <div className="group/subcat" key={i}>
            <Underlineffect
              Comp={({ innercomp }) => (
                <div className="relative px-5 py-3 whitespace-nowrap cursor-pointer">
                  <div
                    className="h-full w-full flex items-center"
                    onClick={() => settogglecategories(i)}
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
              title={categorykey.replace(/-/g, " ")}
            />
            {/* subcat */}
            <div
              className={`lg:group-hover/subcat:flex flex-col lg:absolute left-full w-full lg:w-fit  min-w-52 pl-5 lg:pl-0 py-2 bg-white lg:border lg:border-slate-200 -translate-y-px lg:max-h-96 lg:overflow-y-scroll themescroll ${
                togglecategories == i ? "flex lg:hidden" : "hidden"
              }`}
              style={{ top: `${i * 40}px` }}
            >
              <Underlineffect
                Comp={({ innercomp }) => (
                  <Link
                    href={`/collections/${categorykey}`}
                    className="relative block px-5 py-3 whitespace-nowrap"
                  >
                    {innercomp}
                  </Link>
                )}
                title={`All ${categorykey.replace(/-/g, " ")}`}
              />
              {Object.keys(category?.subcat).map((subcat, i) => (
                <Underlineffect
                  key={i}
                  Comp={({ innercomp }) => (
                    <Link
                      href={`/collections/${categorykey}/${subcat}`}
                      className="relative block px-5 py-3 whitespace-nowrap"
                    >
                      {innercomp}
                    </Link>
                  )}
                  title={subcat.replace(/-/g, " ")}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Subcats = ({ item, category, togglecategories }) => (
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
            href={`/collections/${category}/${keys}`}
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
