"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
  MotionValue,
} from "framer-motion";

interface InfiniteGridProps {
  className?: string;
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
  revealRadius?: number;
}

export function InfiniteGrid({
  className,
  mouseX,
  mouseY,
  revealRadius = 260,
}: InfiniteGridProps) {
  const internalMouseX = useMotionValue(-9999);
  const internalMouseY = useMotionValue(-9999);

  const mx = mouseX ?? internalMouseX;
  const my = mouseY ?? internalMouseY;

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.4) % 40);
    gridOffsetY.set((gridOffsetY.get() + 0.4) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(${revealRadius}px circle at ${mx}px ${my}px, black, transparent)`;

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Base faint grid */}
      <div className="absolute inset-0 opacity-[0.06]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      {/* Mouse-revealed bright grid */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>
    </div>
  );
}

function GridPattern({
  offsetX,
  offsetY,
}: {
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
}) {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id="grid-pattern-disfrazarte"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-[#1baeea]"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern-disfrazarte)" />
    </svg>
  );
}
