"use server";
import { getcollection } from "@/app/_connections/Mongodb";
import Verification from "@/app/_connections/Verifytoken";
import { refreshreviewsnow } from "@/app/_connections/Getcachedata";

export const Getreviews = async (
  reviewtype = "all",
  search,
  limit,
  pagenumber
) => {
  try {
    const res = await Verification("Reviews_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { reviewscollection } = await getcollection();

    const queries = {
      all: {},
      verified: {
        verified: true,
      },
      unverified: {
        verified: false,
      },
      search: {
        $or: [
          { name: { $regex: new RegExp(search, "i") } },
          { email: { $regex: new RegExp(search, "i") } },
          { date: { $regex: new RegExp(search, "i") } },
          { sku: { $regex: new RegExp(search, "i") } },
          { comment: { $regex: new RegExp(search, "i") } },
        ],
      },
    };

    const allreviews = await reviewscollection
      .find(queries[reviewtype])
      .sort({ date: -1 })
      .limit(limit)
      .skip((pagenumber - 1) * limit)
      .toArray();

    allreviews.forEach((item) => {
      item._id = item?._id.toString();
    });

    const totalreviews = await reviewscollection.countDocuments(
      queries[reviewtype]
    );

    return { status: 200, message: "", data: allreviews, totalreviews };
  } catch (error) {
    return { status: 500, message: "Server Error!" };
  }
};

export const Updatereview = async (id, value, productid, stars) => {
  try {
    const res = await Verification("Reviews_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { reviewscollection, ObjectId } = await getcollection();

    await reviewscollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { verified: value } }
    );
    await refreshreviewsnow(productid);
    if (stars == 5) {
      await refreshreviewsnow("5stars");
    }
    return { status: 200, message: "Update successfully" };
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
};

export const Deletereview = async (id, productid, stars) => {
  try {
    const res = await Verification("Reviews_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { reviewscollection, ObjectId } = await getcollection();

    await reviewscollection.deleteOne({ _id: new ObjectId(id) });
    await refreshreviewsnow(productid);
    if (stars == 5) {
      await refreshreviewsnow("5stars");
    }

    return { status: 200, message: "Deleted successful" };
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
};
