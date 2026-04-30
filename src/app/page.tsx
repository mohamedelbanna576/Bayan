import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-emerald-forest">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <FAQ />
      <Footer />
    </main>
  );
}
