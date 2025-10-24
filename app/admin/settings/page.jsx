"use client";
import React, { useState } from "react";
import { refreshproductsnow } from "@/app/_connections/Getcachedata";
import { AppContextfn } from "@/app/Context";

function Page() {
  const { setmessagefn } = AppContextfn();
  const [loading, setloading] = useState(false);

  const handlebackup = async () => {
    setloading(true);
    const res = await fetch("/api/Backup");
    setloading(false);
    if (!res.ok) {
      setmessagefn("Backup failed");
      return;
    }
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup-${new Date().toISOString()}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };
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
      <div className="bg-adminbg mt-5 flex justify-end gap-2 p-5">
        <button
          onClick={handlebackup}
          className="flex items-center justify-center gap-2 border px-5 py-2 rounded-md bg-white"
        >
          {loading && (
            <span className="w-5 h-5 border-b-2 border-t-2 rounded-full border-black animate-spin"></span>
          )}
          Create Backup
        </button>
      </div>
    </div>
  );
}

export default Page;
