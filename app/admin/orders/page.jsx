"use client";
import React, { useEffect, useState } from "react";
import Adminsearchbar from "../_comps/_adminnavbar/Adminsearchbar";
import { Getorders } from "@/app/_serveractions/_admin/getorders";
import { AppContextfn } from "@/app/Context";
import { BiRefresh } from "react-icons/bi";
import Orderminicard from "./_comps/Orderminicard";
import Showfullorder from "./_comps/Showfullorder";
import Link from "next/link";

function Page() {
  const { setmessagefn } = AppContextfn();
  const [ordertype, setordertype] = useState("all");
  const [search, setsearch] = useState("");
  const [orders, setorders] = useState([]);
  const [totalorders, settotalorders] = useState(0);
  const [pagenumber, setpagenumber] = useState(1);
  const [loading, setloading] = useState(true);
  const [refresher, setrefresher] = useState(false);
  const [showfullorder, setshowfullorder] = useState({ show: false, data: {} });
  const numberoforderstoshow = 20;

  useEffect(() => {
    (async () => {
      setloading(true);
      const res = await Getorders(
        ordertype,
        search,
        numberoforderstoshow,
        pagenumber
      );
      setloading(false);
      if (res?.status == 200) {
        setorders(res?.data);
        settotalorders(res?.totalOrders);
      }
      if (res?.data?.length == 0) setmessagefn("No Orders found");
    })();
  }, [pagenumber, ordertype, refresher]);

  const handlesearch = async () => {
    setordertype("search");
    setpagenumber(1);
    setrefresher((pre) => !pre);
  };

  const pagenation = new Array(
    Math.ceil(totalorders / numberoforderstoshow)
  ).fill(null);

  return (
    <div className="px-5 md:px-10 w-full flex flex-col h-screen flex-1">
      <div className="sticky top-0 bg-white border-b border-gray-200 z-20">
        <div className="flex items-center flex-wrap gap-3 py-6">
          <p className="font-semibold text-2xl text-gray-800">Orders</p>

          <div className="flex items-center gap-2 ml-auto">
            <Link
              href="/admin/orders/Add"
              className="rounded-lg bg-theme text-white px-5 py-2 font-medium shadow-sm hover:opacity-90 active:scale-[0.98] transition-all duration-150"
            >
              + <span className="hidden md:inline-block">Add</span>
            </Link>

            <button
              className={`rounded-lg border px-5 py-2 font-medium transition-all duration-150 ${
                ordertype === "all"
                  ? "bg-theme text-white border-theme"
                  : "hover:bg-gray-100 text-gray-700 border-gray-300"
              }`}
              onClick={() => setordertype("all")}
            >
              All
            </button>

            <button
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-100 active:scale-[0.96] transition-all duration-150 flex items-center justify-center"
              onClick={() => {
                setrefresher((pre) => !pre);
                setmessagefn("Refresh successful");
              }}
              title="Refresh"
            >
              <BiRefresh className="text-lg" />
            </button>
          </div>
        </div>

        <div className="pb-4">
          <Adminsearchbar
            search={search}
            setsearch={setsearch}
            onsubmit={() => handlesearch(search)}
          />
        </div>
      </div>

      {!loading ? (
        <div className="relative mt-5 overflow-x-scroll h-full max-w-full  max-h-screen overflow-y-scroll">
          <table className="border-collapse border border-gray-300 w-full max-w-full">
            <thead>
              <tr className="bg-gray-200 sticky top-0 z-20">
                <th className="border border-gray-300 px-4 whitespace-nowrap">
                  Name
                </th>
                <th className="border border-gray-300 px-4 whitespace-nowrap">
                  Email
                </th>
                <th className="border border-gray-300 px-4 whitespace-nowrap">
                  Payment Status
                </th>
                <th className="border border-gray-300 px-4 whitespace-nowrap">
                  Order Status
                </th>
                <th className="border border-gray-300 px-4 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders?.map((order, i) => (
                <Orderminicard
                  key={i}
                  order={order}
                  setshowfullorder={setshowfullorder}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Loading />
      )}
      {/* pagenation */}
      <div
        className={`flex items-center justify-center gap-1 my-5 ${
          pagenation.length == 1 && "hidden"
        }`}
      >
        {pagenation.map((_, i) => {
          return (
            <button
              key={i}
              className={`flex items-center justify-center h-10 aspect-square rounded-full text-sm bg-adminbg ${
                i == pagenumber - 1 && "bg-theme text-white"
              }`}
              onClick={() => {
                setpagenumber(i + 1);
              }}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      {/* show full order */}
      {showfullorder.show && (
        <Showfullorder
          showfullorder={showfullorder}
          setshowfullorder={setshowfullorder}
          setrefresher={setrefresher}
        />
      )}
    </div>
  );
}

const Loading = () => (
  <div className="my-32">
    <div className="border-y-4 border-theme w-10 aspect-square rounded-full mx-auto animate-spin duration-300"></div>
  </div>
);

export default Page;
