import React from "react";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Formparts from "./Formparts";
import { AiOutlineDelete } from "react-icons/ai";

function Productcomp({ productsdata, setproductsdata, setshowproducts }) {
  const handleIncrement = (i) => {
    setproductsdata((pre) => {
      const updated = [...pre];
      updated[i].quantity++;
      return updated;
    });
  };

  const handleDecrement = (i) => {
    setproductsdata((pre) => {
      const updated = [...pre];
      if (updated[i].quantity <= 1) return updated;
      updated[i].quantity--;
      return updated;
    });
  };

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
              <div>
                <p>{product?.productName}</p>
                <div className="flex gap-2 mt-3">
                  <div className="h-10 flex items-stretch  w-fit border border-theme lg:hover:border-black bg-white">
                    {/* Decrement Button */}
                    <button
                      type="button"
                      onClick={() => handleDecrement(i)}
                      disabled={product?.quantity <= 1}
                      className={`flex items-center justify-center h-full aspect-square text-xl ${
                        product?.quantity <= 1 && "opacity-50"
                      }`}
                    >
                      -
                    </button>
                    {/* display quantity */}
                    <p className="flex items-center justify-center h-full w-5">
                      {product?.quantity}
                    </p>
                    {/* Increment Button */}
                    <button
                      type="button"
                      onClick={() => handleIncrement(i)}
                      disabled={product?.quantity >= 100}
                      className={`flex items-center justify-center h-full aspect-square text-xl ${
                        product?.quantity >= 100 && "opacity-50"
                      }`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setproductsdata((pre) => {
                        const updated = [...pre];
                        updated.splice(i, 1);
                        return updated;
                      });
                    }}
                    className="h-10 aspect-square flex items-center justify-center  w-fit border border-theme lg:hover:border-black bg-white"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            </div>
            {/* variants */}
            <div className="mt-2">
              <Formparts heading="">
                <div className="flex items-center flex-wrap gap-2 mt-2">
                  <div>variants :-</div>
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
              </Formparts>
            </div>
            {/* moreoptions */}
            {product?.moreoptions &&
              product?.moreoptions.map((option, j) => {
                return (
                  <div className="mt-2" key={j}>
                    <Formparts heading={""}>
                      <div>
                        <p>{option?.name}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {option?.options?.map((opt, k) => (
                            <button
                              key={k}
                              type="button"
                              className={`flex gap-2 items-center cursor-pointer border rounded-full p-1 pr-3 ${
                                !opt.image[0] && "pl-3"
                              } ${
                                selecteddata[option?.name] == k &&
                                "text-cyan-600"
                              }`}
                              onClick={() => {
                                setproductsdata((pre) => {
                                  const updated = [...pre];
                                  updated[i].selecteddata[option?.name] = k;
                                  return updated;
                                });
                              }}
                            >
                              {opt.image[0] && (
                                <Nextimage
                                  src={opt.image[0] || "/uiimages/404.jpg"}
                                  alt={opt.name}
                                  height={100}
                                  width={100}
                                  loading="lazy"
                                  className="w-10 aspect-square rounded-full"
                                ></Nextimage>
                              )}
                              <p
                              //   className={`${
                              //     selecteddata?.vcolor == j && "text-cyan-600"
                              //   }`}
                              >
                                {opt.name}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </Formparts>
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
