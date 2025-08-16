import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { getcollection } from "@/app/_connections/Mongodb";
import Underlineffect from "@/app/_globalcomps/Underlineffect";
import Link from "next/link";

export default async function BlogPage({ params }) {
  const { id } = await params;

  let blogdata = {};

  try {
    const { blogscollection, ObjectId } = await getcollection();
    const blog = await blogscollection.findOne(
      { _id: new ObjectId(id) },
      { delta: 1, title: 1 }
    );
    blog._id = blog._id.toString();
    blogdata = blog;
  } catch (error) {
    console.log(error);
  }

  const converter = new QuillDeltaToHtmlConverter(blogdata?.delta, {});
  const html = converter.convert();

  return (
    <div className="pt-12 px-5 md:px-8">
      <div className="flex items-center gap-2 text-sm">
        <Underlineffect
          Comp={({ innercomp }) => <Link href="/">{innercomp}</Link>}
          title="Home"
          styles="w-fit"
        />
        /{" "}
        <Underlineffect
          Comp={({ innercomp }) => <Link href="/Blogs">{innercomp}</Link>}
          title="Blogs"
          styles="w-fit"
        />
        / <p className="capitalize text-theme">Preview</p>
      </div>
      <div>
        <h1 className="font-tenor text-4xl md:text-6xl capitalize pt-10">
          {blogdata?.title}
        </h1>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className="py-10 min-h-96 mt-10"
      />
    </div>
  );
}
