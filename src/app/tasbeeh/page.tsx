"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RotateCcw } from "lucide-react";

export default function Tasbeeh() {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const savedTotal = localStorage.getItem("dhikr_total_count");
    if (savedTotal) {
      setTotalCount(parseInt(savedTotal, 10));
    }
  }, []);

  const handleTap = () => {
    // Haptic feedback if supported
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }

    setCount((prev) => prev + 1);
    
    setTotalCount((prev) => {
      const newTotal = prev + 1;
      localStorage.setItem("dhikr_total_count", newTotal.toString());
      return newTotal;
    });
  };

  const resetCount = () => {
    setCount(0);
  };

  return (
    <main className="min-h-screen bg-emerald-forest pt-24">
      <Navbar />

      <div className="pb-24 max-w-lg mx-auto px-4 sm:px-6 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="text-center mb-12 animate-in slide-in-from-bottom-5 duration-500">
          <h1 className="text-5xl font-bold text-gold-soft font-[family-name:var(--font-cairo)] mb-4">المِسْبَحَة الإِلِكْتِرُونِيَّة</h1>
          <p className="text-white text-lg">Digital Tasbeeh</p>
        </div>

        <div className="relative w-full max-w-xs mx-auto animate-in zoom-in-95 duration-500 delay-150">
          {/* Main Tap Button */}
          <button
            onClick={handleTap}
            className="w-full aspect-square rounded-full glass-card border-4 border-gold-soft/30 hover:border-gold-soft/60 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.15)] hover:shadow-[0_0_60px_rgba(212,175,55,0.3)] transition-all transform active:scale-95 group overflow-hidden relative"
          >
            {/* Ripple effect container */}
            <div className="absolute inset-0 bg-gold-soft/5 opacity-0 group-active:opacity-100 transition-opacity duration-75 rounded-full"></div>
            
            <span className="text-7xl font-bold text-white font-[family-name:var(--font-sans)] drop-shadow-lg z-10">
              {count}
            </span>
            <span className="text-gold-soft/70 mt-2 uppercase tracking-widest text-xs font-bold z-10">
              Tap Anywhere
            </span>
          </button>

          {/* Reset Button */}
          <button
            onClick={resetCount}
            className="absolute -bottom-6 -right-2 w-14 h-14 rounded-full bg-emerald-deep border border-gold-soft/30 flex items-center justify-center text-white/60 hover:text-white hover:bg-emerald-mid hover:border-gold-soft shadow-lg transition-all transform hover:scale-110 active:scale-95"
            title="Reset Counter"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-16 text-center glass-card px-8 py-4 rounded-2xl animate-in slide-in-from-bottom-5 duration-500 delay-300">
          <p className="text-white/60 text-sm mb-1 uppercase tracking-widest">Lifetime Total</p>
          <p className="text-3xl font-bold text-gold-soft">{totalCount.toLocaleString()}</p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
