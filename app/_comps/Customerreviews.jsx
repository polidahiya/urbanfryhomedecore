import React from "react";
import { FaStar } from "react-icons/fa";

function Customerreviews() {
  return (
    <div className="my-12">
      <h2 className="text-6xl font-tenor text-center">
        Let customers speak for us
      </h2>
      <p className="flex items-center justify-center mt-2">
        <Fivestar />
      </p>
      <p className="text-center">From 50 reviews</p>
      {/* reviews */}
      <div className="my-8 max-w-[800px] mx-auto">
        <div className="flex items-start gap-5">
          <div className="flex-1 flex flex-col items-center gap-2">
            <Fivestar />
            <p className="text-center">
              this is a comment this is a comment this is a comment this is a
              comment this is a comment
            </p>
            <p className="text-theme">Name</p>
            <img
              className="w-14 aspect-square object-cover"
              src="https://cdn.shopify.com/s/files/1/0833/1578/6030/files/LushwithmossRugImg1_140x140.jpg?v=1698239456"
              alt=""
            />
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <Fivestar />
            <p className="text-center">
              this is a comment this is a comment this is a comment this is a
              comment this is a comment
            </p>
            <p className="text-theme">Name</p>
            <img
              className="w-14 aspect-square object-cover"
              src="https://cdn.shopify.com/s/files/1/0833/1578/6030/files/LushwithmossRugImg1_140x140.jpg?v=1698239456"
              alt=""
            />
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <Fivestar />
            <p className="text-center">
              this is a comment this is a comment this is a comment this is a
              comment this is a comment
            </p>
            <p className="text-theme">Name</p>
            <img
              className="w-14 aspect-square object-cover"
              src="https://cdn.shopify.com/s/files/1/0833/1578/6030/files/LushwithmossRugImg1_140x140.jpg?v=1698239456"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const Fivestar = () => (
  <span className="flex items-center gap-1 text-theme">
    <FaStar />
    <FaStar />
    <FaStar />
    <FaStar />
    <FaStar />
  </span>
);

export default Customerreviews;
