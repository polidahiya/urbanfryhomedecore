import React from "react";
import { GrUpdate } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { IoCopy } from "react-icons/io5";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { Deleteproduct } from "@/app/_serveractions/_admin/adminAddproduct";
import { AppContextfn } from "@/app/Context";

function Gridview({
  products,
  setproducts,
  setdata,
  setdeletedimages,
  setshowform,
  setpreviewdata,
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-2 gap-y-16 my-10">
      {products.map((product, i) => (
        <Productcard
          key={i}
          product={product}
          setproducts={setproducts}
          setdata={setdata}
          setdeletedimages={setdeletedimages}
          setshowform={setshowform}
          setpreviewdata={setpreviewdata}
        />
      ))}
    </div>
  );
}

const Productcard = ({
  product,
  setproducts,
  setdata,
  setdeletedimages,
  setshowform,
  setpreviewdata,
}) => {
  const { setshowdialog, setmessagefn } = AppContextfn();

  const handledeleteproduct = async (product) => {
    const res = await Deleteproduct(product?.variants, product?._id);

    setmessagefn(res?.message);
    if (res.status === 200)
      setproducts((pre) => pre.filter((item) => item._id !== product?._id));
  };

  return (
    <div className="relative max-w-72">
      {product?.variants && (
        <Nextimage
          src={product?.variants[0]?.images[0] || "/uiimages/404.avif"}
          alt={product?.productName}
          className="w-full aspect-square object-cover"
          height={500}
          width={500}
          loading="lazy"
        ></Nextimage>
      )}
      <p className="mt-1 text-center">{product?.productName}</p>
      <button
        className="block w-full bg-theme text-white py-2 mt-2 text-center bg-opacity-75 lg:hover:bg-opacity-100"
        onClick={() => setpreviewdata({ show: true, data: product })}
      >
        View
      </button>
      <div className="absolute top-0 right-0 flex flex-col gap-1 p-1">
        {/* update button */}
        <button
          className="text-xs bg-green-500 text-white rounded-full p-2"
          onClick={() => {
            setdata(product);
            setdeletedimages([]);
            setshowform(true);
          }}
        >
          <GrUpdate />
        </button>
        {/* copy */}
        <button
          className="text-xs bg-sky-600 text-white rounded-full p-2"
          onClick={() => {
            const updateddata = { ...product };
            delete updateddata._id;
            updateddata.sku = "";
            updateddata.variants.forEach((variant) => {
              variant.images = [];
            });
            console.log(updateddata);

            setdata(updateddata);
            setdeletedimages([]);
            setshowform(true);
          }}
        >
          <IoCopy />
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
        >
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
};

export default Gridview;
