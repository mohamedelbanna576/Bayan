"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RotateCcw } from "lucide-react";

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

  useEffect(() => {
    const savedTotal = localStorage.getItem("Bayan_total_count");
    const parsedTotal = savedTotal ? parseInt(savedTotal, 10) : 0;
    setTotalCount(Number.isNaN(parsedTotal) ? 0 : parsedTotal);
    setMounted(true);
  }, []);

  const selectedZikr = presets[selectedPreset];
  const completedRounds = Math.floor(count / target);
  const progressPercentage = useMemo(
    () => Math.min(((count % target || (count > 0 ? target : 0)) / target) * 100, 100),
    [count, target]
  );

  const handleTap = useCallback(() => {
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

  const resetCount = () => setCount(0);
  const resetTotal = () => {
    if (confirm("Are you sure you want to reset lifetime total?")) {
      setTotalCount(0);
      localStorage.removeItem("Bayan_total_count");
    }
  };

  return (
    <main className="min-h-screen bg-ed-beige pt-20">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-12 pb-24">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-tajawal)] text-ed-green font-bold mb-3">
           المسبحة الإلكترونية
          </h1>
          <p className="text-sm text-ed-text-muted tracking-wide">Digital Tasbeeh</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left: Counter */}
          <div className="flex-1 flex flex-col items-center w-full">
            {/* Current Zikr */}
            <div className="mb-12 text-center">
              <p className="text-4xl md:text-5xl text-ed-green font-[family-name:var(--font-amiri)] leading-relaxed" dir="rtl">
                {selectedZikr.arabic}
              </p>
              <p className="text-sm text-ed-text-muted mt-3">{selectedZikr.english}</p>
            </div>

            {/* Tap Circle */}
            <div className="relative">
              <button
                onClick={handleTap}
                className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-ed-green flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all transform active:scale-95 relative overflow-hidden group"
              >
                {/* Progress ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                  <circle
                    cx="50" cy="50" r="46" fill="none"
                    stroke="rgba(206,170,105,0.6)" strokeWidth="2"
                    strokeDasharray={`${progressPercentage * 2.89} 289`}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                </svg>

                <span className="text-6xl md:text-7xl font-bold text-ed-beige z-10">{count}</span>
                <span className="text-xs text-ed-beige-warm/50 mt-2 z-10 tracking-wider">
                  {count % target || (count > 0 ? target : 0)} / {target}
                </span>
                <span className="text-[10px] text-ed-beige-warm/30 mt-1 z-10">Space / Enter</span>
              </button>

              <button
                onClick={resetCount}
                className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-white border border-ed-green/10 flex items-center justify-center text-ed-text-muted hover:text-ed-green hover:border-ed-green/20 shadow-sm transition-all"
                title="Reset Counter"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Stats */}
            <div className="mt-16 flex gap-12 text-center">
              <div>
                <p className="text-[10px] text-ed-text-muted uppercase tracking-[0.2em] mb-2">Rounds</p>
                <p className="text-3xl font-semibold text-ed-green">{completedRounds}</p>
              </div>
              <div className="w-px bg-ed-green/8"></div>
              <div>
                <p className="text-[10px] text-ed-text-muted uppercase tracking-[0.2em] mb-2">Lifetime</p>
                <p className="text-3xl font-semibold text-ed-green">{mounted ? totalCount.toLocaleString() : "–"}</p>
              </div>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="w-full lg:w-80 space-y-10">
            {/* Choose Zikr */}
            <div>
              <h3 className="text-xs text-ed-text-muted uppercase tracking-[0.2em] mb-4 font-medium">Choose Zikr</h3>
              <div className="space-y-2">
                {presets.map((preset, index) => (
                  <button
                    key={preset.english}
                    onClick={() => { setSelectedPreset(index); setCount(0); }}
                    className={`w-full px-4 py-3.5 text-right transition-all border text-sm ${
                      selectedPreset === index
                        ? "bg-ed-green text-ed-beige border-ed-green font-semibold"
                        : "bg-white border-ed-green/8 text-ed-text hover:border-ed-green/20"
                    }`}
                    dir="rtl"
                  >
                    {preset.arabic}
                  </button>
                ))}
              </div>
            </div>

            {/* Target */}
            <div>
              <h3 className="text-xs text-ed-text-muted uppercase tracking-[0.2em] mb-4 font-medium">Target</h3>
              <div className="grid grid-cols-2 gap-2">
                {targets.map((targetValue) => (
                  <button
                    key={targetValue}
                    onClick={() => { setTarget(targetValue); setCount(0); }}
                    className={`px-4 py-3 border transition-all text-sm ${
                      target === targetValue
                        ? "bg-ed-green text-ed-beige border-ed-green font-semibold"
                        : "bg-white border-ed-green/8 text-ed-text hover:border-ed-green/20"
                    }`}
                  >
                    {targetValue}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={resetTotal} className="text-xs text-ed-text-muted hover:text-ed-green transition-colors">
              Reset Lifetime Total
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
