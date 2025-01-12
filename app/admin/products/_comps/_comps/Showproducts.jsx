import React, { useState } from "react";
import { staticdata } from "@/app/commondata";
import Dropdownmenu from "./Dropdownmenu";
import { Roomsearchproducts } from "@/app/_serveractions/_admin/Getliveproducts";
import { AppContextfn } from "@/app/Context";
import { Deleteproduct } from "@/app/_serveractions/_admin/adminAddproduct";
import Adminsearchbar from "@/app/admin/_comps/_adminnavbar/Adminsearchbar";
import { GrUpdate } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { IoCopy } from "react-icons/io5";

function Showproducts({ setdata, setdeletedimages, setshowform, resetState }) {
  const { setmessagefn } = AppContextfn();
  const [filterdata, setfilterdata] = useState({
    categories: "",
    rooms: "",
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
      <p className="my-10  flex items-center justify-between">
        <span className="font-semibold text-2xl">Products</span>{" "}
        <button
          className="px-5 py-2 rounded-md bg-theme text-white"
          onClick={() => {
            setshowform(true);
            resetState();
            setdeletedimages([]);
          }}
        >
          + <span className="hidden md:inline">Add New</span>
        </button>
      </p>
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
              setshowform={setshowform}
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

const Productcard = ({
  product,
  setproducts,
  setdata,
  setdeletedimages,
  setshowform,
}) => {
  const { setshowdialog, setmessagefn } = AppContextfn();

  const handledeleteproduct = async (product) => {
    const res = await Deleteproduct(product?.variants, product?._id);

    setmessagefn(res?.message);
    if (res.status === 200)
      setproducts((pre) => pre.filter((item) => item._id !== product?._id));
  };

  return (
    <div className="relative max-w-72">
      <img
        src={product.variants[0].images[0]}
        alt="product image"
        className="w-full aspect-square object-cover"
      />
      <p className="mt-1 text-center">{product?.productName}</p>
      <div className="absolute top-0 right-0 flex flex-col gap-1 p-1">
        {/* update button */}
        <button
          className="text-xs bg-green-500 text-white rounded-full p-2"
          onClick={() => {
            setdata(product);
            setdeletedimages([]);
            setshowform(true);
          }}
        >
          <GrUpdate />
        </button>
        {/* copy */}
        <button
          className="text-xs bg-sky-600 text-white rounded-full p-2"
          onClick={() => {
            const updateddata = { ...product };
            delete updateddata._id;
            updateddata.sku = "";
            updateddata.variants.forEach((variant) => {
              variant.images = [];
            });
            console.log(updateddata);

            setdata(updateddata);
            setdeletedimages([]);
            setshowform(true);
          }}
        >
          <IoCopy />
        </button>
        {/* delete button */}
        <button
          className="text-xs bg-red-500 text-white rounded-full p-2"
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
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
};

export default Showproducts;
