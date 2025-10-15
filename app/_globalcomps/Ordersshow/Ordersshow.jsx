import React from "react";
import Clientcomp from "./Clientcomp";
import { GetRecentOrders } from "./Serveraction";

async function Ordersshow() {
  const res = await GetRecentOrders();
  let orders = [];
  if (res.status == 200) orders = res?.data || [];

  return <Clientcomp orders={orders} />;
}

export default Ordersshow;
