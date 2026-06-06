"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SHARED = {
  phone: "096 901 6264",
  instagram: "@disfrazarte_ec",
  instagramUrl: "https://www.instagram.com/disfrazarte_ec/",
  hours: "Lun – Sáb · 9:00 – 19:00",
};

const locations = [
  {
    city: "Ambato",
    address: "13 de Abril y Mera, Centro Comercial Ambato",
    badge: "Casa Matriz",
    accent: "#1baeea",
    mapSrc:
      "https://maps.google.com/maps?q=Centro+Comercial+Ambato+Ecuador&output=embed&z=15",
    mapsUrl: "https://maps.google.com/?q=Centro+Comercial+Ambato+Ecuador",
  },
  {
    city: "Riobamba",
    address: "Riobamba, Ecuador",
    badge: "¡Nueva sede!",
    accent: "#ff1fa0",
    mapSrc:
      "https://maps.google.com/maps?q=Riobamba+Ecuador&output=embed&z=14",
    mapsUrl: "https://maps.google.com/?q=Riobamba+Ecuador",
  },
];

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function Locations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="locales" className="py-24 px-5 md:px-12 bg-[#f5f8ff] dark:bg-[#0d0d20]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="text-[#1baeea] text-[11px] font-bold tracking-[0.45em] uppercase mb-3">
            Encuéntranos
          </p>
          <h2
            className="text-5xl md:text-7xl font-bold text-[#0a0a1a] dark:text-white leading-none"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Nuestros{" "}
            <span className="gradient-brand-text">Locales</span>
          </h2>
        </motion.div>

        {/* Shared contact info — identical for both locations */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-12 pb-10 border-b border-black/8 dark:border-white/8"
        >
          {[
            { Icon: PhoneIcon, text: SHARED.phone, href: `tel:${SHARED.phone.replace(/\s/g, "")}` },
            { Icon: InstagramIcon, text: SHARED.instagram, href: SHARED.instagramUrl, external: true },
            { Icon: ClockIcon, text: SHARED.hours },
          ].map(({ Icon, text, href, external }) => (
            <div key={text} className="flex items-center gap-2.5">
              <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 bg-[#1baeea18] text-[#1baeea]">
                <Icon />
              </div>
              {href ? (
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="text-sm text-[#0a0a1a]/60 dark:text-white/60 hover:text-[#0a0a1a] dark:hover:text-white font-medium transition-colors"
                >
                  {text}
                </a>
              ) : (
                <span className="text-sm text-[#0a0a1a]/60 dark:text-white/60 font-medium">{text}</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.city}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.25 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group overflow-hidden bg-white dark:bg-[#12122a] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-500"
            >
              {/* Map embed — no badge overlay, avoids Google Maps UI conflict */}
              <div className="relative h-64 overflow-hidden">
                <iframe
                  src={loc.mapSrc}
                  width="100%"
                  height="100%"
                  className="absolute inset-0 w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-700"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa ${loc.city}`}
                />
              </div>

              {/* Badge strip — outside iframe so it never overlaps map UI */}
              <div className="px-6 py-2.5" style={{ background: loc.accent }}>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white">
                  {loc.badge}
                </span>
              </div>

              {/* Info panel */}
              <div className="p-6">
                {/* City name */}
                <h3
                  className="text-3xl font-bold mb-4 leading-none"
                  style={{ fontFamily: "var(--font-fredoka)", color: loc.accent }}
                >
                  {loc.city}
                </h3>

                {/* Address */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                    style={{ background: `${loc.accent}18`, color: loc.accent }}
                  >
                    <PinIcon />
                  </div>
                  <a
                    href={loc.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#0a0a1a]/55 dark:text-white/55 hover:text-[#0a0a1a] dark:hover:text-white font-medium transition-colors"
                  >
                    {loc.address}
                  </a>
                </div>

                {/* CTA */}
                <div className="mt-6 pt-5 border-t border-black/6 dark:border-white/6 flex gap-3">
                  <a
                    href={loc.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-none text-white text-xs font-bold tracking-wide transition-all hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${loc.accent}, ${loc.accent}dd)`, boxShadow: `0 4px 14px ${loc.accent}40` }}
                  >
                    <PinIcon />
                    Ver en Google Maps
                  </a>
                  <a
                    href={`https://wa.me/593969016264?text=Hola!%20Estoy%20en%20${loc.city}%20y%20me%20interesa%20alquilar%20un%20traje`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-none text-[#0a0a1a] dark:text-white text-xs font-bold tracking-wide bg-black/5 dark:bg-white/10 border border-black/8 dark:border-white/15 hover:bg-black/8 dark:hover:bg-white/15 transition-all"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#25d366]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
