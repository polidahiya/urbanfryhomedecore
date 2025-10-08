"use client";
import React, { useState } from "react";
import Dropdownmenu from "../../products/_comps/_comps/Dropdownmenu";
import Productselector from "./_comps/Productselector";
import Togglebuttons from "../../products/_comps/_comps/Togglebuttons";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Formparts from "./_comps/Formparts";
import Userdetailscomp from "./_comps/Userdetails";
import Shippingdetailscomp from "./_comps/Shippingdetailscomp";
import Couponcomp from "./_comps/Couponcomp";
import Productcomp from "./_comps/Productcomp";

const originalprodcucts = [
  {
    _id: "68e3be95a8afbf6e3845f1d5",
    category: "Storage",
    subcat: "Sideboard",
    productName: "Urbanfry Homes Jaloussi 2-Door Buffet Cabinet",
    sku: "UF-LAST-05",
    handlingtime: "15",
    mrp: "29999",
    sellingprice: "19999",
    Material: "Acacia Wood",
    Warranty: "12",
    theme: "Mid Century Modern",
    dimensions: ["43 x 18 x 32 Inches"],
    weight: "20",
    keyfeatures: [
      "Size & Material Information-  Material: Acacia Wood | Finish: Natural  | Size: 43 x 18 x 32 Inches | Assembly: Most pieces are pre-assembled or require minimal leg/handle attachment.",
      "Ready to Ship – Quick dispatch from our warehouse, delivered safely to your doorstep.",
      "Export Surplus Pieces – Limited-edition stock, available only until quantities last.  ",
      "Premium Solid Wood Construction – Made from sustainably sourced Sheesham, Acacia, or Mango wood, ensuring durability and natural beauty.",
      "Functional & Versatile – Perfect for living rooms, bedrooms, dining spaces, or entryways.",
      "Unique Finishes – Variations in grain, texture, and tone make every piece truly one-of-a-kind.",
    ],
    descriptions: [
      "Bring home timeless craftsmanship with our Last Chance Sale pieces, directly sourced from our exclusive export surplus stock. Each piece — whether a sideboard, console table, coffee table, or cabinet — is a one-of-a-kind find that blends premium solid wood construction, functional design, and beautiful detailing at an unbeatable price. These are the final few units from our export collections, making them rare additions to your home. Once they’re gone, they’re gone for good.  Perfect for those who appreciate handcrafted furniture with character, every product in this collection is built to last and designed to elevate modern Indian homes with a touch of global sophistication.",
    ],
    tags: ["Sale"],
    stocks: "3",
    variants: [
      {
        finish: "Honey Oak",
        images: [
          "https://res.cloudinary.com/darxwlgeg/image/upload/v1759754323/Altorganizer/products/rddymg4q34ymmglo4nrr.jpg",
          "https://res.cloudinary.com/darxwlgeg/image/upload/v1759754293/Altorganizer/products/c6hobooatguu2bpojmpr.jpg",
          "https://res.cloudinary.com/darxwlgeg/image/upload/v1759754324/Altorganizer/products/q5um2uioatfwskimm263.jpg",
          "https://res.cloudinary.com/darxwlgeg/image/upload/v1759754311/Altorganizer/products/isllejzki0tqtqlx3ggr.jpg",
          "https://res.cloudinary.com/darxwlgeg/image/upload/v1759754310/Altorganizer/products/kd7uqxpfbucmunqpqv8d.jpg",
          "https://res.cloudinary.com/darxwlgeg/image/upload/v1759754313/Altorganizer/products/lfape4quq3mennejsper.jpg",
          "https://res.cloudinary.com/darxwlgeg/image/upload/v1759754326/Altorganizer/products/ueywmxubo3pm8b9qsmxv.jpg",
          "https://res.cloudinary.com/darxwlgeg/image/upload/v1759754328/Altorganizer/products/orz775bhzfmy4uxmew01.jpg",
        ],
      },
    ],
    moreoptions: [],
    seotitle: "Urbanfry Homes Jaloussi 2-Door Buffet Cabinet",
    seodescription:
      "Discover limited-edition export surplus furniture at unbeatable prices in Urbanfry Homes’ Last Chance Sale. Shop premium solid wood sideboards, consoles, cabine",
    seokeywords:
      "last chance sale, export surplus furniture, solid wood sideboards, console tables, premium cabinets, handcrafted furniture online, limited edition furniture India, Urbanfry Homes sale, mango wood furniture, sheesham wood furniture, affordable luxury furniture",
    available: true,
    lastupdated: 1759755925021,
  },
];

//

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
  const [productsdata, setproductsdata] = useState([]);
  const [showproducts, setshowproducts] = useState(false);
  const [applycoupon, setapplycoupon] = useState(false);
  const [sendmail, setsendmail] = useState(false);

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(data);
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
          }}
          negative={() => {
            setapplycoupon(false);
          }}
          positiveText={"Yes"}
          negativeText={"No"}
        />

        <Couponcomp data={data} setdata={setdata} applycoupon={applycoupon} />
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
      </form>
      {showproducts && (
        <Productselector
          products={products}
          setshowproducts={setshowproducts}
          onselect={(products) => {
            products = products.map((item) => ({
              ...item,
              quantity: 1,
              moreoptions: [
                {
                  name: "test1",
                  options: [
                    {
                      name: "opt1",
                      image: [],
                      imageindex: 0,
                      price: "100",
                      mrp: "",
                    },
                    {
                      name: "opt2",
                      image: [],
                      imageindex: 0,
                      price: "200",
                      mrp: "",
                    },
                  ],
                },
                {
                  name: "test2",
                  options: [
                    {
                      name: "opt1",
                      image: [],
                      imageindex: 0,
                      price: "-100",
                      mrp: "",
                    },
                    {
                      name: "opt2",
                      image: [],
                      imageindex: 0,
                      price: "-100",
                      mrp: "",
                    },
                  ],
                },
              ],
              selecteddata: {
                vcolor: "0",
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
