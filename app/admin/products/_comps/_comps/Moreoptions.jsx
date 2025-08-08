import React from "react";
import Standardinputfield from "./Standardinputfield";
const optionlist = [
  { name: "Box Storage", image: "" },
  { name: "Hydraulic Storage", image: "" },
  { name: "Drawer Storage", image: "" },
  { name: "Pull-out Storage", image: "" },
  { name: "Lift-up Storage", image: "" }, // Same as hydraulic, but listed separately sometimes
  { name: "Side Storage", image: "" },
  { name: "Front Storage", image: "" },
  { name: "Headboard Storage", image: "" },
  { name: "Footboard Storage", image: "" },
  { name: "Underbed Storage", image: "" }, // Generic term; includes drawers, pull-out bins
  { name: "Modular Storage", image: "" },
  { name: "Cabinet Storage", image: "" },
  { name: "Shelf Storage", image: "" },
  { name: "Open Storage", image: "" },
  { name: "No Storage", image: "" },
];

function Moreoptions({ data, setdata }) {
  return (
    <div className="mt-4 p-4 border rounded-md">
      <Standardinputfield
        titlename="Option Name"
        value={data?.moreoptions?.name}
        onchange={(e) =>
          setdata((pre) => {
            const updateddata = { ...pre };
            updateddata.moreoptions.name = e.target.value;
            return updateddata;
          })
        }
        clear={() =>
          setdata((pre) => {
            const updateddata = { ...pre };
            updateddata.moreoptions.name = "";
            return updateddata;
          })
        }
      />
      {/*  */}
      {data?.moreoptions?.options?.map((item, i) => (
        <div key={i} className="mt-4 p-4 flex flex-wrap gap-2">
          <div className="flex flex-col gap-1 border rounded-md overflow-hidden p-1">
            <img
              className="w-24 aspect-square"
              src="https://i.pinimg.com/564x/72/7d/02/727d02502658d5adb37c7b42abd18cdc.jpg"
              alt=""
            />
            <p className="text-center line-clamp-1">Nmae</p>
          </div>
          <div className="flex flex-col gap-1 border rounded-md w-24 aspect-square">
            <span>+</span>
            <span>Add more</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Moreoptions;
