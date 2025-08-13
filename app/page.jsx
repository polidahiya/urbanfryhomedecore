import React from "react";
import Herosection from "./_comps/Herosection";
import Marquebanner from "./_comps/Marquebanner";
import Newarrivals from "./_comps/Newarrivals";
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
import Imagetapcomp from "./_comps/Searchbyview/Imagetapcomp";
import Madeinindia from "./_comps/Madeinindia";
import { Cachedreviews } from "./_connections/Getcachedata";
import DeviceDetector from "./_globalcomps/_helperfunctions/Devicedetector";
import Instaposts from "./_comps/Instaposts";
import Newsletter from "./_globalcomps/Newsletter/Newsletter";
import Fixedbuttons from "./_globalcomps/Fixedbuttons";

export const faqlist = [
  {
    question: "What is Urbanfry Homes?",
    answer: [
      "Urbanfry Homes is a premium furniture brand based in Gurugram, specializing in solid wood furniture crafted for modern Indian homes. We offer high-quality, design-led, and customizable pieces that are both functional and timeless.",
    ],
  },
  {
    question: "Where is Urbanfry Homes located?",
    answer: [
      `Our design studio and warehouse are located in Gurugram, Haryana. We ship PAN India and cater to
custom orders as well. We have an experience center in Gurugram where you can explore our collections
by appointment.
`,
    ],
  },
  {
    question: "Do you ship to my location?",
    answer: [
      `We currently deliver to over 40+ cities in India. You can check service availability by entering your pin
code on any product page. The delivery timeline is clearly mentioned on each product page. Most
products are delivered in 8–20 working days, while customized pieces may take longer based on
complexity. Delivery is free and inclusive in the prices.
`,
    ],
  },
  {
    question: "What type of wood does Urbanfry Homes use in its furniture?",
    answer: [
      `Urbanfry Homes uses 100% solid wood for all its furniture pieces. We primarily work with Sheesham
wood (Indian Rosewood), which is known for its strength, durability, and beautiful natural grain. In
addition to Sheesham, we also craft select pieces using Mango wood and Acacia wood—both are sturdy,
sustainable hardwoods that offer a warm, textured finish. All our materials are carefully chosen to ensure
that every product is long-lasting, termite-resistant, and full of character, showcasing the richness and
charm of authentic solid wood furniture
`,
    ],
  },
  {
    question: "Will the product look exactly as it does on the website?",
    answer: [
      `We strive for consistency, but since we use natural solid wood, slight variations in grain, shade, or
texture may occur — making every piece one-of-a-kind. Lighting and screen resolution may also cause
minor differences in perceived color.
`,
    ],
  },
  {
    question: "Can I see real customer photos of Urbanfry products?",
    answer: [
      `Absolutely! Check out our “Urbanfry in Homes” section to see real customer setups. You can also
follow us on Instagram for styling inspiration
`,
    ],
  },
  {
    question: "What warranty do you provide?",
    answer: [
      `All Urbanfry Homes products come with a 1-year warranty against manufacturing defects. This does not
cover wear and tear, misuse, or damage caused by external factors such as water or sunlight exposure.
`,
    ],
  },
  {
    question: "What is your refund or replacement policy?",
    answer: [
      `Refunds and replacements are only applicable in cases of transit damage or manufacturing defects
reported within 24–48 hours of delivery. Once approved, refunds are processed within 10–15 business
days after the product reaches our warehouse.
`,
    ],
  },
  {
    question: "Is assembly required for Urbanfry Homes products?",
    answer: [
      `For Delhi NCR, doorstep installation support is available at the time of delivery. For other cities,
installation services are not currently provided. However, our products are thoughtfully designed for easy
self-installation with clear instructions. In case any help is needed, most customers find that a local
carpenter can quickly assist with setup.

`,
    ],
  },
  {
    question: "Will installation be provided?",
    answer: [
      `Most of our products are delivered pre-assembled. For items like dining tables, benches, or beds that
require simple leg attachment, assembly is quick and can be done easily at home or with a local carpenter.
`,
    ],
  },
  {
    question: "How will I know that you've received my order?",
    answer: [
      `Once items have been ordered, a confirmation page will appear on the screen confirming the order. An
email with the order details will be sent immediately to the registered email ID, provided that we have an
accurate email address. In case you do not receive the email confirming your order please call us on +91
8287363394, Monday-Saturday (09:30 AM - 6:00 PM) or drop us an email at urbanfryhome@gmail.com.
We'll send subsequent email(s) when your product is processed, shipped, including tracking information
(if available).

`,
    ],
  },
];

async function page() {
  const device = await DeviceDetector();
  const allcookies = await cookies();
  const token = allcookies.get("token");
  const parseduserdata = allcookies.get("userdata")?.value;
  const userdata = parseduserdata ? JSON.parse(parseduserdata) : null;

  // new arrivals data
  const data = await Cachedproducts();
  const lastweek = new Date().getTime() - 1000 * 60 * 60 * 24 * 7;
  const newarrivals = data.filter((item) => item.lastupdated > lastweek);

  // Cachedreviews
  const fivestarreviews = await Cachedreviews("5stars");

  return (
    <div>
      <Navbar token={token} userdata={userdata} />
      <Herosection device={device} />
      {/* marque section */}
      <section className="w-full bg-footercolor text-[#56473e] overflow-hidden relative flex items-center">
        <Marquebanner
          list={[
            "Discover the new Urbanfry Homes — design that feels personal",
            "Enjoy 20% off your first order with code WELCOME20 — our way of saying hello",
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
            "Discover the new Urbanfry Homes — design that feels personal",
            "Enjoy 20% off your first order with code WELCOME20 — our way of saying hello",
          ]}
        />
      </section>
      <Collections />
      <Customerreviews fivestarreviews={fivestarreviews} />
      <Aboutus />
      <Madeinindia device={device} />
      <Instaposts />
      <Faqs faqlist={faqlist} />
      <Footer />
      {/*  */}
      <Searchbarsection />
      <Sidecart />
      <Newsletter />
      <Fixedbuttons />
    </div>
  );
}

export default page;
