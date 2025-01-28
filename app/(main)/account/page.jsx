import React from "react";
import Link from "next/link";
import Underlineeffect from "@/app/_globalcomps/Underlineeffect";
import Orderhistory from "./Comps/Orderhistory";
import Getuserorders from "@/app/_serveractions/Getuserorders";
import Userdetails from "./Comps/Userdetails";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function page() {
  const allcookies = await cookies();
  const token = allcookies.get("token");
  if (!token) redirect("/account/login");
  const parseduserdata = allcookies.get("userdata")?.value;
  const userdata = parseduserdata ? JSON.parse(parseduserdata) : {};
  //   const orders = await Getuserorders();
  const orders = {
    status: 200,
    message: "",
    orders: [
      {
        _id: "678a755b7995a12b94bec67b",
        products: [
          {
            added: true,
            dimension: "12x12x12",
            quantity: 1,
            color: 0,
            sku: "sku2",
            mrp: "1000",
            sellingprice: "500",
            productName: "test",
            image:
              "https://res.cloudinary.com/darxwlgeg/image/upload/v1736682955/Altorganizer/products/s2rnvdsh1vtzibwm08lg.jpg",
            status: 0,
          },
        ],
        totalPrice: 500,
        paymentMethod: "cod",
        username: "admin",
        email: "altorganisers@gmail.com",
        orderstage: 0,
        date: "17/01/2025",
      },
      {
        _id: "678a7d257995a12b94bec683",
        products: [
          {
            added: true,
            dimension: "12x12x12",
            quantity: 3,
            color: 0,
            sku: "sku2",
            mrp: "1000",
            sellingprice: "500",
            productName: "test",
            image:
              "https://res.cloudinary.com/darxwlgeg/image/upload/v1736682955/Altorganizer/products/s2rnvdsh1vtzibwm08lg.jpg",
            status: 0,
          },
        ],
        totalPrice: 1500,
        paymentMethod: "online",
        username: "admin",
        email: "altorganisers@gmail.com",
        orderstage: 0,
        date: "17/01/2025",
        payment: "successful",
      },
      {
        _id: "678d122f7d0a9553d38eb57e",
        products: [
          {
            added: true,
            dimension: "12x12x12",
            quantity: 3,
            color: 0,
            sku: "sku1",
            mrp: "1000",
            sellingprice: "500",
            productName: "test",
            image:
              "https://res.cloudinary.com/darxwlgeg/image/upload/v1736417845/Altorganizer/products/lmigbfl3otqcg0umim61.png",
            status: 0,
          },
          {
            added: true,
            dimension: "12x12x12",
            quantity: 5,
            color: 0,
            sku: "sku2",
            mrp: "1000",
            sellingprice: "500",
            productName: "test",
            image:
              "https://res.cloudinary.com/darxwlgeg/image/upload/v1736682955/Altorganizer/products/s2rnvdsh1vtzibwm08lg.jpg",
            status: 0,
          },
        ],
        totalPrice: 4000,
        paymentMethod: "cod",
        username: "admin",
        email: "altorganisers@gmail.com",
        orderstage: "3",
        date: "19/01/2025",
        note: "this is a test note",
      },
      {
        _id: "678f930ad7c3b96be87d169d",
        products: [
          {
            added: true,
            dimension: "12x12x12",
            quantity: 1,
            color: 0,
            sku: "sku1",
            mrp: "1000",
            sellingprice: "500",
            productName: "test",
            image:
              "https://res.cloudinary.com/darxwlgeg/image/upload/v1736417845/Altorganizer/products/lmigbfl3otqcg0umim61.png",
            status: 0,
          },
        ],
        totalPrice: 500,
        paymentMethod: "online",
        username: "admin",
        email: "altorganisers@gmail.com",
        orderstage: 0,
        date: "21/01/2025",
        payment: "successful",
      },
      {
        _id: "678f9410d7c3b96be87d169e",
        products: [
          {
            added: true,
            dimension: "12x12x12",
            quantity: 1,
            color: 0,
            sku: "sku1",
            mrp: "1000",
            sellingprice: "500",
            productName: "test",
            image:
              "https://res.cloudinary.com/darxwlgeg/image/upload/v1736417845/Altorganizer/products/lmigbfl3otqcg0umim61.png",
            status: 0,
          },
        ],
        totalPrice: 500,
        paymentMethod: "online",
        username: "admin",
        email: "altorganisers@gmail.com",
        orderstage: 0,
        date: "21/01/2025",
        payment: "successful",
      },
      {
        _id: "678f9600d7c3b96be87d169f",
        products: [
          {
            added: true,
            dimension: "12x12x12",
            quantity: 3,
            color: 0,
            sku: "sku1",
            mrp: "1000",
            sellingprice: "500",
            productName: "test",
            image:
              "https://res.cloudinary.com/darxwlgeg/image/upload/v1736417845/Altorganizer/products/lmigbfl3otqcg0umim61.png",
            status: 0,
          },
          {
            added: true,
            dimension: "12x12x12",
            quantity: 3,
            color: 0,
            sku: "sku2",
            mrp: "1000",
            sellingprice: "500",
            productName: "test",
            image:
              "https://res.cloudinary.com/darxwlgeg/image/upload/v1736682955/Altorganizer/products/s2rnvdsh1vtzibwm08lg.jpg",
            status: 0,
          },
        ],
        totalPrice: 3000,
        paymentMethod: "online",
        username: "admin",
        email: "altorganisers@gmail.com",
        orderstage: 0,
        date: "21/01/2025",
        payment: "successful",
      },
      {
        _id: "67920ca435dc3b786d02d912",
        products: [
          {
            added: true,
            dimension: "12x12x12",
            quantity: 1,
            color: 0,
            sku: "sku1",
            mrp: "1000",
            sellingprice: "500",
            productName: "test",
            image:
              "https://res.cloudinary.com/darxwlgeg/image/upload/v1736417845/Altorganizer/products/lmigbfl3otqcg0umim61.png",
            status: 0,
          },
        ],
        totalPrice: 200,
        paymentMethod: "cod",
        username: "admin",
        email: "altorganisers@gmail.com",
        orderstage: 0,
        appliedcoupon: "alt88",
        coupondata: {
          _id: "6791fb299156aa547ad25985",
          code: "alt88",
          discountType: "fixed amount",
          discountValue: "300",
          validFrom: "2025-01-23",
          validTo: "2025-01-31",
          usagetimes: "10",
          isActive: true,
        },
        date: "23/01/2025",
      },
      {
        _id: "679220df35dc3b786d02d913",
        products: [
          {
            added: true,
            dimension: "12x12x12",
            quantity: 1,
            color: 0,
            sku: "sku1",
            mrp: "1000",
            sellingprice: "500",
            productName: "test",
            image:
              "https://res.cloudinary.com/darxwlgeg/image/upload/v1736417845/Altorganizer/products/lmigbfl3otqcg0umim61.png",
            status: 0,
          },
        ],
        totalPrice: 160,
        paymentMethod: "cod",
        username: "admin",
        email: "altorganisers@gmail.com",
        orderstage: 0,
        appliedcoupon: "alt88",
        coupondata: {
          _id: "6791fb299156aa547ad25985",
          code: "alt88",
          discountType: "fixed amount",
          discountValue: "300",
          validFrom: "2025-01-23",
          validTo: "2025-01-31",
          usagetimes: "10",
          isActive: true,
        },
        date: "23/01/2025",
      },
      {
        _id: "67922fde35dc3b786d02d914",
        products: [
          {
            added: true,
            dimension: "12x12x12",
            quantity: 2,
            color: 0,
            sku: "sku1",
            mrp: "1000",
            sellingprice: "500",
            productName: "test",
            image:
              "https://res.cloudinary.com/darxwlgeg/image/upload/v1736417845/Altorganizer/products/lmigbfl3otqcg0umim61.png",
            status: 0,
          },
        ],
        totalPrice: 1000,
        paymentMethod: "cod",
        username: "admin",
        email: "altorganisers@gmail.com",
        orderstage: 0,
        appliedcoupon: null,
        coupondata: {},
        date: "23/01/2025",
      },
      {
        _id: "679232ea35dc3b786d02d915",
        products: [
          {
            added: true,
            dimension: "12x12x12",
            quantity: 1,
            color: 0,
            sku: "sku1",
            mrp: "1000",
            sellingprice: "500",
            productName: "test",
            image:
              "https://res.cloudinary.com/darxwlgeg/image/upload/v1736417845/Altorganizer/products/lmigbfl3otqcg0umim61.png",
            status: 0,
          },
        ],
        totalPrice: 200,
        paymentMethod: "cod",
        username: "admin",
        email: "altorganisers@gmail.com",
        orderstage: 0,
        appliedcoupon: "alt88",
        coupondata: {
          _id: "6791fb299156aa547ad25985",
          code: "alt88",
          discountType: "fixed amount",
          discountValue: "300",
          validFrom: "2025-01-23",
          validTo: "2025-01-31",
          usagetimes: "10",
          isActive: true,
        },
        date: "23/01/2025",
      },
      {
        _id: "6792330535dc3b786d02d916",
        products: [
          {
            added: true,
            dimension: "12x12x12",
            quantity: 1,
            color: 0,
            sku: "sku1",
            mrp: "1000",
            sellingprice: "500",
            productName: "test",
            image:
              "https://res.cloudinary.com/darxwlgeg/image/upload/v1736417845/Altorganizer/products/lmigbfl3otqcg0umim61.png",
            status: 0,
          },
        ],
        totalPrice: 200,
        paymentMethod: "cod",
        username: "admin",
        email: "altorganisers@gmail.com",
        orderstage: 0,
        appliedcoupon: "alt88",
        coupondata: {
          _id: "6791fb299156aa547ad25985",
          code: "alt88",
          discountType: "fixed amount",
          discountValue: "300",
          validFrom: "2025-01-23",
          validTo: "2025-01-31",
          usagetimes: "10",
          isActive: true,
        },
        date: "23/01/2025",
      },
      {
        _id: "67937d049e47e1d753621080",
        products: [
          {
            added: true,
            dimension: "12x12x12",
            quantity: 1,
            color: 0,
            sku: "sku1",
            mrp: "1000",
            sellingprice: "500",
            productName: "test",
            image:
              "https://res.cloudinary.com/darxwlgeg/image/upload/v1736417845/Altorganizer/products/lmigbfl3otqcg0umim61.png",
            status: 0,
          },
        ],
        totalPrice: 500,
        paymentMethod: "online",
        username: "admin",
        email: "altorganisers@gmail.com",
        orderstage: 0,
        appliedcoupon: null,
        coupondata: null,
        date: "24/01/2025",
        payment: "successful",
      },
      {
        _id: "67937d619e47e1d753621081",
        products: [
          {
            added: true,
            dimension: "12x12x12",
            quantity: 1,
            color: 0,
            sku: "sku1",
            mrp: "1000",
            sellingprice: "500",
            productName: "test",
            image:
              "https://res.cloudinary.com/darxwlgeg/image/upload/v1736417845/Altorganizer/products/lmigbfl3otqcg0umim61.png",
            status: 0,
          },
        ],
        totalPrice: 500,
        paymentMethod: "cod",
        username: "admin",
        email: "altorganisers@gmail.com",
        orderstage: 0,
        appliedcoupon: null,
        coupondata: null,
        date: "24/01/2025",
      },
    ],
  };

  return (
    <div className="pt-32 px-5 md:px-8">
      {/* navigations */}
      <div className="flex items-center gap-2 text-sm">
        <Link href={"/"} className="">
          <Underlineeffect title={"Home"} />
        </Link>{" "}
        / <p className="capitalize text-theme">Account</p>
      </div>
      <div>
        <h1 className="font-tenor text-4xl md:text-6xl capitalize pt-10">
          Welcome to Your Account
        </h1>
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-20 lg:gap-5 my-16 ">
        {/* order history */}
        <Orderhistory orders={orders?.orders} />
        {/* accoutn details */}
        <Userdetails userdata={userdata}/>
      </div>
    </div>
  );
}

export default page;
