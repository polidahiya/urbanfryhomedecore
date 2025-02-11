import Confirmdialogbox from "./_comps/Confirmdialogbox";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Adminnav from "./_comps/_adminnavbar/Adminnav";

export default async function RootLayout({ children }) {
  const allcookies = await cookies();
  const token = allcookies.get("token");

  if (!token) {
    notFound();
  }

  const parseduserdata = allcookies.get("userdata");
  const parseduserdatavalue = parseduserdata?.value;
  let userdata;
  if (parseduserdatavalue) {
    userdata = JSON.parse(parseduserdatavalue);
    if (userdata?.usertype == "admin" || userdata?.permission.length != 0) {
    } else {
      notFound();
    }
  } else {
    notFound();
  }

  return (
    <div className="flex">
      <Adminnav userdata={userdata} />
      <div className="flex-1">{children}</div>
      <Confirmdialogbox />
    </div>
  );
}
