"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

const SECTION_HEIGHT = 1800;

// Colorful carnival/costume images
const EXTERIOR_IMG =
  "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=2574&auto=format&fit=crop";
const INTERIOR_IMG =
  "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=2670&auto=format&fit=crop";

// Floating costume cards — pattern from 21st dev FinancialHero
const floatingCards = [
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop",
    label: "Carnaval",
    color: "#ff1fa0",
    className: "left-[2%] top-[18%]",
    rotation: -8,
    delay: 0.4,
    floatDuration: 5,
    size: "w-28 h-40 md:w-36 md:h-52",
  },
  {
    img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4f91?q=80&w=400&auto=format&fit=crop",
    label: "Teatro",
    color: "#1baeea",
    className: "left-[6%] bottom-[15%]",
    rotation: 6,
    delay: 0.7,
    floatDuration: 6.5,
    size: "w-24 h-34 md:w-28 md:h-40",
  },
  {
    img: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=400&auto=format&fit=crop",
    label: "Desfile",
    color: "#ff1fa0",
    className: "right-[3%] top-[14%]",
    rotation: 9,
    delay: 0.55,
    floatDuration: 5.5,
    size: "w-28 h-40 md:w-36 md:h-52",
  },
  {
    img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=400&auto=format&fit=crop",
    label: "Eventos",
    color: "#1baeea",
    className: "right-[7%] bottom-[18%]",
    rotation: -7,
    delay: 0.8,
    floatDuration: 7,
    size: "w-24 h-34 md:w-28 md:h-40",
  },
  {
    img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=400&auto=format&fit=crop",
    label: "Fiesta",
    color: "#ff1fa0",
    className: "left-[28%] top-[6%] hidden md:block",
    rotation: 4,
    delay: 0.6,
    floatDuration: 4.5,
    size: "w-20 h-28",
  },
];

// Sparkle particles
const sparkles = [
  { x: "12%", y: "22%", size: 6, color: "#1baeea", delay: 0 },
  { x: "85%", y: "18%", size: 8, color: "#ff1fa0", delay: 0.5 },
  { x: "5%", y: "55%", size: 5, color: "#ff1fa0", delay: 1 },
  { x: "92%", y: "50%", size: 7, color: "#1baeea", delay: 0.3 },
  { x: "20%", y: "85%", size: 6, color: "#1baeea", delay: 0.8 },
  { x: "75%", y: "80%", size: 5, color: "#ff1fa0", delay: 0.2 },
  { x: "48%", y: "5%", size: 7, color: "#ff1fa0", delay: 1.1 },
  { x: "55%", y: "90%", size: 5, color: "#1baeea", delay: 0.6 },
  { x: "38%", y: "92%", size: 4, color: "#ff1fa0", delay: 0.4 },
  { x: "65%", y: "8%", size: 6, color: "#1baeea", delay: 0.9 },
];

function Sparkle({ x, y, size, color, delay }: (typeof sparkles)[0]) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        repeatDelay: 2 + delay,
        ease: "easeInOut",
      }}
    >
      <svg width={size * 2} height={size * 2} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" />
      </svg>
    </motion.div>
  );
}

