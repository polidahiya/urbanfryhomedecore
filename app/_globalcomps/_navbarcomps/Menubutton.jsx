import { IoMenuOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import scrollable from "../_helperfunctions/Scrollable";

const Menubutton = ({ sidemenutoggle, setsidemenutoggle }) => (
  <button
    className="relative h-full w-5 text-2xl mr-5 lg:hidden"
    onClick={() => {
      setsidemenutoggle((pre) => !pre);
      if (sidemenutoggle) {
        scrollable();
      } else {
        document.body.classList.add(
          "overflow-hidden",
          "h-screen",
          "lg:overflow-auto"
        );
      }
    }}
  >
    <IoMenuOutline
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 ${
        sidemenutoggle ? "opacity-0 rotate-180" : "opacity-100 delay-300"
      }`}
    />
    <RxCross1
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 ${
        sidemenutoggle ? "opacity-100 delay-300" : "opacity-0 -rotate-180"
      }`}
    />
  </button>
);

export default Menubutton;