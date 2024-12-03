"use client";

import { useState } from "react";

export default function Customizationform() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    request: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // Handle form submission logic
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full max-w-[900px] mx-auto p-8  my-10"
    >
      {/* Name and Email - Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative border border-theme">
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
            Name
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
      </div>

      {/* Phone Number */}
      <div className=" relative border border-theme">
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="forminput w-full  py-4 px-4 text-gray-700 outline-none"
          required
        />
        <label
          htmlFor="mobile"
          className="absolute top-0 left-0 py-4 flex items-center px-4 text-sm duration-300 text-theme pointer-events-none"
        >
          Phone Number
        </label>
      </div>

      {/* Your Request */}
      <div className=" relative border border-theme">
        <textarea
          id="request"
          name="request"
          value={formData.request}
          onChange={handleChange}
          className="forminput w-full  py-4 px-4 text-gray-700 outline-none h-28"
          required
        ></textarea>
        <label
          htmlFor="request"
          className="absolute top-0 left-0 py-4 flex items-center px-4 text-sm duration-300 text-theme pointer-events-none"
        >
          Your Request <span className="text-red-500">*</span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-10 py-3 w-fit mt-auto bg-theme text-white bg-opacity-70 lg:hover:bg-opacity-100 duration-300"
        >
          Send Request
        </button>
      </div>
    </form>
  );
}
