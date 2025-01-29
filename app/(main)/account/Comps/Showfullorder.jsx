import React from "react";
import { Statuslists } from "@/app/commondata";
import Image from "next/image";

function Showfullorder({ orderData, setshowfullorder }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/25 z-30">
      <div className="relative bg-white p-6 max-w-2xl w-full h-full overflow-y-scroll">
        <h1 className="text-xl font-semibold mb-4">Order Details</h1>
        <div className="space-y-2">
          <p className="text-sm">Date: {orderData.date}</p>
          <p className="text-sm">Name: {orderData.username}</p>
          <p className="text-sm">
            Payment:{" "}
            <span
              className={`flex-1 text-sm ${
                orderData?.payment == "successful"
                  ? "text-green-500"
                  : orderData?.paymentMethod == "cod"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {orderData?.paymentMethod == "online"
                ? orderData?.payment
                : "Cod"}
            </span>
          </p>
          <p className="text-sm">
            Order Stage: {Statuslists[orderData.orderstage]}
          </p>
        </div>

        <div className="space-y-2 mt-5">
          {orderData.products.map((product, index) => (
            <div key={index} className="flex items-center border p-2 rounded">
              <Image
                src={product?.image}
                alt={product?.productName}
                className="w-32 aspect-square object-cover rounded-sm mr-2"
                height={500}
                width={500}
                loading="lazy"
              ></Image>
              <div className="text-sm">
                <h3 className="font-semibold text-gray-800">
                  {product.productName}
                </h3>
                <p className="text-gray-600">SKU: {product.sku}</p>
                <p className="text-gray-600">Dimension: {product.dimension}</p>
                <p className="text-gray-600">Quantity: {product.quantity}</p>
                <p className="text-gray-600">Color: {product.color}</p>
                <p className="text-gray-600">Price: ₹{product.sellingprice}</p>
                <p className="text-gray-600">
                  Total: ₹{product.sellingprice * product.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t pt-2">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          {orderData?.coupondata && (
            <p className="text-theme text-sm">
              Applied Coupon : {orderData?.coupondata?.code}
            </p>
          )}
          <p className="text-sm">
            <strong>Total Price:</strong> ₹{orderData.totalPrice}
          </p>
        </div>
        {/* cancle button */}
        <button
          className="absolute top-2 right-2 bg-gray-200 text-gray-700 rounded-full h-10 aspect-square hover:bg-gray-300"
          onClick={() => setshowfullorder({ show: false, data: {} })}
        >
          x
        </button>
      </div>
    </div>
  );
}

export default Showfullorder;
