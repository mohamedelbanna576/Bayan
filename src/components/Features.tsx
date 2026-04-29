"use client";

import Link from "next/link";
import { BookOpen, Radio, Bookmark, Clock, Hash, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const features = [
  {
    id: "quran",
    title: "Quran Recitations",
    arabic: "القرآن الكريم",
    icon: BookOpen,
    description: "Read and listen to the complete Quran with 30+ reciters",
    arabicDesc: "اقرأ واستمع للقرآن الكريم كاملاً مع أكثر من 30 قارئًا",
    href: "/quran",
  },
  {
    id: "radio",
    title: "Islamic Radio",
    arabic: "إذاعة القرآن الكريم",
    icon: Radio,
    description: "Stream live Islamic radio stations from around the world",
    arabicDesc: "استمع لمحطات الإذاعة الإسلامية المباشرة من حول العالم",
    href: "/radio",
  },
  {
    id: "tafsir",
    title: "Quran Tafsir",
    arabic: "تفسير القرآن",
    icon: Bookmark,
    description: "9 tafsir sources including Ibn Katheer, Al-Tabari & Al-Qurtubi",
    arabicDesc: "9 مصادر للتفسير بما في ذلك ابن كثير، الطبري، والقرطبي",
    href: "/tafsir",
  },
  {
    id: "prayer",
    title: "Prayer Times",
    arabic: "أوقات الصلاة",
    icon: Clock,
    description: "Accurate prayer times for your city with Hijri date",
    arabicDesc: "مواقيت دقيقة للصلاة في مدينتك مع التاريخ الهجري",
    href: "/prayer-times",
  },
  {
    id: "tasbeeh",
    title: "Tasbeeh Counter",
    arabic: "التسبيح",
    icon: Hash,
    description: "Digital dhikr counter with presets and daily tracking",
    arabicDesc: "عداد أذكار رقمي مع إعدادات مسبقة وتتبع يومي",
    href: "/tasbeeh",
  },
  {
    id: "azkar",
    title: "Azkar",
    arabic: "الأذكار",
    icon: Heart,
    description: "Morning and evening remembrances with completion tracking",
    arabicDesc: "أذكار الصباح والمساء مع تتبع الإنجاز",
    href: "/azkar",
  },
];

export default function Features() {
  const { language, t } = useLanguage();

  return (
    <section id="features" className="py-24 bg-emerald-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} id={feature.id}>
              <Link href={feature.href} className="block group flat-card p-6 card-hover h-full">
                <div className="flex items-center justify-between mb-4">
                  <feature.icon className="w-6 h-6 text-gold-soft" />
                  <span className="text-lg text-gold-soft/80 font-[family-name:var(--font-cairo)] font-bold">
                    {language === "en" ? feature.arabic : feature.title}
                  </span>
                </div>

                <h3 className={`text-xl font-bold text-white mb-2 group-hover:text-gold-soft transition-colors ${language === 'ar' ? 'font-[family-name:var(--font-cairo)]' : ''}`}>
                  {t(feature.title, feature.arabic)}
                </h3>
                
                <p className={`text-sm text-white/60 leading-relaxed ${language === 'ar' ? 'font-[family-name:var(--font-cairo)]' : ''}`}>
                  {t(feature.description, feature.arabicDesc)}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}