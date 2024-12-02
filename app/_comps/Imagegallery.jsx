import React from "react";
import Link from "next/link";

function Imagegallery() {
  const list = [
    {
      heading: "Homes of Loops",
      para: "This is a test para",
      img: "https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-33d65a4/www.decorilla.com/online-decorating/wp-content/uploads/2019/06/modern-interior-design-grey-living-room2-2048x1365.jpeg",
      link: "/",
    },
    {
      heading: "Homes of Loops",
      para: "This is a test para",
      img: "https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-33d65a4/www.decorilla.com/online-decorating/wp-content/uploads/2019/06/modern-interior-design-grey-living-room2-2048x1365.jpeg",
      link: "/",
    },
    {
      heading: "Homes of Loops",
      para: "This is a test para",
      img: "https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-33d65a4/www.decorilla.com/online-decorating/wp-content/uploads/2019/06/modern-interior-design-grey-living-room2-2048x1365.jpeg",
      link: "/",
    },
    {
      heading: "Homes of Loops",
      para: "This is a test para",
      img: "https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-33d65a4/www.decorilla.com/online-decorating/wp-content/uploads/2019/06/modern-interior-design-grey-living-room2-2048x1365.jpeg",
      link: "/",
    },
  ];
  return (
    <div className="w-full">
      <div className="w-full flex items-center overflow-y-scroll hidescroll">
        {list.map((item, i) => (
          <div key={i} className="relative  min-w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-white">
              <p className="text-[80px] font-tenor whitespace-nowrap tracking-tight">{item?.heading}</p>
              <p className="mt-4 font-normal">{item?.para}</p>
              <Link href={"/"} className="border border-white px-10 py-4 mt-6 text-sm lg:hover:text-black lg:hover:bg-white duration-300">GALLERY</Link>
            </div>
            <img src={item?.img} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Imagegallery;
