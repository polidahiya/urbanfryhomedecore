"use client";
import React from "react";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";
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
import { FaUsers } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";

function Adminnav({ userdata }) {
  const { setmessagefn } = AppContextfn();
  const pathname = usePathname();
  const userpermissions = userdata?.permission;
  const navLinks = [
    {
      href: "/admin",
      label: "Home",
      logo: <IoHome />,
      isaccessible: true,
    },
    {
      href: "/admin/orders",
      label: "Orders",
      logo: <FaDollyFlatbed />,
      isaccessible:
        userdata?.usertype == "admin"
          ? true
          : userpermissions?.includes("Order_permission"),
    },
    {
      href: "/admin/coupons",
      label: "Coupons",
      logo: <RiCoupon2Fill />,
      isaccessible:
        userdata?.usertype == "admin"
          ? true
          : userpermissions?.includes("Coupons_permission"),
    },
    {
      href: "/admin/products",
      label: "Products",
      logo: <IoBagAdd />,
      isaccessible:
        userdata?.usertype == "admin"
          ? true
          : userpermissions?.includes("Products_permission"),
    },
    {
      href: "/admin/users",
      label: "Users",
      logo: <FaUsers />,
      isaccessible:
        userdata?.usertype == "admin"
          ? true
          : userpermissions?.includes("Users_permission"),
    },
    {
      href: "/admin/customerreviews",
      label: "Reviews",
      logo: <MdRateReview />,
      isaccessible: userdata?.usertype == "admin" ? true : false,
    },
    {
      href: "/admin/settings",
      label: "Settings",
      logo: <IoSettingsSharp />,
      isaccessible: true,
    },
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
      <Link href="/" className="md:px-5 flex items-center justify-center">
        <Nextimage
          src="/uiimages/logo.png"
          alt="logo"
          className="w-16 aspect-square mr-2"
          width={200}
          height={200}
          quality={100}
        />
      </Link>
      <div className="flex flex-col flex-1 w-full pt-5">
        {navLinks.map(({ href, label, logo, isaccessible }, index) => (
          <Link
            key={index}
            className={`relative w-full flex items-center gap-2 px-5 py-3 lg:hover:bg-slate-200 rounded-md ${
              index === navLinks.length - 1 && "mt-auto"
            } ${pathname == href && "bg-slate-200"}
            ${isaccessible ? "" : "hidden"}`}
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
