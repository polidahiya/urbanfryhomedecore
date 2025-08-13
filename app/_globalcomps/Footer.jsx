import Link from "next/link";
import React from "react";
import Underlineffect from "./Underlineffect";
import { mobile, mail } from "../commondata";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import Quicklinks from "./_footerclientcomps/Quicklinks";
import Newslettersubscriblebutton from "./_footerclientcomps/Newslettersubscriblebutton";
import Pwaprompt from "./Pwaprompt";

function Footer() {
  const morelinks = [
    { title: "Frequently Asked Questions", link: "/FAQs" },
    { title: "Care & Maintenance", link: "/CareMaintenance" },
    { title: "Cancellation & Refund Policy", link: "/CancellationRefund" },
    { title: "Warranty Information", link: "/Warranty" },
    { title: "Shipping & Delivery Information", link: "/ShippingDelivery" },
    { title: "Collaborations & Support", link: "/" },
  ];

  return (
    <footer className=" bg-footercolor px-8 py-10">
      <div className="flex flex-col lg:flex-row  lg:gap-24">
        <div className="flex-1 flex flex-col">
          <p className="text-3xl font-tenor">Style, Delivered Peacefully.</p>
          <p className="text-sm mt-5">
            Urbanfry Homes is dedicatedly into wholesale & manufacturing of
            Solid Wood Items & now online inspiring customers through a unique
            combination of product, creativity & cultural understanding.
          </p>
          <Newslettersubscriblebutton />
        </div>
        <div className="w-full h-px bg-theme opacity-50 my-5 lg:hidden" />
        <Quicklinks />
        <div className="w-full h-px bg-theme opacity-50 my-5 lg:hidden" />
        <div className="flex-1 text-sm">
          <h3 className="mb-4 tracking-wider">More Links</h3>
          <div className="flex flex-col gap-3">
            {morelinks.map((item, i) => (
              <Underlineffect
                key={i}
                Comp={({ innercomp }) => (
                  <Link href={item?.link}>{innercomp}</Link>
                )}
                title={item?.title}
                styles="w-fit"
              />
            ))}
          </div>
          <div className="flex gap-5 text-3xl text-theme mt-10">
            <Link href={"/"}>
              <FaFacebook />
            </Link>
            <Link href={"/"}>
              <RiInstagramFill />
            </Link>
            <Pwaprompt />
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-theme opacity-50 my-10" />
      {/* bottom info */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5 lg:gap-10 mt-10 text-text">
        <Underlineffect
          Comp={({ innercomp }) => (
            <Link href={`tel:${mobile}`}>{innercomp}</Link>
          )}
          title={mobile}
          styles="w-fit"
        />
        <Underlineffect
          Comp={({ innercomp }) => (
            <Link href={`mailto:${mail}`}>{innercomp}</Link>
          )}
          title={mail}
          styles="w-fit"
        />
        <p className="lg:ml-auto">
          © Copyright, UrbanFry, {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
