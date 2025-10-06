"use client";
import React, { useState } from "react";
import Standardinputfield from "../../products/_comps/_comps/Standardinputfield";
import Dropdownmenu from "../../products/_comps/_comps/Dropdownmenu";
import Productselector from "./_comps/Productselector";

const initialdatastate = {
  _id: "68e3700de3ae9b244902b14d",
  paymentGroupId: "833e2137-a60d-41ff-9338-f9109b09757b",
  orderNumber: "Urbanfry251006-136",
  paymentMethod: "online",
  status: 0,
  userdata: {
    name: "Pranjal Phirke",
    email: "paphirke17@gmail.com",
    usertype: "user",
    address: "1503 Fiona Forest Avenue, Hiranandani Estate",
    phonenum: "9004031787",
    permission: [],
    pincode: "400607",
  },
  shippingdetails: {
    fullName: "Pranjal Phirke",
    email: "paphirke17@gmail.com",
    mobile: "9004031787",
    shipping: {
      address1: "1503 Fiona Forest Avenue",
      address2: "Hiranandani Estate",
      city: "Thane",
      state: "Maharashtra",
    },
    billingSame: true,
    billing: {
      address1: "",
      address2: "",
      city: "",
      state: "",
    },
    orderNotes: "1503 Fiona Forest Avenue\nHiranandani Estate",
    termsAccepted: true,
  },
  product: {
    pid: "68e0e5cd1486cb2ef2c48a34",
    color: "Natural",
    price: 17999,
    quantity: 1,
    name: "Urbanfry Homes Camilla 2-Door Cabinet",
    image:
      "https://res.cloudinary.com/darxwlgeg/image/upload/v1759568729/Altorganizer/products/gk8nl5ne55bxlou98mh2.jpg",
    moreoptions: [],
    selecteddata: {
      vcolor: "0",
    },
  },
  totalPrice: 16199.1,
  note: "",
  createdAt: {
    $date: "2025-10-06T07:30:21.975Z",
  },
  coupondata: {
    code: "URBAN10",
    discountType: "percentage",
    discountValue: "10",
    share: 1,
  },
  paymentStatus: "success",
};
function Clientpage({ products }) {
  const [data, setdata] = useState(initialdatastate);
  const [showproducts, setshowproducts] = useState(false);

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handlesubmit} className="flex flex-col gap-2 p-2">
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
            type="text"
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
            type="text"
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
        <button
          type="button"
          onClick={() => setshowproducts(true)}
          className="px-4 py-2 border rounded-md"
        >
          Add Product
        </button>
        <Dropdownmenu
          title="Payment Status"
          state={data?.paymentStatus}
          onchange={(value) => {
            setdata((pre) => ({
              ...pre,
              paymentStatus: value,
            }));
          }}
          options={["success", "pending"]}
        />
        <Dropdownmenu
          title="Payment Method"
          state={data?.paymentMethod}
          onchange={(value) => {
            setdata((pre) => ({
              ...pre,
              paymentMethod: value,
            }));
          }}
          options={["online", "cod"]}
        />
      </form>
      {showproducts && (
        <Productselector
          products={products}
          setshowproducts={setshowproducts}
          onselect={(products) => {}}
        />
      )}
    </div>
  );
}

const Formparts = ({ children, heading = "" }) => {
  return (
    <div className="p-5 border rounded-md space-y-5">
      <h2 className="text-2xl font-tenor">{heading}</h2>
      {children}
    </div>
  );
};

export default Clientpage;
