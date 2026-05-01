"use client";

import Link from "next/link";
import { BookOpen, Radio, Bookmark, Clock, Hash, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const features = [
  {
    id: "quran",
    title: "Quran Recitations",
    arabic: "?????? ??????",
    icon: BookOpen,
    description: "Read and listen to the complete Quran with 30+ reciters",
    arabicDesc: "???? ?????? ?????? ?????? ?????? ?? ???? ?? 30 ??????",
    href: "/quran",
  },
  {
    id: "radio",
    title: "Islamic Radio",
    arabic: "????? ?????? ??????",
    icon: Radio,
    description: "Stream live Islamic radio stations from around the world",
    arabicDesc: "????? ?????? ??????? ????????? ???????? ?? ??? ??????",
    href: "/radio",
  },
  {
    id: "tafsir",
    title: "Quran Tafsir",
    arabic: "????? ??????",
    icon: Bookmark,
    description: "9 tafsir sources including Ibn Katheer, Al-Tabari & Al-Qurtubi",
    arabicDesc: "9 ????? ??????? ??? ?? ??? ??? ????? ??????? ????????",
    href: "/tafsir",
  },
  {
    id: "prayer",
    title: "Prayer Times",
    arabic: "????? ??????",
    icon: Clock,
    description: "Accurate prayer times for your city with Hijri date",
    arabicDesc: "?????? ????? ?????? ?? ?????? ?? ??????? ??????",
    href: "/prayer-times",
  },
  {
    id: "tasbeeh",
    title: "Tasbeeh Counter",
    arabic: "???????",
    icon: Hash,
    description: "Digital Bayan counter with presets and daily tracking",
    arabicDesc: "???? ????? ???? ?? ??????? ????? ????? ????",
    href: "/tasbeeh",
  },
  {
    id: "azkar",
    title: "Azkar",
    arabic: "???????",
    icon: Heart,
    description: "Morning and evening remembrances with completion tracking",
    arabicDesc: "????? ?????? ??????? ?? ???? ???????",
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
                  <span className="text-lg text-gold-soft/80 font-[family-name:var(--font-tajawal)] font-bold">
                    {language === "en" ? feature.arabic : feature.title}
                  </span>
                </div>

                <h3 className={`text-xl font-bold text-white mb-2 group-hover:text-gold-soft transition-colors ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : ''}`}>
                  {t(feature.title, feature.arabic)}
                </h3>
                
                <p className={`text-sm text-white/60 leading-relaxed ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : ''}`}>
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
