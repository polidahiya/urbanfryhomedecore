import React from "react";
import { Statuslists } from "@/app/commondata";
import {
  updateorderstatus,
  Deleteorder,
  updateordernote,
} from "@/app/_serveractions/_admin/getorders";
import { AppContextfn } from "@/app/Context";
import { useState } from "react";
import Nextimage from "@/app/_globalcomps/Nextimage";
import formatDate from "@/app/_globalcomps/_helperfunctions/formateddate";
import Couponedprice from "@/app/_globalcomps/_helperfunctions/Couponedprice";
import Link from "next/link";

const Showfullorder = ({ showfullorder, setshowfullorder, setrefresher }) => {
  const orderData = showfullorder.data;
  const product = orderData.product;
  const shippingdetails = orderData?.shippingdetails;
  const coupon = orderData.coupondata;
  const { setmessagefn, setshowdialog } = AppContextfn();
  const [status, setstatus] = useState(orderData?.status);
  const [note, setnote] = useState(orderData?.note || "");

  const productprice = product?.price * product?.quantity;
  const { formattedPrice, originalPriceFormatted } = Couponedprice(
    productprice,
    coupon
  );

  const Updatestatus = async (id, value) => {
    const res = await updateorderstatus(id, value);
    setmessagefn(res?.message);
    if (res.status == 200) {
      setstatus(value);
      setrefresher((pre) => !pre);
    }
  };

  const updatenote = async () => {
    const res = await updateordernote(orderData._id, note);
    setmessagefn(res?.message);
    if (res.status == 200) {
      setrefresher((pre) => !pre);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/25 z-10">
      <div className="relative bg-white p-6 max-w-2xl w-full h-full overflow-y-scroll">
        <h1 className="text-xl font-semibold mb-4">Order Details</h1>
        <div className="space-y-2">
          <p className="text-sm">Order Group ID: {orderData?.paymentGroupId}</p>
          <p className="text-sm">Order Number: {orderData?.orderNumber}</p>
          <p className="text-sm">Date: {formatDate(orderData?.createdAt)}</p>
          <p className="text-sm">
            Name: {orderData?.userdata?.name || orderData?.userdata?.username}
          </p>
          <p className="text-sm">Email: {orderData?.userdata?.email}</p>
          <p className="text-sm">Phone no: {orderData?.userdata?.phonenum}</p>
          <p className="text-sm">
            Address: {orderData?.userdata?.address} {"("}
            {orderData?.userdata?.pincode}
            {")"}
          </p>
          <p className="text-sm">
            Payment:{" "}
            <span
              className={`flex-1 text-sm ${
                orderData?.paymentStatus == "success"
                  ? "text-green-500"
                  : orderData?.paymentMethod == "cod"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {orderData?.paymentMethod == "online"
                ? orderData?.paymentStatus
                : "Cod"}
            </span>
          </p>
          {/*  */}
          {shippingdetails && (
            <div className="space-y-2 border-t border-b py-2">
              <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

              <p className="text-sm">Full Name: {shippingdetails?.fullName}</p>
              <p className="text-sm">Email: {shippingdetails?.email}</p>
              <p className="text-sm">Mobile: {shippingdetails?.mobile}</p>
              <div className="pl-5 border-t space-y-2">
                <h3 className="text-lg font-medium">Shipping Address</h3>
                <p className="text-sm">
                  Address1: {shippingdetails?.shipping?.address1}
                </p>
                {shippingdetails?.shipping?.address2 && (
                  <p className="text-sm">
                    Address2: {shippingdetails?.shipping?.address2}
                  </p>
                )}
                <p className="text-sm">
                  City: {shippingdetails?.shipping?.city}
                </p>
                <p className="text-sm">
                  State: {shippingdetails?.shipping?.state}
                </p>
              </div>
              {!shippingdetails?.billingSame && (
                <div className="pl-5 border-t space-y-2">
                  <h3 className="text-lg font-medium">Billing Address</h3>
                  <p className="text-sm">
                    Address1: {shippingdetails?.billing?.address1}
                  </p>
                  {shippingdetails?.billing?.address2 && (
                    <p className="text-sm">
                      Address2: {shippingdetails?.billing?.address2}
                    </p>
                  )}
                  <p className="text-sm">
                    City: {shippingdetails?.billing?.city}
                  </p>
                  <p className="text-sm">
                    State: {shippingdetails?.billing?.state}
                  </p>
                </div>
              )}
              {shippingdetails?.shipping?.orderNotes && (
                <p className="text-sm">
                  User Order Notes: {shippingdetails?.shipping?.orderNotes}
                </p>
              )}
            </div>
          )}
          <div>
            <label className="block text-sm">Order Stage</label>
            <div className="mt-1 block w-full px-2 border rounded-md">
              <select
                value={status}
                onChange={(e) => Updatestatus(orderData._id, e.target.value)}
                className="block w-full py-2 outline-none"
              >
                {Statuslists.map((item, i) => (
                  <option key={i} value={i}>
                    {item.replace(/-/g, " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-2 mt-5">
          <div className="flex items-center border p-2 rounded">
            <Nextimage
              src={product?.image}
              alt={product?.name}
              className="w-32 aspect-square object-cover rounded-sm mr-2"
              height={100}
              width={100}
              loading="lazy"
            ></Nextimage>
            <div className="text-sm">
              <h3 className="font-semibold text-gray-800">{product?.name}</h3>
              <p className="text-gray-600">Quantity: {product?.quantity}</p>
              <p className="text-gray-600">Color: {product?.color}</p>
              {/*  */}
              <p className="text-gray-600">
                {product?.moreoptions?.map((opti, i) => (
                  <React.Fragment key={i}>
                    <span>
                      {opti?.name} :{" "}
                      {opti?.options[product?.selecteddata[opti?.name]]?.name}
                    </span>
                    <span className="last:hidden"> | </span>
                  </React.Fragment>
                ))}
              </p>
              {/*  */}
              <div>
                <span className="font-medium">Price:</span>{" "}
                <span className="text-green-600 font-semibold">
                  {formattedPrice}
                </span>
                {coupon && (
                  <span className="ml-2 text-gray-500 line-through text-sm">
                    {originalPriceFormatted}
                  </span>
                )}
              </div>
              {/* Applied Coupon Display */}
              {coupon && (
                <div className="text-sm text-orange-600 font-medium mt-2">
                  Coupon <span className="font-bold">{coupon?.code}</span>{" "}
                  applied:{" "}
                  {coupon?.discountType === "percentage"
                    ? `${coupon?.discountValue}% off`
                    : `Total ₹${coupon?.discountValue} off in ${
                        coupon?.share
                      } products @ ₹${
                        coupon?.discountValue / coupon?.share
                      } per product`}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* note */}
        <div className="flex flex-col items-start gap-1 border-t mt-5 py-5">
          <h2 className="text-lg font-semibold">Note</h2>
          <textarea
            value={note}
            onChange={(e) => setnote(e.target.value)}
            className="border w-full min-h-40 outline-none p-2"
          ></textarea>
          <button
            className="px-5 py-2 bg-theme text-white"
            onClick={updatenote}
          >
            Update
          </button>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/orders/Add?edit=${orderData.paymentGroupId}`}
            className="border border-theme px-5 py-2 rounded-md text-theme"
          >
            Edit
          </Link>
          <button
            className="border border-red-500 px-5 py-2 rounded-md text-red-500"
            onClick={() =>
              setshowdialog({
                show: true,
                title: "Delete Order?",
                continue: async () => {
                  const res = await Deleteorder(orderData._id);
                  setmessagefn(res?.message);
                  if (res.status == 200) {
                    setshowfullorder({ show: false, data: {} });
                    setrefresher((pre) => !pre);
                  }
                },
                type: false,
              })
            }
          >
            Delete
          </button>
        </div>

        {/* cancel button */}
        <button
          className="absolute top-2 right-2 bg-gray-200 text-gray-700 rounded-full h-10 aspect-square hover:bg-gray-300"
          onClick={() => setshowfullorder({ show: false, data: {} })}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default Showfullorder;
