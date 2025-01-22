"use client";
import { useEffect, useState } from "react";
import Adminsearchbar from "../_comps/_adminnavbar/Adminsearchbar";
import { BiRefresh } from "react-icons/bi";
import Addnewform from "./_comps/Addnewform";
import { getcoupons } from "@/app/_serveractions/_admin/coupon";
import Couponminicard from "./_comps/Couponminicard";
import { AppContextfn } from "@/app/Context";

function Page() {
  const { setmessagefn } = AppContextfn();
  const [search, setsearch] = useState("");

  const initialstate = {
    code: "",
    discountType: "percentage", // or "fixed"
    discountValue: 20,
    validFrom: "",
    validTo: "",
    usagetimes: 1,
    isActive: true,
  };
  const [data, setdata] = useState(initialstate);
  const [coupons, setcoupons] = useState([]);
  const [showform, setshowform] = useState(false);
  const [searchtype, setsearchtype] = useState("all");
  const [refresher, setrefresher] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    (async () => {
      setloading(true);
      const res = await getcoupons(searchtype, search);
      setloading(false);
      if (res?.status == 200) {
        setcoupons(res?.data);
      }
      if (res?.data?.length == 0) setmessagefn("No Orders found");
    })();
  }, [searchtype, refresher]);

  const handlesearch = async () => {
    setsearchtype("search");
    setrefresher((pre) => !pre);
  };

  const resetState = () => {
    setdata(initialstate);
  };

  return (
    <div className="px-5 md:px-10">
      <div className="sticky top-0 bg-white">
        <div className="py-10  flex items-center">
          <p className="font-semibold text-2xl">Coupons</p>
          <div className="flex gap-1 ml-auto">
            <button
              className={`border rounded-md px-5 py-1 bg-theme text-white`}
              onClick={() => {
                setshowform(true);
                resetState();
              }}
            >
              + Add New
            </button>
            <button
              className={`border rounded-md px-5 py-1 ${
                searchtype == "all" && "bg-theme text-white"
              }`}
              onClick={() => setsearchtype("all")}
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
        <div className="flex items-center mt-5 bg-adminbg font-semibold">
          <p className="flex-1 border border-slate-300 text-center py-1 font-tenor">
            Code
          </p>
          <p className="flex-1 border border-slate-300 text-center py-1 font-tenor">
            Discount Type
          </p>
          <p className="flex-1 border border-slate-300 text-center py-1 font-tenor">
            Discount Value
          </p>
          <p className="flex-1 border border-slate-300 text-center py-1 font-tenor">
            usagetimes
          </p>
          <p className="flex-1 border border-slate-300 text-center py-1 font-tenor">
            Date
          </p>
        </div>
      </div>
      {!loading ? (
        <div>
          {coupons?.map((coupon, i) => (
            <Couponminicard
              key={i}
              coupon={coupon}
              setdata={setdata}
              setshowform={setshowform}
            />
          ))}
        </div>
      ) : (
        <Loading />
      )}
      {/* add new form */}
      {showform && (
        <Addnewform
          data={data}
          setdata={setdata}
          setshowform={setshowform}
          resetState={resetState}
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
