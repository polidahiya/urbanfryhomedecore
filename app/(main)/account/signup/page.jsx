import React from "react";
import { cookies } from "next/headers";
import Publicpage from "./Publicpage";
import { redirect } from "next/navigation";

async function page() {
  const allcookies = await cookies();
  const token = allcookies.get("token");
  if (token) {
    redirect("/");
  }
  return (
    <div>
      <Publicpage />
    </div>
  );
}

export default page;
