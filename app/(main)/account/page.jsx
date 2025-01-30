import React from "react";
import Link from "next/link";
import Underlineeffect from "@/app/_globalcomps/Underlineeffect";
import Orderhistory from "./Comps/Orderhistory";
import Getuserorders from "@/app/_serveractions/Getuserorders";
import Userdetails from "./Comps/Userdetails";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function page() {
  const allcookies = await cookies();
  const token = allcookies.get("token");
  if (!token) redirect("/account/login");
  const parseduserdata = allcookies.get("userdata")?.value;
  const userdata = parseduserdata ? JSON.parse(parseduserdata) : {};
  const orders = await Getuserorders();

  return (
    <div className="pt-32 px-5 md:px-8">
      {/* navigations */}
      <div className="flex items-center gap-2 text-sm">
        <Link href={"/"} className="">
          <Underlineeffect title={"Home"} />
        </Link>{" "}
        / <p className="capitalize text-theme">Account</p>
      </div>
      <div>
        <h1 className="font-tenor text-4xl md:text-6xl capitalize pt-10">
          Welcome to Your Account
        </h1>
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-20 lg:gap-5 my-16 ">
        {/* order history */}
        <Orderhistory orders={orders?.orders} />
        {/* accoutn details */}
        <Userdetails userdata={userdata} />
      </div>
    </div>
  );
}

export default page;
