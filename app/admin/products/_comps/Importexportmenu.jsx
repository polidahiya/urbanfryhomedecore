import React, { useState } from "react";
import { Roomsearchproducts } from "@/app/_serveractions/_admin/Getliveproducts";
import Papa from "papaparse";
import { Uploadfileproducts } from "@/app/_serveractions/_admin/adminAddproduct";

function Importexportmenu({ setshowimportmenu }) {
  const [loading, setloading] = useState(false);
  const [logs, setlog] = useState([{ message: "", type: true }]);

  const handledownload = async () => {
    try {
      setloading(true);
      const res = await Roomsearchproducts();
      if (res?.status == 200) {
        const products = res?.data;
        const headers = [
          "_id",
          "categories",
          "rooms",
          "productName",
          "sku",
          "handlingtime",
          "mrp",
          "sellingprice",
          "Material",
          "Warranty",
          "theme",
          "dimensions",
          "weight",
          "keyfeatures",
          "descriptions",
          "seotitle",
          "seodescription",
          "seokeywords",
          "available",
        ];

        const tsvRows = products.map((product) => {
          return headers
            .map((header) => {
              let value = product[header];

              // Convert arrays to semicolon-separated strings
              if (Array.isArray(value)) {
                // Handle nested 'variants' array
                if (header === "variants" && product.variants) {
                  value = JSON.stringify(value);
                } else {
                  value = value.join("; ");
                }
              }

              // Ensure undefined/null values don't break TSV
              return `${value !== undefined ? value : ""}`;
            })
            .join("\t"); // Use tab as the separator
        });

        const tsvdata = `${headers.join("\t")}\n${tsvRows.join("\n")}`;

        // Create a Blob from the TSV data
        const blob = new Blob([tsvdata], { type: "text/tsv" });

        // Create a temporary link to trigger the download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "products.tsv"; // Use .tsv extension for tab-separated values
        document.body.appendChild(a);
        a.click();

        // Cleanup
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        setloading(false);
        setlog([
          {
            message: `Export Successfully`,
            type: true,
          },
        ]);
      }
    } catch (error) {
      setlog([
        {
          message: `Error exporting data`,
          type: false,
        },
      ]);
      setloading(false);
    }
  };

  const handleupload = (e) => {
    setloading(true);
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        delimiter: "\t",
        skipEmptyLines: true,
        complete: async (results) => {
          const res = await Uploadfileproducts(results.data);
          if (res?.logs) setlog(res?.logs);
          setloading(false);
        },
        error: (error) => {
          setlog([{ message: "File data error", type: false }]);
          setloading(false);
          console.error("File data error", error);
        },
      });
    }
    e.target.value = null;
  };

  return (
    <div className="fixed inset-0 h-screen flex items-center justify-center  bg-black bg-opacity-20 z-30">
      <div className="relative px-5 py-20 md:px-20 md:py-20 flex flex-col  justify-center gap-5 bg-white">
        <div className="flex justify-between items-start gap-5 ">
          <span>Import products from tsv</span>
          <div className="relative text-theme border border-theme rounded-md min-w-44 py-1">
            <input
              type="file"
              accept=".tsv"
              onInput={handleupload}
              className="absolute inset-0 opacity-0 "
            />
            <span className="block w-full text-center">Import</span>
          </div>
        </div>
        <div className="flex justify-between items-start gap-5 ">
          <span>Export products as tsv</span>
          <button
            className="text-theme  border border-theme rounded-md min-w-44 py-1"
            onClick={handledownload}
          >
            Export
          </button>
        </div>
        <button
          className="absolute top-0 right-0 w-10 aspect-square bg-slate-300"
          onClick={() => setshowimportmenu(false)}
        >
          x
        </button>
        {/* loading */}
        {loading && (
          <div className="flex items-center justify-center gap-5 mt-5">
            <div className="w-5 aspect-square animate-spin duration-75">
              <Loadingsvg />
            </div>
            <span>Working . . .</span>
          </div>
        )}
        {/* error */}
        <div className={`${logs.length > 5 && "overflow-y-scroll"} max-h-52`}>
          {logs.map((item, i) => {
            return (
              <p
                key={i}
                className={`${item?.type ? "text-green-500" : "text-red-500"}`}
              >
                {item.message}
              </p>
            );
          })}
        </div>
        {/* note */}
        <div className="text-[10px]">
          <p>Please note</p>
          <ul>
            {[
              "The application will generate a TSV file upon export. Make the necessary changes in this file before importing it back into the application.",
              "Do not modify the '_id' field unless necessary. Leave the '_id' field empty when adding a new product.",
              "For data integrity, products can only be added or updated through the import feature.",
              "Providing incorrect or misleading data may result in data loss. Please review all changes carefully before importing.",
              "Do not duplicate _id and Sku ",
            ].map((item, i) => (
              <li key={i} className="list-disc">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const Loadingsvg = () => {
  return (
    <svg
      viewBox="0 0 36 36"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      data-icon="spin"
    >
      <defs>
        <linearGradient
          x1="0%"
          y1="100%"
          x2="100%"
          y2="100%"
          id="linearGradient-1"
        >
          <stop stopColor="currentColor" stopOpacity={0} offset="0%" />
          <stop
            stopColor="currentColor"
            stopOpacity="0.50"
            offset="39.9430698%"
          />
          <stop stopColor="currentColor" offset="100%" />
        </linearGradient>
      </defs>
      <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <rect
          fillOpacity="0.01"
          fill="none"
          x={0}
          y={0}
          width={36}
          height={36}
        />
        <path
          d="M34,18 C34,9.163444 26.836556,2 18,2 C11.6597233,2 6.18078805,5.68784135 3.59122325,11.0354951"
          stroke="url(#linearGradient-1)"
          strokeWidth={4}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default Importexportmenu;