"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const FlipWords = () => {
  const words = ["Learn", "Learn.Build.", "Learn.Build.GetHired."];
  const duration = 3000;
  const flipDuration = 1000;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipping(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setFlipping(false);
      }, flipDuration / 2);
    }, duration);
    return () => clearInterval(interval);
  }, [flipDuration, duration, words.length]);

  return (
    <div
      className="w-fit inline-block relative align-middle mx-auto py-8 sm:py-2 "
      style={{ perspective: "1000px", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <motion.div
        animate={{ rotateX: flipping ? 180 : 0 }}
        transition={{ duration: flipDuration / 1000, ease: "easeInOut" }}
        className="relative inline-block text-yellow-400 font-bold text-4xl sm:text-8xl md:text-7xl text-center px-2"
        style={{ transformStyle: "preserve-3d",  display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div
          className="absolute inset-0 flex justify-center items-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          {words[currentIndex]}
        </div>
        <div
          className="absolute inset-0 flex justify-center  items-center"
          style={{ transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}
        >
          {words[(currentIndex + 1) % words.length]}
        </div>
      </motion.div>
    </div>
  );
};
