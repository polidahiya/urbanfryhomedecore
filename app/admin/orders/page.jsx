"use client";
import React, { useEffect, useState } from "react";
import Adminsearchbar from "../_comps/_adminnavbar/Adminsearchbar";
import { Getorders } from "@/app/_serveractions/_admin/getorders";
import { AppContextfn } from "@/app/Context";
import { BiRefresh } from "react-icons/bi";
import Orderminicard from "./_comps/Orderminicard";
import Showfullorder from "./_comps/Showfullorder";

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
    <div className="px-5 md:px-10 min-w-[700px]">
      <div className="sticky top-0 bg-white">
        <div className="py-10  flex items-center">
          <p className="font-semibold text-2xl">Orders</p>
          <div className="flex gap-1 ml-auto">
            <button
              className={`border rounded-md px-5 py-1 ${
                ordertype == "all" && "bg-theme text-white"
              }`}
              onClick={() => setordertype("all")}
            >
              All
            </button>
            <button
              className={`border rounded-md px-5 py-1`}
              onClick={() => {
                setrefresher((pre) => !pre);
                setmessagefn("Refresh successful");
              }}
            >
              <BiRefresh />
            </button>
          </div>
        </div>
        <Adminsearchbar
          search={search}
          setsearch={setsearch}
          onsubmit={() => handlesearch(search)}
        />
        <div className="flex items-center mt-5 bg-adminbg font-semibold">
          <p className="flex-1 border border-slate-300 text-center py-1 font-tenor">
            Name
          </p>
          <p className="flex-1 border border-slate-300 text-center py-1 font-tenor">
            Email
          </p>
          <p className="flex-1 border border-slate-300 text-center py-1 font-tenor">
            Payment Status
          </p>
          <p className="flex-1 border border-slate-300 text-center py-1 font-tenor">
            Order Status
          </p>
          <p className="flex-1 border border-slate-300 text-center py-1 font-tenor">
            Date
          </p>
        </div>
      </div>
      {!loading ? (
        <div>
          {orders?.map((order, i) => (
            <Orderminicard
              key={i}
              order={order}
              setshowfullorder={setshowfullorder}
            />
          ))}
        </div>
      ) : (
        <Loading />
      )}
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
