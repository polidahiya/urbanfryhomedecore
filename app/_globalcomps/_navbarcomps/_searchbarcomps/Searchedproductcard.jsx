import { AppContextfn } from "@/app/Context";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";

const Searchedproductcard = ({ searchedproducts }) => {
  const { setshowsearchbar } = AppContextfn();

  return (
    <div>
      <div className="underline text-theme font-semibold ml-5">Products</div>
      <div className="grid grid-cols-2 gap-x-1 gap-y-5 md:flex flex-wrap md:gap-5 mt-5 ">
        {searchedproducts.map((item, i) => (
          <Link
            key={i}
            href={`/product/${item?._id}`}
            className="group w-full md:w-48 overflow-hidden"
            onClick={() => {
              setshowsearchbar(false);
            }}
          >
            <span className="block w-full aspect-square border border-slate-200 overflow-hidden">
              <Nextimage
                src={item?.variants[0]?.images[0]}
                alt={item?.productName}
                height={100}
                width={100}
                className="w-full h-full lg:group-hover:scale-110 duration-300"
              ></Nextimage>
            </span>
            <span className="block text-inherit text-sm truncate mt-2 px-1">
              {item?.productName}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Searchedproductcard;
