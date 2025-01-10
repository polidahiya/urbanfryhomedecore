import React from "react";
import { FaStar } from "react-icons/fa";

function Customerreviews() {
  const comments = [
    {
      name: "Michael Brown",
      image:
        "https://cdn.shopify.com/s/files/1/0833/1578/6030/files/LushwithmossRugImg1_140x140.jpg?v=1698239456",
      stars: 5,
      comment: "Fast delivery and excellent quality. Highly recommend!",
    },
    {
      name: "Sarah Connor",
      image:
        "https://cdn.shopify.com/s/files/1/0833/1578/6030/files/LushwithmossRugImg1_140x140.jpg?v=1698239456",
      stars: 5,
      comment: "Loved the product! Will definitely recommend to friends.",
    },
    {
      name: "Chris Evans",
      image:
        "https://cdn.shopify.com/s/files/1/0833/1578/6030/files/LushwithmossRugImg1_140x140.jpg?v=1698239456",
      stars: 4,
      comment: "Good value for the price. Overall a great experience.",
    },
    {
      name: "Michael Brown",
      image:
        "https://cdn.shopify.com/s/files/1/0833/1578/6030/files/LushwithmossRugImg1_140x140.jpg?v=1698239456",
      stars: 5,
      comment: "Fast delivery and excellent quality. Highly recommend!",
    },
    {
      name: "Sarah Connor",
      image:
        "https://cdn.shopify.com/s/files/1/0833/1578/6030/files/LushwithmossRugImg1_140x140.jpg?v=1698239456",
      stars: 5,
      comment: "Loved the product! Will definitely recommend to friends.",
    },
    {
      name: "Chris Evans",
      image:
        "https://cdn.shopify.com/s/files/1/0833/1578/6030/files/LushwithmossRugImg1_140x140.jpg?v=1698239456",
      stars: 4,
      comment: "Good value for the price. Overall a great experience.",
    },
    {
      name: "Michael Brown",
      image:
        "https://cdn.shopify.com/s/files/1/0833/1578/6030/files/LushwithmossRugImg1_140x140.jpg?v=1698239456",
      stars: 5,
      comment: "Fast delivery and excellent quality. Highly recommend!",
    },
    {
      name: "Sarah Connor",
      image:
        "https://cdn.shopify.com/s/files/1/0833/1578/6030/files/LushwithmossRugImg1_140x140.jpg?v=1698239456",
      stars: 5,
      comment: "Loved the product! Will definitely recommend to friends.",
    },
    {
      name: "Chris Evans",
      image:
        "https://cdn.shopify.com/s/files/1/0833/1578/6030/files/LushwithmossRugImg1_140x140.jpg?v=1698239456",
      stars: 4,
      comment: "Good value for the price. Overall a great experience.",
    },
    {
      name: "Michael Brown",
      image:
        "https://cdn.shopify.com/s/files/1/0833/1578/6030/files/LushwithmossRugImg1_140x140.jpg?v=1698239456",
      stars: 5,
      comment: "Fast delivery and excellent quality. Highly recommend!",
    },
    {
      name: "Sarah Connor",
      image:
        "https://cdn.shopify.com/s/files/1/0833/1578/6030/files/LushwithmossRugImg1_140x140.jpg?v=1698239456",
      stars: 5,
      comment: "Loved the product! Will definitely recommend to friends.",
    },
    {
      name: "Chris Evans",
      image:
        "https://cdn.shopify.com/s/files/1/0833/1578/6030/files/LushwithmossRugImg1_140x140.jpg?v=1698239456",
      stars: 4,
      comment: "Good value for the price. Overall a great experience.",
    },
  ];
  return (
    <div className="my-12">
      <h2 className="text-4xl md:text-6xl font-tenor text-center">
        Let customers speak for us
      </h2>
      {/* <p className="flex items-center justify-center mt-10">
        <Fivestar stars={5} />
      </p>
      <p className="text-center">From 50 reviews</p> */}

      {/* reviews */}
      <div className="my-8 max-w-[800px] mx-auto">
        <div className="flex items-stretch gap-5 overflow-x-scroll hidescroll snap-x snap-mandatory">
          {comments.map((comment, i) => {
            return <Commentcomp key={i} comment={comment} />;
          })}
        </div>
      </div>
    </div>
  );
}

const Commentcomp = ({ comment }) => {
  return (
    <div className="flex-1 min-w-full md:min-w-fit flex flex-col items-center gap-2 snap-center">
      <Fivestar stars={comment?.stars} />
      <p className="text-center">{comment?.comment}</p>
      <p className="text-theme mt-auto">{comment?.name}</p>
      <img
        className="w-14 aspect-square object-cover"
        src={comment?.image}
        alt={comment?.name + "'s commentimage"}
      />
    </div>
  );
};

const Fivestar = ({ stars }) => (
  <span className="flex items-center gap-1 text-theme">
    {new Array(stars).fill(null).map((item, i) => (
      <FaStar key={i} />
    ))}
  </span>
);

export default Customerreviews;
