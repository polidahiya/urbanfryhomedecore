import React from "react";
import { Getservercart } from "./Serveraction";
import Cartcard from "./_comps/Cartcard";
import Filtermenu from "./_comps/Filtermenu";
import Refreshbutton from "./_comps/Refreshbutton";
import Downloadbutton from "./_comps/Downloadbutton";

export default async function page({ searchParams }) {
  const { type = "all", from, to } = await searchParams;

  const res = await Getservercart(type, from, to);
  const cartdata = res.cart || [];

  return (
    <div className="px-5 md:px-10">
      <div className="sticky top-0 py-6 z-10 border-b flex items-center justify-between bg-white">
        <h3 className="font-semibold text-2xl text-gray-800 ">
          Abandoned Carts
        </h3>
        <div className="flex gap-2 items-center">
          <Filtermenu type={type} from={from} to={to} />
          <Downloadbutton cartdata={cartdata} />
          <Refreshbutton />
        </div>
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
