"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RotateCcw, Target, ChevronDown } from "lucide-react";

const targets = [33, 34, 99, 100, 500, 1000];

const presets = [
  { name: "سبحان الله", english: "SubhanAllah", target: 33 },
  { name: "الحمد لله", english: "Alhamdulillah", target: 33 },
  { name: "الله أكبر", english: "Allahu Akbar", target: 34 },
  { name: "لا إله إلا الله", english: "La ilaha illallah", target: 100 },
  { name: "أستغفر الله", english: "Astaghfirullah", target: 100 },
  { name: "لا حول ولا قوة إلا بالله", english: "La hawla wa la quwwata illa billah", target: 100 },
  { name: "سبحان الله وبحمده", english: "SubhanAllahi wa bihamdihi", target: 100 },
  { name: "سبحان الله العظيم", english: "SubhanAllahil Adheem", target: 100 },
  { name: "اللهم صل على محمد", english: "Allahumma salli ala Muhammad", target: 100 },
];

export default function TasbeehPage() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [showTargets, setShowTargets] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(presets[0]);
  const [totalToday, setTotalToday] = useState(0);
  const [rounds, setRounds] = useState(0);

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem("tasbeeh_today");
    if (saved) {
      const data = JSON.parse(saved);
      const today = new Date().toDateString();
      if (data.date === today) {
        setTotalToday(data.total);
      }
    }
  }, []);

  const increment = useCallback(() => {
    const newCount = count + 1;
    setCount(newCount);

    const newTotal = totalToday + 1;
    setTotalToday(newTotal);
    localStorage.setItem("tasbeeh_today", JSON.stringify({ date: new Date().toDateString(), total: newTotal }));

    if (newCount >= target) {
      setRounds(r => r + 1);
      setCount(0);
    }
  }, [count, target, totalToday]);

  const reset = () => {
    setCount(0);
    setRounds(0);
  };

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        increment();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [increment]);

  const progress = target > 0 ? (count / target) * 100 : 0;

  return (
    <main className="min-h-screen bg-emerald-forest pt-24">
      <Navbar />

      <div className="pb-24 max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gold-soft font-[family-name:var(--font-cairo)] mb-4">التسبيح</h1>
          <p className="text-white text-lg">Digital Tasbeeh Counter</p>
        </div>

        {/* Preset Selector */}
        <div className="flat-card p-4 mb-6">
          <div className="grid grid-cols-3 gap-2">
            {presets.map((preset) => (
              <button
                key={preset.english}
                onClick={() => { setSelectedPreset(preset); setTarget(preset.target); reset(); }}
                className={`px-3 py-3 rounded-lg text-center transition-colors ${
                  selectedPreset.english === preset.english
                    ? "bg-gold-soft text-emerald-forest"
                    : "bg-emerald-forest border border-white/10 text-white/70 hover:border-gold-soft/30"
                }`}
              >
                <span className="block font-[family-name:var(--font-cairo)] text-sm font-bold">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Counter Display */}
        <div className="flat-card p-8 text-center mb-6">
          {/* Current Dhikr */}
          <p className="text-3xl font-bold text-gold-soft font-[family-name:var(--font-amiri)] mb-1">{selectedPreset.name}</p>
          <p className="text-white/50 text-sm mb-8">{selectedPreset.english}</p>

          {/* Circular Counter */}
          <div className="relative w-56 h-56 mx-auto mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
              <circle
                cx="100" cy="100" r="90" fill="none"
                stroke="var(--gold-soft)" strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 90}`}
                strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                className="transition-all duration-200"
              />
            </svg>
            <button
              onClick={increment}
              className="absolute inset-4 rounded-full bg-emerald-deep border-2 border-gold-soft/20 flex flex-col items-center justify-center hover:bg-emerald-mid active:scale-95 transition-all cursor-pointer"
            >
              <span className="text-6xl font-bold text-white">{count}</span>
              <span className="text-white/40 text-sm mt-1">/ {target}</span>
            </button>
          </div>

          {/* Target Selector */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <button
                onClick={() => setShowTargets(!showTargets)}
                className="bg-emerald-forest border border-gold-soft/20 text-white rounded-lg px-4 py-2 flex items-center gap-2 text-sm hover:border-gold-soft/40 transition-colors"
              >
                <Target className="w-4 h-4 text-gold-soft" />
                Target: {target}
                <ChevronDown className={`w-3 h-3 text-white/40 transition-transform ${showTargets ? "rotate-180" : ""}`} />
              </button>
              {showTargets && (
                <div className="absolute bottom-full left-0 mb-1 bg-emerald-deep border border-gold-soft/20 rounded-lg overflow-hidden z-50">
                  {targets.map((t) => (
                    <button key={t} onClick={() => { setTarget(t); setShowTargets(false); reset(); }}
                      className={`block w-full px-6 py-2 text-sm text-left hover:bg-emerald-mid transition-colors ${target === t ? "text-gold-soft bg-emerald-mid" : "text-white/80"}`}
                    >{t}</button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={reset} className="bg-emerald-forest border border-white/10 text-white/60 rounded-lg px-4 py-2 flex items-center gap-2 text-sm hover:text-white hover:border-white/20 transition-colors">
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-emerald-forest rounded-lg p-4 border border-white/5">
              <p className="text-white/40 text-xs mb-1">Rounds</p>
              <p className="text-2xl font-bold text-gold-soft">{rounds}</p>
            </div>
            <div className="bg-emerald-forest rounded-lg p-4 border border-white/5">
              <p className="text-white/40 text-xs mb-1">Total Today</p>
              <p className="text-2xl font-bold text-white">{totalToday}</p>
            </div>
          </div>
        </div>

        <p className="text-center text-white/30 text-xs">Tap the circle, press Space, or press Enter to count</p>
      </div>

      <Footer />
    </main>
  );
}
