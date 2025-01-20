import { Statuslists } from "@/app/commondata";
import {
  updateorderstatus,
  updateordernote,
} from "@/app/_serveractions/_admin/getorders";
import { AppContextfn } from "@/app/Context";
import { useState } from "react";

const Showfullorder = ({ showfullorder, setshowfullorder, setrefresher }) => {
  const orderData = showfullorder.data;
  const { setmessagefn } = AppContextfn();
  const [status, setstatus] = useState(orderData?.orderstage);
  const [note, setnote] = useState(orderData?.note);

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
          <p className="text-sm">Order ID: {orderData._id}</p>
          <p className="text-sm">Date: {orderData.date}</p>
          <p className="text-sm">Name: {orderData.username}</p>
          <p className="text-sm">Email: {orderData.email}</p>
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
          {orderData.products.map((product, index) => (
            <div key={index} className="flex items-center border p-2 rounded">
              <img
                src={product.image}
                alt={product.productName}
                className="w-32 aspect-square object-cover rounded-sm mr-2"
              />
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
          <p className="text-sm">
            <strong>Total Price:</strong> ₹{orderData.totalPrice}
          </p>
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
};

export default Showfullorder;
