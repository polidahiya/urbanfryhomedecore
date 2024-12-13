"use client";
import React, { useState } from "react";
import Navbar from "../../../_globalcomps/Navbar";
import Link from "next/link";
import Underlineeffect from "../../../_globalcomps/Underlineeffect";
import Closeeffectlink from "@/app/_globalcomps/Closeeffectlink";
import { login } from "@/app/_serveractions/signup";
import { AppContextfn } from "@/app/Context";

function Publicpage({ token }) {
  const { setmessagefn } = AppContextfn();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitform = async () => {
    const res = await login(formData);
    setmessagefn(res?.message);
  };

  return (
    <div className="min-h-screen mt-36">
      <Navbar navtype={false} token={token} />
      <div className="flex flex-col lg:flex-row gap-5 px-8">
        <div className="flex-1">
          {/* navigations */}
          <div className="flex items-center gap-2 text-sm">
            <Link href={"/"} className="">
              <Underlineeffect title={"Home"} />
            </Link>{" "}
            / <p className="capitalize text-theme">Account</p>
          </div>
          <h1 className="font-tenor text-7xl capitalize py-6">LOGIN</h1>

          {/* form */}
          <div className="max-w-[450px] flex flex-col gap-5 mt-3">
            <div className=" relative border border-theme">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="forminput w-full  py-4 px-4 text-gray-700 outline-none"
                required
              />
              <label
                htmlFor="email"
                className="absolute top-0 left-0 py-4 flex items-center px-4 text-sm duration-300 text-theme pointer-events-none"
              >
                E-mail <span className="text-red-500">*</span>
              </label>
            </div>
            <div className=" relative border border-theme">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="forminput w-full  py-4 px-4 text-gray-700 outline-none"
                required
              />
              <label
                htmlFor="password"
                className="absolute top-0 left-0 py-4 flex items-center px-4 text-sm duration-300 text-theme pointer-events-none"
              >
                Password <span className="text-red-500">*</span>
              </label>
            </div>
            <div className="flex gap-5 mt-3">
              <button
                className="px-10 py-3 w-fit mt-auto bg-theme text-white bg-opacity-70 lg:hover:bg-opacity-100 duration-300"
                onClick={submitform}
              >
                Login
              </button>
              <Link
                href={"/account/signup"}
                className="px-10 py-3 w-fit mt-auto border border-theme text-theme lg:hover:bg-theme lg:hover:text-white duration-300"
              >
                Create Account
              </Link>
            </div>
          </div>
          <p className="mt-3">
            <Closeeffectlink title={"Forgot password?"} link={"/"} />
          </p>
        </div>
        {/* image */}
        <div className="flex-1">
          <img
            src="https://loopsbylj.com/cdn/shop/files/LoopsbyLJ_Account_Login.jpg?v=1708439766&width=720"
            alt=""
            className="inset-0"
          />
        </div>
      </div>
    </div>
  );
}

export default Publicpage;