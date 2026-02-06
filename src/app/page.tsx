import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DynamicBackground from "@/components/DynamicBackground";
import Services from "@/components/Services";
import Mission from "@/components/Mission";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

const TrustBar = () => (
  <div className="py-12 border-y border-border bg-white/50 backdrop-blur-sm overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <p className="text-center text-[10px] uppercase tracking-[0.4em] text-muted font-black mb-8">
        In Partnership with Regulated Legal Specialists
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
        <span className="text-xl font-serif font-bold italic tracking-tighter">LAW SOCIETY</span>
        <span className="text-xl font-serif font-bold tracking-tight">DATA PROTECTION</span>
        <span className="text-xl font-serif font-bold italic tracking-widest">LEGAL NETWORK</span>
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <SplashScreen />
      <DynamicBackground />
      <Navbar />
      <Hero />
      <TrustBar />
      <Mission />
      <Services />
      <Testimonials />
      <Process />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
