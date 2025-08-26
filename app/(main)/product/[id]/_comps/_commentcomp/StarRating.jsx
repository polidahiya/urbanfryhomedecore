import { useState } from "react";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";

const StarRating = ({ data, setdata }) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(0)}
          onClick={() => setdata((pre) => ({ ...pre, star: star }))}
          className="cursor-pointer text-3xl"
        >
          {star <= (hoveredStar || data.star) ? (
            <IoMdStar className="text-theme " />
          ) : (
            <IoMdStarOutline className="text-gray-400" />
          )}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
