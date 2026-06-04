"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import InfiniteGallery from "@/components/ui/3d-gallery-photography";

const costumeImages = [
  { src: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop", alt: "Desfile" },
  { src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop", alt: "Teatro" },
  { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop", alt: "Vestuario" },
  { src: "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=800&auto=format&fit=crop", alt: "Carnaval" },
  { src: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=800&auto=format&fit=crop", alt: "Fiestas" },
  { src: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop&crop=right", alt: "Ballet" },
  { src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop", alt: "Celebración" },
  { src: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=800&auto=format&fit=crop", alt: "Personaje" },
];

export default function Gallery3D() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-[#0a0a1a] overflow-hidden">
      {/* Header overlay */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="absolute top-10 left-0 right-0 z-10 text-center pointer-events-none px-6"
      >
        <p className="text-[#1baeea] text-[11px] font-bold tracking-[0.45em] uppercase mb-2">
          Galería
        </p>
        <h2
          className="text-4xl md:text-6xl font-bold text-white leading-none"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Nuestros <span className="gradient-brand-text">Trajes</span>
        </h2>
      </motion.div>

      {/* 3D Gallery */}
      <InfiniteGallery
        images={costumeImages}
        speed={1.2}
        visibleCount={12}
        className="h-screen w-full"
        fadeSettings={{
          fadeIn: { start: 0.05, end: 0.25 },
          fadeOut: { start: 0.4, end: 0.43 },
        }}
        blurSettings={{
          blurIn: { start: 0.0, end: 0.1 },
          blurOut: { start: 0.4, end: 0.43 },
          maxBlur: 8.0,
        }}
      />

      {/* Bottom hint */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-10 pointer-events-none">
        <p className="text-white/30 text-[10px] font-bold tracking-[0.4em] uppercase">
          Scroll para explorar · Auto-play activo
        </p>
      </div>
    </section>
  );
}
