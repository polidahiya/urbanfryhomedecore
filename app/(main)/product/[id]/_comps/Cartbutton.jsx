"use client";
import React from "react";
import { AppContextfn } from "@/app/Context";
import { useRouter } from "next/navigation";
import { PiSmileySad } from "react-icons/pi";
import { fbq } from "@/app/_connections/Fbpixel";
import { event } from "nextjs-google-analytics";

function Cartbutton({ product, cartproductname, finalprice, finalmrp }) {
  const router = useRouter();
  const { cart, setcart, setmessagefn, setquickview, pincode, pincoderef } =
    AppContextfn();
  const MAX_QUANTITY = Number(product?.stocks) || 10; // Define the maximum quantity

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
    // check pincode
    if (pincode.status != 200) {
      if (!pincode?.code) {
        setmessagefn("Enter your Pincode");
        pincoderef.current.focus();
        return;
      }
      if (!pincode?.available) {
        setmessagefn("Not available in your area");
        pincoderef.current.focus();
        return;
      }
    }

    if (cart[cartproductname]?.added) {
      //send to cart
      setquickview({ show: false, data: {} });
      router.push("/cart");
      return;
    }

    // add to cart
    setcart((pre) => {
      const updatedcart = { ...pre };
      updatedcart[cartproductname] = {
        ...updatedcart[cartproductname],
        added: true,
      };
      return updatedcart;
    });
    setmessagefn("Added to cart");
    // add to cart event
    fbq("track", "AddToCart", {
      content_ids: [product?._id],
      content_name: product?.productName,
      content_type: "product",
      value: finalprice,
      currency: "INR",
    });

    const quantity = cart[cartproductname]?.quantity || 1;
    event("add_to_cart", {
      currency: "INR",
      value: finalprice,
      items: [
        {
          item_id: product?._id,
          item_name: product?.productName,
          price: finalprice,
          quantity: quantity,
        },
      ],
    });
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
          {finalmrp != finalprice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{finalmrp?.toLocaleString("en-IN")}
            </span>
          )}

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
