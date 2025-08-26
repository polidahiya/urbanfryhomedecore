import RatingStars from "./RatingStars";
import Reviewbutton from "./Reviewbutton";

const Noreviews = ({ showwritereview, setshowwritereview,token }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-5 mt-5">
      <div>
        <div className="flex justify-center md:justify-start gap-1 text-theme">
          <RatingStars rating={5} />
        </div>
        <p>Be the first to write a review</p>
      </div>
      <div className="bg-slate-300 bg-opacity-50 w-px h-10 hidden md:block"></div>
      <Reviewbutton
        showwritereview={showwritereview}
        setshowwritereview={setshowwritereview}
        token={token}
      />
    </div>
  );
};

export default Noreviews;
