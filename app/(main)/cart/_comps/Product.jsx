import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { AppContextfn } from "@/app/Context";
import Link from "next/link";
import Image from "next/image";

function Product({ item, cartproductname }) {
  const { cart, setcart, setmessagefn } = AppContextfn();
  const MAX_QUANTITY = 10; // Define the maximum quantity

  const handleIncrement = () => {
    if (cart[cartproductname]?.quantity < MAX_QUANTITY)
      setcart((pre) => {
        const updatedcart = { ...pre };
        updatedcart[cartproductname] = {
          ...updatedcart[cartproductname],
          quantity: updatedcart[cartproductname].quantity + 1,
        };
        return updatedcart;
      });
  };

  const handleDecrement = () => {
    if (cart[cartproductname]?.quantity > 1)
      setcart((pre) => {
        const updatedcart = { ...pre };
        updatedcart[cartproductname] = {
          ...updatedcart[cartproductname],
          quantity: updatedcart[cartproductname].quantity - 1,
        };
        return updatedcart;
      });
  };

  // add to cart button
  const handleremovefromcart = () => {
    setcart((pre) => {
      const updatedcart = { ...pre };
      updatedcart[cartproductname] = {
        ...updatedcart[cartproductname],
        added: false,
      };
      return updatedcart;
    });
    setmessagefn("Removed from cart");
  };

  return (
    <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 lg:gap-0 border-b py-5">
      {/* product */}
      <div className="text-left  lg:flex-[3] ">
        <Link href={`/product/${item?.sku}/${item?.color}`} className="block">
          <div className="w-full flex items-start lg:items-center">
            <div className="min-w-[100px] aspect-square">
              <Image
                src={item?.image}
                alt={item?.productName}
                height={100}
                width={100}
                quality={10}
                className="h-full w-full object-contain"
              ></Image>
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
            onClick={handleDecrement}
            disabled={cart[cartproductname]?.quantity <= 1}
            className={`flex items-center justify-center h-full aspect-square text-xl ${
              cart[cartproductname]?.quantity <= 1 && "opacity-50"
            }`}
          >
            -
          </button>
          {/* display quantity */}
          <p className="flex items-center justify-center h-full w-5">
            {cart[cartproductname]?.quantity}
          </p>
          {/* Increment Button */}
          <button
            onClick={handleIncrement}
            disabled={cart[cartproductname]?.quantity >= MAX_QUANTITY}
            className={`flex items-center justify-center h-full aspect-square text-xl ${
              cart[cartproductname]?.quantity >= MAX_QUANTITY && "opacity-50"
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
          onClick={handleremovefromcart}
        >
          <AiOutlineDelete className="inline-block" />
          <span className="text-sm ml-1">Remove</span>
        </button>
      </div>
    </div>
  );
}

export default Product;
