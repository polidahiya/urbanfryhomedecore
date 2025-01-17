import React from "react";
import Publicpage from "./Publicpage";
import { cookies } from "next/headers";

async function page() {
  const allcookies = await cookies();
  const token = allcookies.get("token");
  const parseduserdata = allcookies.get("userdata")?.value;
  const userdata = parseduserdata ? JSON.parse(parseduserdata) : null;
  
  return (
    <div>
      <Publicpage token={token} userdata={userdata} />
    </div>
  );
}

export default page;
