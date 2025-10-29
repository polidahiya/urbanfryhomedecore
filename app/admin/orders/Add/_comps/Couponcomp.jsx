import React from "react";
import Standardinputfield from "@/app/admin/products/_comps/_comps/Standardinputfield";
import Dropdownmenu from "@/app/admin/products/_comps/_comps/Dropdownmenu";
import Formparts from "./Formparts";

function Couponcomp({ data, setdata, applycoupon }) {
  return (
    <>
      {applycoupon && (
        <Formparts heading="Coupon">
          <Standardinputfield
            titlename="Coupon Code"
            value={data.coupondata.code}
            type="text"
            onchange={(e) =>
              setdata((pre) => ({
                ...pre,
                coupondata: { ...pre.coupondata, code: e.target.value },
              }))
            }
            clear={() => {
              setdata((pre) => ({
                ...pre,
                coupondata: { ...pre.coupondata, code: "" },
              }));
            }}
          />
          <Dropdownmenu
            title="Discount Type"
            state={data?.coupondata?.discountType}
            onchange={(value) => {
              setdata((pre) => ({
                ...pre,
                coupondata: {
                  ...pre.coupondata,
                  discountType: value,
                },
              }));
            }}
            options={["percentage", "fixed"]}
          />
          <Standardinputfield
            titlename="Discount Value"
            value={data.coupondata.discountValue}
            type="number"
            onchange={(e) =>
              setdata((pre) => ({
                ...pre,
                coupondata: {
                  ...pre.coupondata,
                  discountValue: e.target.value,
                },
              }))
            }
            clear={() => {
              setdata((pre) => ({
                ...pre,
                coupondata: { ...pre.coupondata, discountValue: "" },
              }));
            }}
          />
        </Formparts>
      )}
    </>
  );
}

export default Couponcomp;
