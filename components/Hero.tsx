"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import { renderCanvas, destroyCanvas } from "@/components/ui/canvas";
import InfiniteGallery from "@/components/ui/3d-gallery-photography";
import InteractiveImageBentoGallery from "@/components/ui/bento-gallery";

// ─── Confetti canvas ────────────────────────────────────────────────────────
const CONFETTI_COLORS = ["#1baeea", "#5dcbf5", "#a8e6f8", "#0d8bc4", "#ff1fa0", "#ff6ec4", "#ff85be", "#e0006e"];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  rot: number; rotV: number;
  w: number; h: number;
  color: string; opacity: number;
  shape: "rect" | "circle";
}

interface ConfettiLayer {
  sizeMin: number; sizeMax: number;
  speedMin: number; speedMax: number;
  opacityMin: number; opacityMax: number;
  countDivisor: number;
}

const BACK_LAYER: ConfettiLayer = { sizeMin: 3, sizeMax: 8, speedMin: 0.2, speedMax: 0.6, opacityMin: 0.25, opacityMax: 0.5, countDivisor: 6000 };

function mkParticle(W: number, H: number, layer: ConfettiLayer, distribute = false): Particle {
  return {
    x: Math.random() * W,
    y: distribute ? Math.random() * H : -20,
    vx: (Math.random() - 0.5) * 0.6,
    vy: Math.random() * (layer.speedMax - layer.speedMin) + layer.speedMin,
    rot: Math.random() * Math.PI * 2,
    rotV: (Math.random() - 0.5) * 0.05,
    w: Math.random() * (layer.sizeMax - layer.sizeMin) + layer.sizeMin,
    h: Math.random() * (layer.sizeMax - layer.sizeMin) * 0.6 + layer.sizeMin * 0.5,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    opacity: Math.random() * (layer.opacityMax - layer.opacityMin) + layer.opacityMin,
    shape: Math.random() < 0.45 ? "circle" : "rect",
  };
}

function ConfettiCanvas({ layer, className }: { layer: ConfettiLayer; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const count = Math.min(Math.floor((W * H) / layer.countDivisor), 120);
    const particles: Particle[] = Array.from({ length: count }, () => mkParticle(W, H, layer, true));

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouseRef.current;

      for (const p of particles) {
        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110 && d > 0) {
          const f = ((110 - d) / 110) * 1.0;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }

        // Physics
        p.vy = Math.min(p.vy + 0.006, 1.1);
        p.vx *= 0.992;
        p.vy *= 0.992;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotV;

        // Wrap
        if (p.y > H + 20) { Object.assign(p, mkParticle(W, H, layer)); }
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;

        // Paint
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.restore();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className ?? "absolute inset-0 w-full h-full pointer-events-none"} />;
}

const slides = [
  {
    type: "intro" as const,
  },
  {
    type: "scene" as const,
    num: "01",
    cat: "Desfiles y Reinas",
    h1: "Para cada",
    h2: "Desfile",
    accent: "#1baeea",
    sub: "Trajes espectaculares para reinas, comparsas y desfiles folclóricos. Cada vestuario diseñado para brillar.",
    img: "/instagram/ig-01.jpg",
  },
  {
    type: "scene" as const,
    num: "02",
    cat: "Carnaval y Fiestas",
    h1: "Para el",
    h2: "Carnaval",
    accent: "#ff1fa0",
    sub: "Cientos de disfraces vibrantes para los carnavales más espectaculares de Ecuador.",
    img: "/instagram/ig-05.jpg",
  },
  {
    type: "scene" as const,
    num: "03",
    cat: "Teatro y Fotografía",
    h1: "Para el",
    h2: "Teatro",
    accent: "#1baeea",
    sub: "Vestuario de época, fantasía y drama para obras, producciones audiovisuales y sesiones fotográficas.",
    img: "/instagram/ig-09.jpg",
  },
  {
    type: "scene" as const,
    num: "04",
    cat: "Accesorios completos",
    h1: "El look",
    h2: "Completo",
    accent: "#ff1fa0",
    sub: "Coronas, cetros, capas y toda la utilería para completar tu traje de la cabeza a los pies.",
    img: "/instagram/ig-13.jpg",
  },
  { type: "catalog" as const },
];

const SLIDE_COUNT = slides.length; // 6

