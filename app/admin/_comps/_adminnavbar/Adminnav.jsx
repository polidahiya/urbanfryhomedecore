"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaDollyFlatbed } from "react-icons/fa";
import { RiBloggerFill } from "react-icons/ri";
import { IoBagAdd } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { usePathname } from "next/navigation";

function Adminnav() {
  const pathname = usePathname();
  const navLinks = [
    { href: "/admin", label: "Home", logo: <IoHome /> },
    { href: "/admin/orders", label: "Orders", logo: <FaDollyFlatbed /> },
    { href: "/admin/Blogs", label: "Blogs", logo: <RiBloggerFill /> },
    { href: "/admin/products", label: "Products", logo: <IoBagAdd /> },
    {
      href: "/admin/contactmessages",
      label: "Messages",
      logo: <AiFillMessage />,
    },
    { href: "/admin/settings", label: "Settings", logo: <IoSettingsSharp /> },
  ];
  return (
    <nav className="sticky top-0 flex flex-col h-screen p-5 w-64 z-20 bg-adminbg">
      <Link href="/" className="px-5">
        <Image src="/logo.png" alt="logo" height={40} width={150} />
      </Link>
      <div className="flex flex-col flex-1 w-full pt-5">
        {navLinks.map(({ href, label, logo }, index) => (
          <Link
            key={index}
            className={`relative w-full flex items-center gap-2 px-5 py-3 lg:hover:bg-slate-200 rounded-md ${
              index === navLinks.length - 1 && "mt-auto"
            }
            ${pathname == href && "bg-slate-200"}`}
            href={href}
          >
            {logo}
            <span className="hidden md:block">{label}</span>
            {pathname == href && (
              <span className="absolute top-1/2 left-0 h-1/2 w-1 -translate-y-1/2 rounded-r-full bg-theme"></span>
            )}
          </Link>
        ))}
        <button
          className={`relative w-full flex items-center gap-2 px-5 py-3 lg:hover:bg-slate-200 rounded-md`}
        >
          <IoLogOut />
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Adminnav;
