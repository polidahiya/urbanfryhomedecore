"use client";
import React from "react";
import { getpindata } from "@/app/_serveractions/Getpindata";

const NCR_WHITELIST = new Set([
  "New Delhi",
  "Central Delhi",
  "North Delhi",
  "South Delhi",
  "East Delhi",
  "West Delhi",
  "North East Delhi",
  "North West Delhi",
  "South West Delhi",
  "Gautam Buddha Nagar",
  "Noida",
  "Ghaziabad",
  "Faridabad",
  "Gurugram",
  "Gurgaon",
  "Sonepat",
  "Meerut",
  "Bulandshahr",
  "Baghpat",
  "Alwar",
]);

function Pincodecomp({ pincode, setpincode, pincodemsg, setpincodemsg }) {
  return null
  async function isNcrByPincode(pin) {
    if (!/^\d{6}$/.test(pin)) return { ok: false, reason: "Invalid PIN" };
    const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    const json = await res.json();
    if (!Array.isArray(json) || !json[0])
      throw new Error("Unexpected API response");

    const record = json[0];
    if (record.Status !== "Success") {
      return { ok: false, reason: "PIN not found", api: record };
    }

    // API returns array of PostOffice objects; take the first one
    const po = record.PostOffice && record.PostOffice[0];
    const district = po?.District || record.Message || "UNKNOWN";
    const state = po?.State || "UNKNOWN";

    // Normalize small differences
    const normDistrict = district.trim();
    const isNCR = NCR_WHITELIST.has(normDistrict);

    return {
      ok: true,
      pin,
      district: normDistrict,
      state,
      isNCR,
    };
  }
  return (
    <div className="mb-10">
      <form
        className=" w-full flex items-center gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          if (pincode.length != 6) {
            setpincodemsg({
              status: 404,
              message: "Not Available at this pincode",
            });
            return;
          }
          const res = await getpindata(pincode);
          if (res.status == 200) {
            const ncrres = await isNcrByPincode(pincode);
            console.log(res, ncrres);
            localStorage.setItem("pin", pincode);
            setpincodemsg({
              status: 200,
              message: "Available at this pincode",
            });
          } else {
            setpincodemsg({
              status: 404,
              message: "Not Available at this pincode",
            });
          }
        }}
      >
        <input
          type="number"
          placeholder="Pincode"
          max={999999}
          value={pincode}
          onChange={(e) => setpincode(e.target.value)}
          className="max-w-28 px-3 py-2 text-sm border-b border-gray-300 focus:outline-none focus:border-theme placeholder:text-gray-400"
        />
        <input
          type="submit"
          value="Check"
          className="px-4 py-2 text-sm  text-theme border-b cursor-pointer"
        />
      </form>
      {pincodemsg && (
        <p
          className={`${
            pincodemsg?.status === 200 ? "text-green-600" : "text-red-600"
          } text-xs mt-2`}
        >
          {pincodemsg?.message}
        </p>
      )}
    </div>
  );
}

export default Pincodecomp;
