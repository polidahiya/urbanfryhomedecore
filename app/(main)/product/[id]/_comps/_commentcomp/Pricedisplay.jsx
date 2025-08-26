"use client";
import React from "react";

function Pricedisplay({ finalprice, finalmrp }) {
  return (
    <p className="mt-5 text-xl">
      {finalmrp != finalprice && (
        <span className="text-theme text-base line-through mr-3">
          ₹{parseInt(finalmrp, 10).toLocaleString("en-IN")}
        </span>
      )}
      <span className="">
        ₹{parseInt(finalprice, 10).toLocaleString("en-IN")}
      </span>
    </p>
  );
}

export default Pricedisplay;
