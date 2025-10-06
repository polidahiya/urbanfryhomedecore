import React, { useEffect, useState } from "react";
import { staticdata } from "@/app/commondata";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Dropdownmenu from "@/app/admin/products/_comps/_comps/Dropdownmenu";

function Productselector({ products, setshowproducts, onselect = () => {} }) {
  const firstCategory = Object.keys(staticdata || {})[0] || "";
  const firstSubcat =
    firstCategory && staticdata[firstCategory]?.subcat
      ? Object.keys(staticdata[firstCategory].subcat)[0]
      : "";

  const [category, setcategory] = useState([firstCategory, firstSubcat]);
  const [selectedproducts, setselectedproducts] = useState([]);

  useEffect(() => {
    const selectedCategory = staticdata?.[category[0]];
    const firstSubcat = selectedCategory
      ? Object.keys(selectedCategory.subcat || {})[0]
      : "";
    setcategory([category[0], firstSubcat]);
  }, [category[0]]);

  return (
    <div className="fixed top-0 left-0 h-screen w-full z-30 bg-black/30 flex items-center justify-center p-2">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl p-5">
        <button
          type="button"
          onClick={() => setshowproducts((pre) => !pre)}
          className="absolute top-2 right-2 w-10 aspect-square rounded-full bg-gray-200 flex items-center justify-center"
        >
          X
        </button>
        <div className="flex gap-5">
          <Dropdownmenu
            title="Category"
            state={category[0]}
            onchange={(value) => {
              setcategory([value, category[1]]);
            }}
            options={Object.keys(staticdata)}
          />
          <Dropdownmenu
            title="Sub-category"
            state={category[1]}
            onchange={(value) => {
              setcategory([category[0], value]);
            }}
            options={Object.keys(staticdata[category[0]]?.subcat)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 max-h-[500px] overflow-y-scroll">
          {products
            ?.filter((product) => product?.category == category[0])
            ?.filter((product) => product?.subcat == category[1])
            ?.map((product) => {
              const firstimage =
                product?.variants[0]?.images[0] || "/uiimages/404.jpg";
              const isselected = selectedproducts.some(
                (item) => item?._id == product?._id
              );
              return (
                <div
                  key={product?._id}
                  className="relative flex gap-5 border rounded-md p-2 cursor-pointer"
                  onClick={() => {
                    if (isselected) {
                      setselectedproducts((pre) =>
                        pre.filter((item) => item?._id != product?._id)
                      );
                    } else {
                      setselectedproducts((pre) => [...pre, product]);
                    }
                  }}
                >
                  {isselected && (
                    <div className="absolute top-2 left-2 w-5 aspect-square  bg-theme text-white flex items-center justify-center text-xs">
                      &#10004;
                    </div>
                  )}
                  <Nextimage
                    src={firstimage}
                    alt={product?.productName}
                    height={500}
                    width={500}
                    loading="lazy"
                    className="w-20 h-20 object-cover"
                  />
                  <span className="line-clamp-2">{product?.productName}</span>
                </div>
              );
            })}
        </div>
        <div className="flex items-center justify-center py-2">
          <button
            type="button"
            className="sticky bottom-0 bg-theme text-white py-2 px-5 rounded-md"
            onClick={() => {
              onselect(selectedproducts);
              setshowproducts(false);
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default Productselector;
