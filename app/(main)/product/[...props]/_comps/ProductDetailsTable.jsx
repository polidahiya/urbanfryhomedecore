import React from "react";

const ProductDetailsTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-x-5">
        {data.map((row, index) => (
          <p key={index} className={`flex items-center gap-2 py-2 text-sm  text-gray-700`}>
            <span className="font-semibold text-theme min-w-32">{row.label}</span> <span>:</span> <span>{row.value}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsTable;
