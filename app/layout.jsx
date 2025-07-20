import "./globals.css";
import { Appwrapper } from "./Context";
import Message from "./_globalcomps/Message";
import Quickview from "./_globalcomps/Quickview";
import { Cachedproducts } from "./_connections/Getcachedata";
import { cookies } from "next/headers";
import Googleanayltics from "./_connections/Googleanalytics";

export const metadata = {
  title: "AltOrganisers",
  description:
    "At Altorganisers, we are dedicated to crafting beautifully designed and functional storage solutions that bring harmony to modern Indian homes. As a homegrown brand, we blend aesthetics with utility, using eco-friendly, sustainable materials to create products that simplify and elevate everyday living. Our passion lies in helping families transform their spaces into serene, clutter-free sanctuaries, making organization effortless and stylish.",
};

export default async function RootLayout({ children }) {
  const allcookies = await cookies();
  const token = allcookies.get("token");
  const parseduserdata = allcookies.get("userdata")?.value;
  const userdata = parseduserdata ? JSON.parse(parseduserdata) : null;

  return (
    <html lang="en">
      <head>
        <Googleanayltics />
      </head>
      <Appwrapper token={token} userdata={userdata}>
        <body
          className={`antialiased themescroll lg:max-w-[1920px] mx-auto overflow-x-hidden`}
        >
          <Message />
          <Quickview />
          {children}
        </body>
      </Appwrapper>
    </html>
  );
}
