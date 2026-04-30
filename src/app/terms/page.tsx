"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { FileText } from "lucide-react";

export default function TermsPage() {
  const { language, t } = useLanguage();

  return (
    <main className="min-h-screen bg-emerald-forest pt-24 flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="glass-card p-8 md:p-12 animate-in fade-in duration-700">
          <div className="text-center mb-10">
            <FileText className="w-16 h-16 text-gold-soft mx-auto mb-6" />
            <h1 className={`text-4xl font-bold text-gold-soft mb-4 ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : ''}`}>
              {t("Terms of Service", "شروط الخدمة")}
            </h1>
            <p className="text-white/60">
              {t("Last updated: May 2026", "آخر تحديث: مايو 2026")}
            </p>
          </div>
          
          <div className={`space-y-8 text-white/80 text-base leading-relaxed ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)] text-right' : 'text-left'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">1. {t("Acceptance of Terms", "قبول الشروط")}</h2>
              <p>
                {t(
                  "By accessing and using the Bayan Platform, you accept and agree to be bound by the terms and provisions of this agreement. This platform is provided purely for spiritual and educational benefit.",
                  "من خلال الوصول إلى واستخدام منصة بيان، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية. يتم توفير هذه المنصة للأغراض الروحية والتعليمية البحتة."
                )}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">2. {t("Use of Content", "استخدام المحتوى")}</h2>
              <p>
                {t(
                  "All Quranic texts, audio recitations, and religious content provided on this platform are aggregated from verified, authentic public APIs. This content is for your personal, non-commercial use to assist in worship and study.",
                  "يتم تجميع جميع النصوص القرآنية والتلاوات الصوتية والمحتوى الديني المقدم على هذه المنصة من واجهات برمجة تطبيقات عامة معتمدة وموثوقة. هذا المحتوى مخصص لاستخدامك الشخصي وغير التجاري للمساعدة في العبادة والدراسة."
                )}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">3. {t("Accuracy of Information", "دقة المعلومات")}</h2>
              <p>
                {t(
                  "While we strive to ensure that all prayer times, tafsir, and Quranic texts are accurate by relying on trusted services, the Bayan Platform is not liable for any discrepancies. Always verify with your local Islamic authority or mosque for exact prayer times.",
                  "بينما نسعى جاهدين لضمان دقة جميع أوقات الصلاة والتفاسير والنصوص القرآنية من خلال الاعتماد على خدمات موثوقة، فإن منصة بيان غير مسؤولة عن أي اختلافات. تحقق دائمًا من الهيئة الإسلامية المحلية أو المسجد لمعرفة أوقات الصلاة الدقيقة."
                )}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">4. {t("Modifications", "التعديلات")}</h2>
              <p>
                {t(
                  "We reserve the right to modify these terms or any features of the platform at any time without prior notice. Continued use of the platform following any changes indicates your acceptance of the new terms.",
                  "نحتفظ بالحق في تعديل هذه الشروط أو أي ميزات للمنصة في أي وقت دون إشعار مسبق. الاستخدام المستمر للمنصة بعد أي تغييرات يشير إلى قبولك للشروط الجديدة."
                )}
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
