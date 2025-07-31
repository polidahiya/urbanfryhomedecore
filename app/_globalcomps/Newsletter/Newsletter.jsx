"use client";
import React, { useState } from "react";
import { AppContextfn } from "@/app/Context";
import Nextimage from "../Nextimage";
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

function Newsletter() {
  const { setmessagefn, shownewsletter, setshownewsletter } = AppContextfn();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitform = async (e) => {
    e.preventDefault();
    const res = await login(formData);
    setmessagefn(res?.message);
  };

  return (
    <AnimatePresence>
      {shownewsletter && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed min-h-dvh w-full top-0 left-0 flex items-center justify-center bg-black/30 z-30 px-2"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-xl bg-white py-10 px-5 md:px-10 md:py-10"
          >
            <div className="flex flex-col items-center">
              <Nextimage
                src="/uiimages/logo.png"
                alt="logo"
                className="w-16 aspect-square mr-2"
                width={200}
                height={200}
                quality={100}
              />
              <p className="font-tenor text-3xl text-center mt-5">
                LETS KEEP IN TOUCH
              </p>
              <p className="text-center text-sm mt-3">
                Sign up for emails to get the latest updates on new arrivals,
                special offers and more!
              </p>
            </div>
            <form onSubmit={submitform} className="flex flex-col gap-5 mt-10">
              <div className=" relative border border-theme">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="forminput w-full  py-4 px-4 text-gray-700 outline-none"
                  required
                />
                <label
                  htmlFor="name"
                  className="absolute top-0 left-0 py-4 flex items-center px-4 text-sm duration-300 text-theme pointer-events-none"
                >
                  Name <span className="text-red-500">*</span>
                </label>
              </div>
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

              <div className="flex justify-center gap-5 mt-3">
                <button
                  type="submit"
                  className="px-10 py-3 w-fit mt-auto bg-theme text-white bg-opacity-70 lg:hover:bg-opacity-100 duration-300"
                >
                  Sign Up Now
                </button>
              </div>
            </form>
            {/* cancel button */}
            <button
              className="group h-14 aspect-square absolute top-0 right-0 flex items-center justify-center z-10"
              onClick={() => setshownewsletter(false)}
            >
              <RxCross1 className="text-2xl lg:group-hover:rotate-90 duration-300" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Newsletter;
