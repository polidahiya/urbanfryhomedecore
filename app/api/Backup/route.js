import { getcollection } from "@/app/_connections/Mongodb";
import Verification from "@/app/_connections/Verifytoken";

export async function GET() {
  try {
    const tokenres = await Verification();
    if (!tokenres?.verified) {
      return new Response(JSON.stringify({ message: "Invalid user" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const {
      Admindatacollection,
      Productscollection,
      userscollection,
      orderscollection,
      reviewscollection,
      contactmessages,
      couponscollection,
      Newslettersubscriberscollection,
      inhomecollection,
      blogscollection,
      seodata,
    } = await getcollection();

    // Fetch all data
    const backupData = {
      Admindata: await Admindatacollection.find({}).toArray(),
      Products: await Productscollection.find({}).toArray(),
      Users: await userscollection.find({}).toArray(),
      Orders: await orderscollection.find({}).toArray(),
      Reviews: await reviewscollection.find({}).toArray(),
      ContactMessages: await contactmessages.find({}).toArray(),
      Coupons: await couponscollection.find({}).toArray(),
      NewsletterSubscribers: await Newslettersubscriberscollection.find(
        {}
      ).toArray(),
      InHome: await inhomecollection.find({}).toArray(),
      Blogs: await blogscollection.find({}).toArray(),
      SEOData: await seodata.find({}).toArray(),
    };

    const jsonString = JSON.stringify(backupData, null, 2);

    return new Response(jsonString, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename=backup-${new Date().toISOString()}.json`,
      },
    });
  } catch (error) {
    console.error("Backup error:", error);
    return new Response(
      JSON.stringify({ message: "Backup failed", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
