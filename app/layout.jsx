import "./globals.css";
import { Appwrapper } from "./Context";
import Message from "./_globalcomps/Message";
import Quickview from "./_globalcomps/Quickview";
import { cookies } from "next/headers";
import Googleanayltics from "./_connections/Googleanalytics";
import Confirmdialogbox from "./admin/_comps/Confirmdialogbox";
import Metapixels from "./_connections/Metapixels";

export const metadata = {
  title: "Urbanfry Homes",
  description:
    "At Urbanfry Homes, we believe furniture is more than function—it’s a story of style, craft, and the warmth of a home well-lived. Born from a passion to bring timeless design and everyday utility together, we specialize in premium solid wood furniture that celebrates both durability and beauty.",
  manifest: "/manifest.json",
};

export default async function RootLayout({ children }) {
  const allcookies = await cookies();
  const token = allcookies.get("token");
  const parseduserdata = allcookies.get("userdata")?.value;
  const userdata = parseduserdata ? JSON.parse(parseduserdata) : null;
  const cookiecart = allcookies.get("cart")?.value;
  const parsedCart = cookiecart ? JSON.parse(cookiecart) : {};

  // return (
  //   <html>
  //     <head></head>
  //     <body>
  //       <p className="text-red-500">server error!</p>
  //     </body>
  //   </html>
  // );

  return (
    <html lang="en">
      <head>
        <Googleanayltics />
        <Metapixels />
      </head>
      <Appwrapper token={token} userdata={userdata} parsedCart={parsedCart}>
        <body
          className={`antialiased themescroll lg:max-w-[1920px] mx-auto overflow-x-hidden`}
        >
          <Message />
          <Quickview />
          {children}
          <Confirmdialogbox />
        </body>
      </Appwrapper>
    </html>
  );
}
