import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <Locations />
<Footer />
    </main>
  );
}
