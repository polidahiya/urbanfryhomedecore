"use client";
import React, { useEffect, useState } from "react";
import Sizes from "./Sizes";
import Cartbutton from "./Cartbutton";
import Descriptionitem from "./Descriptionitem";
import Sharebutton from "./Sharebutton";
import ProductDetailsTable from "./ProductDetailsTable";
import Coloroptions from "./Coloroptions";
import { AppContextfn } from "@/app/Context";
import Pincodecomp from "./Pincodecomp";


function Details({ product, color, productid, token }) {
  const cartproductname = `${product?._id}-${color}`;
  const { cart, setcart } = AppContextfn();
  const [pincode, setpincode] = useState("");
  const [pincodemsg, setpincodemsg] = useState(null);

  useEffect(() => {
    if (!cart[cartproductname]?.added)
      setcart((pre) => ({
        ...pre,
        [cartproductname]: {
          added: false,
          dimension: product?.dimensions?.[0] || null,
          quantity: 1,
        },
      }));
    // local storage pin storage
    const pin = localStorage.getItem("pin");
    if (pin) {
      setpincode(pin);
      setpincodemsg({
        status: 200,
        message: "Available at this pincode",
      });
    }
  }, []);

  return (
    <div className="min-h-28">
      {/* name */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-tenor">{product?.productName}</h1>
        {/* share buttton */}
        <Sharebutton
          sku={product?.sku}
          description={product?.keyfeatures.join("________")}
          image={product?.variants[color].images[0]}
        />
      </div>
      {/* price */}
      <p className="mt-5 text-xl">
        {product?.mrp != product?.sellingprice && (
          <span className="text-theme text-base line-through mr-3">
            ₹{parseInt(product?.mrp, 10).toLocaleString("en-IN")}
          </span>
        )}
        <span className="">
          ₹{parseInt(product?.sellingprice, 10).toLocaleString("en-IN")}
        </span>
      </p>
      <hr className="my-5" />

      <ProductDetailsTable
        data={
          token
            ? [
                { label: "SKU", value: product?.sku },
                { label: "P-id", value: productid },
                { label: "Theme", value: product?.theme },
                { label: "Material", value: product?.Material },
                { label: "Finish", value: product?.variants[color].finish },
                { label: "Weight", value: product?.weight + " Kg" },
                { label: "Handling Time", value: product?.handlingtime },
                { label: "Warranty", value: product?.Warranty + " Months" },
              ]
            : [
                { label: "Theme", value: product?.theme },
                { label: "Material", value: product?.Material },
                { label: "Finish", value: product?.variants[color].finish },
                { label: "Weight", value: product?.weight + " Kg" },
                { label: "Handling Time", value: product?.handlingtime },
                { label: "Warranty", value: product?.Warranty + " Months" },
              ]
        }
      />
      {/* color options */}
      <Coloroptions
        variants={product?.variants}
        color={color}
        pid={product?._id}
        name={product?.name}
      />
      {/* pincodes */}
      <Pincodecomp
        pincode={pincode}
        setpincode={setpincode}
        pincodemsg={pincodemsg}
        setpincodemsg={setpincodemsg}
      />

      {/* sizes */}
      <Sizes
        dimensions={product?.dimensions}
        cartproductname={cartproductname}
      />
      <hr className="my-5" />
      <Cartbutton product={product} cartproductname={cartproductname} />
      {/* descriptions */}
      <div className="mt-10 border-b border-theme ">
        <Descriptionitem
          heading="Key Features"
          details={product?.keyfeatures}
        />
        <Descriptionitem
          heading="Description"
          details={product?.descriptions}
        />
        <Descriptionitem
          heading="Care & Maintenance"
          details={[
            "You've put a lot of care into choosing your furnishings. And with continued care at home, they should share your address for many years to come. Now for your owner's manual...",
            "Color and natural veining will vary with each piece.",
            "Dust with soft dry cloth.",
            "Do not use abrasive cleaners.",
            "Do not leave spills unattended.",
            "Wipe with soft cloth.",
            "Use of coasters is recommended.",
            "MARBLE/STONE is a porous, natural material and prone to stains.",
            "Wipe spills immediately to reduce staining and water marks.",
          ]}
          firstisdesc={true}
        />
      </div>
    </div>
  );
}

export default Details;
