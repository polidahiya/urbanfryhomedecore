import Link from "next/link";
import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Image from "next/image";

function Orderhistory({ orders }) {
  return (
    <div className="lg:flex-[5] w-full">
      <p>Order History</p>
      {orders.length == 0 ? (
        <Noorders />
      ) : (
        <div className="mt-5">
          {orders?.map((order, i) => (
            <Orders key={i} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

const Orders = ({ order }) => {
  return (
    <div className="relative border-b border-theme first:border-t py-5">
      <div>
        {order?.products?.map((product, i) => {
          return (
            <div key={i} className="flex gap-5 my-2">
              <Image
                src={product?.image}
                alt={product.productName}
                className="w-24 h-w-24 aspect-square object-cover"
                height={500}
                width={500}
                loading="lazy"
              ></Image>
              <div>
                <p className="line-clamp-2">
                  {/* {product?.productName} */}
                  this is a test name this is a test anme this ia this is a test
                  name this is a test anme this ia this is a test name this is a
                  test anme this ia this is a test name this is a test anme this
                  ia this is a test name this is a test anme this ia this is a
                  test name this is a test anme this ia this is a test name this
                  is a test anme this ia this is a test name this is a test anme
                  this ia
                </p>

                <p>Quantity:{product?.quantity}</p>
                <p className="mt-5 text-theme text-sm">
                  Ordered on {order?.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Noorders = () => {
  return (
    <div className="bg-footercolor mt-10 flex flex-col items-center justify-center p-12">
      <HiOutlineShoppingBag className="text-4xl" />
      <p className="text-sm mt-2">You haven{"'"}t placed any orders yet</p>
      <Link
        rel="stylesheet"
        href="/collections/all"
        className="mt-5 px-10 py-4 bg-theme text-white"
      >
        Start Shopping
      </Link>
    </div>
  );
};

export default Orderhistory;
