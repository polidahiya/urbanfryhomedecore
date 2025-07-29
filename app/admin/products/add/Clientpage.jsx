"use client";
import React, { useState } from "react";
import { staticdata, materialoptions, collections } from "@/app/commondata";
import Standardinputfield from "../_comps/_comps/Standardinputfield";
import Multiplevaluesfield from "../_comps/_comps/Multiplevaluesfield";
import ProductVariants from "../_comps/_comps/Varients";
import Dropdownmenu from "../_comps/_comps/Dropdownmenu";
import { AppContextfn } from "@/app/Context";
import Togglebuttons from "../_comps/_comps/Togglebuttons";
import Multiselectmenu from "../_comps/_comps/Multiselectmenu";
import Link from "next/link";

function Clientpage({ productdata }) {
  const initialState = {
    category: Object.keys(staticdata)[0],
    subcat: Object.keys(Object.values(staticdata)[0]?.subcat)[0],
    productName: "",
    sku: "",
    handlingtime: "",
    mrp: "",
    sellingprice: "",
    Material: "Acacia Wood",
    Warranty: "",
    theme: "",
    dimensions: [""],
    weight: "",
    keyfeatures: [""],
    descriptions: [""],
    collections: [],
    stocks: 0,
    variants: [{ finish: "Honey Oak", images: [] }],
    seotitle: "",
    seodescription: "",
    seokeywords: "",
    available: true,
  };
  const { setmessagefn } = AppContextfn();
  const [data, setdata] = useState(
    productdata ? { ...initialState, ...productdata } : initialState
  );
  const [deletedimages, setdeletedimages] = useState([]);
  const [loading, setloading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    const formData = new FormData();

    // images
    data?.variants?.forEach((variant, i) => {
      variant.images.forEach((image, j) => {
        if (image instanceof File) {
          const imagename = "image" + i + j;
          formData.append(imagename, image);
          data.variants[i].images[j] = imagename;
        }
      });
    });
    formData.append("data", JSON.stringify(data));
    formData.append("deletedimages", JSON.stringify(deletedimages));

    try {
      const res = await fetch("/api/admin/addproduct", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      setdata(initialState);
      setmessagefn(result?.message);
      setloading(false);
      setdeletedimages([]);
    } catch (error) {
      setdata(initialState);
      setloading(false);
      setmessagefn("Error!");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Link
        href={"/admin/products"}
        className="fixed top-1 right-1 md:top-5 md:right-5 flex items-center justify-center w-10 aspect-square bg-slate-300"
      >
        x
      </Link>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="px-1 py-6 md:p-6 bg-white shadow-lg rounded-md space-y-6"
      >
        <h2 className="text-2xl text-center font-semibold text-gray-800">
          {data?._id ? "Update" : "Add New Product"}
        </h2>
        {/* Product Name */}
        <Standardinputfield
          titlename="Product Name"
          value={data?.productName}
          onchange={(e) =>
            setdata((pre) => ({ ...pre, productName: e.target.value }))
          }
          clear={() => setdata((pre) => ({ ...pre, productName: "" }))}
        />

        {/* category */}
        <Dropdownmenu
          title={"Category"}
          state={data?.category || initialState?.category}
          onchange={(value) => setdata((pre) => ({ ...pre, category: value }))}
          options={Object.keys(staticdata)}
        />
        {/* subcat*/}
        <Dropdownmenu
          title={"Sub-category"}
          state={data?.subcat || initialState?.subcat}
          onchange={(value) => setdata((pre) => ({ ...pre, subcat: value }))}
          options={Object.keys(
            staticdata[data?.category || initialState?.category].subcat
          )}
        />
        {/* sku id */}
        <Standardinputfield
          titlename="SKU ID"
          value={data?.sku}
          onchange={(e) => setdata((pre) => ({ ...pre, sku: e.target.value }))}
          clear={() => setdata((pre) => ({ ...pre, sku: "" }))}
        />
        {/* mrp */}
        <Standardinputfield
          titlename="MRP"
          type="number"
          isRequired={false}
          value={data?.mrp}
          onchange={(e) => setdata((pre) => ({ ...pre, mrp: e.target.value }))}
          clear={() => setdata((pre) => ({ ...pre, mrp: "" }))}
        />
        {/* selling price */}
        <Standardinputfield
          titlename="Selling Price"
          type="number"
          value={data?.sellingprice}
          onchange={(e) =>
            setdata((pre) => ({ ...pre, sellingprice: e.target.value }))
          }
          clear={() => setdata((pre) => ({ ...pre, sellingprice: "" }))}
        />
        {/* Material  */}
        <Dropdownmenu
          title={"Material"}
          state={data?.Material}
          onchange={(value) => setdata((pre) => ({ ...pre, Material: value }))}
          options={materialoptions}
        />
        {/* Warranty  */}
        <Standardinputfield
          titlename="Warranty"
          type="number"
          isRequired={false}
          placeholder="In months"
          value={data?.Warranty}
          onchange={(e) =>
            setdata((pre) => ({ ...pre, Warranty: e.target.value }))
          }
          clear={() => setdata((pre) => ({ ...pre, Warranty: "" }))}
        />
        {/* theme  */}
        <Standardinputfield
          titlename="Theme"
          isRequired={false}
          value={data?.theme}
          onchange={(e) =>
            setdata((pre) => ({ ...pre, theme: e.target.value }))
          }
          clear={() => setdata((pre) => ({ ...pre, theme: "" }))}
        />
        {/* Dimensions */}
        <Multiplevaluesfield
          state={data?.dimensions}
          statename="dimensions"
          setState={setdata}
          placeholder={"e.g., 12x8x6 (Inches)"}
          title={"Dimensions"}
        />
        {/* Key features */}
        <Multiplevaluesfield
          state={data?.keyfeatures}
          setState={setdata}
          statename="keyfeatures"
          placeholder={"key feature"}
          title={"Key Features"}
        />
        {/* handling time */}
        <Standardinputfield
          titlename="Handling Time"
          isRequired={false}
          value={data?.handlingtime}
          onchange={(e) =>
            setdata((pre) => ({ ...pre, handlingtime: e.target.value }))
          }
          clear={() => setdata((pre) => ({ ...pre, handlingtime: "" }))}
        />
        {/* Product weight */}
        <Standardinputfield
          titlename="Product Weight (in kg)"
          type="number"
          isRequired={false}
          value={data?.weight}
          onchange={(e) =>
            setdata((pre) => ({ ...pre, weight: e.target.value }))
          }
          clear={() => setdata((pre) => ({ ...pre, weight: "" }))}
        />
        {/* Descriptions */}
        <Multiplevaluesfield
          state={data?.descriptions}
          statename="descriptions"
          setState={setdata}
          placeholder={"Lorem ipsum"}
          title={"Descriptions"}
        />
        {/* collections */}
        <Multiselectmenu
          state={data?.collections || []}
          statename="collections"
          setState={setdata}
          title={"Collections"}
          options={Object.keys(collections)}
        />
        {/* mrp */}
        <Standardinputfield
          titlename="Stocks"
          type="number"
          value={data?.stocks}
          onchange={(e) =>
            setdata((pre) => ({ ...pre, stocks: e.target.value }))
          }
          clear={() => setdata((pre) => ({ ...pre, stocks: "" }))}
        />
        {/* variants */}
        <ProductVariants
          data={data}
          variants={data?.variants}
          setstate={setdata}
          deletedimages={deletedimages}
          setdeletedimages={setdeletedimages}
        />
        {/* seo */}
        <h2 className="my-2 font-bold text-lg">SEO</h2>
        {/* title */}
        <Standardinputfield
          titlename="Title"
          value={data?.seotitle}
          onchange={(e) =>
            setdata((pre) => ({ ...pre, seotitle: e.target.value }))
          }
          clear={() => setdata((pre) => ({ ...pre, seotitle: "" }))}
        />

        {/* Description */}
        <Standardinputfield
          titlename={`Description ${
            data?.seodescription
              ? 160 - data?.seodescription.length
              : "(160 characters max)"
          }`}
          isRequired={false}
          value={data?.seodescription}
          setState={setdata}
          onchange={(e) => {
            const value = e.target.value;
            if (value.length <= 160) {
              setdata((pre) => ({ ...pre, seodescription: value }));
            } else {
              setdata((pre) => ({
                ...pre,
                seodescription: value.slice(0, 160),
              }));
            }
          }}
          clear={() => setdata((pre) => ({ ...pre, seodescription: "" }))}
        />

        {/* keywords */}
        <Standardinputfield
          titlename="Keywords"
          isRequired={false}
          value={data?.seokeywords}
          onchange={(e) =>
            setdata((pre) => ({ ...pre, seokeywords: e.target.value }))
          }
          clear={() => setdata((pre) => ({ ...pre, seokeywords: "" }))}
        />

        {/* available */}
        <Togglebuttons
          titlename="Available?"
          value={data?.available}
          positive={() => setdata((prev) => ({ ...prev, available: true }))}
          negative={() => setdata((prev) => ({ ...prev, available: false }))}
          positiveText="Yes"
          negativeText="No"
        />

        <div className="flex items-center justify-center gap-5 sticky bottom-5">
          <button
            type="submit"
            className="flex items-center justify-center gap-2  px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {loading && (
              <span
                className={`block h-5 aspect-square border-t-2 border-b-2 border-white rounded-full animate-spin`}
              ></span>
            )}
            {data?._id ? "Update Product" : "Add Product"}
          </button>
          <button
            className="flex items-center justify-center gap-2  px-4 py-2 bg-white  border  rounded-md"
            type="button"
            onClick={() => {
              setdata(initialState);
              setdeletedimages([]);
            }}
          >
            Reset
          </button>
          {data?._id && (
            <Link
              href={"/admin/products"}
              className="flex items-center justify-center gap-2  px-4 py-2 bg-white  border  rounded-md"
            >
              Cancel Update
            </Link>
          )}
        </div>
      </form>
    </>
  );
}

export default Clientpage;
