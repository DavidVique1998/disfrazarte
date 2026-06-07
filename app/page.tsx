import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="bg-white dark:bg-[#0d0d20] min-h-screen">
      <Navbar />
      <Hero />
      <Locations />
      <Footer />
      <ChatWidget />
    </main>
  );
}
