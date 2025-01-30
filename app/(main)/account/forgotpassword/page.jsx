import React from "react";
import Publicpage from "./Publicpage";

async function page({ searchParams }) {
  const allsearchParams = await searchParams;

  return (
    <div>
      <Publicpage user={allsearchParams?.user || null} />
    </div>
  );
}

export default page;
