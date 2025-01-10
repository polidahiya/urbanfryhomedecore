"use client";
import React, { useState } from "react";
import AddProductForm from "./_comps/AddProductForm";
import Showproducts from "./_comps/_comps/Showproducts";

function Page() {
  const initialState = {
    categories: "Photo-Frames",
    rooms: "Living-Room",
    productName: "",
    sku: "",
    handlingtime: "",
    mrp: "",
    sellingprice: "",
    Material: "",
    Warranty: "",
    theme: "",
    dimensions: [""],
    weight: "",
    keyfeatures: [""],
    descriptions: [""],
    variants: [{ finish: "Honey Oak", images: [] }],
    seotitle: "",
    seodescription: "",
    seokeywords: "",
    available: true,
  };
  const [data, setdata] = useState(initialState);
  const [deletedimages, setdeletedimages] = useState([]);
  const resetState = () => {
    setdata(initialState);
  };
  const [showform, setshowform] = useState(false);

  return (
    <div>
      <div className="relative">
        {showform && (
          <>
            <AddProductForm
              data={data}
              setdata={setdata}
              initialState={initialState}
              resetState={resetState}
              deletedimages={deletedimages}
              setdeletedimages={setdeletedimages}
            />
            <button
              className="fixed top-5 right-5 w-10 aspect-square bg-slate-300"
              onClick={() => setshowform(false)}
            >
              x
            </button>
          </>
        )}
      </div>
      {!showform && (
        <Showproducts setdata={setdata} setdeletedimages={setdeletedimages} />
      )}
    </div>
  );
}

export default Page;
