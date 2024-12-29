"use client";
import React, { useEffect, useState } from "react";
import { AppContextfn } from "../Context";

function Message() {
  const { messagearray } = AppContextfn();

  return (
    <>
      {messagearray?.map((item) => (
        <Notif key={item.id} item={item} />
      ))}
    </>
  );
}

function Notif({ item }) {
  const { setmessagearray } = AppContextfn();
  const [isVisible, setIsVisible] = useState(false);

  // Remove the notification
  const removemessage = () => {
    setIsVisible(false);
    setTimeout(() => {
      setmessagearray((pre) =>
        pre.filter((notification) => notification.id !== item.id)
      );
    }, 300); // Match this timeout with the fade-out transition duration
  };

  useEffect(() => {
    setIsVisible(true); // Show the notification

    const timer = setTimeout(() => {
      removemessage(); // Auto-remove after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 
        w-10 h-10 bg-white border border-slate-300 shadow-md 
        rounded-full flex items-center justify-center 
        z-50 transition-all duration-300 ease-in-out
        ${
          isVisible
            ? "opacity-100 translate-y-0 w-96 max-w-[90%]"
            : "opacity-0 translate-y-5"
        }`}
    >
      <span
        className={`transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {item.message}
      </span>
      <button
        className="absolute right-[6px] top-1/2 -translate-y-1/2 w-7 h-7 bg-theme text-white rounded-full flex items-center justify-center"
        onClick={removemessage}
      >
        X
      </button>
    </div>
  );
}

export default Message;
