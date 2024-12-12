import React from "react";
import Sizes from "./Sizes";
import Cartbutton from "./Cartbutton";
import Descriptionitem from "./Descriptionitem";
import Sharebutton from "./Sharebutton";

function Details() {
  return (
    <div className="flex-[2] min-h-28">
      {/* name */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-tenor">Yin and Yang Rug</h1>
        {/* share buttton */}
        <Sharebutton />
      </div>
      {/* price */}
      <p className="mt-5 text-xl">
        ₹{parseInt(25000, 10).toLocaleString("en-IN")}
      </p>
      <hr className="my-5" />
      <Sizes />
      <hr className="my-5" />
      <Cartbutton />
      <div className="mt-10 border-b border-theme ">
        <Descriptionitem
          heading="Please Note"
          details="Due to light and screen differences, colors may vary slightly from the image online and the actual product"
        />
        <Descriptionitem
          heading="Description"
          details="Introducing 'Yin and Yang' – a harmonious balance captured in every loop. Hand-tufted with precision in tencle, this rug embodies the timeless duality of opposites. A serene ivory canvas is adorned with a sleek black accent stroke, symbolizing the interconnectedness of light and darkness. Elevate your space with the perfect blend of harmony and contrast, courtesy of 'Yin and Yang'."
        />
        <Descriptionitem
          heading="Care & Maintenance"
          details="At Loops by LJ, all sales are considered final. We only accept returns or exchanges if the product has a manufacturing defect that can't be fixed."
        />
        <Descriptionitem
          heading="Shipping / Delivery Timeline"
          details="Ready To Ship pieces will be delivered within 7-10 working days. Made To Order rugs take 4-5 weeks to deliver. Do ensure whether the rug is Ready To Ship or Made To Order while selecting the size variant."
        />
      </div>
    </div>
  );
}

export default Details;
