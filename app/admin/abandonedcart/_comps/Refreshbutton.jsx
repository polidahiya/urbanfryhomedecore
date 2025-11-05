"use client";
import React from "react";
import { BiRefresh } from "react-icons/bi";
import Revalidatepathfn from "@/app/_serveractions/Revalidatepathpn";

function Refreshbutton() {
  return (
    <button
      className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-100 active:scale-[0.96] transition-all duration-150 flex items-center justify-center"
      onClick={async () => {
        await Revalidatepathfn("/admin/abandonedcart");
      }}
      title="Refresh"
    >
      <BiRefresh className="text-lg" />
    </button>
  );
}

export default Refreshbutton;
