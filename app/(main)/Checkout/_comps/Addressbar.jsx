"use client";
import React, { useState, useEffect } from "react";
import Pincodecomp from "../../product/[id]/_comps/Pincodecomp";
import Link from "next/link";

const indianStatesAndUTs = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Andaman and Nicobar Islands",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

function Addressbar({
  verified,
  shippingdetails,
  setshippingdetails,
  shippingformref,
}) {
  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("checkoutForm");
    if (savedData) {
      try {
        setshippingdetails(JSON.parse(savedData));
      } catch (err) {
        console.error("Failed to parse localStorage data", err);
      }
    }
  }, []);

  // Save to localStorage whenever shippingdetails changes
  useEffect(() => {
    localStorage.setItem("checkoutForm", JSON.stringify(shippingdetails));
  }, [shippingdetails]);

  const HandleChange = (e, section, field) => {
    const { value, type, checked } = e.target;
    if (section) {
      setshippingdetails((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setshippingdetails((prev) => ({
        ...prev,
        [field]: type === "checkbox" ? checked : value,
      }));
    }
  };

  if (verified)
    return (
      <div className="w-full md:w-1/2 flex flex-col items-start  gap-5 bg-footercolor bg-opacity-50 p-5 md:p-10">
        <div className="w-full flex flex-col gap-6">
          <div className="font-semibold">Checkout Form</div>
          <form
            ref={shippingformref}
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="w-full flex flex-col gap-4"
          >
            {/* Full Name */}
            <input
              type="text"
              required
              placeholder="Full Name"
              className="bg-white py-2 px-5 w-full outline-none border border-theme"
              value={shippingdetails.fullName}
              onChange={(e) => HandleChange(e, null, "fullName")}
            />

            {/* Email */}
            <input
              type="email"
              required
              placeholder="Email"
              className="bg-white py-2 px-5 w-full outline-none border border-theme"
              value={shippingdetails.email}
              onChange={(e) => HandleChange(e, null, "email")}
            />

            {/* Mobile */}
            <input
              type="tel"
              required
              placeholder="Mobile"
              className="bg-white py-2 px-5 w-full outline-none border border-theme"
              value={shippingdetails.mobile}
              onChange={(e) => HandleChange(e, null, "mobile")}
            />

            {/* Shipping Address */}
            <div className="font-semibold mt-4">Shipping Address</div>
            <input
              type="text"
              required
              placeholder="Address Line 1"
              className="bg-white py-2 px-5 w-full outline-none border border-theme"
              value={shippingdetails.shipping.address1}
              onChange={(e) => HandleChange(e, "shipping", "address1")}
            />
            <input
              type="text"
              placeholder="Address Line 2"
              className="bg-white py-2 px-5 w-full outline-none border border-theme"
              value={shippingdetails.shipping.address2}
              onChange={(e) => HandleChange(e, "shipping", "address2")}
            />
            <input
              type="text"
              required
              placeholder="City"
              className="bg-white py-2 px-5 w-full outline-none border border-theme"
              value={shippingdetails.shipping.city}
              onChange={(e) => HandleChange(e, "shipping", "city")}
            />
            <select
              required
              className="bg-white py-2 px-5 w-full outline-none border border-theme"
              value={shippingdetails.shipping.state}
              onChange={(e) => HandleChange(e, "shipping", "state")}
            >
              <option value="">Select State</option>
              {indianStatesAndUTs.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            {/* Billing Address Toggle */}
            <label className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                checked={shippingdetails.billingSame}
                onChange={(e) =>
                  setshippingdetails((prev) => ({
                    ...prev,
                    billingSame: e.target.checked,
                  }))
                }
              />
              <span>Billing address same as shipping</span>
            </label>

            {/* Billing Address */}
            {!shippingdetails.billingSame && (
              <>
                <div className="font-semibold mt-2">Billing Address</div>
                <input
                  type="text"
                  placeholder="Address Line 1"
                  required={!shippingdetails?.billingSame}
                  className="bg-white py-2 px-5 w-full outline-none border border-theme"
                  value={shippingdetails.billing.address1}
                  onChange={(e) => HandleChange(e, "billing", "address1")}
                />
                <input
                  type="text"
                  placeholder="Address Line 2"
                  className="bg-white py-2 px-5 w-full outline-none border border-theme"
                  value={shippingdetails.billing.address2}
                  onChange={(e) => HandleChange(e, "billing", "address2")}
                />
                <input
                  type="text"
                  placeholder="City"
                  required={!shippingdetails?.billingSame}
                  className="bg-white py-2 px-5 w-full outline-none border border-theme"
                  value={shippingdetails.billing.city}
                  onChange={(e) => HandleChange(e, "billing", "city")}
                />
                <select
                  className="bg-white py-2 px-5 w-full outline-none border border-theme"
                  required={!shippingdetails?.billingSame}
                  value={shippingdetails.billing.state}
                  onChange={(e) => HandleChange(e, "billing", "state")}
                >
                  <option value="">Select State</option>
                  {indianStatesAndUTs.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </>
            )}

            {/* Order Notes */}
            <textarea
              placeholder="Order Notes"
              className="bg-white py-2 px-5 w-full outline-none border border-theme min-h-20"
              value={shippingdetails.orderNotes}
              maxLength={300}
              onChange={(e) => HandleChange(e, null, "orderNotes")}
            />

            {/* Terms & Conditions */}
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                required
                checked={shippingdetails.termsAccepted}
                onChange={(e) => HandleChange(e, null, "termsAccepted")}
              />
              <span>
                I agree to the{" "}
                <Link
                  href="/Termsandconditions"
                  className="lg:hover:text-cyan-500 underline"
                >
                  Terms & Conditions
                </Link>
              </span>
            </label>
          </form>
        </div>
        {/*  */}
        <div className="w-full md:w-fit flex flex-col gap-4">
          <div className="font-semibold">Pincode</div>
          <Pincodecomp
            Ui={({
              pincode,
              pincoderef,
              localpin,
              setlocalpin,
              handlesubmit,
            }) => {
              const { code = "", message = "", status = "" } = pincode;
              return (
                <div className="mb-10">
                  <form
                    className="w-full flex items-center h-10"
                    onSubmit={handlesubmit}
                  >
                    <input
                      ref={pincoderef}
                      type="number"
                      placeholder="Pincode"
                      max={999999}
                      value={localpin}
                      onChange={(e) => setlocalpin(e.target.value)}
                      className="bg-white py-2 px-5 w-full h-full md:max-w-96 outline-none border border-theme"
                    />
                    <input
                      type="submit"
                      value={code ? "Change" : "Check"}
                      className="h-full min-w-28 flex items-center gap-1 bg-theme text-white text-sm  px-5 py-2 bg-opacity-75 lg:hover:bg-opacity-100"
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
            }}
          />
        </div>
      </div>
    );
}

export default Addressbar;
