import React from "react";
import Pagesdata from "./Pagesdata";
import Underlineffect from "@/app/_globalcomps/Underlineffect";
import Link from "next/link";
import { notFound } from "next/navigation";

async function page({ params }) {
  const { pagename } = await params;
  if (!Pagesdata[pagename]) notFound();
  return (
    <div className="pt-32 px-5 md:px-8">
      <div className="flex items-center gap-2 text-sm">
        <Underlineffect
          Comp={({ innercomp }) => <Link href="/">{innercomp}</Link>}
          title="Home"
          styles="w-fit"
        />
        /{" "}
        <p className="capitalize text-theme">
          {Pagesdata[pagename]?.pagetitle}
        </p>
      </div>
      <div>
        <h1 className="font-tenor text-4xl md:text-6xl capitalize pt-10">
          {Pagesdata[pagename]?.pagetitle}
        </h1>
      </div>
      <div className="text py-10">{Pagesdata[pagename]?.content}</div>
    </div>
  );
}

export default page;
