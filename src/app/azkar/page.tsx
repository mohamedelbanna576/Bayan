"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sun, Moon, Loader2, BookOpen, ChevronDown } from "lucide-react";

interface Zikr {
  id: number;
  text: string;
  count: number;
}

interface Category {
  id: number;
  category: string;
  array: Zikr[];
}

const AZKAR_URL = "https://raw.githubusercontent.com/rn0x/Adhkar-json/main/adhkar.json";

const categoryGroups = {
  morning: ["أذكار الصباح والمساء"],
  evening: ["أذكار الصباح والمساء"],
  sleep: ["أذكار النوم"],
  wakeup: ["أذكار الاستيقاظ من النوم"],
  prayer: ["دعاء الاستفتاح", "دعاء الركوع", "دعاء الرفع من الركوع", "دعاء السجود", "دعاء الجلسة بين السجدتين", "دعاء سجود التلاوة"],
  mosque: ["دعاء الذهاب إلى المسجد", "دعاء دخول المسجد", "دعاء الخروج من المسجد"],
  adhan: ["أذكار الآذان"],
  home: ["الذكر عند الخروج من المنزل", "الذكر عند دخول المنزل"],
};

type TabKey = keyof typeof categoryGroups;

const tabs: { key: TabKey; label: string; icon: any }[] = [
  { key: "morning", label: "أذكار الصباح", icon: Sun },
  { key: "evening", label: "أذكار المساء", icon: Moon },
  { key: "sleep", label: "أذكار النوم", icon: Moon },
  { key: "wakeup", label: "أذكار الاستيقاظ", icon: Sun },
  { key: "prayer", label: "أذكار الصلاة", icon: BookOpen },
  { key: "adhan", label: "أذكار الآذان", icon: BookOpen },
  { key: "mosque", label: "أذكار المسجد", icon: BookOpen },
  { key: "home", label: "أذكار المنزل", icon: BookOpen },
];

export default function AzkarPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("morning");
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [showTabs, setShowTabs] = useState(false);

  useEffect(() => {
    const fetchAzkar = async () => {
      try {
        const res = await fetch(AZKAR_URL);
        const data: Category[] = await res.json();
        setAllCategories(data);
      } catch (err) {
        console.error("Failed to fetch azkar:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAzkar();
  }, []);

  // Reset counts when tab changes
  useEffect(() => {
    setCompletedIds(new Set());
    setCounts({});
  }, [activeTab]);

  // Get filtered azkar for active tab
  const filteredCategories = allCategories.filter(c =>
    categoryGroups[activeTab].some(name => c.category.includes(name) || name.includes(c.category))
  );

  const allAzkar = filteredCategories.flatMap(c => c.array);

  const handleCount = (zikr: Zikr, catId: number) => {
    const key = `${catId}-${zikr.id}`;
    const maxCount = zikr.count || 1;
    const current = counts[key] || 0;
    const newCount = current + 1;

    if (newCount >= maxCount) {
      setCompletedIds(prev => new Set(prev).add(key));
      setCounts(prev => ({ ...prev, [key]: maxCount }));
    } else {
      setCounts(prev => ({ ...prev, [key]: newCount }));
    }
  };

  const completedCount = completedIds.size;
  const totalCount = allAzkar.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const activeTabInfo = tabs.find(t => t.key === activeTab)!;

  return (
    <main className="min-h-screen bg-emerald-forest pt-24">
      <Navbar />

      <div className="pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gold-soft font-[family-name:var(--font-cairo)] mb-4">الأذكار</h1>
          <p className="text-white text-lg">حصن المسلم</p>
          <p className="text-white/50 text-sm mt-2">Hisn Al-Muslim — Fortress of the Muslim</p>
        </div>

        {/* Tab Selector */}
        <div className="flat-card p-2 mb-6">
          {/* Mobile: dropdown */}
          <div className="sm:hidden relative">
            <button
              onClick={() => setShowTabs(!showTabs)}
              className="w-full bg-gold-soft text-emerald-forest py-3 rounded-lg flex items-center justify-center gap-2 font-bold font-[family-name:var(--font-cairo)]"
            >
              <activeTabInfo.icon className="w-5 h-5" />
              {activeTabInfo.label}
              <ChevronDown className={`w-4 h-4 transition-transform ${showTabs ? "rotate-180" : ""}`} />
            </button>
            {showTabs && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-emerald-deep border border-gold-soft/20 rounded-lg overflow-hidden z-50">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => { setActiveTab(tab.key); setShowTabs(false); }}
                    className={`w-full px-4 py-3 text-sm text-right font-[family-name:var(--font-cairo)] hover:bg-emerald-mid transition-colors ${
                      activeTab === tab.key ? "text-gold-soft bg-emerald-mid" : "text-white/70"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop: grid */}
          <div className="hidden sm:grid sm:grid-cols-4 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-3 rounded-lg flex items-center justify-center gap-2 transition-colors font-bold text-sm font-[family-name:var(--font-cairo)] ${
                  activeTab === tab.key
                    ? "bg-gold-soft text-emerald-forest"
                    : "text-white/60 hover:text-white hover:bg-emerald-mid"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Progress */}
        {totalCount > 0 && (
          <div className="flat-card p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-sm">Progress</span>
              <span className="text-gold-soft text-sm font-bold">{completedCount} / {totalCount}</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gold-soft rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-12 h-12 text-gold-soft animate-spin" />
          </div>
        ) : allAzkar.length === 0 ? (
          <div className="flat-card p-8 text-center">
            <p className="text-white/60 font-[family-name:var(--font-cairo)]">لا توجد أذكار في هذا القسم</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCategories.map((cat) => (
              <div key={cat.id}>
                {filteredCategories.length > 1 && (
                  <h2 className="text-gold-soft font-bold font-[family-name:var(--font-cairo)] text-lg mb-3 mt-6 text-right" dir="rtl">
                    {cat.category}
                  </h2>
                )}
                <div className="space-y-4">
                  {cat.array.map((zikr) => {
                    const key = `${cat.id}-${zikr.id}`;
                    const maxCount = zikr.count || 1;
                    const current = counts[key] || 0;
                    const isCompleted = completedIds.has(key);

                    return (
                      <div
                        key={key}
                        className={`flat-card overflow-hidden transition-opacity ${isCompleted ? "opacity-50" : ""}`}
                      >
                        <div className="p-6">
                          <p className="text-white text-xl leading-[2.2] font-[family-name:var(--font-amiri)] text-right" dir="rtl">
                            {zikr.text}
                          </p>
                        </div>

                        <div className="flex items-center justify-between px-6 py-3 bg-emerald-mid/30 border-t border-white/5">
                          <span className="text-white/40 text-xs">
                            {maxCount > 1 ? `التكرار ${maxCount} مرات` : "مرة واحدة"}
                          </span>
                          <button
                            onClick={() => handleCount(zikr, cat.id)}
                            disabled={isCompleted}
                            className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 ${
                              isCompleted
                                ? "bg-emerald-mid text-white/30 cursor-default"
                                : "bg-gold-soft text-emerald-forest hover:bg-gold-light active:scale-95"
                            }`}
                          >
                            {isCompleted ? "✓ تم" : `${current} / ${maxCount}`}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-white/20 text-xs mt-8">
          Source: حصن المسلم — Hisn Al-Muslim (via rn0x/Adhkar-json)
        </p>
      </div>

      <Footer />
    </main>
  );
}
