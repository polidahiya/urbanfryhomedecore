"use client";
import React from "react";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";
import {
  FaDollyFlatbed,
  FaUsers,
} from "react-icons/fa";
import {
  IoBagAdd,
  IoCart,
  IoSettingsSharp,
  IoHome,
  IoLogOut,
} from "react-icons/io5";
import { RiCoupon2Fill } from "react-icons/ri";
import { MdRateReview } from "react-icons/md";
import { usePathname } from "next/navigation";
import { logout } from "@/app/_serveractions/signup";
import { AppContextfn } from "@/app/Context";

function Adminnav({ userdata }) {
  const { setmessagefn } = AppContextfn();
  const pathname = usePathname();
  const userpermissions = userdata?.permission;

  const navLinks = [
    { href: "/admin", label: "Home", logo: <IoHome />, isaccessible: true },
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
      href: "/admin/abandonedcart",
      label: "Cart Data",
      logo: <IoCart />,
      isaccessible:
        userdata?.usertype == "admin"
          ? true
          : userpermissions?.includes("Seo_permission"),
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
    if (res?.status == 200) window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 flex flex-col h-screen w-16 md:w-64 md:min-w-64 border-r border-gray-200 transition-all">
      {/* Logo */}
      <Link
        href="/"
        className="w-full flex items-center justify-center md:justify-center md:px-5 py-4 border-b border-gray-200"
      >
        <Nextimage
          src="/uiimages/logo.png"
          alt="logo"
          className="w-10 md:w-16 aspect-square object-contain"
          width={100}
          height={100}
          quality={100}
        />
      </Link>

      {/* Nav Links */}
      <div className="flex flex-col flex-1 overflow-y-auto py-5 px-1 md:px-3 space-y-1">
        {navLinks.map(({ href, label, logo, isaccessible }, index) =>
          isaccessible ? (
            <Link
              key={index}
              href={href}
              className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium overflow-hidden transition-all duration-200
                ${
                  pathname === href
                    ? "bg-gray-100 text-theme"
                    : "hover:bg-gray-100"
                }`}
            >
              <span className="text-lg">{logo}</span>
              <span className="hidden md:block">{label}</span>
              {pathname === href && (
                <span className="absolute left-0 h-2/3 w-1 bg-theme rounded-r-lg"></span>
              )}
            </Link>
          ) : null
        )}
      </div>

      {/* Logout */}
      <button
        onClick={Logoutfn}
        className="flex items-center gap-3 px-4 py-3 mx-2 mb-3 rounded-xl font-medium text-gray-700 hover:text-white hover:bg-theme transition-all duration-200"
      >
        <IoLogOut className="text-lg" />
        <span className="hidden md:block">Logout</span>
      </button>
    </nav>
  );
}

export default Adminnav;
