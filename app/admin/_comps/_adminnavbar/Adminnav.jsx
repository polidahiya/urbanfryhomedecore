"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaDollyFlatbed } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { logout } from "@/app/_serveractions/signup";
import { AppContextfn } from "@/app/Context";
import { RiCoupon2Fill } from "react-icons/ri";

function Adminnav() {
  const { setmessagefn } = AppContextfn();
  const pathname = usePathname();
  const navLinks = [
    { href: "/admin", label: "Home", logo: <IoHome /> },
    { href: "/admin/orders", label: "Orders", logo: <FaDollyFlatbed /> },
    { href: "/admin/coupons", label: "Coupons", logo: <RiCoupon2Fill /> },
    { href: "/admin/products", label: "Products", logo: <IoBagAdd /> },
    {
      href: "/admin/contactmessages",
      label: "Messages",
      logo: <AiFillMessage />,
    },
    { href: "/admin/settings", label: "Settings", logo: <IoSettingsSharp /> },
  ];

  const Logoutfn = async () => {
    const res = await logout();
    setmessagefn(res?.message);
    if (res?.status == 200) {
      window.location.href = "/";
    }
  };
  return (
    <nav className="sticky top-0 w-fit flex flex-col h-screen px-1 py-5 md:p-5  md:w-64 bg-adminbg">
      <Link href="/" className="md:px-5">
        <Image
          src="/uiimages/logo.png"
          alt="logo"
          height={40}
          width={150}
          className="hidden md:inline"
        />
        <Image
          src="/minilogo.png"
          alt="logo"
          height={40}
          width={40}
          className=" md:hidden w-full aspect-square"
        />
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
          onClick={Logoutfn}
        >
          <IoLogOut />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default Adminnav;
