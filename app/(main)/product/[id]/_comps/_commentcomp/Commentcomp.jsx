"use client";
import React, { useState } from "react";
import Reviewsoverview from "./Reviewsoverview";
import Noreviews from "./Noreviews";
import Writereview from "./Writereview";
import Reviews from "./Reviews";

function Commentcomp({ productid, Comments, token, userdata }) {
  const [showwritereview, setshowwritereview] = useState(false);

  return (
    <div className="mt-10">
      <h2 className="text-center text-2xl font-tenor">Customer Reviews</h2>
      {Comments.length == 0 ? (
        <>
          <Noreviews
            showwritereview={showwritereview}
            setshowwritereview={setshowwritereview}
            token={token}
          />
          {showwritereview && (
            <Writereview
              setshowwritereview={setshowwritereview}
              productid={productid}
              userdata={userdata}
            />
          )}
        </>
      ) : (
        <>
          <Reviewsoverview
            Comments={Comments}
            showwritereview={showwritereview}
            setshowwritereview={setshowwritereview}
            token={token}
          />
          {showwritereview && (
            <Writereview
              setshowwritereview={setshowwritereview}
              productid={productid}
              userdata={userdata}
            />
          )}
          <Reviews Comments={Comments} />
        </>
      )}
    </div>
  );
}

export default Commentcomp;
