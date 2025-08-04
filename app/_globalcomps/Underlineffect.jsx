import React from "react";

function Underlineffect({
  Comp,
  title,
  styles = "w-full h-full",
  linecolor = "bg-[#56473e]",
}) {
  return (
    <div className={`group/underline inline-block ${styles}`}>
      <Comp
        innercomp={
          <span className="flex items-center  w-full h-full">
            <span className="relative w-fit">
              {title}
              <span
                className={`absolute bottom-0 right-0 h-px w-0  lg:group-hover/underline:left-0 lg:group-hover/underline:w-full duration-300 ${linecolor}`}
              ></span>
            </span>
          </span>
        }
      />
    </div>
  );
}
//  <Underlineffect Comp={({ innercomp }) =>}  title=""   styles="w-fit"/>

export default Underlineffect;
