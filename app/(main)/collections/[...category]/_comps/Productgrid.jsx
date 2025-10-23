import React from "react";
import Productcard from "@/app/_globalcomps/_productcard/Productcard";

function Productgrid({ products }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center gap-x-2 gap-y-16 my-10">
      {products.map((product, i) => (
        <Productcard key={i} product={product} />
      ))}
    </div>
  );
}

export default Productgrid;
