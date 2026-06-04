"use client";

export default function Footer() {
  return (
    <footer className="border-t border-black/8 py-10 px-5 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-start gap-1">
          <div className="h-8 overflow-hidden">
            <img
              src="/logo_full.png"
              alt="Disfrazarte"
              className="block w-auto"
              style={{ height: "64px", marginTop: "-12px" }}
            />
          </div>
          <p className="text-[#0a0a1a]/30 text-xs font-medium tracking-widest">
            Ambato · Riobamba · Ecuador
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/disfrazarte_ec/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0a0a1a]/30 hover:text-[#ff1fa0] text-xs font-bold tracking-widest uppercase transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/593969016264"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0a0a1a]/30 hover:text-[#1baeea] text-xs font-bold tracking-widest uppercase transition-colors"
          >
            WhatsApp
          </a>
        </div>

        <p className="text-[#0a0a1a]/20 text-xs font-medium">
          © {new Date().getFullYear()} Disfrazarte
        </p>
      </div>
    </footer>
  );
}
