"use client";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import RatingStars from "../(main)/product/[id]/_comps/_commentcomp/RatingStars";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";

const Reviewlist = [
  {
    star: 5,
    name: "Aakash Kannauijiya",
    comment:
      "I recently purchased a bed from Urbanfry Homes and I'm extremely happy with the quality. It's a heavy, sturdy piece with excellent finishing, exactly as shown. The craftsmanship is top-notch and it adds a great touch to my bedroom. Highly recommend them for premium-quality furniture!",
  },
  {
    star: 5,
    name: "Sonia Rao",
    comment:
      "Fabulous work by the team at Urbanfry. I've been their customer for over 5 years and i don't have to look beyond for any design I need. Ability to customise, understand my design language and workmanship is phenomenal. A very genuine and value for money option for furniture",
  },
  {
    star: 5,
    name: "Karan Sharma",
    comment:
      "Had purchased a TV unit from then quite a few years ago which is still In use. So when requirement for a dining table popped up, we contacted them and got a wide catalog to select from. Finally chose a 4 seater which was priced reasonably. The Delivery was super quick, considering we live quite far from warehouse. The payment was done only after the furniture was delivered and assembled, which shows their trust in customer's. The dining table is built pretty neatly with no rough edges. Polish is top notch and we are loving it. Will definitely buy again.",
  },
  {
    star: 5,
    name: "Sukrit Gupta",
    comment:
      "Really happy with the furniture. Made my house look homely! Had a lot variety to select from with customisation options available. The solid wood quality is really good and the overall finishing has come out really well! Thanks Apoorv",
  },
  {
    star: 5,
    name: "Dharam",
    comment:
      "I recently purchased beds from Urbanfry Homes and I'm extremely happy with the product quality and delivery experience. The beds are sturdy, stylish, and exactly as shown. Delivery was smooth and on time. Highly recommend Urbanfry for anyone looking for quality furniture",
  },
  {
    star: 5,
    name: "Crunch Works",
    comment:
      "Very happy to share a review for the recently purchased furniture items from Urbanfry homes. Quality – product quality has been really good as this is my 3rd order to them and all items that I’ve purchased have strong wood material like Sheesham or Acacia wood. No compromise with quality is the reason for repetitive orders.Variety – I visited their workshop in Sector 59 and was amazed to see variety and stock for good range of furniture items...",
  },
  {
    star: 5,
    name: "Gaurav Kapil",
    comment:
      "Hi Apoorv, I did not get a chance to tell you that I had a really good experience buying furniture from UrbanFry. Especially the after sales services are fantastic. I wish you Best of Luck for future. 👍 …",
  },
  {
    star: 5,
    name: "Priya Nayak",
    comment:
      "Fabulous furniture pieces customised/designed and manufactured as per taste for my living room . They look amazing in the whole setup of things. Have been their customer for 3 years now and have been an absolute fan. Kudos and great job. Thank you Apoorv and team 😊",
  },
  {
    star: 5,
    name: "Vaibhav Malhotra",
    comment:
      "Excellent Craftsmanship and Service!, I recently had a TV cabinet made by Urban Fry homes, and I couldn’t be happier with the result. From start to finish, their team was professional, attentive to my needs, and delivered a high-quality product that exceeded my expectations. Thorough professionalism displayed by all including Apoorva.Highly recommended for anyone looking for custom furniture!",
  },
  {
    star: 5,
    name: "Harshali Singh",
    comment:
      "The new house became a home because of the wonderful pieces- Beds, side tables, console table and storage unit that I picked up from Urbanfry. Affordable prices and varied options helped me pick up the pieces that I needed. The finish and attention to detail is on point. The furniture is sent and assembled  with utmost care and keeping time constrains in mind. Looking forward to setting up the study now.",
  },
  {
    star: 5,
    name: "Tahini Sharma",
    comment:
      "Have been shopping from Urbanfry for last 5 years now. I have multiple furniture items that I got from them. Unique pieces at best prices. This time around I ordered a dining table set along with minimalist design cabinet customised to the size for the area, apoorv was nice to do it once and somehow there were some issues in the chairs and bench sent which when raised, apoorv replaced the whole set without any hassle. He gave me multiple options to choose from and delivered it without any hassle.",
  },
  {
    star: 5,
    name: "Gaurav Chopra",
    comment:
      "We have been visiting UrbanFry Homes warehouse ever since we moved to Gurugram recently and have bought furniture multiple times. Finishing and quality is quite good, they have wide variety and reasonably priced. Apoorv explains everything very well, the team is helpful and deliver on time. Best wishes to team UrbanFry Homes",
  },
  {
    star: 5,
    name: "Edubilli Tharik",
    comment:
      "I purchased bed & dining table from UrbanFry Homes. The products are very durable & strong with very attractive design. I strongly recommend them for people's looking for natural wooden designs at affordable price around NCR.",
  },
  {
    star: 5,
    name: "MEJAR SINGH Maan",
    comment:
      "I bought this beautiful peice and I am very happy with it, secondly and very importantly it was delivered before time, Thanks Ruchi.",
  },
];

function Customerreviews({}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <div className="my-16 relative max-w-4xl mx-auto w-full px-4">
      {/* Heading */}
      <h2 className="text-4xl md:text-6xl font-tenor text-center">
        Let customers speak for us
      </h2>

      {/* Reviews */}
      <div className="mt-10 relative">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          speed={1000}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {Reviewlist.map((comment, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white px-6 py-8 flex flex-col items-center gap-4 text-center min-h-[240px]">
                <RatingStars rating={comment?.star} />
                <p className="text-lg italic text-gray-700 leading-relaxed">
                  {"“"}
                  {comment?.comment}
                  {"”"}
                </p>
                <p className="text-theme font-semibold mt-2">
                  — {comment?.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          onClick={() => swiperRef.current.swiper.slidePrev()}
          className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md text-theme hover:bg-theme hover:text-white transition"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={() => swiperRef.current.swiper.slideNext()}
          className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md text-theme hover:bg-theme hover:text-white transition"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Customerreviews;
