"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

function Faqs() {
  const faqlist = [
    {
      question: "What is the best type of wood for furniture?",
      answer:
        "The best type of wood for furniture depends on the desired look, durability, and budget. Common choices include oak for strength, walnut for a rich appearance, and pine for affordability.",
    },
    {
      question: "How do I care for wooden furniture?",
      answer:
        "To care for wooden furniture, dust regularly with a soft cloth, avoid direct sunlight, and use furniture polish or wax to protect the wood. For spills, wipe them up immediately to prevent staining.",
    },
    {
      question: "How long does a typical sofa last?",
      answer:
        "A high-quality sofa can last anywhere from 7 to 15 years depending on the material, usage, and care. Leather and solid wood frames typically last longer.",
    },
    {
      question:
        "What are the different types of furniture for the living room?",
      answer:
        "Common types of furniture for the living room include sofas, coffee tables, side tables, chairs, and entertainment units. Modular furniture systems are also becoming popular for their versatility.",
    },
    {
      question: "How do I choose the right dining table for my space?",
      answer:
        "Consider the size of your dining area and the number of people you want to seat. Round tables are great for smaller spaces, while rectangular tables work well for larger rooms. Choose a material that suits your style and lifestyle, such as wood for a classic look or glass for a modern feel.",
    },
    {
      question: "Are there any eco-friendly furniture options?",
      answer:
        "Yes, there are many eco-friendly furniture options available, such as furniture made from recycled materials, sustainably sourced wood, and non-toxic finishes. Look for certifications like FSC (Forest Stewardship Council) for sustainable wood.",
    },
    {
      question: "How can I fix scratches on my wooden furniture?",
      answer:
        "To fix minor scratches on wooden furniture, use a wood touch-up pen or wax stick that matches the color of your furniture. For deeper scratches, you can sand the area lightly and apply a wood stain to blend the repair.",
    },
    {
      question: "How do I know if my furniture is well-made?",
      answer:
        "Well-made furniture typically has solid joints, such as dovetail or mortise and tenon joints, instead of staples or nails. The material should feel durable, and the finish should be smooth without any gaps or imperfections.",
    },
    {
      question: "What is the difference between a sectional and a sofa?",
      answer:
        "A sectional is a type of sofa that consists of multiple pieces that can be rearranged, while a traditional sofa is usually one solid piece. Sectionals are ideal for larger living spaces and can offer more seating options.",
    },
    {
      question: "How do I choose the right mattress for my bed?",
      answer:
        "To choose the right mattress, consider your sleeping position, firmness preference, and any specific health concerns. Memory foam mattresses provide good support and pressure relief, while innerspring mattresses are more traditional and breathable.",
    },
  ];

  return (
    <div className="py-24 px-8">
      <h2 className="font-tenor text-6xl text-center">
        Frequently asked Questions
      </h2>
      <div className="mt-10">
        {faqlist.map((item, i) => (
          <Faq key={i} faq={item} />
        ))}
      </div>
    </div>
  );
}

const Faq = ({ faq }) => {
  const [open, setopen] = useState(false);
  return (
    <div
      className={`pt-5 cursor-pointer border-t border-theme `}
      onClick={() => {
        setopen((pre) => !pre);
      }}
    >
      <p className="flex items-start text-2xl">
        <span className="font-tenor">{faq.question}</span>
        <MdKeyboardArrowDown className={`ml-auto duration-300 ${open && "rotate-180"}`} />
      </p>
      <p
        className={`font-tenor mt-5 ${
          open ? "max-h-screen duration-1000" : "max-h-0 duration-500"
        }  overflow-hidden`}
      >
        {faq.answer}
      </p>
    </div>
  );
};

export default Faqs;
