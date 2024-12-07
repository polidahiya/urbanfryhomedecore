import Underlineeffect from "../Underlineeffect";
import Link from "next/link";

function Accountbutton() {
  return (
    <div className="relative hidden lg:block">
      <button className="underlineff peer">
        <Underlineeffect title={"ACCOUNT"} />
      </button>
      <div className="hidden peer-hover:block lg:hover:block absolute top-full left-1/2 -translate-x-1/2 w-52 pt-5">
        <div className=" p-5 border border-slate-300 bg-white">
          <Link
            href={"/"}
            className="block px-10 py-3 bg-theme text-white bg-opacity-70 lg:hover:bg-opacity-100 text-center duration-300"
          >
            LOG IN
          </Link>
          <Link
            href={"/"}
            className="block text-theme text-sm mt-2 text-center"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Accountbutton;
