"use client";
import React from "react";
import { refreshproductsnow } from "@/app/_connections/Getcachedata";

function Page() {
  return (
    <div>
      <button onClick={async()=>{
        const res = await refreshproductsnow();
        console.log(res);
      }}
      className="border p-5">refresh</button>
    </div>
  );
}

export default Page;
