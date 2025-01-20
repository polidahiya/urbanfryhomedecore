import Underlineeffect from "../Underlineeffect";
import Link from "next/link";
import { logout } from "@/app/_serveractions/signup";
import { AppContextfn } from "@/app/Context";

function Accountbutton({ token, userdata }) {
  const { setmessagefn } = AppContextfn();
  const logoutfn = async () => {
    const res = await logout();
    setmessagefn(res?.message);
    if (res?.status == 200) {
      window.location.reload();
    }
  };

  return (
    <div className="relative hidden lg:block">
      <button className="underlineff peer">
        <Underlineeffect title={"ACCOUNT"} />
      </button>
      <div className="hidden peer-hover:block lg:hover:block absolute top-full left-1/2 -translate-x-1/2 w-52 pt-5">
        <div className="flex flex-col gap-3 p-5 border border-slate-300 bg-white">
          {token ? (
            <>
              <p>{userdata?.username}</p>
              <hr />
              <Link href={"/"} className="block underlineff">
                <Underlineeffect title={"MY ACCOUNT"} />
              </Link>
              {userdata?.usertype === "admin" && (
                <Link href={"/admin"} className="block underlineff">
                  <Underlineeffect title={"ADMIN DASHBOARD"} />
                </Link>
              )}

              <button
                className="block px-10 py-3 bg-theme text-white bg-opacity-70 lg:hover:bg-opacity-100 text-center duration-300"
                onClick={logoutfn}
              >
                LOG OUT
              </button>
            </>
          ) : (
            <>
              <Link
                href={"/account/login"}
                className="block px-10 py-3 bg-theme text-white bg-opacity-70 lg:hover:bg-opacity-100 text-center duration-300"
              >
                LOG IN
              </Link>
              <Link
                href={"/account/signup"}
                className="block text-theme text-sm text-center"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Accountbutton;
