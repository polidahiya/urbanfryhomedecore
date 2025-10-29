"use client";
import React, { useEffect, useState } from "react";
import Dropdownmenu from "../../products/_comps/_comps/Dropdownmenu";
import Productselector from "./_comps/Productselector";
import Togglebuttons from "../../products/_comps/_comps/Togglebuttons";
import Userdetailscomp from "./_comps/Userdetails";
import Shippingdetailscomp from "./_comps/Shippingdetailscomp";
import Couponcomp from "./_comps/Couponcomp";
import Productcomp from "./_comps/Productcomp";
import Formparts from "./_comps/Formparts";
import Standardinputfield from "../../products/_comps/_comps/Standardinputfield";
import addorder from "./Sereveraction";
import { AppContextfn } from "@/app/Context";
import Dateselector from "../../_comps/Dateselector";
import { useRouter } from "next/navigation";

function Clientpage({ products, orderdata = {}, orderproducts }) {
  const router = useRouter();
  const defaultdatastate = {
    paymentMethod: "online",
    paymentStatus: "success",
    status: 0,
    userdata: {
      name: "",
      email: "",
      usertype: "user",
      address: "",
      phonenum: "",
      permission: [],
      pincode: "",
    },
    shippingdetails: {
      fullName: "",
      email: "",
      mobile: "",
      shipping: {
        address1: "",
        address2: "",
        city: "",
        state: "",
      },
      billingSame: true,
      billing: {
        address1: "",
        address2: "",
        city: "",
        state: "",
      },
      orderNotes: "",
      termsAccepted: true,
    },
    // product: {
    //   pid: "68e0e5cd1486cb2ef2c48a34",
    //   color: "Natural",
    //   price: 17999,
    //   quantity: 1,
    //   name: "Urbanfry Homes Camilla 2-Door Cabinet",
    //   image:
    //     "https://res.cloudinary.com/darxwlgeg/image/upload/v1759568729/Altorganizer/products/gk8nl5ne55bxlou98mh2.jpg",
    //   moreoptions: [],
    //   selecteddata: {
    //     vcolor: "0",
    //   },
    // },
    totalPrice: 0,
    note: "",
    // coupondata: {
    //   code: "URBAN10",
    //   discountType: "percentage",
    //   discountValue: "10",
    //   share: 1,
    // },
    createdAt: new Date(),
  };
  const initialdatastate = { ...defaultdatastate, ...orderdata };
  const { setmessagefn } = AppContextfn();
  const [data, setdata] = useState(initialdatastate);
  const [productsdata, setproductsdata] = useState(orderproducts || []);
  const [showproducts, setshowproducts] = useState(false);
  const [applycoupon, setapplycoupon] = useState(
    initialdatastate.coupondata ? true : false
  );

  const [sendmail, setsendmail] = useState(false);
  const [customprice, setcustomprice] = useState(false);
  const [loading, setloading] = useState(false);

  // update price
  useEffect(() => {
    if (customprice) return;
    let price = 0;
    productsdata.forEach((product) => {
      let rawprice = Number(product?.sellingprice);
      product?.moreoptions?.forEach((moreoption) => {
        const selectedoption =
          moreoption?.options[product?.selecteddata[moreoption?.name] || 0];
        rawprice += Number(selectedoption?.price);
      });
      price += rawprice * product?.quantity;
    });

    const coupondata = data.coupondata;
    if (coupondata) {
      if (coupondata.discountType == "percentage") {
        price = price - (price * coupondata.discountValue) / 100;
      } else if (coupondata.discountType == "fixed") {
        price = price - coupondata.discountValue;
      }
    }

    setdata({ ...data, totalPrice: price });
  }, [productsdata, customprice, applycoupon, data?.coupondata]);

  // update coupon share
  useEffect(() => {
    productsdata.length > 0 &&
      setdata({
        ...data,
        coupondata: { ...data.coupondata, share: productsdata.length },
      });
  }, [productsdata.length]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const res = await addorder(data, productsdata, sendmail);
    setloading(false);
    setmessagefn(res?.message);
    if (res?.status == 200) {
      router.replace("/admin/orders");
    }
  };

  return (
    <div>
      <form onSubmit={handlesubmit} className="flex flex-col gap-2 p-2">
        <Userdetailscomp data={data} setdata={setdata} />

        <Productcomp
          productsdata={productsdata}
          setproductsdata={setproductsdata}
          setshowproducts={setshowproducts}
        />
        <Shippingdetailscomp data={data} setdata={setdata} />
        <Togglebuttons
          titlename="Apply Coupon"
          value={applycoupon}
          positive={() => {
            setapplycoupon(true);
            setdata((pre) => ({
              ...pre,
              coupondata: {
                code: "URBAN10",
                discountType: "percentage",
                discountValue: "10",
                share: productsdata.length || 1,
              },
            }));
          }}
          negative={() => {
            setapplycoupon(false);
            setdata((pre) => {
              const updated = { ...pre };
              delete updated.coupondata;
              return updated;
            });
          }}
          positiveText={"Yes"}
          negativeText={"No"}
        />

        <Couponcomp data={data} setdata={setdata} applycoupon={applycoupon} />

        <Formparts heading="Price">
          <Togglebuttons
            titlename="Custom Price"
            value={customprice}
            positive={() => {
              setcustomprice(true);
            }}
            negative={() => {
              setcustomprice(false);
            }}
            positiveText={"Yes"}
            negativeText={"No"}
          />
          <Standardinputfield
            titlename="Final price"
            value={data?.totalPrice}
            type="number"
            disabled={!customprice}
            onchange={(e) =>
              setdata((pre) => ({
                ...pre,
                totalPrice: e.target.value,
              }))
            }
            clear={() => {
              setdata((pre) => ({
                ...pre,
                totalPrice: 0,
              }));
            }}
          />
        </Formparts>
        <Dropdownmenu
          title="Payment Method"
          state={data?.paymentMethod}
          onchange={(value) => {
            setdata((pre) => {
              const updated = { ...pre };
              if (value == "online") {
                updated.paymentStatus = "success";
              } else {
                delete updated.paymentStatus;
              }
              updated.paymentMethod = value;
              return updated;
            });
          }}
          options={["online", "cod"]}
        />

        {data?.paymentMethod == "online" && (
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
        )}

        <Dateselector
          label="Order Date"
          state={data?.createdAt}
          setstate={(isoDate) => {
            setdata((prev) => ({
              ...prev,
              createdAt: isoDate,
            }));
          }}
        />
        <Togglebuttons
          titlename="Send Mail to User"
          value={sendmail}
          positive={() => {
            setsendmail(true);
          }}
          negative={() => {
            setsendmail(false);
          }}
          positiveText={"Yes"}
          negativeText={"No"}
        />
        <div className="sticky bottom-2 flex items-center justify-center gap-2">
          <button
            type="submit"
            className="bg-theme text-white px-6 py-2 flex items-center justify-center gap-2 rounded-md"
          >
            {loading && (
              <span className="block w-5 h-5 border-b-2 border-t-2 rounded-full border-white animate-spin"></span>
            )}
            {data?._id ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={() => {
              history.back();
            }}
            className="px-6 py-2 flex items-center justify-center gap-2 rounded-md border bg-white"
          >
            Cancel
          </button>
        </div>
      </form>
      <button
        type="button"
        onClick={() => {
          history.back();
        }}
        className="fixed top-1 right-1 md:top-5 md:right-5 flex items-center justify-center w-10 aspect-square bg-gray-200 z-10"
      >
        x
      </button>
      {showproducts && (
        <Productselector
          products={products}
          setshowproducts={setshowproducts}
          onselect={(products) => {
            products = products.map((item) => ({
              ...item,
              quantity: 1,
              moreoptions: item?.moreoptions || [],
              selecteddata: {
                vcolor: "0",
                ...(item?.moreoptions || []).reduce((acc, option) => {
                  acc[option.name] = "0";
                  return acc;
                }, {}),
              },
            }));
            setproductsdata(products);
          }}
        />
      )}
    </div>
  );
}

export default Clientpage;
