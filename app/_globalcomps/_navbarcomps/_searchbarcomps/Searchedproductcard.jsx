import { AppContextfn } from "@/app/Context";
import Link from "next/link";
import Image from "next/image";

const Searchedproductcard = ({ searchedproducts }) => {
  const { setshowsearchbar } = AppContextfn();

  return (
    <div>
      <div className="underline text-theme font-semibold ml-5">Products</div>
      <div className="grid grid-cols-2 gap-x-1 gap-y-5 md:flex flex-wrap md:gap-5 mt-5 ">
        {searchedproducts.map((item, i) => (
          <Link
            key={i}
            href={`/product/${item?.sku}`}
            className="group w-full md:w-48 overflow-hidden"
            onClick={() => {
              setshowsearchbar(false);
            }}
          >
            <span className="block w-full aspect-square border border-slate-200 overflow-hidden">
              <Image
                src={item?.variants[0]?.images[0]}
                alt={item?.productName}
                height={500}
                width={500}
                className="w-full h-full lg:group-hover:scale-110 duration-300"
              ></Image>
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
