"use client";
import { RxCross1 } from "react-icons/rx";
import { AppContextfn } from "@/app/Context";
import Searchbox from "./_searchbarcomps/Searchbox";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { motion, AnimatePresence } from "framer-motion";

function Searchbarsection() {
  const { showsearchbar, setshowsearchbar } = AppContextfn();

  return (
    <AnimatePresence>
      {showsearchbar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-1/2 -translate-x-1/2 lg:max-w-[1920px] h-[100dvh]  bg-white  w-full z-30 px-5 md:px-10"
        >
          {/* nav */}
          <div
            className={`w-full flex items-center justify-between  h-20 text-inherit text-xs`}
          >
            <Nextimage
              src="/uiimages/logo.png"
              alt="logo"
              className="w-16 aspect-square mr-2 scale-125"
              width={200}
              height={200}
              quality={100}
            />
            <button
              className="group h-full"
              onClick={() => setshowsearchbar(false)}
            >
              <RxCross1 className="text-2xl lg:group-hover:rotate-90 duration-300" />
            </button>
          </div>
          {/* searchbox */}
          <Searchbox autoFocus={true} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Searchbarsection;
