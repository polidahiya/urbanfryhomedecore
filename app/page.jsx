import React from "react";
import Herosection from "./_comps/Herosection";
import Marquebanner from "./_comps/Marquebanner";
import Newarrivals from "./_comps/Newarrivals";
// import Imagegallery from "./_comps/Imagegallery";
// import Featuredin from "./_comps/Featuredin";
// import Blogs from "./_comps/Blogs";
import Collections from "./_comps/Collections";
import Customerreviews from "./_comps/Customerreviews";
import Aboutus from "./_comps/Aboutus";
import Faqs from "./_comps/Faqs";
import Navbar from "./_globalcomps/Navbar";
import { cookies } from "next/headers";
import Footer from "./_globalcomps/Footer";
import Searchbarsection from "./_globalcomps/_navbarcomps/Searchbarsection";
import { Cachedproducts } from "./_connections/Getcachedata";
import Sidecart from "./_globalcomps/Sidecart";
import Imagetapcomp from "./_comps/Imagetapcomp";
import Madeinindia from "./_comps/Madeinindia";
import { Cachedreviews } from "./_connections/Getcachedata";

async function page() {
  const allcookies = await cookies();
  const token = allcookies.get("token");
  const parseduserdata = allcookies.get("userdata")?.value;
  const userdata = parseduserdata ? JSON.parse(parseduserdata) : null;

  // new arrivals data
  const data = await Cachedproducts();
  const lastweek = new Date().getTime() - 1000 * 60 * 60 * 24 * 7;
  const newarrivals = data.filter((item) => item.lastupdated > lastweek);

  // Cachedreviews
  const allrewiews = await Cachedreviews();
  const fivestarreviews = allrewiews.filter((item) => item.star == 5);

  return (
    <div className="overflow-x-hidden">
      <Navbar navtype={true} token={token} userdata={userdata} />
      <Herosection />
      {/* marque section */}
      <section className="w-full bg-footercolor text-[#56473e] overflow-hidden relative flex items-center">
        <Marquebanner
          list={[
            "2025 Is Looking A Lot More Organized",
            'Use code "ALT10" for 10% off on your first order',
            "2025 Is Looking A Lot More Organized",
            'Use code "ALT10" for 10% off on your first order',
            "2025 Is Looking A Lot More Organized",
            'Use code "ALT10" for 10% off on your first order',
          ]}
        />
      </section>
      {/* quote */}
      {/* <div className="flex flex-col items-center py-8 ">
        <p className="text-5xl font-tenor rotate-180 italic">&quot; </p>
        <p className="max-w-[900px] text-center text-base md:text-3xl font-tenor px-5">
          Loops by Latika are by far one of the most explorative Indian brands
          that are giving a makeover to our rather drab home carpets.
        </p>
      </div> */}
      <Newarrivals heading="New Arrivals" data={newarrivals} />
      {/* marque section */}
      <Imagetapcomp />
      <section className="w-full text-[#56473e] overflow-hidden relative flex items-center">
        <Marquebanner
          list={[
            "2025 Is Looking A Lot More Organized",
            'Use code "ALT10" for 10% off on your first order',
            "2025 Is Looking A Lot More Organized",
            'Use code "ALT10" for 10% off on your first order',
            "2025 Is Looking A Lot More Organized",
            'Use code "ALT10" for 10% off on your first order',
          ]}
        />
      </section>
      <Collections />
      <Customerreviews fivestarreviews={fivestarreviews} />
      <Aboutus />
      <Madeinindia />
      <Faqs
        faqlist={[
          {
            question: "What types of products does Alt Organisers offer?",
            answer: [
              "Alt Organisers specializes in premium space organizers designed to bring style and functionality to your home or office. Our range includes drawer organizers, closet solutions, kitchen storage, desk organizers, and much more, crafted with high-quality materials.",
            ],
          },
          {
            question: "Where does Alt Organisers ship?",
            answer: [
              "We ship across India. For international shipping, please contact us via email for options and details.",
            ],
          },
          {
            question: "How long will it take for my order to arrive?",
            answer: [
              "• In-stock items: Typically shipped within 2-4 business days.",
              "• Made-to-order or customized items: Production and shipping may take 3-4 weeks.",
              "Once your order is dispatched, we’ll share tracking details so you can monitor the delivery.",
            ],
          },
          {
            question: " What are the payment options available?",
            answer: [
              "• Yes, returns are accepted for defective or damaged items, provided they are reported within 48 hours of delivery. The product must be unused, in its original packaging, and returned within one week of delivery.",
              "• For returns due to other concerns, a reverse shipping fee of 10% of the product cost will be deducted, and store credit will be issued for the remaining amount.",
            ],
          },
          {
            question: "Can I return or exchange a product?",
            answer: [
              "Consider the size of your dining area and the number of people you want to seat. Round tables are great for smaller spaces, while rectangular tables work well for larger rooms. Choose a material that suits your style and lifestyle, such as wood for a classic look or glass for a modern feel.",
            ],
          },
          {
            question: "Are there any non-returnable products?",
            answer: [
              "Yes, items marked as ‘Final Sale’ or ‘Non-Returnable’ cannot be returned. Custom-made or commissioned items are also non-returnable.",
            ],
          },
          {
            question: "What if I receive a damaged or defective product?",
            answer: [
              "Please inspect your product upon delivery. If you find any damage or defect, notify us within 48 hours of receipt. We will arrange a return or replacement free of charge.",
            ],
          },
          {
            question: "How do refunds work?",
            answer: [
              "Refunds are evaluated on a case-by-case basis. Once approved, refunds or store credits will be processed within 15 working days after we receive and inspect the returned product. Please note that transaction fees of 5% are non-refundable.",
            ],
          },
          {
            question: " Can I cancel my order?",
            answer: [
              "Orders can only be canceled within 24 hours of placement. Custom-made or commissioned items cannot be canceled once the order is confirmed.",
            ],
          },
        ]}
      />
      <Footer />
      {/*  */}
      <Searchbarsection />
      <Sidecart />
    </div>
  );
}

export default page;
