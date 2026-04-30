"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, Phone } from "lucide-react";

export default function ContactPage() {
  const { language, t } = useLanguage();

  return (
    <main className="min-h-screen bg-emerald-forest pt-24 flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="glass-card p-8 md:p-12 text-center animate-in fade-in duration-700">
          <h1 className={`text-4xl font-bold text-gold-soft mb-8 ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : ''}`}>
            {t("Contact Us", "اتصل بنا")}
          </h1>
          
          <div className={`space-y-8 text-white/80 text-lg ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : ''}`}>
            <p>
              {t(
                "If you have any questions, suggestions, or would like to report an issue, please feel free to reach out to us. Your feedback helps us improve the platform.",
                "إذا كان لديك أي أسئلة، اقتراحات، أو ترغب في الإبلاغ عن مشكلة، فلا تتردد في التواصل معنا. ملاحظاتك تساعدنا على تحسين المنصة."
              )}
            </p>

            <div className="flex flex-col gap-6 mt-10">
              <a href="mailto:mohamedelbanaa151@gmail.com" className="flex items-center justify-center gap-4 p-6 rounded-xl bg-emerald-deep border border-white/10 hover:border-gold-soft transition-colors group">
                <div className="w-12 h-12 rounded-full bg-emerald-mid flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-gold-soft" />
                </div>
                <div className="text-left" dir="ltr">
                  <p className="text-sm text-white/50">{t("Email", "البريد الإلكتروني")}</p>
                  <p className="text-xl font-medium text-white">mohamedelbanaa151@gmail.com</p>
                </div>
              </a>

              <a href="https://wa.me/201035437122" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 p-6 rounded-xl bg-emerald-deep border border-white/10 hover:border-gold-soft transition-colors group">
                <div className="w-12 h-12 rounded-full bg-emerald-mid flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-gold-soft" />
                </div>
                <div className="text-left" dir="ltr">
                  <p className="text-sm text-white/50">{t("Phone / WhatsApp", "الهاتف / واتساب")}</p>
                  <p className="text-xl font-medium text-white">+20 103 543 7122</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
