import Navbar from "@/app/_globalcomps/Navbar";
import Searchbarsection from "@/app/_globalcomps/_navbarcomps/Searchbarsection";
import { cookies } from "next/headers";
import Footer from "../_globalcomps/Footer";
import Sidecart from "../_globalcomps/Sidecart";
import Newsletter from "../_globalcomps/Newsletter/Newsletter";
import Fixedbuttons from "../_globalcomps/Fixedbuttons";

export default async function RootLayout({ children }) {
  const allcookies = await cookies();
  const token = allcookies.get("token");
  const parseduserdata = allcookies.get("userdata")?.value;
  const userdata = parseduserdata ? JSON.parse(parseduserdata) : {};

  return (
    <>
      <Navbar navtype={false} token={token} userdata={userdata} />
      <Newsletter />
      <Fixedbuttons />
      <Sidecart />
      <Searchbarsection />
      {children}
      <Footer />
    </>
  );
}
