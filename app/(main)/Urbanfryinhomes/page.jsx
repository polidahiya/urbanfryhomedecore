import React from "react";
import Underlineffect from "@/app/_globalcomps/Underlineffect";
import Link from "next/link";
import Verification from "@/app/_connections/Verifytoken";
import { Inhomecontextwrapper } from "./Context";
import Inhomeform from "./_comps/Addform";
import Card from "./_comps/Card";
import Newbutton from "./_comps/Newbutton";
import { getcollection } from "@/app/_connections/Mongodb";
import { unstable_cache } from "next/cache";
import { CACHE_TIME } from "@/app/commondata";
import Fullimage from "./_comps/Fullimage";

async function page() {
  const tokenres = await Verification();

  let haveaccess = false;
  if (
    tokenres?.verified &&
    (tokenres.usertype == "admin" ||
      tokenres.permission.includes("Urbanfry_in_homes_permission"))
  ) {
    haveaccess = true;
  }

  const getposts = unstable_cache(
    async () => {
      try {
        const { inhomecollection } = await getcollection();
        const posts = await inhomecollection
          .find()
          .sort({ lastupdated: -1 })
          .toArray();
        posts.forEach((item) => (item._id = item._id.toString()));
        return posts;
      } catch (error) {
        return [];
      }
    },
    ["inhomeposts"],
    { revalidate: CACHE_TIME, tags: ["inhomeposts"] }
  );

  const posts = await getposts();

  return (
    <Inhomecontextwrapper>
      <div className="pt-12 px-5 md:px-8">
        <div className="flex items-center gap-2 text-sm">
          <Underlineffect
            Comp={({ innercomp }) => <Link href="/">{innercomp}</Link>}
            title="Home"
            styles="w-fit"
          />
          / <p className="capitalize text-theme">Urbanfry in Homes</p>
        </div>
        <div>
          <h1 className="font-tenor text-4xl md:text-6xl capitalize pt-10">
            Urbanfry in Homes
          </h1>
        </div>
        <div className="py-10 min-h-96 mt-10">
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4">
            {haveaccess && <Newbutton />}
            {posts.map((post, i) => (
              <Card key={i} haveaccess={haveaccess} post={post} />
            ))}
          </div>
          {haveaccess && <Inhomeform />}
          <Fullimage />
        </div>
      </div>
    </Inhomecontextwrapper>
  );
}

export default page;
