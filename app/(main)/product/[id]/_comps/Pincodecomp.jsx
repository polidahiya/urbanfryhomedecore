"use client";
import React, { useEffect, useState } from "react";
import { getpindata } from "@/app/_serveractions/Getpindata";
import { AppContextfn } from "@/app/Context";

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

function Pincodecomp({ Ui }) {
  const { pincode, setpincode, pincoderef } = AppContextfn();
  const { code = "", message = "", status = "" } = pincode;
  const [localpin, setlocalpin] = useState(code || "");

  useEffect(() => {
    if (code) {
      setlocalpin(code);
    }
  }, [pincode]);

  async function isNcrByPincode(pin) {
    if (!/^\d{6}$/.test(pin)) return { status: 400 };
    const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    const json = await res.json();
    if (!Array.isArray(json) || !json[0]) return { status: 400 };

    const record = json[0];
    if (record.Status !== "Success") {
      return { status: 400 };
    }

    // API returns array of PostOffice objects; take the first one
    const po = record.PostOffice && record.PostOffice[0];
    const district = po?.District || record.Message || "UNKNOWN";
    const state = po?.State || "UNKNOWN";

    // Normalize small differences
    const normDistrict = district.trim();
    const isNCR = NCR_WHITELIST.has(normDistrict);

    return {
      status: 200,
      pin,
      district: normDistrict,
      state,
      isNCR,
    };
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    // for loading
    setpincode({
      code: localpin,
      available: false,
      status: 404,
      message: "Searching...",
      isNcr: false,
    });

    //
    if (localpin.length != 6) {
      setpincode({
        code: localpin,
        available: false,
        status: 404,
        message: "Incorrect Pincode",
        isNcr: false,
      });
      return;
    }

    const res = await getpindata(localpin);
    if (res.status == 200) {
      const ncrres = await isNcrByPincode(localpin);
      if (ncrres.status == 200) {
        const data = {
          code: localpin,
          available: true,
          status: 200,
          message: `Available at this pincode(${ncrres?.district})`,
          isNcr: ncrres.isNCR,
          ...ncrres,
        };
        setpincode(data);
        localStorage.setItem("pin", JSON.stringify(data));
      }
    } else {
      setpincode({
        code: e.target.value,
        available: false,
        status: 404,
        message: "Not Available at this pincode",
        isNcr: false,
      });
    }
  };

  if (Ui) {
    return (
      <Ui
        pincode={pincode}
        setpincode={setpincode}
        pincoderef={pincoderef}
        localpin={localpin}
        setlocalpin={setlocalpin}
        handlesubmit={handlesubmit}
      ></Ui>
    );
  }
  return (
    <div className="mb-10">
      <form className=" w-full flex items-center gap-2" onSubmit={handlesubmit}>
        <input
          ref={pincoderef}
          type="number"
          placeholder="Pincode"
          max={999999}
          value={localpin}
          onChange={(e) => setlocalpin(e.target.value)}
          className="max-w-28 px-3 py-2 text-sm border-b border-gray-300 focus:outline-none focus:border-theme placeholder:text-gray-400"
        />
        <input
          type="submit"
          value="Check"
          className="px-4 py-2 text-sm  text-theme border-b cursor-pointer"
        />
      </form>
      {message && (
        <p
          className={`${
            status == 200 ? "text-green-600" : "text-red-600"
          } text-xs mt-2`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default Pincodecomp;
