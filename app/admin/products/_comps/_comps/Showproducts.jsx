import React, { useState } from "react";
import { staticdata } from "@/app/commondata";
import Dropdownmenu from "./Dropdownmenu";
import { Roomsearchproducts } from "@/app/_serveractions/_admin/Getliveproducts";
import { AppContextfn } from "@/app/Context";
import { Deleteproduct } from "@/app/_serveractions/_admin/adminAddproduct";
import Adminsearchbar from "@/app/admin/_comps/_adminnavbar/Adminsearchbar";

function Showproducts({ setdata, setdeletedimages }) {
  const { setmessagefn } = AppContextfn();
  const [filterdata, setfilterdata] = useState({
    categories: "Photo-Frames",
    rooms: "Living-Room",
  });
  const [search, setsearch] = useState("");
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);

  const handlesearch = async (search) => {
    setloading(true);
    const res = await Roomsearchproducts(search);
    setloading(false);
    setproducts(res?.data);
    if (res?.data?.length == 0) {
      setmessagefn("No products found");
    }
  };

  return (
    <div className="px-5 md:px-10">
      <p className="my-10 font-semibold text-2xl">Products</p>
      <Adminsearchbar
        search={search}
        setsearch={setsearch}
        onsubmit={() => handlesearch(search)}
      />
      <div className="flex items-center gap-5 mt-5">
        <Dropdownmenu
          title={"categories"}
          state={filterdata.categories}
          onchange={(value) => {
            setfilterdata((pre) => ({ ...pre, categories: value }));
            handlesearch(value);
          }}
          options={["", ...Object.keys(staticdata.categories)]}
        />
        <Dropdownmenu
          title={"Rooms"}
          state={filterdata.rooms}
          onchange={(value) => {
            setfilterdata((pre) => ({ ...pre, rooms: value }));
            handlesearch(value);
          }}
          options={["", ...Object.keys(staticdata.rooms)]}
        />
      </div>
      {!loading ? (
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
      ) : (
        <div className="mt-32">
          <div className="border-y-4 border-theme w-10 aspect-square rounded-full mx-auto animate-spin duration-300"></div>
        </div>
      )}
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