const catalogItems = [
  { id: 1, title: "Reina de Carnaval",   desc: "Desfile",    url: "/instagram/ig-02.jpg", span: "row-span-2" },
  { id: 2, title: "Fantasía Plumas",     desc: "Carnaval",   url: "/instagram/ig-06.jpg", span: "row-span-1" },
  { id: 3, title: "Vestuario de Escena", desc: "Teatro",     url: "/instagram/ig-10.jpg", span: "row-span-1" },
  { id: 4, title: "Traje de Gala",       desc: "Eventos",    url: "/instagram/ig-14.jpg", span: "row-span-2 col-span-2" },
  { id: 5, title: "Disfraz Folclórico",  desc: "Desfile",    url: "/instagram/ig-17.jpg", span: "row-span-1" },
  { id: 6, title: "Look Completo",       desc: "Accesorios", url: "/instagram/ig-18.jpg", span: "row-span-1" },
  { id: 7, title: "Personaje Animado",   desc: "Fiestas",    url: "/instagram/ig-20.jpg", span: "row-span-2" },
  { id: 8, title: "Baile Contemporáneo", desc: "Teatro",     url: "/instagram/ig-21.jpg", span: "row-span-1 col-span-2" },
];
const INTRO_DWELL = 3; // extra pages of dwell on intro (gallery)
const TOTAL_PAGES = SLIDE_COUNT + INTRO_DWELL; // 9
const DWELL_FRACTION = INTRO_DWELL / TOTAL_PAGES; // ~0.333

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [vpW, setVpW] = useState(1440);
  const [vpH, setVpH] = useState(900);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const update = () => { setVpW(window.innerWidth); setVpH(window.innerHeight); };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      renderCanvas("canvas-trails");
      return () => destroyCanvas();
    }
  }, []);

  // Stay on intro for first DWELL_FRACTION, then slide through the rest
  const x = useTransform(
    scrollYProgress,
    [0, DWELL_FRACTION, 1],
    ["0vw", "0vw", `-${(SLIDE_COUNT - 1) * 100}vw`]
  );

  // Progress bar
  const barW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Logo A (ghost/exclusion): fully gone before Logo B appears — no overlap
  const LOGO_A_OUT = DWELL_FRACTION * 0.65; // ~0.217
  const logoOpacity = useTransform(
    scrollYProgress,
    [0, DWELL_FRACTION * 0.45, LOGO_A_OUT, 1],
    [1, 1, 0, 0]
  );

  // Logo B: animated white logo — starts large+centered, morphs to small+top-left, then lands in catalog header
  const LB_FINAL_W = 130;
  const LB_FINAL_LEFT = 64;
  const LB_FINAL_TOP = 20;

  // Catalog logo position — derived from bento-gallery CSS layout
  // container mx-auto uses Tailwind v4 max-widths: sm=640, md=768, lg=1024, xl=1280, 2xl=1536
  const containerMaxW = vpW >= 1536 ? 1536 : vpW >= 1280 ? 1280 : vpW >= 1024 ? 1024 : vpW >= 768 ? 768 : vpW >= 640 ? 640 : vpW;
  const containerLeftMargin = Math.max(0, (vpW - containerMaxW) / 2);
  const catalogPaddingLeft = vpW >= 768 ? 48 : 16; // md:px-12 = 48px, px-4 = 16px
  const LB_CATALOG_LEFT = containerLeftMargin + catalogPaddingLeft;

  // bento section: py-16 top+bottom (128) + brand(44) + heading(72) + mb-12(48) + grid(532) + button(88) ≈ 912px
  // catalog slide: flex flex-col justify-center → section top = (vpH - 912) / 2
  const BENTO_H = 912;
  const LB_CATALOG_TOP = Math.max(8, (vpH - BENTO_H) / 2 + 64);
  const LB_CATALOG_W = 120; // matches h-7 (28px) × ~4.3 aspect ratio

  const lbBigW = Math.min(vpW * 0.72, 760);
  const lbBigLeft = (vpW - lbBigW) / 2;
  const lbBigTop = vpH / 2 - lbBigW / 9;

  // Section 4 starts appearing at scroll ~0.80; morph begins there, lands at 1.0
  const MORPH_START = 0.80;

  const logoBOpacity = useTransform(
    scrollYProgress,
    [0, LOGO_A_OUT, DWELL_FRACTION * 0.9, DWELL_FRACTION + 0.04, 0.995, 1.0],
    [0, 0,          1,                     1,                     1,     0]
  );
  // Hold keyframe at MORPH_START prevents interpolation drift in sections 1-3
  const logoBLeftMV = useTransform(
    scrollYProgress,
    [LOGO_A_OUT, DWELL_FRACTION + 0.08, MORPH_START, 1.0],
    [lbBigLeft,  LB_FINAL_LEFT,         LB_FINAL_LEFT, LB_CATALOG_LEFT]
  );
  const logoBTopMV = useTransform(
    scrollYProgress,
    [LOGO_A_OUT, DWELL_FRACTION + 0.08, MORPH_START, 1.0],
    [lbBigTop,   LB_FINAL_TOP,          LB_FINAL_TOP,  LB_CATALOG_TOP]
  );
  const logoBWidthMV = useTransform(
    scrollYProgress,
    [LOGO_A_OUT, DWELL_FRACTION + 0.08, MORPH_START, 1.0],
    [lbBigW,     LB_FINAL_W,            LB_FINAL_W,    LB_CATALOG_W]
  );
  const logoBTopPx = useMotionTemplate`${logoBTopMV}px`;
  const logoBLeftPx = useMotionTemplate`${logoBLeftMV}px`;
  const logoBWidthPx = useMotionTemplate`${logoBWidthMV}px`;
  // White while large+centered → original colors as it shrinks to top-left
  // Stays original through sections 1-3 and catalog (visible on both light+dark)
  const logoBInvert = useTransform(scrollYProgress, [LOGO_A_OUT, DWELL_FRACTION + 0.08], [1, 0]);
  const logoBBright = useTransform(scrollYProgress, [LOGO_A_OUT, DWELL_FRACTION + 0.08], [0, 1]);
  const logoBFilter = useMotionTemplate`brightness(${logoBBright}) invert(${logoBInvert})`;

  // Active dot x position (each dot is 14px wide including gap)
  const dotX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", `${(SLIDE_COUNT - 1) * 14}px`]
  );

  return (
    <>
    {/* ── Fixed logo ghost — exclusion blend (intro only) ── */}
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
      style={{ opacity: logoOpacity, mixBlendMode: "exclusion" }}
    >
      <img
        src="/logo_full.png"
        alt="Disfrazarte"
        className="w-[72vw] max-w-[760px] h-auto block"
        style={{ filter: "invert(1) brightness(2) saturate(0)" }}
      />
    </motion.div>

    {/* ── Logo B: morphs from large-center to small-top-left ── */}
    {!isMobile && (
      <motion.img
        src="/logo_full.png"
        alt="Disfrazarte"
        style={{
          position: "fixed",
          top: logoBTopPx,
          left: logoBLeftPx,
          width: logoBWidthPx,
          height: "auto",
          opacity: logoBOpacity,
          filter: logoBFilter,
          zIndex: 41,
          pointerEvents: "none",
        }}
      />
    )}

    <div ref={ref} style={{ minHeight: `${TOTAL_PAGES * 100}vh` }}>
      <div className="sticky top-0 h-screen bg-white dark:bg-[#0d0d20]" style={{ overflow: "clip" }}>

        {/* ─── Mouse trails canvas (desktop only) ── */}
        <canvas
          id="canvas-trails"
          className="absolute inset-0 w-full h-full pointer-events-none z-[1] hidden md:block"
        />

        {/* ─── Progress bar ─────────────────────────────────────────────── */}
        <div className="absolute top-0 left-0 right-0 h-[3px] z-50 bg-black/5 dark:bg-white/5">
          <motion.div
            style={{ width: barW }}
            className="h-full bg-gradient-to-r from-[#1baeea] to-[#ff1fa0]"
          />
        </div>

        {/* ─── Slide track ──────────────────────────────────────────────── */}
        <motion.div
          className="flex h-full"
          style={{ width: `${SLIDE_COUNT * 100}vw`, x }}
        >

          {/* ── Slide 0: Intro ─────────────────────────────────────────── */}
          <div
            className="w-screen h-full flex-shrink-0 relative flex flex-col items-center justify-center text-center px-6 bg-white dark:bg-[#0d0d20] overflow-hidden"
            onMouseMove={handleMouseMove}
          >
            {/* ── Gallery background — 3D on desktop, static grid on mobile ── */}
            {isMobile ? (
              <div className="absolute inset-0 grid grid-cols-2 gap-1 overflow-hidden pointer-events-none opacity-25">
                {["/instagram/ig-01.jpg", "/instagram/ig-03.jpg", "/instagram/ig-05.jpg", "/instagram/ig-07.jpg", "/instagram/ig-09.jpg", "/instagram/ig-11.jpg"].map((src, i) => (
                  <div key={i} className="relative overflow-hidden">
                    <Image src={src} alt="" fill sizes="50vw" className="object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <InfiniteGallery
                images={[
                  { src: "/instagram/ig-01.jpg", alt: "Disfraz 1" },
                  { src: "/instagram/ig-03.jpg", alt: "Disfraz 3" },
                  { src: "/instagram/ig-05.jpg", alt: "Disfraz 5" },
                  { src: "/instagram/ig-07.jpg", alt: "Disfraz 7" },
                  { src: "/instagram/ig-09.jpg", alt: "Disfraz 9" },
                  { src: "/instagram/ig-11.jpg", alt: "Disfraz 11" },
                  { src: "/instagram/ig-13.jpg", alt: "Disfraz 13" },
                  { src: "/instagram/ig-15.jpg", alt: "Disfraz 15" },
                  { src: "/instagram/ig-16.jpg", alt: "Disfraz 16" },
                  { src: "/instagram/ig-19.jpg", alt: "Disfraz 19" },
                ]}
                speed={0.8}
                visibleCount={10}
                disableScroll={false}
                className="absolute inset-0 w-full h-full"
              />
            )}

            {/* ── Confetti BEHIND gallery (small, slow, faint) ── */}
            <ConfettiCanvas layer={BACK_LAYER} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

            {/* ── Soft background orbs ── */}
            <div className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-[#1baeea]/15 blur-[110px] pointer-events-none" />
            <div className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[#ff1fa0]/12 blur-[110px] pointer-events-none" />

            {/* Scroll hint only — logo is fixed overlay */}
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-16 flex flex-col items-center gap-3"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <svg width="18" height="28" viewBox="0 0 18 28" fill="none" className="text-[#0a0a1a]/20 dark:text-white/20">
                    <rect x="1" y="1" width="16" height="26" rx="8" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="8" y="5" width="2" height="6" rx="1" fill="currentColor" />
                  </svg>
                </motion.div>
                <span className="text-[#0a0a1a]/15 text-[10px] font-bold tracking-[0.5em] uppercase">Scroll</span>
              </motion.div>
            </div>
          </div>

          {/* ── Slides 1–4: Scene slides ────────────────────────────────── */}
          {slides
            .filter((s) => s.type === "scene")
            .map((slide) => {
              if (slide.type !== "scene") return null;
              return (
                <div
                  key={slide.num}
                  className="w-screen h-full flex-shrink-0 relative overflow-hidden"
                >
                  {/* Background image */}
                  <Image
                    src={slide.img}
                    alt={slide.cat}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex items-center px-8 md:px-16 lg:px-24">
                    <div className="max-w-2xl">
                      {/* Category tag */}
                      <div className="flex items-center gap-3 mb-6">
                        <span
                          className="text-[11px] font-bold tracking-[0.45em] uppercase"
                          style={{ color: slide.accent }}
                        >
                          {slide.num}
                        </span>
                        <div
                          className="h-px w-10 opacity-40"
                          style={{ background: slide.accent }}
                        />
                        <span
                          className="text-[11px] font-bold tracking-[0.3em] uppercase opacity-80"
                          style={{ color: slide.accent }}
                        >
                          {slide.cat}
                        </span>
                      </div>

                      {/* Heading */}
                      <h2
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold leading-[0.88] text-white"
                        style={{ fontFamily: "var(--font-fredoka)" }}
                      >
                        {slide.h1}
                        <br />
                        <span style={{ color: slide.accent }}>{slide.h2}</span>
                      </h2>

                      {/* Sub */}
                      <p className="mt-6 text-white/50 text-base md:text-lg font-medium max-w-lg leading-relaxed">
                        {slide.sub}
                      </p>
                    </div>
                  </div>

                  {/* Slide number watermark */}
                  <div
                    className="absolute bottom-8 right-8 md:right-16 text-[8rem] md:text-[12rem] font-bold leading-none opacity-[0.04] select-none pointer-events-none"
                    style={{ fontFamily: "var(--font-fredoka)", color: slide.accent }}
                  >
                    {slide.num}
                  </div>
                </div>
              );
            })}

          {/* ── Slide 5: Catalog ───────────────────────────────────────── */}
          <div className="w-screen h-full flex-shrink-0 relative bg-[#f5f8ff] dark:bg-[#12122a] flex flex-col justify-center" style={{ overflow: "clip" }}>
            <InteractiveImageBentoGallery
              imageItems={catalogItems}
              title="Elige tu"
              description="Arrastra para explorar · Haz clic para ampliar"
            />
          </div>

        </motion.div>

        {/* ─── Slide dots indicator ─────────────────────────────────────── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-40">
          {slides.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-black/15 dark:bg-white/15"
            />
          ))}
          {/* Active dot overlay — driven by scroll */}
          <motion.div
            className="absolute left-0 top-0 w-1.5 h-1.5 rounded-full gradient-brand"
            style={{ x: dotX }}
          />
        </div>

      </div>
    </div>
    </>
  );
}
