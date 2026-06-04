"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface FloatingProps {
  children: React.ReactNode;
  sensitivity?: number;
  className?: string;
}

interface FloatingElementProps {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}

const SPRING = { stiffness: 80, damping: 20, mass: 0.5 };

export function FloatingElement({ children, depth = 1, className = "" }: FloatingElementProps) {
  return (
    <div data-depth={depth} className={`absolute ${className}`}>
      {children}
    </div>
  );
}

export default function Floating({ children, sensitivity = -0.5, className = "" }: FloatingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0, SPRING);
  const mouseY = useSpring(0, SPRING);
  const [elements, setElements] = useState<{ el: HTMLElement; depth: number }[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const found = Array.from(
      containerRef.current.querySelectorAll("[data-depth]")
    ) as HTMLElement[];
    setElements(found.map((el) => ({ el, depth: parseFloat(el.dataset.depth ?? "1") })));
  }, [children]);

  useEffect(() => {
    const unsubX = mouseX.on("change", (x) => {
      elements.forEach(({ el, depth }) => {
        el.style.transform = `translate(${x * depth * sensitivity}px, ${mouseY.get() * depth * sensitivity}px)`;
      });
    });
    const unsubY = mouseY.on("change", (y) => {
      elements.forEach(({ el, depth }) => {
        el.style.transform = `translate(${mouseX.get() * depth * sensitivity}px, ${y * depth * sensitivity}px)`;
      });
    });
    return () => { unsubX(); unsubY(); };
  }, [elements, mouseX, mouseY, sensitivity]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
    >
      {children}
    </div>
  );
}
