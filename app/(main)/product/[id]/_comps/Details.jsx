"use client";
import Options from "./Options";
import Cartbutton from "./Cartbutton";
import Descriptionitem from "./Descriptionitem";
import Sharebutton from "./Sharebutton";
import ProductDetailsTable from "./ProductDetailsTable";
import Coloroptions from "./Coloroptions";
import Pincodecomp from "./Pincodecomp";
import Pricedisplay from "./_commentcomp/Pricedisplay";
import { AppContextfn } from "@/app/Context";
import { useState, useEffect } from "react";

function Details({
  product,
  color,
  productid,
  token,
  cartproductname,
  allsearchparams,
  rawprice,
  rawmrp,
  quickview = false,
}) {
  const { cart, setcart } = AppContextfn();
  const [pincode, setpincode] = useState("");
  const [pincodemsg, setpincodemsg] = useState(null);

  useEffect(() => {
    setcart((pre) => {
      let updateddata = { ...pre };
      if (!quickview)
        updateddata = Object.fromEntries(
          Object.entries(updateddata).filter(
            ([key, value]) => value.added || key == cartproductname
          )
        );

      if (!updateddata[cartproductname]?.added) {
        updateddata[cartproductname] = {
          added: false,
          quantity: 1,
        };
      }

      return updateddata;
    });
  }, [cartproductname]);

  useEffect(() => {
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

  const currentproduct = cart[cartproductname];

  let finalprice = rawprice * (currentproduct?.quantity || 1);
  let finalmrp = rawmrp * (currentproduct?.quantity || 1);

  return (
    <div className="min-h-28 px-5 md:px-0">
      {/* name */}
      <h1 className="text-3xl font-tenor ">{product?.productName}</h1>
      <Sharebutton
        sku={product?.sku}
        description={product?.keyfeatures.join("________")}
        image={product?.variants[color].images[0]}
      />
      <Pricedisplay finalprice={finalprice} finalmrp={finalmrp} />
      <hr className="my-5" />

      <ProductDetailsTable
        data={[
          ...(token
            ? [
                { label: "SKU (admin-only)", value: product?.sku },
                { label: "P-id (admin-only)", value: productid },
              ]
            : []),

          { label: "Theme", value: product?.theme },
          { label: "Material", value: product?.Material },
          { label: "Finish", value: product?.variants?.[color]?.finish },
          {
            label: "Weight",
            value: product?.weight ? `${product.weight} Kg` : null,
          },
          { label: "Handling Time", value: product?.handlingtime },
          {
            label: "Warranty",
            value: product?.Warranty ? `${product.Warranty} Months` : null,
          },
        ]}
      />
      <Coloroptions
        variants={product?.variants}
        color={color}
        name={product?.name}
        productid={productid}
      />

      <Options
        moreoptions={product?.moreoptions}
        allsearchparams={allsearchparams}
        productid={productid}
        quickview={quickview}
      />
      <hr className="my-5" />
      <Pincodecomp
        pincode={pincode}
        setpincode={setpincode}
        pincodemsg={pincodemsg}
        setpincodemsg={setpincodemsg}
      />

      <Cartbutton
        product={product}
        cartproductname={cartproductname}
        finalprice={finalprice}
        finalmrp={finalmrp}
      />

      {/* descriptions */}
      <div className="mt-10">
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
