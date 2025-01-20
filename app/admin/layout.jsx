import Confirmdialogbox from "./_comps/Confirmdialogbox";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Adminnav from "./_comps/_adminnavbar/Adminnav";

export default async function RootLayout({ children }) {
  const allcookies = await cookies();
  const parseduserdata = allcookies.get("userdata");
  const parseduserdatavalue = parseduserdata?.value;
  if (parseduserdatavalue) {
    const userdata = JSON.parse(parseduserdatavalue);
    if (userdata?.usertype !== "admin") {
      notFound();
    }
  } else {
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
