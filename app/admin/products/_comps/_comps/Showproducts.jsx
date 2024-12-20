import React, { useState } from "react";
import { staticdata } from "@/app/commondata";
import Dropdownmenu from "./Dropdownmenu";
import { Roomsearchproducts } from "@/app/_serveractions/_admin/Getliveproducts";
import { AppContextfn } from "@/app/Context";
import { Deleteproduct } from "@/app/_serveractions/_admin/adminAddproduct";

function Showproducts({ setdata, setdeletedimages }) {
  const [filterdata, setfilterdata] = useState({
    room: "",
    search: "",
  });
  const [products, setproducts] = useState([]);

  const handlesearch = async () => {
    const res = await Roomsearchproducts();
    setproducts(res?.data);
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
          <Productcard
            key={i}
            product={product}
            setproducts={setproducts}
            setdata={setdata}
            setdeletedimages={setdeletedimages}
          />
        ))}
      </div>
    </div>
  );
}

const Productcard = ({ product, setproducts, setdata, setdeletedimages }) => {
  const { setshowdialog, setmessagefn } = AppContextfn();

  const handledeleteproduct = async (product) => {
    const res = await Deleteproduct(product?.variants, product?._id);
    
    setmessagefn(res?.message);
    if (res.status === 200)
      setproducts((pre) => pre.filter((item) => item._id !== product?._id));
  };

  return (
    <div className="relative">
      <img
        src={product.variants[0].images[0]}
        alt="product image"
        className="w-full aspect-square object-cover"
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
              handledeleteproduct(product);
            },
            type: false,
          });
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Showproducts;
