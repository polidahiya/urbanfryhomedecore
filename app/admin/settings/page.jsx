"use client";
import React from "react";
import { refreshproductsnow } from "@/app/_connections/Getcachedata";
import { AppContextfn } from "@/app/Context";

function Page() {
  const { setmessagefn } = AppContextfn();
  return (
    <div className="px-5 md:px-10 pt-10">
      <p className="font-semibold text-2xl">Settings</p>
      <div className="bg-adminbg mt-5 flex justify-end gap-2 p-5">
        <button
          onClick={async () => {
            const res = await refreshproductsnow();
            setmessagefn(res?.message);
          }}
          className="border px-5 py-2 rounded-md bg-white"
        >
          Refresh Products
        </button>
      </div>
    </div>
  );
}

export default Page;
