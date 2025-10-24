"use client";
import React, { useEffect, useState } from "react";
import Dropdownmenu from "../_comps/_comps/Dropdownmenu";
import { staticdata } from "@/app/commondata";
import { AppContextfn } from "@/app/Context";
import { Roomsearchproducts } from "@/app/_serveractions/_admin/Getliveproducts";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Standardinputfield from "../_comps/_comps/Standardinputfield";
import { bulkproductsupdate } from "./bulkproductsupdate";

function Page() {
  const { setmessagefn } = AppContextfn();
  const [filterdata, setfilterdata] = useState({
    categories: Object.keys(staticdata)[0],
    subcat: Object.keys(Object.values(staticdata)[0]?.subcat)[0],
  });
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);
  const handlesearch = async (ordertype, search) => {
    setloading(true);
    const res = await Roomsearchproducts(ordertype, search);
    setloading(false);
    if (res?.status == 200) {
      setproducts(res?.data);
      if (res?.data?.length == 0) {
        setmessagefn("No products found");
      }
    } else {
      setmessagefn(res?.message);
    }
  };

  useEffect(() => {
    console.log(Object.keys(staticdata[filterdata.categories]?.subcat)[0]);

    setfilterdata((pre) => ({
      ...pre,
      subcat: Object.keys(staticdata[filterdata.categories]?.subcat)[0],
    }));
  }, [filterdata.categories]);

  const handlechange = (value, index, field) => {
    setproducts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handlesubmit = async () => {
    setloading(true);
    const res = await bulkproductsupdate(products);
    setloading(false);
    setmessagefn(res?.message);
  };

  return (
    <div className="px-5 md:px-10 flex flex-col h-dvh">
      <button
        onClick={() => {
          history.back();
        }}
        className="fixed top-1 right-1 md:top-5 md:right-5 flex items-center justify-center w-10 aspect-square bg-gray-200 z-10"
      >
        x
      </button>
      <div className="flex flex-col md:flex-row gap-2 md:gap-5 mt-5">
        <div className="flex items-end gap-5">
          <Dropdownmenu
            title={"Categories"}
            state={filterdata?.categories}
            onchange={(value) => {
              setfilterdata((pre) => ({ ...pre, categories: value }));
            }}
            options={Object.keys(staticdata)}
          />
          <Dropdownmenu
            title={"Sub-category"}
            state={filterdata?.subcat}
            onchange={(value) => {
              setfilterdata((pre) => ({ ...pre, subcat: value }));
            }}
            options={Object.keys(staticdata[filterdata?.categories].subcat)}
          />
        </div>
        <div className="flex items-end gap-5">
          <button
            className="bg-theme text-white px-5 py-2 rounded-md"
            onClick={() => handlesearch("subcat", filterdata?.subcat)}
          >
            Show Products
          </button>
        </div>
      </div>
      {products.length > 0 && (
        <div className="relative mt-5 overflow-x-scroll max-w-[calc(100vw-104px)] md:max-w-[calc(100vw-336px)] max-h-screen overflow-y-scroll">
          <table className="border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 sticky top-0 z-20">
                <th className="border border-gray-300 px-4">Image</th>
                <th className="border border-gray-300 px-4">Name</th>
                <th className="border border-gray-300 px-4">Price(MRP)</th>
                <th className="border border-gray-300 px-4">Price(SP)</th>
                <th className="border border-gray-300 px-4">Stocks</th>
                <th className="border border-gray-300 px-4">Available</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {products.map((product, index) => (
                <tr key={index} className="group relative hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    <Nextimage
                      src={
                        product?.variants[0]?.images[0] || "/uiimages/404.jpg"
                      }
                      alt={product?.productName}
                      className="w-full max-w-20 aspect-square object-cover"
                      height={500}
                      width={500}
                      loading="lazy"
                    ></Nextimage>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                    <Standardinputfield
                      titlename=""
                      value={product?.productName}
                      isRequired={true}
                      type="text"
                      onchange={(e) =>
                        handlechange(e.target.value, index, "productName")
                      }
                      clearbutton={false}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                    <Standardinputfield
                      titlename=""
                      value={product?.mrp}
                      isRequired={true}
                      type="number"
                      onchange={(e) =>
                        handlechange(e.target.value, index, "mrp")
                      }
                      clearbutton={false}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                    <Standardinputfield
                      titlename=""
                      value={product?.sellingprice}
                      isRequired={true}
                      type="number"
                      onchange={(e) =>
                        handlechange(e.target.value, index, "sellingprice")
                      }
                      clearbutton={false}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                    <Standardinputfield
                      titlename=""
                      value={product?.stocks}
                      isRequired={true}
                      type="number"
                      onchange={(e) =>
                        handlechange(e.target.value, index, "stocks")
                      }
                      clearbutton={false}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                    <button
                      className={`${!product?.available && "text-red-500"}`}
                      onClick={() => {
                        handlechange(!product?.available, index, "available");
                      }}
                    >
                      {product?.available ? "TRUE" : "FALSE"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 sticky bottom-3 flex items-center justify-center">
            <button
              onClick={handlesubmit}
              className="bg-theme text-white px-6 py-2 flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="block w-5 h-5 border-b-2 border-t-2 rounded-full border-white animate-spin"></span>
              )}
              <span> Save All</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
