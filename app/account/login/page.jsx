import React from "react";
import Publicpage from "./Publicpage";
import { cookies } from "next/headers";

async function page() {
  const allcookes = await cookies();
  const token = allcookes.get("token");

  return (
    <div>
      <Publicpage token={token}/>
    </div>
  );
}

export default page;
