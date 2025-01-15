"use client";
import React, { useState } from "react";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";

function Commentcomp() {
  const [showwritereview, setshowwritereview] = useState(false);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero to the day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero to the month (Months are 0-indexed)
    const year = date.getFullYear(); // Get the year
    return `${day}/${month}/${year}`;
  };

  // Example
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  const Comments = [
    {
      name: "test",
      comment:
        "this is a test comment this is a test comment this is a test comment",
      data: formattedDate,
      star: 3,
    },
    {
      name: "test",
      comment:
        "this is a test comment this is a test comment this is a test comment",
      data: formattedDate,
      star: 3,
    },
    {
      name: "test",
      comment:
        "this is a test comment this is a test comment this is a test comment",
      data: formattedDate,
      star: 3,
    },
    {
      name: "test",
      comment:
        "this is a test comment this is a test comment this is a test comment ",
      data: formattedDate,
      star: 2,
    },
  ];

  return (
    <div className="mt-10">
      <h2 className="text-center text-2xl font-tenor">Customer Reviews</h2>
      {Comments.length == 0 ? (
        <>
          <Noreviews
            showwritereview={showwritereview}
            setshowwritereview={setshowwritereview}
          />
          {showwritereview && (
            <Writereview setshowwritereview={setshowwritereview} />
          )}
        </>
      ) : (
        <>
          <Reviewsoverview
            Comments={Comments}
            showwritereview={showwritereview}
            setshowwritereview={setshowwritereview}
          />
          {showwritereview && (
            <Writereview setshowwritereview={setshowwritereview} />
          )}
          <Reviews Comments={Comments} />
        </>
      )}
    </div>
  );
}

const Reviewsoverview = ({ Comments, showwritereview, setshowwritereview }) => {
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
          <p>Based on {totalRatings} reviews</p>
        </div>
        <div className="bg-slate-300 bg-opacity-50 w-px h-28 mx-10 hidden lg:block"></div>
        <div className="space-y-1">
          {Object.entries(starPercentages).map(([key, value], i) => {
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
          />
        </div>
      </div>
    </div>
  );
};

const Reviews = ({ Comments }) => {
  return (
    <div className="px-2 md:px-10 mt-10">
      {Comments.map((comment, i) => {
        return (
          <div key={i} className="border-y py-8">
            <div className="flex items-center justify-between">
              <RatingStars rating={comment?.star} />
              <span className="text-sm">{comment?.data}</span>
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

const Noreviews = ({ showwritereview, setshowwritereview }) => {
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
      />
    </div>
  );
};

const Writereview = ({ setshowwritereview }) => {
  const [data, setdata] = useState({
    name: "",
    email: "",
    comment: "",
    star: 0,
  });

  const Handlesubmit = () => {};

  return (
    <div className="px-2 md:px-10 mt-10">
      <div className="max-w-2xl flex flex-col items-center mx-auto">
        <p className="text-2xl font-black">Write a review</p>
        <p className="mt-4">Rating</p>
        <StarRating data={data} setdata={setdata} />
        <input
          type="text"
          value={data?.name}
          onChange={(e) => setdata((pre) => ({ ...pre, name: e.target.value }))}
          className="w-full p-2 mt-5 outline outline-1 outline-slate-300 focus:outline-slate-600"
          placeholder="Enter Your Name."
        />
        <input
          type="text"
          value={data?.comment}
          onChange={(e) =>
            setdata((pre) => ({ ...pre, comment: e.target.value }))
          }
          className="w-full p-2 mt-5 outline outline-1 outline-slate-300 focus:outline-slate-600"
          placeholder="Enter Your Email."
        />
        <textarea
          value={data?.email}
          onChange={(e) =>
            setdata((pre) => ({ ...pre, email: e.target.value }))
          }
          className="w-full p-2 mt-5 min-h-56 outline outline-1 outline-slate-300 focus:outline-slate-600"
          placeholder="Write your comments here."
        ></textarea>
        <div className="flex items-center justify-center gap-5 mt-5 h-10">
          <button
            className="h-full px-10 border border-theme text-theme lg:hover:opacity-75"
            onClick={() => setshowwritereview(false)}
          >
            Cancle Review
          </button>
          <button
            className="h-full px-10 bg-theme text-white  lg:hover:opacity-75"
            onClick={Handlesubmit}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

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

const Reviewbutton = ({ showwritereview, setshowwritereview }) => (
  <button
    className="bg-theme text-white px-10 py-2 lg:hover:opacity-75"
    onClick={() => setshowwritereview((pre) => !pre)}
  >
    {showwritereview ? "Cancle review" : "Write a review"}
  </button>
);

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

export default Commentcomp;
