import React, { useState } from "react";
import Standardinputfield from "../../products/_comps/_comps/Standardinputfield";
import Dropdownmenu from "../../products/_comps/_comps/Dropdownmenu";
import Togglebuttons from "../../products/_comps/_comps/Togglebuttons";
import { addcoupon, deletecoupon } from "@/app/_serveractions/_admin/coupon";
import { AppContextfn } from "@/app/Context";

function Addnewform({ data, setdata, setshowform, resetState, setrefresher }) {
  const { setmessagefn, setshowdialog } = AppContextfn();
  const [loading, setloading] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const res = await addcoupon(data);
    setloading(false);
    setmessagefn(res?.message);
    if (res?.status == 200) {
      resetState();
      setshowform(false);
      setrefresher((pre) => !pre);
    }
  };

  const handledelete = async () => {
    const res = await deletecoupon(data?._id);
    setmessagefn(res?.message);
    if (res?.status == 200) {
      resetState();
      setshowform(false);
      setrefresher((pre) => !pre);
    }
  };
  return (
    <div className="fixed inset-0 h-full flex justify-center bg-black/30">
      <form
        onSubmit={handlesubmit}
        className="relative w-full max-w-3xl h-full px-1 py-6 md:p-6  bg-white space-y-6 overflow-y-scroll"
      >
        <h2 className="text-2xl text-center font-semibold text-gray-800">
          Add New Coupon
        </h2>
        <Standardinputfield
          titlename="Code"
          value={data.code}
          onchange={(e) => setdata((pre) => ({ ...pre, code: e.target.value }))}
          clear={() => setdata((pre) => ({ ...pre, code: "" }))}
        />
        <Dropdownmenu
          title={"Discount Type"}
          state={data.discountType}
          onchange={(value) =>
            setdata((pre) => ({ ...pre, discountType: value }))
          }
          options={["percentage", "fixed amount"]}
        />
        <Standardinputfield
          titlename="Discount"
          value={data.discountValue}
          type="number"
          onchange={(e) =>
            setdata((pre) => ({ ...pre, discountValue: e.target.value }))
          }
          clear={() => setdata((pre) => ({ ...pre, discountValue: "" }))}
        />
        <div className="flex items-center">
          <input
            className="border rounded-md px-2 py-2 outline-none"
            type="date"
            value={data.validFrom}
            required
            onChange={(e) =>
              setdata((pre) => ({ ...pre, validFrom: e.target.value }))
            }
          />
          <p className="px-5">to</p>
          <input
            className="border rounded-md px-2 py-2 outline-none"
            type="date"
            value={data.validTo}
            required
            onChange={(e) =>
              setdata((pre) => ({ ...pre, validTo: e.target.value }))
            }
          />
        </div>
        <Standardinputfield
          titlename="Usage Times"
          value={data.usagetimes}
          type="number"
          onchange={(e) =>
            setdata((pre) => ({ ...pre, usagetimes: e.target.value }))
          }
          clear={() => setdata((pre) => ({ ...pre, usagetimes: "" }))}
        />
        <Togglebuttons
          titlename="isActive?"
          value={data.isActive}
          positive={() => setdata((prev) => ({ ...prev, isActive: true }))}
          negative={() => setdata((prev) => ({ ...prev, isActive: false }))}
          positiveText="Yes"
          negativeText="No"
        />
        <div className="flex items-center justify-center gap-5">
          <button
            type="submit"
            className="flex items-center justify-center gap-2  px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {loading && (
              <span
                className={`block h-5 aspect-square border-t-2 border-b-2 border-white rounded-full animate-spin`}
              ></span>
            )}
            {data._id ? "Update coupon" : "Add coupon"}
          </button>
          {data._id && (
            <>
              <button
                className="flex items-center justify-center gap-2  px-4 py-2  border  rounded-md"
                type="button"
                onClick={() => {
                  resetState();
                  setshowform(false);
                }}
              >
                Cancel Update
              </button>
              <button
                className="flex items-center justify-center gap-2  px-4 py-2  border border-red-500 rounded-md text-red-500"
                type="button"
                onClick={() => {
                  setshowdialog({
                    show: true,
                    title: "Confirm Delete?",
                    continue: () => {
                      handledelete();
                    },
                    type: false,
                  });
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          className="absolute top-0 right-2 bg-gray-200 text-gray-700 rounded-full h-10 aspect-square hover:bg-gray-300"
          onClick={() => {
            setshowform(false);
            resetState();
          }}
        >
          x
        </button>
      </form>
    </div>
  );
}

export default Addnewform;
