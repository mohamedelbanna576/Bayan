"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sun, Moon, Sparkles, CheckCircle2 } from "lucide-react";

type Zikr = {
  id: number;
  text: string;
  count: number;
  virtue?: string;
};

const morningAzkar: Zikr[] = [
  { id: 1, text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.", count: 1, virtue: "من قالها حين يصبح حفظ من الشياطين حتى يمسي." },
  { id: 2, text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.", count: 100, virtue: "حُطَّتْ خَطَايَاهُ وَإِنْ كَانَتْ مِثْلَ زَبَدِ الْبَحْرِ." },
  { id: 3, text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ.", count: 1 }
];

const eveningAzkar: Zikr[] = [
  { id: 4, text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ.", count: 1 },
  { id: 5, text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ.", count: 1 },
  { id: 6, text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.", count: 3, virtue: "من قالها ثلاثاً لم يضره شيء." }
];

const postPrayerAzkar: Zikr[] = [
  { id: 7, text: "أَسْتَغْفِرُ اللَّهَ (ثَلَاثًا). اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ.", count: 1 },
  { id: 8, text: "سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَاللَّهُ أَكْبَرُ.", count: 33 },
  { id: 9, text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.", count: 1 }
];

export default function Azkar() {
  const [activeCategory, setActiveCategory] = useState<"morning" | "evening" | "prayer">("morning");
  
  // Track counts: { [zikrId]: currentCount }
  const [counts, setCounts] = useState<Record<number, number>>({});

  const getActiveAzkar = () => {
    switch (activeCategory) {
      case "morning": return morningAzkar;
      case "evening": return eveningAzkar;
      case "prayer": return postPrayerAzkar;
    }
  };

  const handleTap = (zikr: Zikr) => {
    setCounts(prev => {
      const current = prev[zikr.id] || 0;
      if (current >= zikr.count) return prev; // Already complete
      
      // Haptic feedback
      if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(20);
      }
      
      return { ...prev, [zikr.id]: current + 1 };
    });
  };

  const resetAll = () => {
    if (confirm("Are you sure you want to reset all counts?")) {
      setCounts({});
    }
  };

  return (
    <main className="min-h-screen bg-emerald-forest pt-24">
      <Navbar />

      <div className="pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-in slide-in-from-bottom-5 duration-500">
          <h1 className="text-5xl font-bold text-gold-soft font-[family-name:var(--font-tajawal)] mb-4">الأَذْكَار</h1>
          <p className="text-white text-lg">Daily Supplications</p>
        </div>

        {/* Categories */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-12 flex-wrap">
          <button
            onClick={() => setActiveCategory("morning")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
              activeCategory === "morning" 
                ? "bg-gold-soft text-emerald-forest font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] transform scale-105" 
                : "glass-card text-white/70 hover:text-white"
            }`}
          >
            <Sun className="w-5 h-5" /> أذكار الصباح
          </button>
          <button
            onClick={() => setActiveCategory("evening")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
              activeCategory === "evening" 
                ? "bg-gold-soft text-emerald-forest font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] transform scale-105" 
                : "glass-card text-white/70 hover:text-white"
            }`}
          >
            <Moon className="w-5 h-5" /> أذكار المساء
          </button>
          <button
            onClick={() => setActiveCategory("prayer")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
              activeCategory === "prayer" 
                ? "bg-gold-soft text-emerald-forest font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] transform scale-105" 
                : "glass-card text-white/70 hover:text-white"
            }`}
          >
            <Sparkles className="w-5 h-5" /> أذكار الصلاة
          </button>
        </div>

        {/* Reset Button */}
        <div className="flex justify-end mb-6">
          <button onClick={resetAll} className="text-sm text-white/40 hover:text-white transition-colors underline">
            Reset Progress
          </button>
        </div>

        {/* Azkar List */}
        <div className="space-y-6">
          {getActiveAzkar().map((zikr, index) => {
            const currentCount = counts[zikr.id] || 0;
            const isComplete = currentCount >= zikr.count;
            const progressPercentage = (currentCount / zikr.count) * 100;

            return (
              <div 
                key={zikr.id} 
                className={`glass-card p-6 sm:p-8 relative overflow-hidden transition-all duration-500 cursor-pointer select-none ${
                  isComplete ? "border-gold-soft/50 bg-emerald-mid" : "hover:border-gold-soft/30 hover:shadow-xl hover:-translate-y-1"
                }`}
                onClick={() => handleTap(zikr)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Progress Bar Background */}
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-gold-soft transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />

                <div className="text-center" dir="rtl">
                  <p className={`text-2xl sm:text-3xl leading-relaxed font-[family-name:var(--font-amiri)] transition-colors ${isComplete ? "text-gold-soft" : "text-white"}`}>
                    {zikr.text}
                  </p>
                  
                  {zikr.virtue && (
                    <p className="mt-4 text-sm text-gold-light/80 bg-emerald-deep/50 inline-block px-4 py-2 rounded-lg font-[family-name:var(--font-tajawal)]">
                      {zikr.virtue}
                    </p>
                  )}
                </div>

                {/* Counter */}
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
                  {isComplete ? (
                    <div className="flex items-center gap-2 text-gold-soft font-bold animate-in zoom-in">
                      <CheckCircle2 className="w-6 h-6" /> Completed
                    </div>
                  ) : (
                    <div className="text-white/40 text-sm uppercase tracking-widest">
                      Tap anywhere to count
                    </div>
                  )}
                  
                  <div className={`px-4 py-2 rounded-xl font-bold text-lg border ${
                    isComplete 
                      ? "bg-gold-soft text-emerald-forest border-gold-soft" 
                      : "bg-emerald-deep border-gold-soft/20 text-white"
                  }`}>
                    {currentCount} / {zikr.count}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </main>
  );
}
