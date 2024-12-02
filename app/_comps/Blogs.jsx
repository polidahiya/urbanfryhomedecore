import React from "react";
import Link from "next/link";
import Closeeffectlink from "../_globalcomps/Closeeffectlink";

function Blogs() {
  const blogs = [
    {
      img: "https://loopsbylj.com/cdn/shop/files/Screen_Shot_2024-04-07_at_1.48.54_PM.png?v=1712478031&width=1100",
      link: "/",
    },
    {
      img: "https://loopsbylj.com/cdn/shop/files/Screen_Shot_2024-04-07_at_1.48.54_PM.png?v=1712478031&width=1100",
      link: "/",
    },
    {
      img: "https://loopsbylj.com/cdn/shop/files/Screen_Shot_2024-04-07_at_1.48.54_PM.png?v=1712478031&width=1100",
      link: "/",
    },
    {
      img: "https://loopsbylj.com/cdn/shop/files/Screen_Shot_2024-04-07_at_1.48.54_PM.png?v=1712478031&width=1100",
      link: "/",
    },
  ];

  return (
    <div className="flex items-stretch py-5 px-8 space-x-5">
      {blogs.map((blog, i) => (
        <React.Fragment key={i}>
          <div className="">
            <img src={blog.img} alt="" className="aspect-[2/3] py-8" />
            <div className="flex flex-col items-center gap-8">
              <p className="font-tenor text-center text-3xl">
                Actor Jaaved Jaaferi.
              </p>
              <p className="text-center">
                Jaaved Jaaferi succumbs to nostalgia as he takes AD through his
                over 7,000-square-foot apartment in Bandra, designed by Kush
                Bhayani of KULx Studio.
              </p>
              <Closeeffectlink title="Read more" link={"/"} />
            </div>
          </div>
          {/* Only show the divider if it's not the last item */}
          {i < blogs.length - 1 && (
            <div className="bg-[#56473e] min-w-[1px] opacity-40 min-h-full mx-5"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Blogs;
