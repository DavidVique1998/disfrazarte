"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contacto" className="bg-white">
        {/* Full-width gradient band — edge to edge */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden gradient-brand px-8 md:px-16 py-20 md:py-28 text-center"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />

          {/* Floating decorative circles */}
          <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10">
            <p className="text-white/70 text-xs font-bold tracking-[0.4em] uppercase mb-4">
              ¡Reserva tu traje!
            </p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none mb-4"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              ¿Listo para brillar?
            </h2>
            <p className="text-white/70 text-sm md:text-base font-medium max-w-md mx-auto mb-10">
              Escríbenos y te ayudamos a encontrar el traje perfecto para tu evento.
              Envíos a todo Ecuador.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/593969016264?text=Hola!%20Me%20interesa%20alquilar%20un%20traje"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white text-[#0a0a1a] font-bold px-8 py-4 rounded-none hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 fill-[#25d366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Reservar por WhatsApp
              </a>
              <a
                href="https://www.instagram.com/disfrazarte_ec/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white/12 text-white font-bold px-8 py-4 rounded-none hover:bg-white/22 transition-all duration-300 text-sm border border-white/18"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 fill-white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Ver en Instagram
              </a>
            </div>

            <p className="mt-6 text-white/40 text-xs font-medium tracking-wide">
              096 901 6264 · Ambato y Riobamba
            </p>
          </div>
        </motion.div>
    </section>
  );
}
