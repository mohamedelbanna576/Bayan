"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RotateCcw, Target, Trophy } from "lucide-react";

const presets = [
  { arabic: "سُبْحَانَ اللَّه", english: "SubhanAllah" },
  { arabic: "الْحَمْدُ لِلَّه", english: "Alhamdulillah" },
  { arabic: "اللَّهُ أَكْبَر", english: "Allahu Akbar" },
  { arabic: "لَا إِلَهَ إِلَّا اللَّه", english: "La ilaha illa Allah" },
  { arabic: "أَسْتَغْفِرُ اللَّه", english: "Astaghfirullah" },
  { arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّه", english: "La hawla wa la quwwata illa billah" },
];

const targets = [33, 100, 500, 1000];

export default function Tasbeeh() {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [target, setTarget] = useState(33);
  const [selectedPreset, setSelectedPreset] = useState(0);

  // Load totalCount from localStorage after hydration to avoid mismatch
  useEffect(() => {
    const savedTotal = localStorage.getItem("Bayan_total_count");
    const parsedTotal = savedTotal ? parseInt(savedTotal, 10) : 0;
    setTotalCount(Number.isNaN(parsedTotal) ? 0 : parsedTotal);
    setMounted(true);
  }, []);

  const selectedZikr = presets[selectedPreset];
  const completedRounds = Math.floor(count / target);
  const progressPercentage = useMemo(() => Math.min(((count % target || (count > 0 ? target : 0)) / target) * 100, 100), [count, target]);

  const handleTap = useCallback(() => {
    // Haptic feedback if supported
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }

    setCount((prev) => prev + 1);
    
    setTotalCount((prev) => {
      const newTotal = prev + 1;
      localStorage.setItem("Bayan_total_count", newTotal.toString());
      return newTotal;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const targetElement = event.target as HTMLElement | null;
      const isTyping = targetElement && ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(targetElement.tagName);
      if (!isTyping && (event.code === "Space" || event.code === "Enter")) {
        event.preventDefault();
        handleTap();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleTap]);

  const resetCount = () => {
    setCount(0);
  };

  const resetTotal = () => {
    if (confirm("Are you sure you want to reset lifetime total?")) {
      setTotalCount(0);
      localStorage.removeItem("Bayan_total_count");
    }
  };

  return (
    <main className="min-h-screen bg-emerald-forest pt-24">
      <Navbar />

      <div className="pb-24 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="text-center mb-12 animate-in slide-in-from-bottom-5 duration-500">
          <h1 className="text-5xl font-bold text-gold-soft font-[family-name:var(--font-tajawal)] mb-4">المِسْبَحَة الإِلِكْتِرُونِيَّة</h1>
          <p className="text-white text-lg">Digital Tasbeeh</p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="flex flex-col items-center">
            <div className="mb-6 text-center">
              <p className="text-4xl sm:text-5xl text-gold-soft font-[family-name:var(--font-amiri)] leading-relaxed" dir="rtl">
                {selectedZikr.arabic}
              </p>
              <p className="text-white/60 mt-2">{selectedZikr.english}</p>
            </div>

            <div className="relative w-full max-w-xs mx-auto animate-in zoom-in-95 duration-500 delay-150">
              {/* Main Tap Button */}
              <button
                onClick={handleTap}
                className="w-full aspect-square rounded-full glass-card border-4 border-gold-soft/30 hover:border-gold-soft/60 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.15)] hover:shadow-[0_0_60px_rgba(212,175,55,0.3)] transition-all transform active:scale-95 group overflow-hidden relative"
                style={{ background: `conic-gradient(rgba(212,175,55,0.18) ${progressPercentage * 3.6}deg, rgba(10,58,42,0.85) 0deg)` }}
              >
                {/* Ripple effect container */}
                <div className="absolute inset-3 bg-emerald-deep rounded-full border border-white/10"></div>
                
                <span className="text-7xl font-bold text-white font-[family-name:var(--font-sans)] drop-shadow-lg z-10">
                  {count}
                </span>
                <span className="text-gold-soft/70 mt-2 uppercase tracking-widest text-xs font-bold z-10">
                  {count % target || (count > 0 ? target : 0)} / {target}
                </span>
                <span className="text-white/40 mt-1 text-xs z-10">
                  Space / Enter
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

            <div className="mt-16 grid grid-cols-2 gap-4 w-full max-w-md animate-in slide-in-from-bottom-5 duration-500 delay-300">
              <div className="text-center glass-card px-6 py-4 rounded-2xl">
                <p className="text-white/60 text-xs mb-1 uppercase tracking-widest">Rounds</p>
                <p className="text-3xl font-bold text-gold-soft">{completedRounds}</p>
              </div>
              <div className="text-center glass-card px-6 py-4 rounded-2xl">
                <p className="text-white/60 text-xs mb-1 uppercase tracking-widest">Lifetime</p>
                <p className="text-3xl font-bold text-gold-soft">{mounted ? totalCount.toLocaleString() : "–"}</p>
              </div>
            </div>
          </div>

          <div className="w-full glass-card p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-gold-soft font-bold mb-3">
                <Trophy className="w-5 h-5" />
                Choose Zikr
              </div>
              <div className="space-y-2">
                {presets.map((preset, index) => (
                  <button
                    key={preset.english}
                    onClick={() => {
                      setSelectedPreset(index);
                      setCount(0);
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-right transition-colors ${
                      selectedPreset === index
                        ? "bg-gold-soft text-emerald-forest border-gold-soft font-bold"
                        : "bg-emerald-forest border-gold-soft/20 text-white hover:border-gold-soft/50"
                    }`}
                    dir="rtl"
                  >
                    {preset.arabic}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gold-soft font-bold mb-3">
                <Target className="w-5 h-5" />
                Target
              </div>
              <div className="grid grid-cols-2 gap-2">
                {targets.map((targetValue) => (
                  <button
                    key={targetValue}
                    onClick={() => {
                      setTarget(targetValue);
                      setCount(0);
                    }}
                    className={`px-4 py-3 rounded-xl border transition-colors ${
                      target === targetValue
                        ? "bg-gold-soft text-emerald-forest border-gold-soft font-bold"
                        : "bg-emerald-forest border-gold-soft/20 text-white hover:border-gold-soft/50"
                    }`}
                  >
                    {targetValue}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={resetTotal} className="w-full text-sm text-white/40 hover:text-white transition-colors underline">
              Reset Lifetime Total
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