function FloatingCard({
  img,
  label,
  color,
  className,
  rotation,
  delay,
  floatDuration,
  size,
}: (typeof floatingCards)[0]) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: rotation - 5 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute z-10 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative cursor-pointer group"
      >
        {/* Glow behind card */}
        <div
          className="absolute -inset-1 rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition-opacity"
          style={{ background: color }}
        />

        {/* Card */}
        <div className={`relative ${size} rounded-2xl overflow-hidden`}>
          <img
            src={img}
            alt={label}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Label */}
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-white text-xs font-bold whitespace-nowrap"
            style={{ background: color }}
          >
            {label}
          </div>
        </div>

        {/* Border */}
        <div
          className="absolute inset-0 rounded-2xl border-2 opacity-40"
          style={{ borderColor: color }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function HeroEnter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, SECTION_HEIGHT * 0.6], [18, 0]);
  const clip2 = useTransform(scrollY, [0, SECTION_HEIGHT * 0.6], [82, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const bgSize = useTransform(scrollY, [0, SECTION_HEIGHT], ["200%", "110%"]);

  const exteriorOpacity = useTransform(
    scrollY,
    [SECTION_HEIGHT * 0.3, SECTION_HEIGHT * 0.65],
    [1, 0]
  );
  const interiorOpacity = useTransform(
    scrollY,
    [SECTION_HEIGHT * 0.45, SECTION_HEIGHT * 0.75],
    [0, 1]
  );

  const textOpacity = useTransform(scrollY, [0, SECTION_HEIGHT * 0.35], [1, 0]);
  const textY = useTransform(scrollY, [0, SECTION_HEIGHT * 0.35], [0, -60]);

  const gradientOpacity = useTransform(
    scrollY,
    [SECTION_HEIGHT * 0.7, SECTION_HEIGHT + 100],
    [1, 0]
  );

  // Float cards out on scroll
  const cardsOpacity = useTransform(scrollY, [0, SECTION_HEIGHT * 0.25], [1, 0]);

  return (
    <div
      ref={containerRef}
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Background radial glow (light) ── */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#1baeea]/8 blur-[100px]" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#ff1fa0]/8 blur-[100px]" />
        </div>

        {/* ── Sparkle particles ── */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {sparkles.map((s, i) => (
            <Sparkle key={i} {...s} />
          ))}
        </div>

        {/* ── Floating costume cards ── */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{ opacity: cardsOpacity }}
        >
          {floatingCards.map((card) => (
            <FloatingCard key={card.label} {...card} />
          ))}
        </motion.div>

        {/* ── Scroll clip: exterior ── */}
        <motion.div
          className="absolute inset-0 z-20"
          style={{
            clipPath,
            backgroundImage: `url(${EXTERIOR_IMG})`,
            backgroundSize: bgSize,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: exteriorOpacity,
          }}
        />

        {/* ── Scroll clip: interior ── */}
        <motion.div
          className="absolute inset-0 z-20"
          style={{
            clipPath,
            backgroundImage: `url(${INTERIOR_IMG})`,
            backgroundSize: bgSize,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: interiorOpacity,
          }}
        />

        {/* ── Dark overlay inside clip ── */}
        <motion.div
          className="absolute inset-0 bg-black/25 z-20"
          style={{ clipPath }}
        />

        {/* ── Colored border glow on clip window ── */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ clipPath }}
        >
          <div
            className="absolute inset-0 border-2"
            style={{
              borderImage: "linear-gradient(135deg, #1baeea, #ff1fa0) 1",
            }}
          />
        </motion.div>

        {/* ── Hero text ── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 pointer-events-none px-4"
          style={{ opacity: textOpacity, y: textY }}
        >
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1baeea]/30 bg-white/80 backdrop-blur-sm mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff1fa0] animate-pulse" />
            <span className="text-[#1baeea] text-xs font-bold tracking-widest uppercase">
              Ambato · Riobamba · Ecuador
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl md:text-9xl font-bold leading-none"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            <span className="text-[#1baeea]">Disfraz</span>
            <span className="text-[#ff1fa0]">arte</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="mt-4 text-[#0a0a1a]/60 text-base md:text-lg font-semibold tracking-wide max-w-md"
          >
            Alquiler de trajes · Desfiles · Eventos · Carnavales
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 pointer-events-auto"
          >
            <a
              href="#catalogo"
              className="gradient-brand text-white font-bold px-7 py-3 rounded-full hover:opacity-90 hover:scale-105 transition-all duration-300 text-sm"
              style={{ boxShadow: "0 0 24px rgba(27,174,234,0.35)" }}
            >
              Ver catálogo
            </a>
            <a
              href="#contacto"
              className="border-2 border-[#1baeea] text-[#1baeea] font-bold px-7 py-3 rounded-full hover:bg-[#1baeea]/10 transition-all duration-300 text-sm"
            >
              Reservar traje
            </a>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-12 flex flex-col items-center gap-2"
          >
            <span className="text-[#0a0a1a]/30 text-xs tracking-widest uppercase font-semibold">
              Desplaza para entrar
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-px h-8 bg-gradient-to-b from-[#1baeea] to-transparent"
            />
          </motion.div>
        </motion.div>

        {/* ── Bottom gradient out — to white ── */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-white z-40 pointer-events-none"
          style={{ opacity: gradientOpacity }}
        />
      </div>
    </div>
  );
}
