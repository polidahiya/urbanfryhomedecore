import Navbar from "@/app/_globalcomps/Navbar";
import Searchbarsection from "@/app/_globalcomps/_navbarcomps/Searchbarsection";
import { cookies } from "next/headers";
import Footer from "../_globalcomps/Footer";
import Sidecart from "../_globalcomps/Sidecart";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const allcookies = await cookies();
  const token = allcookies.get("token");
  const parseduserdata = allcookies.get("userdata")?.value;
  const userdata = parseduserdata ? JSON.parse(parseduserdata) : {};

  return (
    <>
      <Navbar navtype={false} token={token} userdata={userdata} />
      <Sidecart />
      <Searchbarsection />
      {children}
      <Footer />
    </>
  );
}
