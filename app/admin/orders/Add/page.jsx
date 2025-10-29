import React from "react";
import Clientpage from "./Clientpage";
import { Cachedproducts } from "@/app/_connections/Getcachedata";
import { getcollection } from "@/app/_connections/Mongodb";

async function page({ searchParams }) {
  const { edit } = await searchParams;
  const products = await Cachedproducts();
  let orderdata = null;
  let orderproducts = [];

  if (edit) {
    const { orderscollection } = await getcollection();
    const orders = await orderscollection
      .find({ paymentGroupId: edit })
      .toArray();

    if (orders.length > 0) {
      // Convert product IDs to a map for faster lookup
      const productMap = new Map(products.map((p) => [p._id.toString(), p]));

      orderproducts = orders
        .map((order) => {
          const product = productMap.get(order.product?.pid);
          if (product) {
            return {
              ...product,
              selecteddata: order.product.selecteddata,
              quantity: order.product.quantity,
            };
          }
          return null;
        })
        .filter(Boolean); // remove nulls

      orderdata = {
        ...orders[0],
        _id: orders[0]?._id.toString(),
      };
      delete orderdata.product;
    }
  }

  return (
    <div>
      <Clientpage
        products={products}
        orderdata={orderdata}
        orderproducts={orderproducts}
      />
    </div>
  );
}

export default page;
