"use client";

import Link from "next/link";
import { BookOpen, ArrowRight, Radio, Sparkles, BookMarked } from "lucide-react";

import LandingPrayerTimes from "@/components/LandingPrayerTimes";
import LandingNav from "@/components/LandingNav";
import { useLanguage } from "@/context/LanguageContext";

import { getAyahOfTheDay } from "@/data/ayahs";

export default function Home() {
  const ayah = getAyahOfTheDay();
  const { language, t } = useLanguage();
  const isArabic = language === "ar";

  return (
    <main className="min-h-screen bg-ed-beige selection:bg-ed-gold/20">

      {/* ═══════════════════════════════════════════════════════
          HERO — Split Layout
          Left: Deep green with large Arabic typography
          Right: Scrollable editorial sections
      ═══════════════════════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* ── Left Panel: Deep Green Hero ─────────────────── */}
        <div className="w-full lg:w-1/2 bg-ed-green relative flex flex-col min-h-[88vh] lg:min-h-screen lg:sticky lg:top-0 overflow-hidden">

          {/* Nav for landing */}
          <LandingNav />
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/[0.04] via-transparent to-ed-green-dark/25"></div>

          {/* Large Arabic Background Typography */}
          <div className="absolute inset-0 flex items-center justify-start pointer-events-none select-none overflow-hidden">
            <h1 className="text-[11rem] sm:text-[14rem] md:text-[17rem] xl:text-[19rem] font-extrabold leading-none font-[family-name:var(--font-tajawal)] -ml-5 md:-ml-2 text-ed-gold opacity-[0.16]">
              بيان
            </h1>
          </div>

          {/* Hero Text Content */}
          <div className="flex-1 flex flex-col justify-center relative z-10 px-6 md:px-10 xl:px-12 pt-20 pb-28 lg:pb-32 -translate-y-4">
            <h2 className={`text-6xl md:text-7xl xl:text-8xl mb-6 text-white tracking-tight leading-[1.05] ${isArabic ? "font-[family-name:var(--font-tajawal)]" : ""}`} style={{ fontFamily: isArabic ? undefined : 'Georgia, serif' }}>
              {t("Bayan", "بيان")}
            </h2>
            <p className={`text-[17px] md:text-[19px] text-ed-beige-warm/90 leading-relaxed max-w-md mb-10 ${isArabic ? "font-[family-name:var(--font-tajawal)]" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
              {t("Your Premium Islamic Digital Companion.", "رفيقك الإسلامي الرقمي المتكامل.")}<br />
              {t("Experience the depth of Islamic learning.", "استكشف عمق المعرفة الإسلامية.")}
            </p>
            <Link
              href="/quran"
              className="inline-flex items-center gap-2 rounded-xl bg-ed-gold px-8 py-4 text-sm font-extrabold tracking-wide text-ed-green-dark shadow-md shadow-black/10 w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-ed-beige-warm"
            >
              {t("Begin Journey", "ابدأ الرحلة")}
            </Link>
          </div>



          {/* Bottom Features */}
          <div className="hidden lg:grid absolute bottom-10 left-10 right-10 xl:left-12 xl:right-12 z-10 grid-cols-2 gap-6">
            <div className="max-w-[200px]">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <BookOpen className="w-4 h-4 text-ed-gold-muted" />
              </div>
              <h4 className={`text-sm text-ed-beige-warm mb-1.5 font-semibold ${isArabic ? "font-[family-name:var(--font-tajawal)]" : ""}`}>{t("Featured Recitations", "تلاوات مميزة")}</h4>
              <p className={`text-sm text-ed-beige-warm/80 leading-relaxed ${isArabic ? "font-[family-name:var(--font-tajawal)]" : ""}`} dir={isArabic ? "rtl" : "ltr"}>{t("Recite and listen to the complete Quran with over 30 reciters.", "اقرأ واستمع إلى القرآن الكريم كاملًا بأكثر من 30 قارئًا.")}</p>
            </div>
            <div className="max-w-[200px]">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <ArrowRight className="w-4 h-4 text-ed-gold-muted" />
              </div>
              <h4 className={`text-sm text-ed-beige-warm mb-1.5 font-semibold ${isArabic ? "font-[family-name:var(--font-tajawal)]" : ""}`}>{t("Continue Your Journey", "واصل رحلتك")}</h4>
              <p className={`text-sm text-ed-beige-warm/80 leading-relaxed ${isArabic ? "font-[family-name:var(--font-tajawal)]" : ""}`} dir={isArabic ? "rtl" : "ltr"}>{t("Pick up right where you left off and seamlessly resume your daily reading.", "تابع من حيث توقفت واستكمل وردك اليومي بسهولة.")}</p>
            </div>
          </div>
        </div>

        {/* ── Right Panel: Scrollable Editorial Sections ───── */}
        <div className="w-full lg:w-1/2 flex flex-col">

          {/* Section 1: Quran Recitations — Split Layout */}
          <section className="bg-white flex flex-col xl:flex-row items-center justify-center gap-12 xl:gap-14 px-8 py-20 md:px-12 xl:px-16 min-h-[36vh] border-b border-ed-green/10 shadow-[0_1px_0_rgba(44,54,42,0.04)]">
            {/* Book illustration */}
            <div className="relative flex-shrink-0">
              <div className="w-32 h-44 bg-ed-green rounded-xl shadow-lg shadow-ed-green-dark/15 relative flex items-center justify-center transform -rotate-[6deg] border-4 border-ed-green-soft">
                <div className="absolute inset-2 border border-ed-gold-muted/40 rounded-sm flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border border-ed-gold-muted/60 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-ed-gold-muted/80"></div>
                  </div>
                </div>
                <div className="absolute -bottom-3 right-6 w-5 h-7 bg-ed-gold-muted transform rotate-[6deg] shadow-md"></div>
              </div>
            </div>
            {/* Text */}
            <div className={`text-center ${isArabic ? "xl:text-right" : "xl:text-left"}`}>
              <h2 className={`text-[1.7rem] xl:text-[2.1rem] text-ed-green-dark tracking-tight mb-4 leading-tight ${isArabic ? "font-[family-name:var(--font-tajawal)]" : ""}`} style={{ fontFamily: isArabic ? undefined : 'Georgia, serif' }}>
                {t(<>Quran<br />Recitations</>, <>تلاوات<br />القرآن</>)}
              </h2>
              <p className={`text-base text-ed-text-secondary leading-relaxed max-w-xs ${isArabic ? "font-[family-name:var(--font-tajawal)]" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
                {t("Recite and listen to the complete Quran with over 30 reciters.", "اقرأ واستمع إلى القرآن الكريم كاملًا بأكثر من 30 قارئًا.")}
              </p>
              <Link href="/quran" className="inline-flex items-center gap-1.5 rounded-full text-sm text-ed-gold font-bold mt-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ed-gold">
                {t("Explore", "استكشف")} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          {/* Section 2: Ayah of the Day — Framed Quote */}
          <section className="relative min-h-[52vh] flex items-center justify-center px-8 py-20 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
            {/* Two-tone background: muted green top, gold bottom */}
            <div className="absolute inset-0">
              <div className="h-2/3 bg-ed-green-soft"></div>
              <div className="h-1/3 bg-ed-gold-muted"></div>
            </div>

            {/* Framed quote card */}
            <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-2 shadow-[0_18px_45px_rgba(44,54,42,0.10)]">
              <div className="rounded-xl border border-ed-gold-muted/60 p-10 md:p-14 text-center bg-ed-beige-light">
                <h3 className={`text-base text-ed-green mb-8 ${isArabic ? "font-[family-name:var(--font-tajawal)]" : ""}`} style={{ fontFamily: isArabic ? undefined : 'Georgia, serif' }}>
                  {t("Ayah of the Day", "آية اليوم")}
                </h3>

                <p className="text-2xl md:text-3xl font-[family-name:var(--font-amiri)] text-ed-green leading-[2.2] mb-6" dir="rtl">
                  {ayah.arabic}
                </p>

                <p className={`text-lg text-ed-text-secondary leading-[1.9] italic max-w-sm mx-auto ${isArabic ? "font-[family-name:var(--font-tajawal)]" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
                  &ldquo;{t(ayah.english, ayah.arabic)}&rdquo;
                </p>
                <p className="text-[11px] text-ed-gold mt-4 font-semibold uppercase tracking-widest">{ayah.reference}</p>
              </div>
            </div>
          </section>

          {/* Section 3: Prayer Times — Minimal Timeline */}
          <LandingPrayerTimes />

          {/* Section 4: Bottom Bar — Green with gold accent */}
          <section className="bg-ed-green border-t-[10px] border-ed-gold-muted px-8 py-16 md:px-12 xl:px-16 flex flex-col gap-8 shadow-[0_-18px_40px_rgba(44,54,42,0.06)]">
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-ed-gold-muted" />
              </div>
              <div>
                <h4 className={`text-lg text-white font-semibold mb-1 ${isArabic ? "font-[family-name:var(--font-tajawal)]" : ""}`}>{t("Explore More", "استكشف المزيد")}</h4>
                <p className={`text-sm text-ed-beige-warm/80 leading-relaxed max-w-sm ${isArabic ? "font-[family-name:var(--font-tajawal)]" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
                  {t("Discover Islamic radio, digital tasbeeh, daily azkar and tafsir all in one place.", "اكتشف الإذاعة الإسلامية، التسبيح الرقمي، الأذكار اليومية والتفسير في مكان واحد.")}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr">
              <Link href="/radio" className="flex min-h-[64px] w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-ed-gold">
                <Radio className="w-4 h-4 text-ed-gold-muted" />
                <span className={`text-sm font-semibold ${isArabic ? "font-[family-name:var(--font-tajawal)]" : ""}`}>{t("Islamic Radio", "الإذاعة الإسلامية")}</span>
              </Link>
              <Link href="/tasbeeh" className="flex min-h-[64px] w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-ed-gold">
                <Sparkles className="w-4 h-4 text-ed-gold-muted" />
                <span className={`text-sm font-semibold ${isArabic ? "font-[family-name:var(--font-tajawal)]" : ""}`}>{t("Digital Tasbeeh", "التسبيح الرقمي")}</span>
              </Link>
              <Link href="/azkar" className="flex min-h-[64px] w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-ed-gold">
                <BookOpen className="w-4 h-4 text-ed-gold-muted" />
                <span className={`text-sm font-semibold ${isArabic ? "font-[family-name:var(--font-tajawal)]" : ""}`}>{t("Daily Azkar", "الأذكار اليومية")}</span>
              </Link>
              <Link href="/tafsir" className="flex min-h-[64px] w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-ed-gold">
                <BookMarked className="w-4 h-4 text-ed-gold-muted" />
                <span className={`text-sm font-semibold ${isArabic ? "font-[family-name:var(--font-tajawal)]" : ""}`}>{t("Tafsir", "التفسير")}</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
