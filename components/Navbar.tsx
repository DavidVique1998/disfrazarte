"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { label: "Catálogo", href: "#catalogo", scrollTo: () => window.scrollTo({ top: window.innerHeight * 8, behavior: "smooth" }) },
  { label: "Locales", href: "#locales", scrollTo: null },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Hero is 600vh (6 slides). Show navbar only after scrolling past it.
      const heroEnd = window.innerHeight * 8.5;
      setPastHero(window.scrollY > heroEnd);
      setScrolled(window.scrollY > heroEnd + 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: pastHero ? 0 : -80, opacity: pastHero ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 py-3 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 dark:bg-[#0d0d20]/90 backdrop-blur-md border-b border-black/8 dark:border-white/10 shadow-sm"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img
            src="/logo_full.png"
            alt="Disfrazarte"
            className="block w-auto h-9"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.scrollTo ? undefined : l.href}
                onClick={l.scrollTo ? (e) => { e.preventDefault(); l.scrollTo!(); } : undefined}
                className="text-sm font-semibold tracking-wide text-[#0a0a1a]/60 dark:text-white/60 hover:text-[#0a0a1a] dark:hover:text-white transition-colors duration-300 relative group cursor-pointer"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-[#1baeea] to-[#ff1fa0] group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-3">
        <a
          href="https://wa.me/593969016264?text=Hola!%20Me%20interesa%20alquilar%20un%20traje"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 gradient-brand text-white text-sm font-bold px-5 py-2.5 rounded-none hover:opacity-90 transition-all duration-300"
          style={{ boxShadow: "0 4px 18px rgba(27,174,234,0.3), inset 0 1px 0 rgba(255,255,255,0.15)" }}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Reservar ahora
        </a>
        </div>

        {/* Mobile: hamburger */}
        <div className="md:hidden flex items-center gap-1">
        <button
          className="flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span className={`w-6 h-0.5 bg-[#1baeea] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-[#ff1fa0] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-4 h-0.5 bg-[#1baeea] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2 w-6" : ""}`} />
        </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-16 left-0 right-0 z-40 bg-white/95 dark:bg-[#0d0d20]/95 backdrop-blur-md border-b border-black/8 dark:border-white/10 shadow-lg p-6 flex flex-col gap-4"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.scrollTo ? undefined : l.href}
              onClick={(e) => { if (l.scrollTo) { e.preventDefault(); l.scrollTo(); } setMenuOpen(false); }}
              className="text-[#0a0a1a]/80 dark:text-white/80 font-semibold text-lg hover:text-[#1baeea] dark:hover:text-[#1baeea] transition-colors cursor-pointer"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/593969016264"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-brand text-white font-bold text-center px-5 py-3 rounded-none mt-2"
          >
            Reservar por WhatsApp
          </a>
        </motion.div>
      )}

      {/* Floating theme toggle — above WhatsApp */}
      <div className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-white dark:bg-[#12122a] border border-black/10 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] flex items-center justify-center transition-all duration-300 hover:shadow-lg">
        <ThemeToggle />
      </div>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/593969016264?text=Hola!%20Me%20interesa%20alquilar%20un%20traje"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-none bg-[#25d366] flex items-center justify-center hover:scale-110 transition-transform duration-300"
        aria-label="Contactar por WhatsApp"
        style={{ boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
