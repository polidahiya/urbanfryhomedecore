import React, { useEffect, useState } from "react";
import { staticdata } from "@/app/commondata";
import Dropdownmenu from "../_comps/Dropdownmenu";
import { Roomsearchproducts } from "@/app/_serveractions/_admin/Getliveproducts";
import { AppContextfn } from "@/app/Context";
import Adminsearchbar from "@/app/admin/_comps/_adminnavbar/Adminsearchbar";
import { PiListBold } from "react-icons/pi";
import { BiSolidGrid } from "react-icons/bi";
import Gridview from "./Gridview";
import Listview from "./Listview";
import Link from "next/link";

function Showproducts({ setshowimportmenu }) {
  const { setmessagefn } = AppContextfn();
  const [filterdata, setfilterdata] = useState({
    categories: Object.keys(staticdata)[0],
    subcat: Object.keys(Object.values(staticdata)[0]?.subcat)[0],
  });
  const [search, setsearch] = useState("");
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);
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

  useEffect(() => {
    setfilterdata((pre) => ({
      ...pre,
      subcat: Object.keys(staticdata[filterdata.categories]?.subcat)[0],
    }));
  }, [filterdata.categories]);

  return (
    <div className="px-5 md:px-10 flex flex-col h-dvh">
      <div className="my-10  flex items-center gap-2">
        <span className="font-semibold text-2xl">Products</span>{" "}
        <Link
          href={"/admin/products/add"}
          className="px-5 py-2 rounded-md bg-theme text-white ml-auto"
        >
          + <span className="hidden md:inline">Add New</span>
        </Link>
        <Link
          href={"/admin/products/bulk"}
          className="px-5 py-2 rounded-md bg-theme text-white"
        >
          <span className="hidden md:inline">Bulk update</span>
        </Link>
        <button
          className="px-5 py-2 rounded-md bg-theme text-white hidden"
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
          <button
            className="bg-theme text-white px-5 py-2 rounded-md"
            onClick={() => handlesearch("all", "")}
          >
            All
          </button>
        </div>
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
          <Gridview products={products} setproducts={setproducts} />
        ) : (
          <Listview products={products} setproducts={setproducts} />
        )
      ) : (
        <div className="mt-32">
          <div className="border-y-4 border-theme w-10 aspect-square rounded-full mx-auto animate-spin duration-300"></div>
        </div>
      )}
    </div>
  );
}

export default Showproducts;
