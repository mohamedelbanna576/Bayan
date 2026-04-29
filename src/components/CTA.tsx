"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CTA() {
  const { language, t } = useLanguage();

  return (
    <section className="py-24 bg-emerald-forest">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-soft/20 text-gold-soft text-sm bg-emerald-deep">
            <Sparkles className="w-4 h-4" />
            <span className={language === 'ar' ? 'font-[family-name:var(--font-cairo)]' : ''}>
              {t("Begin Your Journey", "ابدأ رحلتك")}
            </span>
          </div>
        </div>

        <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6 ${language === 'ar' ? 'font-[family-name:var(--font-cairo)]' : ''}`}>
          {t("Start Your Spiritual Journey", "ابدأ رحلتك الروحية")}
        </h2>

        <p className={`text-lg text-white/80 mb-10 max-w-xl mx-auto ${language === 'ar' ? 'font-[family-name:var(--font-cairo)]' : ''}`}>
          {t(
            "Experience the beauty of Islamic learning in a modern way. Connect with timeless wisdom through our digital platform.",
            "جرب جمال التعلم الإسلامي بطريقة حديثة. تواصل مع الحكمة الخالدة من خلال منصتنا الرقمية."
          )}
        </p>

        <div>
          <Link
            href="#features"
            className="btn-gold px-10 py-4 text-lg inline-flex items-center justify-center w-full sm:w-auto"
          >
            {t("Explore Dhikr", "استكشف ذِكْر")}
          </Link>
        </div>
      </div>
    </section>
  );
}