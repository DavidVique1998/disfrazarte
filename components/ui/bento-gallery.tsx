"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

type ImageItem = {
  id: number | string
  title: string
  desc: string
  url: string
  span: string
}

interface InteractiveImageBentoGalleryProps {
  imageItems: ImageItem[]
  title: string
  description: string
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
}

const ImageModal = ({ item, onClose }: { item: ImageItem; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
      className="relative w-full max-w-4xl p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={item.url} alt={item.title} className="h-auto max-h-[90vh] w-full object-contain" />
    </motion.div>
    <button onClick={onClose} className="absolute right-4 top-4 text-white/80 hover:text-white" aria-label="Cerrar">
      <X size={24} />
    </button>
  </motion.div>
)

const InteractiveImageBentoGallery: React.FC<InteractiveImageBentoGalleryProps> = ({ imageItems, title, description }) => {
  const [selectedItem, setSelectedItem] = useState<ImageItem | null>(null)
  const [dragConstraint, setDragConstraint] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)

  useEffect(() => {
    const calc = () => {
      if (gridRef.current && containerRef.current) {
        const cw = containerRef.current.offsetWidth
        const gw = gridRef.current.scrollWidth
        setDragConstraint(Math.min(0, cw - gw - 32))
      }
    }
    calc()
    window.addEventListener("resize", calc)
    return () => window.removeEventListener("resize", calc)
  }, [imageItems])

  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [30, 0])

  return (
    <section ref={targetRef} className="relative w-full overflow-hidden bg-[#f5f8ff] py-16 sm:py-24">
      <motion.div style={{ opacity, y }} className="container mx-auto px-4 md:px-12 mb-12">
        <p className="text-[#1baeea] text-[11px] font-bold tracking-[0.45em] uppercase mb-3">
          Catálogo
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2
            className="text-5xl md:text-7xl font-bold text-[#0a0a1a] leading-none"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {title} <span className="gradient-brand-text">traje</span>
          </h2>
          <p className="text-[#0a0a1a]/40 text-sm max-w-xs md:text-right font-medium">{description}</p>
        </div>
      </motion.div>

      <div ref={containerRef} className="relative w-full cursor-grab active:cursor-grabbing">
        <motion.div
          className="w-max"
          drag="x"
          dragConstraints={{ left: dragConstraint, right: 0 }}
          dragElastic={0.05}
          onPointerDown={(e) => { isDragging.current = false; dragStartX.current = e.clientX }}
          onPointerMove={(e) => { if (Math.abs(e.clientX - dragStartX.current) > 6) isDragging.current = true }}
        >
          <motion.div
            ref={gridRef}
            className="grid grid-rows-[260px_260px] grid-flow-col auto-cols-[minmax(260px,1fr)] gap-3 px-5 md:px-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {imageItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={cn(
                  "group relative flex h-full w-full min-w-[260px] cursor-pointer items-end overflow-hidden border border-black/6 p-4 shadow-sm hover:shadow-lg transition-shadow duration-300",
                  item.span,
                )}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => { if (!isDragging.current) setSelectedItem(item) }}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedItem(item)}
                aria-label={`Ver ${item.title}`}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105 pointer-events-none select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#1baeea] block mb-1">{item.desc}</span>
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>{item.title}</h3>
                </div>
                {/* Accent line on hover */}
                <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-[#1baeea] to-[#ff1fa0] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-10 px-5 md:px-12 text-center">
        <a
          href="https://wa.me/593969016264?text=Hola!%20Me%20interesa%20ver%20el%20catálogo%20completo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[#1baeea]/30 text-[#1baeea] font-bold text-sm hover:border-[#1baeea] hover:shadow-[0_4px_20px_rgba(27,174,234,0.2)] transition-all duration-300"
        >
          Ver catálogo completo por WhatsApp
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      <AnimatePresence>
        {selectedItem && <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>
    </section>
  )
}

export default InteractiveImageBentoGallery
