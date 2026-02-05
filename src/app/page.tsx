import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DynamicBackground from "@/components/DynamicBackground";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <DynamicBackground />
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
