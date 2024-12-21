import React from "react";

const ProductDetailsTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 ">
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } border-b`}
            >
              <td className="w-1/2 font-tenor p-4 text-sm font-medium text-gray-700">
                {row.label}
              </td>
              <td className="w-1/2 font-tenor p-4 text-sm text-gray-600 text-center border-l">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetailsTable;
