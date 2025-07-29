import Navbar from "@/app/_globalcomps/Navbar";
import Searchbarsection from "@/app/_globalcomps/_navbarcomps/Searchbarsection";
import Footer from "@/app/_globalcomps/Footer";
import { cookies } from "next/headers";
import Sidecart from "@/app/_globalcomps/Sidecart";
import Newsletter from "@/app/_globalcomps/Newsletter/Newsletter";

export default async function RootLayout({ children }) {
  const allcookies = await cookies();
  const token = allcookies.get("token");
  const parseduserdata = allcookies.get("userdata")?.value;
  const userdata = parseduserdata ? JSON.parse(parseduserdata) : {};

  return (
    <div>
      <Navbar navtype={true} token={token} userdata={userdata} />
      <Newsletter />
      <Sidecart />
      <Searchbarsection />
      {children}
      <Footer />
    </div>
  );
}
