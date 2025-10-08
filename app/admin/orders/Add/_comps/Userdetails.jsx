import React from "react";
import Formparts from "./Formparts";
import Standardinputfield from "@/app/admin/products/_comps/_comps/Standardinputfield";

export default function Userdetailscomp({data, setdata}) {
  return (
    <Formparts heading="User Details">
      <Standardinputfield
        titlename="User Name"
        value={data.userdata.name}
        type="text"
        onchange={(e) =>
          setdata((pre) => ({
            ...pre,
            userdata: { ...pre.userdata, name: e.target.value },
          }))
        }
        clear={() => {
          setdata((pre) => ({
            ...pre,
            userdata: { ...pre.userdata, name: "" },
          }));
        }}
      />
      <Standardinputfield
        titlename="User Email"
        value={data.userdata.email}
        type="email"
        onchange={(e) =>
          setdata((pre) => ({
            ...pre,
            userdata: { ...pre.userdata, email: e.target.value },
          }))
        }
        clear={() => {
          setdata((pre) => ({
            ...pre,
            userdata: { ...pre.userdata, email: "" },
          }));
        }}
      />
      <Standardinputfield
        titlename="User Address"
        value={data.userdata.address}
        type="text"
        onchange={(e) =>
          setdata((pre) => ({
            ...pre,
            userdata: { ...pre.userdata, address: e.target.value },
          }))
        }
        clear={() => {
          setdata((pre) => ({
            ...pre,
            userdata: { ...pre.userdata, address: "" },
          }));
        }}
      />
      <Standardinputfield
        titlename="User Phone Number"
        value={data.userdata.phonenum}
        type="tel"
        onchange={(e) =>
          setdata((pre) => ({
            ...pre,
            userdata: { ...pre.userdata, phonenum: e.target.value },
          }))
        }
        clear={() => {
          setdata((pre) => ({
            ...pre,
            userdata: { ...pre.userdata, phonenum: "" },
          }));
        }}
      />
      <Standardinputfield
        titlename="User Phone Number"
        value={data.userdata.pincode}
        type="number"
        onchange={(e) =>
          setdata((pre) => ({
            ...pre,
            userdata: { ...pre.userdata, pincode: e.target.value },
          }))
        }
        clear={() => {
          setdata((pre) => ({
            ...pre,
            userdata: { ...pre.userdata, pincode: "" },
          }));
        }}
      />
    </Formparts>
  );
}
