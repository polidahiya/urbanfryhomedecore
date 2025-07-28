"use client";
import React, { useState } from "react";
import Showproducts from "./_comps/_showproduct/Showproducts";
import Importexportmenu from "./_comps/Importexportmenu";

function Page() {
  const [showimportmenu, setshowimportmenu] = useState(false);

  return (
    <div>
      <Showproducts setshowimportmenu={setshowimportmenu} />
      {showimportmenu && (
        <Importexportmenu setshowimportmenu={setshowimportmenu} />
      )}
    </div>
  );
}

export default Page;
