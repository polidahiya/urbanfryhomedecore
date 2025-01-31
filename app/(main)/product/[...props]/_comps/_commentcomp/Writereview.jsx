import { useState } from "react";
import StarRating from "./StarRating";
import { AppContextfn } from "@/app/Context";
import addreview from "@/app/_serveractions/addreview";

const WriteReview = ({ setshowwritereview, sku, userdata }) => {
  const { setmessagefn } = AppContextfn();
  const [data, setData] = useState({
    name: "",
    email: userdata?.email,
    comment: "",
    star: 0,
    sku,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.star == 0) {
      setmessagefn("Please select a rating");
      return;
    }
    const res = await addreview(data);
    setmessagefn(res?.message);

    if (res.status == 200) {
      setshowwritereview(false);
    }
  };

  return (
    <div className="px-5 md:px-10 mt-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl flex flex-col items-center mx-auto"
      >
        <h1 className="text-2xl font-black">Write a Review</h1>

        {/* Star Rating */}
        <label htmlFor="rating" className="mt-4">
          Rating
        </label>
        <StarRating data={data} setdata={setData} />

        {/* Name Input */}
        <input
          id="name"
          type="text"
          value={data.name}
          onChange={(e) =>
            setData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full p-2 outline outline-1 outline-slate-300 focus:outline-slate-600 mt-5"
          placeholder="Enter Your Name"
          required
        />

        {/* Email Input */}
        <input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) =>
            setData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="w-full p-2 outline outline-1 outline-slate-300 focus:outline-slate-600 mt-5"
          placeholder="Enter Your Email"
          disabled
        />

        {/* Comment Textarea */}
        <textarea
          id="comment"
          value={data.comment}
          onChange={(e) =>
            setData((prev) => ({ ...prev, comment: e.target.value }))
          }
          className="w-full p-2 min-h-56 outline outline-1 outline-slate-300 focus:outline-slate-600 mt-5"
          placeholder="Write your comments here"
          required
        ></textarea>

        {/* Buttons */}
        <div className="w-full md:w-fit flex items-center flex-col-reverse md:flex-row justify-center gap-2 mt-5">
          <button
            type="button"
            className="w-full h-10 px-10 border border-theme text-theme lg:hover:opacity-75 whitespace-nowrap"
            onClick={() => setshowwritereview(false)}
          >
            Cancel Review
          </button>
          <button
            type="submit"
            className="w-full h-10 px-10 bg-theme text-white lg:hover:opacity-75 whitespace-nowrap"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteReview;
