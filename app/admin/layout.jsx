import Confirmdialogbox from "./_comps/Confirmdialogbox";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Adminnav from "./_comps/_adminnavbar/Adminnav";

export default async function RootLayout({ children }) {
  try {
    const allcookies = await cookies();
    const parseduserdata = allcookies.get("userdata").value;
    const userdata = JSON.parse(parseduserdata);

    if (userdata?.usertype !== "admin") {
      notFound();
    }
  } catch (error) {
    notFound();
  }

  return (
    <div className="flex">
      <Adminnav />
      <div className="flex-1">{children}</div>
      <Confirmdialogbox />
    </div>
  );
}
