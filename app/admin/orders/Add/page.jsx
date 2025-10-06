import React from "react";
import Clientpage from "./Clientpage";
import { Cachedproducts } from "@/app/_connections/Getcachedata";

async function page() {
  const products = await Cachedproducts();
  return (
    <div>
      <Clientpage products={products} />
    </div>
  );
}

export default page;
