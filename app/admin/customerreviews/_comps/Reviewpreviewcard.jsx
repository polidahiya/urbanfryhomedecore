import React from "react";
import RatingStars from "@/app/(main)/product/[...props]/_comps/_commentcomp/RatingStars";
import { AiFillDelete } from "react-icons/ai";
import { AppContextfn } from "@/app/Context";
import {
  Deletereview,
  Updatereview,
} from "@/app/_serveractions/_admin/Getreview";

function Reviewpreviewcard({ review, setrefresher }) {
  const { setmessagefn, setshowdialog } = AppContextfn();
  const handledelete = async () => {
    const res = await Deletereview(review?._id);
    setmessagefn(res?.message);
    if (res?.status == 200) {
      setrefresher((pre) => !pre);
    }
  };

  const handleverification = async () => {
    const res = await Updatereview(review?._id, !review?.verified);
    setmessagefn(res?.message);
    if (res?.status == 200) {
      setrefresher((pre) => !pre);
    }
  };

  return (
    <div className="relative p-5 border rounded-md text-sm">
      <div className="flex items-start justify-between">
        <p>
          <RatingStars rating={review?.star} />
        </p>
        <p>{review?.date}</p>
      </div>
      <div className="my-5 flex items-center gap-5">
        <div
          className={`${review?.verified ? "text-green-500" : "text-gray-500"}`}
        >
          {review?.verified ? "Verified" : "Not verified"}
        </div>
        <button
          className="border px-3 py-1 rounded-md"
          onClick={handleverification}
        >
          {review?.verified ? "Set Unverified" : "Set Verified"}
        </button>
      </div>

      <p className="text-theme font-bold">{review?.name}</p>
      <p className="text-theme">{review?.email}</p>
      <p>Sku : {review?.sku}</p>

      <p>Comment : {review?.comment}</p>
      <button
        className="text-rose-500 flex items-center gap-1 border rounded-md px-5 py-2 mt-10"
        onClick={() => {
          setshowdialog({
            show: true,
            title: "Confirm Delete?",
            continue: () => {
              handledelete();
            },
            type: false,
          });
        }}
      >
        <AiFillDelete /> Delete
      </button>
    </div>
  );
}

export default Reviewpreviewcard;
