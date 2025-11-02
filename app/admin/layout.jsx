import { notFound } from "next/navigation";
import Adminnav from "./_comps/_adminnavbar/Adminnav";
import Verification from "../_connections/Verifytoken";
import { permissions } from "../commondata";

export default async function RootLayout({ children }) {
  const tokenres = await Verification(permissions);
  if (!tokenres?.verified) notFound();
  if (
    !tokenres ||
    (tokenres.usertype != "admin" && tokenres.permission.length == 0)
  ) {
    notFound();
  }

  return (
    <div className="flex">
      <Adminnav userdata={tokenres} />
      <div className="flex-1 w-[calc(100%-56px)] md:w-[calc(100%-256px)]">{children}</div>
    </div>
  );
}
