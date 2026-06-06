"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    num: "01",
    title: "Desfiles y Reinas",
    desc: "Vestuario espectacular para reinas, comparsas y desfiles folclóricos. Cada traje diseñado para brillar bajo los reflectores.",
    img: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=2400&auto=format&fit=crop",
    tag: "Desfile",
    accent: "#1baeea",
    span: "md:col-span-2 md:row-span-2",
    tall: true,
  },
  {
    num: "02",
    title: "Carnaval y Fiestas",
    desc: "Cientos de disfraces vibrantes para los carnavales más espectaculares de Ecuador.",
    img: "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=2400&auto=format&fit=crop",
    tag: "Carnaval",
    accent: "#ff1fa0",
    span: "md:col-span-1 md:row-span-1",
    tall: false,
  },
  {
    num: "03",
    title: "Teatro y Fotografía",
    desc: "Vestuario de época y fantasía para obras, producciones audiovisuales y sesiones fotográficas.",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2400&auto=format&fit=crop",
    tag: "Teatro",
    accent: "#1baeea",
    span: "md:col-span-1 md:row-span-1",
    tall: false,
  },
  {
    num: "04",
    title: "El Look Completo",
    desc: "Coronas, cetros, capas, máscaras y toda la utilería para completar tu traje de la cabeza a los pies.",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2400&auto=format&fit=crop",
    tag: "Accesorios",
    accent: "#ff1fa0",
    span: "md:col-span-2 md:row-span-1",
    tall: false,
  },
];

function ServiceCard({
  s,
  i,
  inView,
}: {
  s: (typeof services)[0];
  i: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden cursor-pointer ${s.span} ${s.tall ? "min-h-[500px]" : "min-h-[240px]"}`}
    >
      {/* Image */}
      <img
        src={s.img}
        alt={s.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Base overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Hover extra overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top tag + number */}
      <div className="absolute top-5 left-5 right-5 flex items-start justify-between z-10">
        <span
          className="text-[10px] font-bold tracking-[0.4em] uppercase px-3 py-1.5 rounded-sm text-white"
          style={{ background: `${s.accent}cc` }}
        >
          {s.tag}
        </span>
        <span
          className="text-5xl font-bold opacity-15 leading-none select-none"
          style={{ fontFamily: "var(--font-fredoka)", color: s.accent }}
        >
          {s.num}
        </span>
      </div>

      {/* Frosted glass bottom panel */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
        <div className="rounded-none bg-black/40 backdrop-blur-md border border-white/10 p-4">
          <h3
            className="text-xl md:text-2xl font-bold text-white leading-tight mb-1"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {s.title}
          </h3>
          <p className="text-white/55 text-xs leading-relaxed font-medium max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 delay-75">
            {s.desc}
          </p>
        </div>
      </div>

      {/* Accent glow on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }}
      />
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="servicios"
      className="py-24 px-5 md:px-12 bg-gradient-to-b from-[#f0f8ff] via-white to-white dark:from-[#0d0d20] dark:via-[#0d0d20] dark:to-[#0d0d20]"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <p className="text-[#1baeea] text-[11px] font-bold tracking-[0.45em] uppercase mb-3">
              Servicios
            </p>
            <h2
              className="text-5xl md:text-7xl font-bold text-[#0a0a1a] dark:text-white leading-none"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Todo lo que
              <br />
              <span className="gradient-brand-text">necesitas</span>
            </h2>
          </div>
          <p className="text-[#0a0a1a]/30 dark:text-white/30 text-sm max-w-xs leading-relaxed md:text-right font-medium">
            Envíos a todo Ecuador · Atención personalizada · +500 modelos
          </p>
        </motion.div>

        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[320px_240px] gap-4">
          {services.map((s, i) => (
            <ServiceCard key={s.num} s={s} i={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  );
}
