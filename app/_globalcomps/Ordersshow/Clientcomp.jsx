"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Nextimage from "../Nextimage";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

function Clientcomp({ orders }) {
  const path = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [show, setshow] = useState(true);

  // ⏱ Auto rotate every 5 seconds
  useEffect(() => {
    if (!orders?.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % orders.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [orders?.length]);

  const order = orders?.[currentIndex];
  if (!order) return null;

  const product = order.product;
  const user = order.userdata;

  useEffect(() => {
    const isadmin = path.includes("/admin");
    setshow(!isadmin);
  }, [path]);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  if (show)
    return (
      <div className="fixed bottom-0 left-0 z-50 p-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="relative bg-white rounded-2xl shadow-lg p-3 text-xs w-full max-w-sm md:max-w-md border border-gray-100"
          >
            <button
              className="absolute -top-1 left-0 md:left-auto md:right-0 -translate-y-full w-6 aspect-square bg-gray-100 rounded-full flex items-center justify-center"
              onClick={() => setshow(false)}
            >
              X
            </button>
            <Link href={`/product/${product?.pid}`} className="block">
              <div className="flex items-center">
                {/* Image */}
                <div className="min-w-20 w-20 aspect-square flex-shrink-0">
                  <Nextimage
                    src={product?.image}
                    alt={product?.name}
                    height={100}
                    width={100}
                    className="h-full w-full object-contain rounded-xl"
                  />
                </div>

                {/* Content */}
                <div className="w-full h-full pl-2">
                  <p className="font-medium line-clamp-2 text-gray-700">
                    🛍️ {user?.username} from{" "}
                    <span className="text-theme font-semibold">
                      {user?.address}
                    </span>
                  </p>

                  <p className="text-gray-900 font-semibold mt-1 line-clamp-2">
                    bought <span className="text-theme">{product?.name}</span>
                  </p>

                  <p className="text-gray-500 mt-1">
                    {timeAgo(order?.createdAt)}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    );
}

// ⏳ Time Ago Helper
function timeAgo(dateInput) {
  const date = new Date(dateInput?.$date || dateInput);
  if (isNaN(date)) return "";

  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return `${diffSec} sec ago`;
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHour < 24) return `${diffHour} hr ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;

  return `on ${date.toLocaleDateString()}`;
}

export default Clientcomp;
