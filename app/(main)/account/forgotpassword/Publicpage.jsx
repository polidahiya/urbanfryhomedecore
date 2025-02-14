"use client";
import React, { useState } from "react";
import Link from "next/link";
import Underlineffect from "@/app/_globalcomps/Underlineffect";
import { AppContextfn } from "@/app/Context";
import { RiEyeCloseFill } from "react-icons/ri";
import { RiEye2Line } from "react-icons/ri";
import { sendforgotmail } from "@/app/_serveractions/forgotpass";
import { resetpassword } from "@/app/_serveractions/forgotpass";
import Image from "next/image";

function Publicpage({ user }) {
  const { setmessagefn } = AppContextfn();
  const initialformvalues = {
    email: "",
    password: "",
    confirmpassword: "",
  };
  const [formData, setFormData] = useState(initialformvalues);
  const [showpass, setshowpass] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitform = async (e) => {
    e.preventDefault();
    if (user) {
      if (formData?.password != formData?.confirmpassword) {
        setmessagefn("Passwords do not match");
        return;
      }
    }

    const res = user
      ? await resetpassword(user, formData?.password)
      : await sendforgotmail(formData?.email);
    setmessagefn(res?.message);
    if (res?.status == 200) {
      setFormData(initialformvalues);
    }
  };

  return (
    <div className="min-h-screen mt-36">
      <div className="flex flex-col lg:flex-row gap-5 px-8 pb-10">
        <div className="flex-1">
          {/* navigations */}
          <div className="flex items-center gap-2 text-sm">
            <Underlineffect
              Comp={({ innercomp }) => <Link href="/">{innercomp}</Link>}
              title="Home"
              styles="w-fit"
            />{" "}
            / <p className="capitalize text-theme">Forgot Password</p>
          </div>
          <h1 className="font-tenor text-7xl capitalize py-6">
            Reset Your Password
          </h1>
          <p>
            {user
              ? "Enter New Password"
              : "We will send you an email to reset your password"}
          </p>
          {/* form */}
          <form
            onSubmit={submitform}
            method="POST"
            className="max-w-[450px] flex flex-col gap-5 mt-10"
          >
            {user ? (
              <>
                <div className="relative flex border border-theme">
                  <input
                    type={showpass ? "text" : "password"}
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
                  <button
                    type="button"
                    className="aspect-square px-4"
                    onClick={() => setshowpass((pre) => !pre)}
                  >
                    {showpass ? <RiEye2Line /> : <RiEyeCloseFill />}
                  </button>
                </div>
                <div className="relative flex border border-theme">
                  <input
                    type={showpass ? "text" : "password"}
                    id="confirmpassword"
                    name="confirmpassword"
                    value={formData.confirmpassword}
                    onChange={handleChange}
                    className="forminput w-full  py-4 px-4 text-gray-700 outline-none"
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute top-0 left-0 py-4 flex items-center px-4 text-sm duration-300 text-theme pointer-events-none"
                  >
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}

            <div className="flex gap-5 mt-3">
              <button
                className="px-10 py-3 w-fit mt-auto bg-theme text-white bg-opacity-70 lg:hover:bg-opacity-100 duration-300"
                type="submit"
              >
                {user ? "Reset password" : "Send"}
              </button>
              {!user && (
                <Link
                  href={"/account/login"}
                  className="px-10 py-3 w-fit mt-auto text-theme border border-theme bg-opacity-70 lg:hover:bg-theme lg:hover:text-white duration-300"
                >
                  Cancel
                </Link>
              )}
            </div>
          </form>
        </div>
        {/* image */}
        <div className="flex-1">
          <Image
            src="/uiimages/loginimage.jpg"
            height={1000}
            width={1000}
            alt="login image"
            className="inset-0"
          />
        </div>
      </div>
    </div>
  );
}

export default Publicpage;
