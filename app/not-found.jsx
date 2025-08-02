import React from "react";
import Navbar from "./_globalcomps/Navbar";
import { cookies } from "next/headers";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { IoMdHome } from "react-icons/io";
import Searchbarsection from "./_globalcomps/_navbarcomps/Searchbarsection";
import Sidecart from "./_globalcomps/Sidecart";
import Underlineffect from "./_globalcomps/Underlineffect";

async function notfound() {
  const allcookies = await cookies();
  const token = allcookies.get("token");
  const parseduserdata = allcookies.get("userdata")?.value;
  const userdata = parseduserdata ? JSON.parse(parseduserdata) : null;

  return (
    <div className="min-h-screen mt-36">
      <Sidecart />
      <Searchbarsection />
      <Navbar navtype={false} token={token} userdata={userdata} />
      <div className="px-8">
        {/* navigations */}
        <div className="flex items-center gap-2 text-sm">
          <Underlineffect
            Comp={({ innercomp }) => <Link href="/">{innercomp}</Link>}
            title="Home"
            styles="w-fit"
          />{" "}
          / <p className="capitalize text-theme">404 Not Found</p>
        </div>
        <h1 className="font-tenor text-3xl md:text-7xl capitalize py-6 tracking-tighter">
          404. Page not found
        </h1>
        <p className="mt-10 max-w-2xl">
          The page you were looking for could not be found. It might have been
          removed, renamed, or did not exist in the first place.
        </p>
        <Nextimage
          src="/uiimages/404.jpg"
          alt="not found image"
          height={400}
          width={400}
          className="mx-auto"
        ></Nextimage>
        <Link
          href="/"
          className="w-full max-w-xs flex items-center justify-center gap-1 px-10 py-3 bg-theme text-white mx-auto mb-10 lg:hover:opacity-75"
        >
          <IoMdHome /> <span className="text-sm">Back to home page</span>
        </Link>
      </div>
    </div>
  );
}

export default notfound;
