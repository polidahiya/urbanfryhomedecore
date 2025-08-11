"use client";
import React, { useState, useEffect } from "react";
import { MdInstallDesktop } from "react-icons/md";
import { MdInstallMobile } from "react-icons/md";

const Pwaprompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      setIsVisible(false);
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={handleInstallClick}
          className="flex items-end gap-1"
          aria-label="Install app"
          title="Install app"
        >
          <MdInstallDesktop className="text-theme hidden md:block" />
          <MdInstallMobile className="text-theme md:hidden" />
          <span className="text-sm">Install App</span>
        </button>
      )}
    </>
  );
};

export default Pwaprompt;
