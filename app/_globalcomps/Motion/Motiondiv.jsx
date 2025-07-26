"use client";
import React from "react";
import { motion } from "framer-motion";

export function Motiondiv({ children, ...props }) {
  return <motion.div {...props}>{children}</motion.div>;
}
