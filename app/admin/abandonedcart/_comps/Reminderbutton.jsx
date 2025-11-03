"use client";
import React, { useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { Reminduser } from "../Serveraction";
import { AppContextfn } from "@/app/Context";

function Reminderbutton({ cart }) {
  const { setmessagefn } = AppContextfn();
  const [loading, setloading] = useState(false);

  if (cart.status !== "abandoned") return null;

  return (
    <button
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-theme rounded-md hover:bg-theme/90"
      onClick={async () => {
        setloading(true);
        const res = await Reminduser([cart]);
        setloading(false);
        setmessagefn(res?.message);
      }}
    >
      {loading ? (
        <span className="block w-5 h-5 border-b-2 border-t-2 rounded-full border-white animate-spin"></span>
      ) : (
        <IoNotifications />
      )}
      Send Reminder
    </button>
  );
}

export default Reminderbutton;
