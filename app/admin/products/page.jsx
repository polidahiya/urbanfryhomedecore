"use client";
import React, { useEffect, useState } from "react";
import AddProductForm from "./_comps/AddProductForm";
import Showproducts from "./_comps/_comps/Showproducts";
import { useSearchParams } from "next/navigation";
import { Roomsearchproducts } from "@/app/_serveractions/_admin/Getliveproducts";
import { AppContextfn } from "@/app/Context";
import Importexportmenu from "./_comps/Importexportmenu";

function Page() {
  const searchParams = useSearchParams();
  const productsku = searchParams.get("sku");
  const { setmessagefn } = AppContextfn();

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
  const [showimportmenu, setshowimportmenu] = useState(false);

  useEffect(() => {
    if (productsku) {
      (async () => {
        const res = await Roomsearchproducts("sku", productsku);
        if (res?.data?.length != 0) {
          setdata(res?.data[0]);
          setshowform(true);
        } else {
          setmessagefn("Product not found");
        }
      })();
    }
  }, [productsku]);

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
          setshowimportmenu={setshowimportmenu}
        />
      )}
      {showimportmenu && (
        <Importexportmenu setshowimportmenu={setshowimportmenu}/>
      )}
    </div>
  );
}

export default Page;
