import React from "react";
import Link from "next/link";
import Underlineeffect from "@/app/_globalcomps/Underlineeffect";
import Customizationform from "../_comps/Customizationform";
import { mobile } from "@/app/commondata";

async function page({ params }) {
  const allparams = await params;

  return (
    <div className="min-h-screen mt-48">
      {/* top section */}
      <div className="px-8">
        {/* navigations */}
        <div className="flex items-center gap-2 text-sm">
          <Link href={"/"} className="underlineff">
            <Underlineeffect title={"Home"} />
          </Link>{" "}
          / <p className="capitalize text-theme">{allparams.pagename}</p>
        </div>
        <h1 className="font-tenor text-7xl capitalize py-6">
          {allparams.pagename}
        </h1>
        <div>
          <p>
            At Loops by LJ, we understand that each rug is a reflection of its
            owner&rsquo;s unique taste, style and preferences. As a result, we are
            thrilled to let you customize our products and help you add a touch
            of your identity to your spaces.
          </p>
          <p>
            Have you ever fallen for a rug only to bring it home and find it&rsquo;s
            the wrong size? With our custom rugs, that issue becomes a thing of
            the past. Customisation ensures that this accent piece fits in the
            room seamlessly. Be it a challenging space with unconventional
            dimensions or a room that doesn&rsquo;t conform to standard rug sizes, our
            custom solution caters to all these unique requirements.
          </p>
        </div>
      </div>
      {/* design section */}
      <div className="flex items-stretch mt-24">
        <img
          className="w-1/2 object-cover "
          src="https://loopsbylj.com/cdn/shop/files/IMG_3904-min.jpg?v=1721066000&width=1920"
          alt=""
        />
        <div className="w-1/2 bg-footercolor p-10 flex flex-col">
          <h2 className="mb-16">
            <strong className="text-5xl font-tenor ">Design Process</strong>
          </h2>
          <h3 className="text-lg font-bold mt-2">
            Step 1 - Selecting the Design:
          </h3>
          <p className="mb-2">
            Choose from adapting an existing Loops rug design or creating
            something entirely new. Find the perfect match for your room&rsquo;s
            theme, colors, or patterns. Once your ideal design is chosen, you&rsquo;re
            ready for the next step.
          </p>
          <h3 className="text-lg font-bold mt-2">
            Step 2 - Material and Texture Choices:
          </h3>
          <p className="mb-2">
            Material and texture is just as important as a rug&rsquo;s design. Our
            primary material is new zealand wool. You can also add touches of
            viscose or tencel to add that extra sheen to the piece. Consider
            whether you prefer cut pile or loop pile rugs. We’ll assist you with
            images to make an informed decision. Pile height is another
            consideration to make when designing a custom rug. Pile height
            refers to the length of the yarn on a rug&rsquo;s surface. Low pile rugs
            are shorter in length than high pile rugs. Low pile rugs, because of
            their shorter length, are often very durable and offer reasonably
            even wear over time. High pile rugs are softer and more fluffy, but
            are less ideal in high-traffic areas. Cuts and loops, along with
            variations in pile height, can be combined to create a uniquely
            textured rug that meets your specific needs and desires. We are
            confident that we have something to suit every taste.
          </p>

          <h3 className="text-lg font-bold mt-2">
            Step 3 - Perfecting Dimensions:
          </h3>
          <p className="mb-2">
            We tailor the dimensions to fit your space perfectly. Provide us
            with your room’s specifics, and our design team will ensure the rug
            complements your furniture and decor seamlessly. Our experts will
            guide you throughout, guaranteeing the final product fulfills your
            vision.
          </p>

          <h3 className="text-lg font-bold mt-2">Step 4 - The Shape:</h3>
          <p className="mb-2">
            At Loops we understand that a rectangular rug just won&rsquo;t fit
            everyone&rsquo;s furnishing needs. Therefore, we offer all our rugs in
            various geometric shapes as well as abstract shapes. As abstract as
            you’d want it to be. Custom rugs in unorthodox shapes are a fun way
            to tie the entire space together, just like colors and textures.
          </p>
          <Link
            href={`https://wa.me/${mobile}`}
            className="px-10 py-3 w-fit mt-auto bg-theme text-white bg-opacity-70 lg:hover:bg-opacity-100 duration-300"
          >
            WhatsApp
          </Link>
        </div>
      </div>
      {/* form section */}
      <div className="flex flex-col items-center mt-24">
        <p className="text-6xl font-tenor">Rug Customisation</p>
        <p className="text-lg max-w-[550px] text-center mt-8">
          Contact us on WhatsApp above or fill out this form for any rug
          customisation requirements.
        </p>
        {/* form */}
        <Customizationform />
      </div>
    </div>
  );
}

export default page;
