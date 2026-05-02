"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, Phone } from "lucide-react";

export default function ContactPage() {
  const { language, t } = useLanguage();

  return (
    <main className="min-h-screen bg-ed-beige pt-20 flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-3xl mx-auto px-6 lg:px-10 pt-12 pb-24 w-full">
        <h1
          className={`text-4xl md:text-5xl text-ed-green mb-4 ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : ''}`}
          style={{ fontFamily: language === 'ar' ? undefined : 'Georgia, serif' }}
        >
          {t("Contact Us", "اتصل بنا")}
        </h1>
        <div className="h-px bg-ed-green/8 mb-10"></div>

        <div className={`text-ed-text-secondary text-base leading-[1.9] mb-12 ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : ''}`}>
          <p>
            {t(
              "If you have any questions, suggestions, or would like to report an issue, please feel free to reach out to us. Your feedback helps us improve the platform.",
              "إذا كان لديك أي أسئلة، اقتراحات، أو ترغب في الإبلاغ عن مشكلة، فلا تتردد في التواصل معنا. ملاحظاتك تساعدنا على تحسين المنصة."
            )}
          </p>
        </div>

        <div className="space-y-4">
          <a
            href="mailto:mohamedelbanaa151@gmail.com"
            className="flex items-center gap-5 p-6 bg-white border border-ed-green/5 hover:border-ed-green/15 transition-colors group"
          >
            <div className="w-12 h-12 bg-ed-beige flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-ed-text-secondary" />
            </div>
            <div dir="ltr">
              <p className="text-[10px] text-ed-text-muted uppercase tracking-[0.2em] mb-1.5 font-medium">
                {t("Email", "البريد الإلكتروني")}
              </p>
              <p className="text-base text-ed-green font-medium">mohamedelbanaa151@gmail.com</p>
            </div>
          </a>

          <a
            href="https://wa.me/201035437122"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-5 p-6 bg-white border border-ed-green/5 hover:border-ed-green/15 transition-colors group"
          >
            <div className="w-12 h-12 bg-ed-beige flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-ed-text-secondary" />
            </div>
            <div dir="ltr">
              <p className="text-[10px] text-ed-text-muted uppercase tracking-[0.2em] mb-1.5 font-medium">
                {t("Phone / WhatsApp", "الهاتف / واتساب")}
              </p>
              <p className="text-base text-ed-green font-medium">+20 103 543 7122</p>
            </div>
          </a>
        </div>

        {/* Sadaqah Jariyah note */}
        <div className="mt-16 pt-10 border-t border-ed-green/8">
          <p className="text-sm text-ed-text-muted leading-relaxed text-center italic" style={{ fontFamily: 'Georgia, serif' }}>
            {t(
              "This platform is a Sadaqah Jariyah project. Share it with others to earn ongoing reward.",
              "هذه المنصة مشروع صدقة جارية. شاركها مع الآخرين لتكسب أجراً مستمراً."
            )}
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
