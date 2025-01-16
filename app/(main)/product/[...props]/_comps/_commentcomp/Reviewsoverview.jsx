import RatingStars from "./RatingStars";
import Reviewbutton from "./Reviewbutton";

const Reviewsoverview = ({ Comments, showwritereview, setshowwritereview,token }) => {
  const starcounts = Array.from({ length: 5 }, (_, i) => i + 1).reduce(
    (acc, star) => {
      acc[star] = 0;
      return acc;
    },
    {}
  );

  // Count stars and calculate total stars
  let totalStars = 0;

  Comments.forEach(({ star }) => {
    starcounts[star]++;
    totalStars += star;
  });

  // Get total number of ratings
  const totalRatings = Comments.length;

  // Calculate percentages
  const starPercentages = Object.fromEntries(
    Object.entries(starcounts).map(([star, count]) => [
      star,
      totalRatings ? ((count / totalRatings) * 100).toFixed(2) : "0.00",
    ])
  );

  // Calculate average rating
  const averageRating = totalRatings
    ? (totalStars / totalRatings).toFixed(2)
    : "0.00";

  return (
    <div className="mt-5">
      <div className="flex items-center justify-center flex-col lg:flex-row gap-10 lg:gap-0">
        <div>
          <p className="flex items-center gap-2">
            <RatingStars rating={averageRating} />
            <span>{averageRating} out of 5</span>
          </p>
          <p className="text-center">Based on {totalRatings} reviews</p>
        </div>
        <div className="bg-slate-300 bg-opacity-50 w-px h-28 mx-10 hidden lg:block"></div>
        <div className="space-y-1">
          {Object.entries(starPercentages)
            .reverse()
            .map(([key, value], i) => {
              return (
                <div key={i} className="flex items-center justify-center gap-5">
                  <RatingStars rating={5 - i} />
                  <div className="relative h-4 w-32 bg-slate-100">
                    <div
                      className="absolute top-0 left-0 h-full bg-theme"
                      style={{ width: value + "%" }}
                    ></div>
                  </div>
                  <p className="text-sm min-w-5 opacity-65 text-center">
                    {starcounts[key]}
                  </p>
                </div>
              );
            })}
        </div>
        <div className="bg-slate-300 bg-opacity-50 w-px h-28 mx-10 hidden lg:block"></div>
        <div>
          <Reviewbutton
            showwritereview={showwritereview}
            setshowwritereview={setshowwritereview}
            token={token}
          />
        </div>
      </div>
    </div>
  );
};

export default Reviewsoverview;
