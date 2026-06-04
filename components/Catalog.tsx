"use client";

import InteractiveImageBentoGallery from "@/components/ui/bento-gallery";

const costumeItems = [
  {
    id: 1,
    title: "Reina de Carnaval",
    desc: "Desfile",
    url: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "Fantasía Plumas",
    desc: "Carnaval",
    url: "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=800&auto=format&fit=crop",
    span: "md:row-span-1",
  },
  {
    id: 3,
    title: "Vestuario de Escena",
    desc: "Teatro",
    url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
    span: "md:row-span-1",
  },
  {
    id: 4,
    title: "Traje de Gala",
    desc: "Eventos",
    url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
    span: "md:row-span-2",
  },
  {
    id: 5,
    title: "Disfraz Folclórico",
    desc: "Desfile",
    url: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=800&auto=format&fit=crop",
    span: "md:row-span-1",
  },
  {
    id: 6,
    title: "Look Completo",
    desc: "Accesorios",
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: 7,
    title: "Personaje Animado",
    desc: "Fiestas",
    url: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=800&auto=format&fit=crop",
    span: "md:row-span-1",
  },
  {
    id: 8,
    title: "Baile Contemporáneo",
    desc: "Teatro",
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    span: "md:row-span-1",
  },
];

export default function Catalog() {
  return (
    <section id="catalogo">
      <InteractiveImageBentoGallery
        imageItems={costumeItems}
        title="Elige tu"
        description="Arrastra para explorar · Haz clic para ampliar · +500 modelos disponibles"
      />
    </section>
  );
}
