"use client";
import React, { useState } from "react";
import AddProductForm from "./_comps/AddProductForm";
import Showproducts from "./_comps/_comps/Showproducts";

function Page() {
  const initialState = {
    categories: "Pantry-Organizers",
    rooms: "Living-Room",
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
              setshowform={setshowform}
            />
            <button
              className="fixed top-1 right-1 md:top-5 md:right-5 w-10 aspect-square bg-slate-300"
              onClick={() => setshowform(false)}
            >
              x
            </button>
          </>
        )}
      </div>
      {!showform && (
        <Showproducts
          setdata={setdata}
          setdeletedimages={setdeletedimages}
          setshowform={setshowform}
          resetState={resetState}
        />
      )}
    </div>
  );
}

export default Page;
