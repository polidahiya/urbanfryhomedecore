"use client";
import React from "react";

function page() {
  return (
    <div>
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-72 aspect-[4/1] rounded-[100%]  bg-black bg-opacity-20 blur-xl "></div>
    </div>
  );
}

export default page;

// import { getadminorders } from "../_serveractions/Adminorders";
// import Selectordertype from "./_comps/Selectordertype";
// import Ordercard from "./_comps/_orderscard/Ordercard";
// import Productnotfound from "../_components/Productnotfound";
// import { revalidatePath } from "next/cache";
// import Searchbox from "./_comps/Searchbox";
// import Link from "next/link";

// export default async function Adminhome({ searchParams }) {
//   // refresh orders
//   const Refreshorders = async (link) => {
//     "use server";
//     revalidatePath(link);
//   };

//   const ordertype = Number(searchParams?.order) || 0;
//   const pagenumber = Number(searchParams?.page) || 1;
//   const searchterm = searchParams?.search;
//   const searchfilter = Number(searchParams?.filter) || 0;
//   const numberoforders = 20;
//   const ordersres = await getadminorders(
//     ordertype,
//     pagenumber,
//     numberoforders,
//     searchterm,
//     searchfilter
//   );

//   if (ordersres.status != 200) {
//     return (
//       <>
//         <div className="sticky top-[50px] bg-white py-[5px] px-2 md:px-[40px]  shadow-md z-30">
//           <Selectordertype
//             ordertype={ordertype}
//             Refreshorders={Refreshorders}
//           />
//           <Searchbox />
//         </div>
//         <div className="h-screen w-full flex items-center justify-center text-red-500">
//           {ordersres.message}
//         </div>
//       </>
//     );
//   }

//   const orders = ordersres?.result || [];
//   const pages = new Array(
//     Math.ceil(ordersres?.totalposts / numberoforders)
//   ).fill(null);

//   return (
//     <div>
//       <div className="sticky top-[50px] bg-white py-[5px] px-2 md:px-[40px]  shadow-md z-30">
//         <Selectordertype ordertype={ordertype} Refreshorders={Refreshorders} />
//         <Searchbox />
//       </div>
//       {orders.length == 0 && <Productnotfound />}
//       <div className={`p-[20px]`}>
//         {orders.map((item, i) => {
//           return (
//             <Ordercard
//               key={new Date().getMilliseconds() + Math.random() + i}
//               item={item}
//             />
//           );
//         })}
//       </div>
//       {/* pagenation */}
//       <div className="flex items-center justify-center my-5">
//         {pages.map((_, i) => {
//           return (
//             <Link
//               key={i}
//               href={`/admin?order=${ordertype}&page=${i + 1}`}
//               className={`border border-slate-300 px-3 py-1 text-sm  first:rounded-l-xl last:rounded-r-xl ${
//                 i == pagenumber - 1 && "bg-theme text-white"
//               }`}
//             >
//               {i + 1}
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
