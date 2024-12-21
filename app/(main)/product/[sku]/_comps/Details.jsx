import React from "react";
import Sizes from "./Sizes";
import Cartbutton from "./Cartbutton";
import Descriptionitem from "./Descriptionitem";
import Sharebutton from "./Sharebutton";
import ProductDetailsTable from "./ProductDetailsTable";
import Image from "next/image";
import Link from "next/link";

function Details({ product, color }) {
  return (
    <div className="flex-[2] min-h-28">
      {/* name */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-tenor">{product?.productName}</h1>
        {/* share buttton */}
        <Sharebutton
          sku={product.sku}
          description={product.keyfeatures}
          image={product.variants[color].images[0]}
        />
      </div>
      {/* price */}
      <p className="mt-5 text-xl">
        {product.mrp && (
          <span className="text-theme text-base line-through mr-3">
            ₹{parseInt(product.mrp, 10).toLocaleString("en-IN")}
          </span>
        )}
        <span className="">
          ₹{parseInt(product.sellingprice, 10).toLocaleString("en-IN")}
        </span>
      </p>
      <hr className="my-5" />

      <ProductDetailsTable
        data={[
          { label: "SKU", value: product?.sku },
          { label: "Theme", value: product?.theme },
          { label: "Material", value: product?.Material },
          { label: "Finish", value: product?.variants[color].finish },
          { label: "Weight", value: product?.weight + " Pounds" },
          { label: "Handling Time", value: product?.handlingtime },
          { label: "Warranty", value: product?.Warranty + " Months" },
        ]}
      />
      {/* color options */}
      <div className="mt-5">
        <p className="block text-sm">Color Options</p>
        <div className="flex gap-2 mt-2">
          {product?.variants.map((variant, index) => (
            <Link
              href={`/product/${product.sku}?color=${index}`}
              key={index}
              className={`border  outline-2 outline-theme overflow-hidden ${
                index == color ? "outline" : "lg:hover:outline"
              }`}
            >
              <Image
                src={variant.images[0]}
                alt={`${product.productName}-${variant.finish}`}
                width={100}
                height={100}
                loading="lazy"
                className="w-24 aspect-square"
              ></Image>
            </Link>
          ))}
        </div>
      </div>
      {/* sizes */}
      <Sizes dimensions={product?.dimensions} />

      <hr className="my-5" />
      <Cartbutton />
      {/* descriptions */}
      <div className="mt-10 border-b border-theme ">
        <Descriptionitem
          heading="Please Note"
          details={[
            "Due to light and screen differences, colors may vary slightly from the image online and the actual product",
          ]}
        />
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
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam dignissimos eaque nulla neque consequuntur! Provident magnam et at nisi illum nam molestias inventore, totam facere libero dolorem ducimus quaerat vitae sapiente? Aspernatur possimus itaque laudantium delectus. Fugit, excepturi? Perferendis fugit, nostrum saepe quia nemo praesentium repudiandae obcaecati eum placeat aspernatur.",
          ]}
        />
        <Descriptionitem
          heading="Shipping / Delivery Timeline"
          details={[
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam dignissimos eaque nulla neque consequuntur! Provident magnam et at nisi illum nam molestias inventore, totam facere libero dolorem ducimus quaerat vitae sapiente? Aspernatur possimus itaque laudantium delectus. Fugit, excepturi? Perferendis fugit, nostrum saepe quia nemo praesentium repudiandae obcaecati eum placeat aspernatur.",
          ]}
        />
      </div>
    </div>
  );
}

export default Details;
