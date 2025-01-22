"use client";
import React, { useEffect, useState } from "react";
import Adminsearchbar from "../_comps/_adminnavbar/Adminsearchbar";
import { Getreviews } from "@/app/_serveractions/_admin/Getreview";
import { AppContextfn } from "@/app/Context";
import { BiRefresh } from "react-icons/bi";
import Reviewpreviewcard from "./_comps/Reviewpreviewcard";

function Page() {
  const { setmessagefn } = AppContextfn();
  const [reviewtype, setreviewtype] = useState("all");
  const [search, setsearch] = useState("");
  const [reviews, setreviews] = useState([]);
  const [totalreviews, settotalreviews] = useState(0);
  const [pagenumber, setpagenumber] = useState(1);
  const [loading, setloading] = useState(true);
  const [refresher, setrefresher] = useState(false);
  const numberofreviewstoshow = 20;

  useEffect(() => {
    (async () => {
      setloading(true);
      const res = await Getreviews(
        reviewtype,
        search,
        numberofreviewstoshow,
        pagenumber
      );
      setloading(false);
      if (res?.status == 200) {
        setreviews(res?.data);
        settotalreviews(res?.totalreviews);
      }
      if (res?.data?.length == 0) setmessagefn("No reviews found");
    })();
  }, [pagenumber, reviewtype, refresher]);

  const handlesearch = async () => {
    setreviewtype("search");
    setpagenumber(1);
    setrefresher((pre) => !pre);
  };

  const pagenation = new Array(
    Math.ceil(totalreviews / numberofreviewstoshow)
  ).fill(null);

  return (
    <div className="px-5 md:px-10">
      <div className="sticky top-0 bg-white z-10">
        <div className="py-10  flex items-center">
          <p className="font-semibold text-2xl">Reviews</p>
          <div className="flex gap-1 ml-auto">
            <button
              className={`border rounded-md px-5 py-1 ${
                reviewtype == "all" && "bg-theme text-white"
              }`}
              onClick={() => setreviewtype("all")}
            >
              All
            </button>
            <button
              className={`border rounded-md px-5 py-1 ${
                reviewtype == "verified" && "bg-theme text-white"
              }`}
              onClick={() => setreviewtype("verified")}
            >
              Verified
            </button>
            <button
              className={`border rounded-md px-5 py-1 ${
                reviewtype == "unverified" && "bg-theme text-white"
              }`}
              onClick={() => setreviewtype("unverified")}
            >
              Unverified
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
          {reviews?.map((review, i) => (
            <Reviewpreviewcard
              key={i}
              review={review}
              setrefresher={setrefresher}
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
    </div>
  );
}

const Loading = () => (
  <div className="my-32">
    <div className="border-y-4 border-theme w-10 aspect-square rounded-full mx-auto animate-spin duration-300"></div>
  </div>
);

export default Page;
