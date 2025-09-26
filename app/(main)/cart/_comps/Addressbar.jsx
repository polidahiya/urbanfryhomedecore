"use client";
import React, { useState } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { AppContextfn } from "@/app/Context";
import Updateuserdetails from "@/app/_serveractions/Updateuserdetails";
import Pincodecomp from "../../product/[id]/_comps/Pincodecomp";
import Revalidatepathfn from "@/app/_serveractions/Revalidatepathpn";

function Addressbar({ verified, userdata }) {
  const { setmessagefn } = AppContextfn();
  const [address, setaddress] = useState(userdata?.address || "");

  const Handleformsubmit = async (e) => {
    e.preventDefault();
    const res = await Updateuserdetails({ ...userdata, address: address });
    setmessagefn(res?.message);
  };

  if (verified)
    return (
      <div className="w-full md:w-1/2 flex flex-col items-start  gap-5 bg-footercolor bg-opacity-50 p-5 md:p-10">
        <div className="w-full md:w-fit flex flex-col gap-4">
          <div className="font-semibold">Address</div>
          <form
            onSubmit={Handleformsubmit}
            className="w-full flex items-center h-10"
          >
            <input
              type="text"
              required
              className="bg-white py-2 px-5 w-full h-full md:min-w-96 outline-none border border-theme"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
            <button
              type="submit"
              className="h-full min-w-28 flex items-center gap-1 bg-theme text-white text-sm  px-5 py-2 bg-opacity-75 lg:hover:bg-opacity-100"
            >
              <FaRegPenToSquare /> Update
            </button>
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
                      className="bg-white py-2 px-5 w-full h-full md:min-w-96 outline-none border border-theme"
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
