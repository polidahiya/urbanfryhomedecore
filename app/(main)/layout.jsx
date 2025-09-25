import Navbar from "@/app/_globalcomps/Navbar";
import { cookies } from "next/headers";
import Sidecart from "../_globalcomps/Sidecart";
import Newsletter from "../_globalcomps/Newsletter/Newsletter";
import Fixedbuttons from "../_globalcomps/Fixedbuttons";
import dynamic from "next/dynamic";
const Searchbarsection = dynamic(() =>
  import("../_globalcomps/_navbarcomps/Searchbarsection")
);
const Footer = dynamic(() => import("../_globalcomps/Footer"));

export default async function RootLayout({ children }) {
  const allcookies = await cookies();
  const token = allcookies.get("token");
  const parseduserdata = allcookies.get("userdata")?.value;
  const userdata = parseduserdata ? JSON.parse(parseduserdata) : {};

  return (
    <>
      <Navbar token={token} userdata={userdata} />
      <Newsletter />
      <Fixedbuttons />
      <Sidecart />
      <Searchbarsection />
      {children}
      <Footer />
    </>
  );
}
