import React from "react";
import { Getservercart } from "./Serveraction";
import Cartcard from "./_comps/Cartcard";

async function page() {
  const res = await Getservercart();
  const cartdata = res.cart || [];

  return (
    <div className="px-5 md:px-10">
      <div className="sticky top-0 py-6 z-10 border-b ">
        <h3 className="font-semibold text-2xl text-gray-800 ">
          Abandoned Carts
        </h3>
      </div>

      <div className="space-y-6 mt-6">
        {cartdata.length === 0 ? (
          <div className="text-gray-500 text-center py-10 border border-dashed rounded-lg">
            No abandoned carts found
          </div>
        ) : (
          cartdata.map((cart, i) => <Cartcard key={i} cart={cart} />)
        )}
      </div>
    </div>
  );
}

export default page;
