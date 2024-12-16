import React, { useState } from "react";
import { staticdata } from "@/app/commondata";
import Dropdownmenu from "./Dropdownmenu";
import { Roomsearchproducts } from "@/app/_serveractions/_admin/Getliveproducts";
import { AppContextfn } from "@/app/Context";
import { Deleteproduct } from "@/app/_serveractions/_admin/adminAddproduct";

function Showproducts({ setdata, setdeletedimages }) {
  const { setshowdialog } = AppContextfn();
  const [filterdata, setfilterdata] = useState({
    room: "",
    search: "",
  });
  const [products, setproducts] = useState([]);

  const handlesearch = async () => {
    const res = await Roomsearchproducts();
    console.log(res?.data);
    setproducts(res?.data);
  };

  const handledeleteproduct = async (value) => {
    const res = Deleteproduct();
  };

  return (
    <div className="p-6 mt-5">
      <div>
        {/* rooms */}
        <Dropdownmenu
          title={"Rooms"}
          state={filterdata.room}
          onchange={(value) =>
            setfilterdata((pre) => ({ ...pre, room: value }))
          }
          options={Object.keys(staticdata.rooms)}
        />
        <div className="flex gap-2 border h-10 mt-2 p-px">
          <input
            type="text"
            value={filterdata.search}
            onChange={(e) => {
              setfilterdata((pre) => ({ ...pre, search: e.target.value }));
            }}
            className="w-full px-5 outline-none"
            placeholder="Search"
          />
          <button className="px-5 bg-theme text-white" onClick={handlesearch}>
            Search
          </button>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-2 gap-y-16 my-10">
        {products.map((product, i) => (
          <div key={i} className="relative">
            <img
              src={product.variants[0].images[0]}
              alt="product image"
              className="w-full aspect-square test object-cover"
            />
            <p className="mt-1">{product?.productName}</p>
            {/* update button */}
            <button
              className="absolute top-0 left-0 text-xs bg-green-500 text-white px-5 py-1"
              onClick={() => {
                setdata(product);
                setdeletedimages([]);
              }}
            >
              update
            </button>
            <button
              className="absolute top-0 right-0 text-xs bg-red-500 text-white px-5 py-1"
              onClick={() => {
                setshowdialog({
                  show: true,
                  title: "Confirm Delete?",
                  continue: () => {
                    handledeleteproduct("test");
                  },
                  type: false,
                });
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Showproducts;
