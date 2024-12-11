import React from "react";
import { cookies } from "next/headers";
import Publicpage from "./Publicpage";

async function page() {
  const allcookes = await cookies();
  const token = allcookes.get("token");
  return (
    <div>
      <Publicpage token={token} />
    </div>
  );
}

export default page;
