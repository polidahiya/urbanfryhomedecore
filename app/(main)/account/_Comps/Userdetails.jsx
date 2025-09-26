"use client";
import React, { useState } from "react";
import { AppContextfn } from "@/app/Context";
import Updateuserdetails from "@/app/_serveractions/Updateuserdetails";
import { useRouter } from "next/navigation";

function Userdetails({ userdata, redirecturl }) {
  const router = useRouter();
  const { setmessagefn } = AppContextfn();
  const initialformvalues = {
    name: userdata?.username || "",
    address: userdata?.address || "",
    phonenum: userdata?.phonenum || "",
  };
  const [formData, setFormData] = useState(initialformvalues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitform = async (e) => {
    e.preventDefault();
    const res = await Updateuserdetails(formData);
    setmessagefn(res?.message);
    if (res?.status == 200) {
      router.push(redirecturl);
    }
  };

  return (
    <div className="lg:flex-[3] w-full h-fit lg:sticky top-32">
      <h2>User Details</h2>
      <form
        onSubmit={submitform}
        method="POST"
        className="max-w-[450px] flex flex-col gap-5 mt-5"
      >
        <div className=" relative border border-theme">
          <input
            type="name"
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
            type="tel"
            id="phonenum"
            name="phonenum"
            pattern="[0-9]{10}"
            maxLength={10}
            value={formData.phonenum}
            onChange={handleChange}
            className="forminput w-full  py-4 px-4 text-gray-700 outline-none"
            required
          />
          <label
            htmlFor="phonenum"
            className="absolute top-0 left-0 py-4 flex items-center px-4 text-sm duration-300 text-theme pointer-events-none"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
        </div>
        <div className=" relative border border-theme">
          <input
            type="name"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="forminput w-full  py-4 px-4 text-gray-700 outline-none"
            required
          />
          <label
            htmlFor="name"
            className="absolute top-0 left-0 py-4 flex items-center px-4 text-sm duration-300 text-theme pointer-events-none"
          >
            Address <span className="text-red-500">*</span>
          </label>
        </div>
        <div className="flex gap-5 mt-3">
          <button className="px-10 py-3 w-fit mt-auto bg-theme text-white bg-opacity-70 lg:hover:bg-opacity-100 duration-300">
            Update Details
          </button>
        </div>
      </form>
    </div>
  );
}

export default Userdetails;
