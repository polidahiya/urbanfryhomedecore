import { MdAccountCircle } from "react-icons/md";
import RatingStars from "./RatingStars";
import formatDate from "@/app/_globalcomps/_helperfunctions/formateddate";

const Reviews = ({ Comments }) => {
  return (
    <div className="px-5 md:px-10 mt-10">
      {Comments.map((comment, i) => {
        return (
          <div key={i} className="border-y py-8">
            <div className="flex items-center justify-between">
              <RatingStars rating={comment?.star} />
              <span className="text-sm">{formatDate(comment?.date)}</span>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <MdAccountCircle className="text-xl" /> {comment?.name}
            </div>
            <div>{comment?.comment}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
