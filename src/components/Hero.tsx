"use client";

import Link from "next/link";
import { ArrowDown, BookOpen, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="mb-6">
          <h1
            className="text-7xl sm:text-8xl lg:text-9xl font-bold text-gold mb-4 font-[family-name:var(--font-cairo)]"
            style={{ letterSpacing: "0.15em" }}
          >
            ذِكْر
          </h1>
        </div>

        <div className="mb-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
            {t("Dhikr", "ذكر")}
          </h2>
        </div>

        <p className="text-lg sm:text-xl text-sand mb-8 max-w-2xl mx-auto font-medium">
          {t("Your Modern Islamic Digital Companion", "رفيقك الإسلامي الرقمي الحديث")}
        </p>

        <p className="text-base sm:text-lg text-white/80 mb-12 max-w-xl mx-auto leading-relaxed">
          {t(
            "Experience the beauty of Islamic learning through a modern, elegant platform. Connect with Quran recitations, live radio, divine tafsir, and accurate prayer times — all in one place.",
            "استكشف جمال التعلم الإسلامي من خلال منصة حديثة وأنيقة. تواصل مع تلاوات القرآن الكريم، الإذاعة المباشرة، التفسير، ومواقيت الصلاة الدقيقة - كلها في مكان واحد."
          )}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/quran" className="btn-gold px-8 py-4 text-base inline-flex items-center justify-center gap-2 w-full sm:w-auto">
            <BookOpen className="w-5 h-5" />
            {t("Open Quran", "افتح القرآن")}
          </Link>
          <Link
            href="/prayer-times"
            className="btn-outline-gold px-8 py-4 text-base inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Clock className="w-5 h-5" />
            {t("Prayer Times", "مواقيت الصلاة")}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#features"
          className="text-white/60 hover:text-gold-soft transition-colors inline-flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest font-semibold">{t("Scroll", "مرر لأسفل")}</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}