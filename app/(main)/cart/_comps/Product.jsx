"use client";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { AppContextfn } from "@/app/Context";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { usePathname } from "next/navigation";
import Revalidatepathfn from "@/app/_serveractions/Revalidatepathpn";

function Product({ item, cartproductid }) {
  const pathname = usePathname();
  const { cart, setcart, setmessagefn } = AppContextfn();
  const MAX_QUANTITY = 10; // Define the maximum quantity
  console.log(cartproductid);

  const color = cartproductid.split("-")[1];
  const image = item?.variants[color]?.images[0];

  const handleQuantityChange = async (slug) => {
    let dorevalidate = false;
    setcart((pre) => {
      const updatedcart = { ...pre };
      const currentItem = updatedcart[cartproductid];
      const newquantity = item.quantity + slug;

      if (newquantity >= 1 && newquantity <= MAX_QUANTITY) {
        dorevalidate = true;
        updatedcart[cartproductid] = {
          ...currentItem,
          quantity: newquantity,
        };
      } else if (newquantity > MAX_QUANTITY) {
        setmessagefn("Maximum quantity reached");
      }

      return updatedcart;
    });

    if (dorevalidate) {
      await Revalidatepathfn(pathname);
    }
  };

  // add to cart button
  const handleRemoveProduct = async () => {
    setcart((pre) => {
      const updatedcart = { ...pre };
      updatedcart[cartproductid] = {
        ...updatedcart[cartproductid],
        added: false,
      };
      return updatedcart;
    });
    await Revalidatepathfn(pathname);
    setmessagefn("Removed from cart");
  };

  return (
    <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 lg:gap-0 border-b py-5">
      {/* product */}
      <div className="text-left  lg:flex-[3] ">
        <Link href={`/product/${item?._id}/${color}`} className="block">
          <div className="w-full flex items-start lg:items-center">
            <div className="min-w-24 w-24 aspect-square">
              <Nextimage
                src={image || "/uiimages/404.avif"}
                alt={item?.productName}
                height={100}
                width={100}
                className="h-full w-full object-contain"
              ></Nextimage>
            </div>

            <div className="w-full pl-5">
              <p>{item.productName}</p>
              <p className="opacity-60 mt-1">Size : {item?.dimension}</p>
            </div>
          </div>
        </Link>
      </div>
      {/* price */}
      <div className="flex items-center justify-center gap-5 lg:flex-1 mt-5 lg:mt-0">
        <div>
          <span className="lg:hidden">Price : </span> ₹{" "}
          {parseInt(item.sellingprice, 10).toLocaleString("en-IN")}
        </div>
        <div className="font-medium lg:hidden">
          <span>Total : </span>₹{" "}
          {parseInt(item.sellingprice * item.quantity, 10).toLocaleString(
            "en-IN"
          )}
        </div>
      </div>
      {/* quantity */}
      <div className="lg:flex-1 ">
        <div className="flex items-stretch h-10 lg:h-16 w-fit border border-theme mx-auto">
          {/* Decrement Button */}
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={cart[cartproductid]?.quantity <= 1}
            className={`flex items-center justify-center h-full aspect-square text-xl ${
              cart[cartproductid]?.quantity <= 1 && "opacity-50"
            }`}
          >
            -
          </button>
          {/* display quantity */}
          <p className="flex items-center justify-center h-full w-5">
            {cart[cartproductid]?.quantity}
          </p>
          {/* Increment Button */}
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={cart[cartproductid]?.quantity >= MAX_QUANTITY}
            className={`flex items-center justify-center h-full aspect-square text-xl ${
              cart[cartproductid]?.quantity >= MAX_QUANTITY && "opacity-50"
            }`}
          >
            +
          </button>
        </div>
      </div>
      {/*total price */}
      <div className="lg:flex-1 hidden lg:block">
        ₹{" "}
        {parseInt(item.sellingprice * item.quantity, 10).toLocaleString(
          "en-IN"
        )}
      </div>
      {/* delete button */}
      <div className="absolute lg:static bottom-7 right-5 lg:flex-1">
        <button
          className=" text-theme text-xl lg:px-10"
          onClick={handleRemoveProduct}
        >
          <AiOutlineDelete className="inline-block" />
          <span className="text-sm ml-1">Remove</span>
        </button>
      </div>
    </div>
  );
}

export default Product;
