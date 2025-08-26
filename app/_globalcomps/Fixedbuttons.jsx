"use client";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoArrowUpOutline } from "react-icons/io5";
import { mobile } from "../commondata";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Fixedbuttons() {
  const path = usePathname();
  const [showScroll, setShowScroll] = useState(false);

  const isproductpage = path.includes("/product/");

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openWhatsApp = () => {
    const phoneNumber = mobile; // Replace with your number (with country code, no +)
    const message = "Hello, I'm interested in your services!";
    const url = `https://wa.me/${phoneNumber.trim()}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className={`fixed  flex flex-col gap-4 z-50 ${
        isproductpage ? "bottom-36 right-6" : "bottom-6 right-6"
      }`}
    >
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="bg-theme text-white p-3 rounded-full shadow-lg transition"
            aria-label="Scroll to top"
          >
            <IoArrowUpOutline size={20} />
          </motion.button>
        )}
      </AnimatePresence>
      <button
        onClick={openWhatsApp}
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition"
        aria-label="Contact on WhatsApp"
      >
        <FaWhatsapp size={20} />
      </button>
    </div>
  );
}
