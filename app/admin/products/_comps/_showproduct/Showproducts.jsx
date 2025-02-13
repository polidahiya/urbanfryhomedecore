import React, { useState } from "react";
import { staticdata } from "@/app/commondata";
import Dropdownmenu from "../_comps/Dropdownmenu";
import { Roomsearchproducts } from "@/app/_serveractions/_admin/Getliveproducts";
import { AppContextfn } from "@/app/Context";
import Adminsearchbar from "@/app/admin/_comps/_adminnavbar/Adminsearchbar";
import Previewproducts from "../Previewproducts";
import { PiListBold } from "react-icons/pi";
import { BiSolidGrid } from "react-icons/bi";
import Gridview from "./Gridview";
import Listview from "./Listview";

function Showproducts({
  setdata,
  setdeletedimages,
  setshowform,
  resetState,
  setshowimportmenu,
}) {
  const { setmessagefn } = AppContextfn();
  const [filterdata, setfilterdata] = useState({
    categories: "",
    rooms: "",
  });
  const [search, setsearch] = useState("");
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);
  const [previewdata, setpreviewdata] = useState({ show: false, data: {} });
  const [viewtype, setviewtype] = useState("grid"); //grid ,list

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

  return (
    <div className="px-5 md:px-10">
      <div className="my-10  flex items-center gap-2">
        <span className="font-semibold text-2xl">Products</span>{" "}
        <button
          className="px-5 py-2 rounded-md bg-theme text-white ml-auto"
          onClick={() => {
            setshowform(true);
            resetState();
            setdeletedimages([]);
          }}
        >
          + <span className="hidden md:inline">Add New</span>
        </button>
        <button
          className="px-5 py-2 rounded-md bg-theme text-white"
          onClick={() => {
            setshowimportmenu(true);
          }}
        >
          Import/Export
        </button>
      </div>
      <Adminsearchbar
        search={search}
        setsearch={setsearch}
        onsubmit={() => handlesearch("search", search)}
        placeholder="Search Categories, Rooms, Product Name, Sku, Material or Theme"
      />
      <div className="flex items-end gap-5 mt-5">
        <button
          className="bg-theme text-white px-5 py-2 rounded-md"
          onClick={() => handlesearch("all", "")}
        >
          All
        </button>
        <Dropdownmenu
          title={"Categories"}
          state={filterdata.categories}
          onchange={(value) => {
            setfilterdata((pre) => ({ ...pre, categories: value }));
            handlesearch("category", value);
          }}
          options={["", ...Object.keys(staticdata.categories)]}
        />
        <Dropdownmenu
          title={"Rooms"}
          state={filterdata.rooms}
          onchange={(value) => {
            setfilterdata((pre) => ({ ...pre, rooms: value }));
            handlesearch("rooms", value);
          }}
          options={["", ...Object.keys(staticdata.rooms)]}
        />
      </div>
      <div className="flex justify-end gap-2 w-full mt-5">
        <button
          className={`p-2 border ${
            viewtype == "grid" && "bg-theme text-white"
          } rounded-md`}
          onClick={() => setviewtype("grid")}
        >
          <BiSolidGrid />
        </button>
        <button
          className={`p-2 border ${
            viewtype == "list" && "bg-theme text-white"
          } rounded-md`}
          onClick={() => setviewtype("list")}
        >
          <PiListBold />
        </button>
      </div>
      {!loading ? (
        viewtype == "grid" ? (
          <Gridview
            products={products}
            setproducts={setproducts}
            setdata={setdata}
            setdeletedimages={setdeletedimages}
            setshowform={setshowform}
            setpreviewdata={setpreviewdata}
          />
        ) : (
          <Listview
            products={products}
            setproducts={setproducts}
            setdata={setdata}
            setdeletedimages={setdeletedimages}
            setshowform={setshowform}
            setpreviewdata={setpreviewdata}
          />
        )
      ) : (
        <div className="mt-32">
          <div className="border-y-4 border-theme w-10 aspect-square rounded-full mx-auto animate-spin duration-300"></div>
        </div>
      )}
      {/* preview  */}
      {previewdata?.show && (
        <Previewproducts
          previewdata={previewdata}
          setpreviewdata={setpreviewdata}
        />
      )}
    </div>
  );
}

export default Showproducts;
