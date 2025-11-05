"use client";
import React, { useState } from "react";
import { FaFileDownload } from "react-icons/fa";

function Downloadbutton({ cartdata }) {
  const [show, setshow] = useState(false);
  const handleDownload = () => {
    const json = JSON.stringify(cartdata, null, 2); // pretty-print with 2 spaces
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "cart-data.json"; // 👈 file name
    link.click();

    // cleanup
    URL.revokeObjectURL(url);
  };

  const handleDownloadCSV = () => {
    if (!cartdata || cartdata.length === 0) return;

    const escapeCSV = (value) => {
      if (value === null || value === undefined) return "";
      const str = String(value);
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = [];

    cartdata.forEach((cart) => {
      const user = cart.userdata || {};

      Object.keys(cart.cartItems || {}).forEach((key) => {
        const item = cart.cartItems[key];
        const parts = key.split("|").filter(Boolean);
        const data = {};

        parts.forEach((part) => {
          const [k, v] = part.split(":");
          if (k && v) data[k] = v;
        });

        const { _id, vcolor, Size } = data;

        const query = new URLSearchParams();
        if (Size) query.append("Size", Size);
        if (vcolor) query.append("vcolor", vcolor);

        const productUrl = `https://urbanfryhomes.com/product/${_id}${
          query.toString() ? `?${query.toString()}` : ""
        }`;

        rows.push({
          email: cart.email,
          name: user.name || "",
          phone: user.phonenum || "",
          address: user.address || "",
          status: cart.status,
          updatedAt: new Date(cart.updatedAt).toLocaleString(),
          productId: _id || "",
          quantity: item.quantity,
          productUrl,
        });
      });
    });

    if (rows.length === 0) {
      alert("No cart data found to download.");
      return;
    }

    const headers = Object.keys(rows[0]);
    const csvContent =
      headers.join(",") +
      "\n" +
      rows.map((r) => headers.map((h) => escapeCSV(r[h])).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cart-data.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const optionlist = [
    {
      name: "JSON",
      operation: handleDownload,
    },
    {
      name: "CSV",
      operation: handleDownloadCSV,
    },
  ];

  return (
    <>
      <button
        className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-100 active:scale-[0.96] transition-all duration-150 flex items-center justify-center"
        onClick={() => {
          setshow(true);
        }}
      >
        <FaFileDownload className="text-lg" />
      </button>

      {show && (
        <div className="fixed top-0 left-0 h-screen w-full flex items-center justify-center bg-black/20 z-20">
          <div className="relative bg-white p-6 w-full max-w-xs">
            <div className="flex justify-between items-center">
              <p>Download</p>
              <button
                type="button"
                onClick={() => setshow(false)}
                className="flex items-center justify-center w-8 aspect-square bg-gray-200"
              >
                x
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-5">
              {optionlist.map((item, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => {
                    item.operation();
                  }}
                  className="flex items-center gap-2 text-sm border border-slate-200 h-10 py-1 px-5 rounded-md"
                >
                  {item?.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Downloadbutton;
