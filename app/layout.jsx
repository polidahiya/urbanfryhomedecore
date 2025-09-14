import "./globals.css";
import { Appwrapper } from "./Context";
import Message from "./_globalcomps/Message";
import Quickview from "./_globalcomps/Quickview";
import { cookies } from "next/headers";
import Googleanayltics from "./_connections/Googleanalytics";
import Confirmdialogbox from "./admin/_comps/Confirmdialogbox";

export const metadata = {
  title: "AltOrganisers",
  description:
    "At Altorganisers, we are dedicated to crafting beautifully designed and functional storage solutions that bring harmony to modern Indian homes. As a homegrown brand, we blend aesthetics with utility, using eco-friendly, sustainable materials to create products that simplify and elevate everyday living. Our passion lies in helping families transform their spaces into serene, clutter-free sanctuaries, making organization effortless and stylish.",
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
