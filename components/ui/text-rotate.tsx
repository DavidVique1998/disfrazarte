"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TextRotateProps {
  texts: string[];
  interval?: number;
  className?: string;
}

export function TextRotate({ texts, interval = 2500, className = "" }: TextRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % texts.length), interval);
    return () => clearInterval(id);
  }, [texts.length, interval]);

  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-120%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 350 }}
          className="inline-block"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
