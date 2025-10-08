import React from "react";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Formparts from "./Formparts";

function Productcomp({ productsdata, setproductsdata, setshowproducts }) {
  return (
    <Formparts heading="Products">
      {productsdata?.map((product, i) => {
        const selecteddata = product.selecteddata;
        const selectedvarient = selecteddata?.vcolor;
        return (
          <div key={i}>
            <div className="relative flex gap-5 border rounded-md p-2 cursor-pointer">
              <Nextimage
                src={
                  product?.variants[selectedvarient]?.images[0] ||
                  "/uiimages/404.jpg"
                }
                alt={product?.productName}
                height={500}
                width={500}
                loading="lazy"
                className="w-20 h-20 object-cover"
              />
              <p>{product?.productName}</p>
            </div>
            {/* varients */}
            <div className="flex flex-wrap gap-2 mt-2">
              {product?.variants?.map((variant, j) => (
                <div
                  key={j}
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => {
                    setproductsdata((pre) => {
                      const updated = [...pre];
                      updated[i].selecteddata.vcolor = j;
                      return updated;
                    });
                  }}
                >
                  <Nextimage
                    src={variant.images[0] || "/uiimages/404.jpg"}
                    alt={variant.finish}
                    height={100}
                    width={100}
                    loading="lazy"
                    className="w-10 aspect-square rounded-full"
                  ></Nextimage>
                  <p
                    className={`${
                      selecteddata?.vcolor == j && "text-cyan-600"
                    }`}
                  >
                    {variant.finish}
                  </p>
                </div>
              ))}
            </div>
            {/* moreoptions */}
            {product.moreoptions.map((option, j) => {
              return (
                <div key={j}>
                  <p>{option?.name}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {option?.options?.map((opt, k) => (
                      <div
                        key={k}
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => {
                          setproductsdata((pre) => {
                            const updated = [...pre];
                            updated[i].selecteddata.vcolor = j;
                            return updated;
                          });
                        }}
                      >
                        <Nextimage
                          src={opt.images[0] || "/uiimages/404.jpg"}
                          alt={opt.name}
                          height={100}
                          width={100}
                          loading="lazy"
                          className="w-10 aspect-square rounded-full"
                        ></Nextimage>
                        <p
                        //   className={`${
                        //     selecteddata?.vcolor == j && "text-cyan-600"
                        //   }`}
                        >
                          {opt.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => setshowproducts(true)}
        className="px-4 py-2 border rounded-md bg-theme text-white w-fit"
      >
        Add Product
      </button>
    </Formparts>
  );
}

export default Productcomp;
