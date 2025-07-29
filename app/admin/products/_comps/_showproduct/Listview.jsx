import React from "react";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { GrUpdate } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { IoCopy } from "react-icons/io5";
import { HiViewfinderCircle } from "react-icons/hi2";
import { AppContextfn } from "@/app/Context";
import Link from "next/link";
import { Deleteproduct } from "@/app/_serveractions/_admin/adminAddproduct";

function Listview({ products, setproducts }) {
  const { setshowdialog, setmessagefn, setquickview } = AppContextfn();
  const handledeleteproduct = async (product) => {
    const res = await Deleteproduct(product?.variants, product?._id);

    setmessagefn(res?.message);
    if (res.status === 200)
      setproducts((pre) => pre.filter((item) => item._id !== product?._id));
  };

  return (
    <div className="mt-5 overflow-x-scroll max-w-[calc(100vw-104px)] md:max-w-[calc(100vw-336px)] max-h-screen overflow-y-scroll">
      <table className="border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 ">
            <th className="border border-gray-300 px-4">Image</th>
            <th className="border border-gray-300 px-4">Product Name</th>
            <th className="border border-gray-300 px-4">Category</th>
            <th className="border border-gray-300 px-4">Room</th>
            <th className="border border-gray-300 px-4">Sku</th>
            <th className="border border-gray-300 px-4">Price(MRP)</th>
            <th className="border border-gray-300 px-4">Price(SP)</th>
            <th className="border border-gray-300 px-4">Material</th>
            <th className="border border-gray-300 px-4">Dimensions</th>
            <th className="border border-gray-300 px-4">Collections</th>
            <th className="border border-gray-300 px-4">Weight</th>
            <th className="border border-gray-300 px-4">Theme</th>
            <th className="border border-gray-300 px-4">Warranty</th>
            <th className="border border-gray-300 px-4">Handling Time</th>
            <th className="border border-gray-300 px-4">Key Features</th>
            <th className="border border-gray-300 px-4">Descriptions</th>
            <th className="border border-gray-300 px-4">Seo Title</th>
            <th className="border border-gray-300 px-4">Seo Description</th>
            <th className="border border-gray-300 px-4">Seo Keywords</th>
            <th className="border border-gray-300 px-4">Available</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {products.map((product, index) => (
            <tr key={index} className="group relative hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                <Nextimage
                  src={product?.variants[0]?.images[0] || "/uiimages/404.avif"}
                  alt={product?.productName}
                  className="w-full aspect-square object-cover"
                  height={500}
                  width={500}
                  loading="lazy"
                ></Nextimage>
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                {product?.productName}
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                {product?.categories}
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                {product?.rooms}
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                {product?.sku}
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                ₹{product?.mrp}
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                ₹{product?.sellingprice}
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                {product?.Material}
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                <ul className="list-disc list-inside">
                  {product?.dimensions.map((dim, index) => (
                    <li key={index} className=" max-w-xl truncate">
                      {dim}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                <ul className="list-disc list-inside">
                  {product?.collections?.map((col, index) => (
                    <li key={index} className=" max-w-xl truncate">
                      {col}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                {product?.weight} kg
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                {product?.theme}
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                {product?.handlingtime}
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                {product?.Warranty} months
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                <ul className="list-disc list-inside">
                  {product?.keyfeatures.map((feature, index) => (
                    <li key={index} className=" max-w-xl truncate">
                      {feature}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                <ul className="list-disc list-inside">
                  {product?.descriptions.map((desc, index) => (
                    <li key={index} className=" max-w-xl truncate">
                      {desc}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                {product?.seotitle}
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                {product?.seodescription}
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                {product?.seokeywords}
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap max-w-xl truncate">
                {product?.available ? "TRUE" : "FALSE"}
              </td>
              <td className="absolute top-0 left-0 bg-white hidden p-1 group-hover:flex gap-1">
                {/* update button */}
                <Link
                  href={`/admin/products/add?edit=${product?._id}`}
                  className="text-xs bg-green-500 text-white rounded-full p-2"
                >
                  <GrUpdate />
                </Link>
                {/* copy */}
                <Link
                  href={`/admin/products/add?copy=${product?._id}`}
                  className="text-xs bg-sky-600 text-white rounded-full p-2"
                >
                  <IoCopy />
                </Link>
                {/* view */}
                <button
                  className="text-xs bg-sky-600 text-white rounded-full p-2"
                  onClick={() => setquickview({ show: true, data: product })}
                  title="View"
                >
                  <HiViewfinderCircle />
                </button>
                {/* delete button */}
                <button
                  className="text-xs bg-red-500 text-white rounded-full p-2"
                  onClick={() => {
                    setshowdialog({
                      show: true,
                      title: "Confirm Delete?",
                      continue: () => {
                        handledeleteproduct(product);
                      },
                      type: false,
                    });
                  }}
                  title="Delete"
                >
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Listview;
