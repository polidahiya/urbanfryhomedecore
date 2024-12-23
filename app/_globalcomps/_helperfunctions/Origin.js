"use client";
import { useState, useEffect } from "react";

const useDomain = () => {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  return origin;
};

export default useDomain;
