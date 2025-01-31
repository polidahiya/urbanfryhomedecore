import "./globals.css";
import { Appwrapper } from "./Context";
import Message from "./_globalcomps/Message";
import Quickview from "./_globalcomps/Quickview";

export const metadata = {
  title: "AltOrganisers",
  description:
    "At Altorganisers, we are dedicated to crafting beautifully designed and functional storage solutions that bring harmony to modern Indian homes. As a homegrown brand, we blend aesthetics with utility, using eco-friendly, sustainable materials to create products that simplify and elevate everyday living. Our passion lies in helping families transform their spaces into serene, clutter-free sanctuaries, making organization effortless and stylish.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <Appwrapper>
        <body className={`antialiased themescroll max-w-[1920px] mx-auto`}>
          <Message />
          <Quickview />
          {children}
        </body>
      </Appwrapper>
    </html>
  );
}
