import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

const RatingStars = ({ rating }) => {
  const numberrating = Number(rating);
  const fullStars = Math.floor(numberrating);
  const halfStar = numberrating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <span className="flex items-center">
      <span className="flex">
        {fullStars > 0 &&
          [...Array(fullStars)].map((_, i) => (
            <IoMdStar key={i} className="text-xl text-theme" />
          ))}
      </span>
      {halfStar && <IoMdStarHalf className="text-xl text-theme" />}
      <span className="flex">
        {emptyStars > 0 &&
          [...Array(emptyStars)].map((_, i) => (
            <IoMdStarOutline key={i} className="text-xl text-[#d2d2d2]" />
          ))}
      </span>
    </span>
  );
};

export default RatingStars;
