"use client";
import React from "react";
import { AppContextfn } from "@/app/Context";
import { useRouter } from "next/navigation";
import { PiSmileySad } from "react-icons/pi";

function Cartbutton({ product, cartproductname, finalprice, finalmrp }) {
  const router = useRouter();
  const { cart, setcart, setmessagefn, setquickview } = AppContextfn();
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
  const handleAddToCart = () => {
    if (!product?.available) {
      setmessagefn("This product is currently unavailable");
      return;
    }

    if (cart[cartproductname]?.added) {
      setquickview({ show: false, data: {} });
      router.push("/cart");
      return;
    }

    setcart((pre) => {
      const updatedcart = { ...pre };
      updatedcart[cartproductname] = {
        ...updatedcart[cartproductname],
        added: true,
      };
      return updatedcart;
    });
    setmessagefn("Added to cart");
  };

  return (
    <div className="sticky bottom-0 bg-white py-1">
      <div className="flex items-center justify-between">
        <div className="h-14 flex items-stretch  w-fit border border-theme lg:hover:border-black bg-white">
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
        <div className="flex flex-col items-end gap-1">
          <span className="text-sm text-gray-500 line-through">
            ₹{finalmrp?.toLocaleString("en-IN")}
          </span>
          <span className="text-xl">
            ₹{finalprice?.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
      {/* add to cart button */}
      <button
        className="h-14 w-full text-white bg-theme text-sm mt-2"
        onClick={handleAddToCart}
      >
        {product?.available ? (
          cart[cartproductname]?.added ? (
            "VIEW CART"
          ) : (
            "ADD TO CART"
          )
        ) : (
          <span className="flex items-center justify-center gap-3">
            <PiSmileySad className="scale-[2]" />
            Currently Unavailable
          </span>
        )}
      </button>
    </div>
  );
}

export default Cartbutton;
