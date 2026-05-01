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
  { id: 3, text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ.", count: 1 },
  { id: 10, text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ.", count: 3 },
  { id: 11, text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ.", count: 3 },
  { id: 12, text: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.", count: 7, virtue: "من قالها سبع مرات كفاه الله ما أهمه." },
];

const eveningAzkar: Zikr[] = [
  { id: 4, text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ.", count: 1 },
  { id: 5, text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ.", count: 1 },
  { id: 6, text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.", count: 3, virtue: "من قالها ثلاثاً لم يضره شيء." },
  { id: 13, text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.", count: 3, virtue: "من قالها حين يمسي ثلاث مرات لم يضره حُمَة تلك الليلة." },
  { id: 14, text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ.", count: 3 },
];

const postPrayerAzkar: Zikr[] = [
  { id: 7, text: "أَسْتَغْفِرُ اللَّهَ (ثَلَاثًا). اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ.", count: 1 },
  { id: 8, text: "سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَاللَّهُ أَكْبَرُ.", count: 33 },
  { id: 9, text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.", count: 1 },
  { id: 15, text: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ.", count: 1, virtue: "أوصى بها النبي ﷺ معاذ بن جبل." },
];

export default function Azkar() {
  const [activeCategory, setActiveCategory] = useState<"morning" | "evening" | "prayer">("morning");
  const [counts, setCounts] = useState<Record<number, number>>({});

  const getActiveAzkar = () => {
    switch (activeCategory) {
      case "morning": return morningAzkar;
      case "evening": return eveningAzkar;
      case "prayer": return postPrayerAzkar;
    }
  };

  const handleTap = (zikr: Zikr) => {
    setCounts((prev) => {
      const current = prev[zikr.id] || 0;
      if (current >= zikr.count) return prev;
      if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) window.navigator.vibrate(20);
      return { ...prev, [zikr.id]: current + 1 };
    });
  };

  const resetAll = () => {
    if (confirm("Are you sure you want to reset all counts?")) setCounts({});
  };

  const categories = [
    { key: "morning" as const, label: "أذكار الصباح", englishLabel: "Morning", icon: Sun },
    { key: "evening" as const, label: "أذكار المساء", englishLabel: "Evening", icon: Moon },
    { key: "prayer" as const, label: "أذكار الصلاة", englishLabel: "Post-Prayer", icon: Sparkles },
  ];

  const azkarList = getActiveAzkar();
  const completedCount = azkarList.filter(z => (counts[z.id] || 0) >= z.count).length;

  return (
    <main className="min-h-screen bg-[#F4F0E6] pt-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 lg:px-10 pt-12 pb-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-tajawal)] text-[#3B4A3F] font-bold mb-3">
            الأذكار
          </h1>
          <p className="text-sm text-[#8C9886] tracking-wide">Daily Supplications</p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-2.5 px-5 py-3 text-sm transition-all border font-[family-name:var(--font-tajawal)] ${
                activeCategory === cat.key
                  ? "bg-[#3B4A3F] text-[#F4F0E6] border-[#3B4A3F] font-semibold"
                  : "bg-white border-[#3B4A3F]/10 text-[#5A6B5D] hover:border-[#3B4A3F]/25 hover:text-[#3B4A3F]"
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Progress + Reset */}
        <div className="flex items-center justify-between mb-8 py-4 border-y border-[#3B4A3F]/8">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#8C9886] uppercase tracking-[0.2em] font-medium">Progress</span>
            <span className="text-sm font-semibold text-[#3B4A3F]">{completedCount} / {azkarList.length}</span>
            {/* Mini progress bar */}
            <div className="w-24 h-1 bg-[#3B4A3F]/8 hidden sm:block">
              <div
                className="h-full bg-[#CEAA69] transition-all duration-500"
                style={{ width: `${azkarList.length > 0 ? (completedCount / azkarList.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
          <button onClick={resetAll} className="text-xs text-[#8C9886] hover:text-[#3B4A3F] transition-colors">
            Reset
          </button>
        </div>

        {/* Azkar List */}
        <div className="space-y-4">
          {azkarList.map((zikr, index) => {
            const currentCount = counts[zikr.id] || 0;
            const isComplete = currentCount >= zikr.count;

            return (
              <div
                key={zikr.id}
                className={`border transition-all cursor-pointer select-none relative overflow-hidden ${
                  isComplete
                    ? "bg-[#FCFAF5] border-[#3B4A3F]/15"
                    : "bg-white border-[#3B4A3F]/5 hover:border-[#3B4A3F]/15 active:scale-[0.995]"
                }`}
                onClick={() => handleTap(zikr)}
              >
                {/* Gold progress bar at bottom */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] bg-[#CEAA69] transition-all duration-300"
                  style={{ width: `${(currentCount / zikr.count) * 100}%` }}
                />

                {/* Zikr number indicator */}
                <div className="flex items-center gap-3 px-6 md:px-8 pt-6">
                  <span className={`w-6 h-6 flex items-center justify-center text-[10px] font-bold ${
                    isComplete ? "bg-[#3B4A3F] text-[#F4F0E6]" : "bg-[#F4F0E6] text-[#8C9886]"
                  }`}>
                    {index + 1}
                  </span>
                  {isComplete && (
                    <span className="flex items-center gap-1.5 text-[#3B4A3F] text-xs font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  )}
                </div>

                {/* Arabic text */}
                <div className="px-6 md:px-8 py-5" dir="rtl">
                  <p className={`text-xl sm:text-2xl leading-[2.2] font-[family-name:var(--font-amiri)] transition-colors ${
                    isComplete ? "text-[#8C9886]" : "text-[#3B4A3F]"
                  }`}>
                    {zikr.text}
                  </p>

                  {zikr.virtue && (
                    <p className="mt-4 text-xs text-[#8C9886] font-[family-name:var(--font-tajawal)] leading-relaxed border-t border-[#3B4A3F]/5 pt-4">
                      <span className="inline-block w-1 h-1 rounded-full bg-[#CEAA69] mr-2 align-middle"></span>
                      {zikr.virtue}
                    </p>
                  )}
                </div>

                {/* Counter footer */}
                <div className="flex items-center justify-between px-6 md:px-8 pb-5">
                  {!isComplete && (
                    <span className="text-[10px] text-[#8C9886] uppercase tracking-[0.2em]">
                      Tap to count
                    </span>
                  )}
                  {isComplete && <span></span>}

                  <span className={`px-3.5 py-1.5 text-sm font-medium border tabular-nums ${
                    isComplete
                      ? "bg-[#3B4A3F] text-[#F4F0E6] border-[#3B4A3F]"
                      : "bg-white border-[#3B4A3F]/10 text-[#3B4A3F]"
                  }`}>
                    {currentCount} / {zikr.count}
                  </span>
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
