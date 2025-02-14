import React from "react";
import Imagescomp from "@/app/(main)/product/[...props]/_comps/Imagescomp";
import Link from "next/link";
import Underlineffect from "@/app/_globalcomps/Underlineffect";
import Details from "@/app/(main)/product/[...props]/_comps/Details";

function Previewproducts({ previewdata, setpreviewdata }) {
  const product = previewdata?.data;
  const color = 0;
  return (
    <div className="fixed inset-0 flex flex-col lg:flex-row gap-10 px-5 py-10  md:px-10 bg-white overflow-y-scroll themescroll">
      <div className="flex-[3]">
        <Imagescomp
          images={product?.variants[color].images}
          name={product?.productName}
        />
        {/* routes */}
        <div className="text-sm mt-10 ">
          <Underlineffect
            Comp={({ innercomp }) => <Link href="/">{innercomp}</Link>}
            title="Home"
            styles="w-fit"
          />{" "}
          /{" "}
          <Underlineffect
            Comp={({ innercomp }) => (
              <Link href={`/collections/categories/${product?.categories}`}>
                {innercomp}
              </Link>
            )}
            title={product?.categories.replace(/-/g, " ")}
            styles="w-fit"
          />{" "}
          /{" "}
          <span className="capitalize text-[#a7a5a2]">
            {product?.productName.replace(/-/g, " ")}
          </span>
        </div>
      </div>
      <Details product={product} color={color} />
      <button
        className="absolute top-5 right-5 w-10 aspect-square bg-slate-300"
        onClick={() => setpreviewdata({ show: false, data: {} })}
      >
        x
      </button>
    </div>
  );
}

export default Previewproducts;
