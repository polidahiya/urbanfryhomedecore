import React from "react";
import Publicpage from "./Publicpage";
import { cookies } from "next/headers";

async function page() {
  const allcookes = await cookies();

  return (
    <div>
      <Publicpage />
    </div>
  );
}

export default page;
