"use client";
import React, { useEffect, useState } from "react";
import Adminsearchbar from "../_comps/_adminnavbar/Adminsearchbar";
import { Getusers } from "@/app/_serveractions/_admin/Getusers";
import { AppContextfn } from "@/app/Context";
import { BiRefresh } from "react-icons/bi";
import Userminicard from "./_comps/Userminicard";
import Showfulluser from "./_comps/Showfulluser";

function Page() {
  const { setmessagefn } = AppContextfn();
  const [usertype, setusertype] = useState("all");
  const [search, setsearch] = useState("");
  const [users, setusers] = useState([]);
  const [totalusers, settotalusers] = useState(0);
  const [pagenumber, setpagenumber] = useState(1);
  const [loading, setloading] = useState(true);
  const [refresher, setrefresher] = useState(false);
  const [showfulluser, setshowfulluser] = useState({ show: false, data: {} });
  const numberofuserstoshow = 20;

  useEffect(() => {
    (async () => {
      setloading(true);
      const res = await Getusers(
        usertype,
        search,
        numberofuserstoshow,
        pagenumber
      );
      setloading(false);
      if (res?.status == 200) {
        setusers(res?.data);
        settotalusers(res?.totalusers);
      }
      if (res?.data?.length == 0) setmessagefn("No users found");
    })();
  }, [pagenumber, usertype, refresher]);

  const handlesearch = async () => {
    setusertype("search");
    setpagenumber(1);
    setrefresher((pre) => !pre);
  };

  const pagenation = new Array(
    Math.ceil(totalusers / numberofuserstoshow)
  ).fill(null);

  return (
    <div className="px-5 md:px-10">
      <div className="sticky top-0 bg-white">
        <div className="py-10  flex items-center">
          <p className="font-semibold text-2xl">users</p>
          <div className="flex gap-1 ml-auto">
            <button
              className={`border rounded-md px-5 py-1 ${
                usertype == "all" && "bg-theme text-white"
              }`}
              onClick={() => setusertype("all")}
            >
              All
            </button>
            <button
              className={`border rounded-md px-5 py-1`}
              onClick={() => {
                setrefresher((pre) => !pre);
                setmessagefn("Update successful");
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
      </div>
      {!loading ? (
        <div className="space-y-2 my-5">
          {users?.map((user, i) => (
            <Userminicard
              key={i}
              user={user}
              setshowfulluser={setshowfulluser}
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
      {showfulluser.show && (
        <Showfulluser
          showfulluser={showfulluser}
          setshowfulluser={setshowfulluser}
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
