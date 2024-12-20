import React from "react";
import { cookies } from "next/headers";
import Publicpage from "./Publicpage";

async function page() {
  const allcookes = await cookies();
  return (
    <div>
      <Publicpage />
    </div>
  );
}

export default page;
