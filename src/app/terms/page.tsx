"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function TermsPage() {
  const { language, t } = useLanguage();

  const sections = [
    {
      title: t("Acceptance of Terms", "قبول الشروط"),
      content: t(
        "By accessing and using the Bayan Platform, you accept and agree to be bound by the terms and provisions of this agreement. This platform is provided purely for spiritual and educational benefit.",
        "من خلال الوصول إلى واستخدام منصة بيان، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية. يتم توفير هذه المنصة للأغراض الروحية والتعليمية البحتة."
      ),
    },
    {
      title: t("Use of Content", "استخدام المحتوى"),
      content: t(
        "All Quranic texts, audio recitations, and religious content provided on this platform are aggregated from verified, authentic public APIs. This content is for your personal, non-commercial use to assist in worship and study.",
        "يتم تجميع جميع النصوص القرآنية والتلاوات الصوتية والمحتوى الديني المقدم على هذه المنصة من واجهات برمجة تطبيقات عامة معتمدة وموثوقة. هذا المحتوى مخصص لاستخدامك الشخصي وغير التجاري للمساعدة في العبادة والدراسة."
      ),
    },
    {
      title: t("Accuracy of Information", "دقة المعلومات"),
      content: t(
        "While we strive to ensure that all prayer times, tafsir, and Quranic texts are accurate by relying on trusted services, the Bayan Platform is not liable for any discrepancies. Always verify with your local Islamic authority or mosque for exact prayer times.",
        "بينما نسعى جاهدين لضمان دقة جميع أوقات الصلاة والتفاسير والنصوص القرآنية من خلال الاعتماد على خدمات موثوقة، فإن منصة بيان غير مسؤولة عن أي اختلافات. تحقق دائمًا من الهيئة الإسلامية المحلية أو المسجد لمعرفة أوقات الصلاة الدقيقة."
      ),
    },
    {
      title: t("Modifications", "التعديلات"),
      content: t(
        "We reserve the right to modify these terms or any features of the platform at any time without prior notice. Continued use of the platform following any changes indicates your acceptance of the new terms.",
        "نحتفظ بالحق في تعديل هذه الشروط أو أي ميزات للمنصة في أي وقت دون إشعار مسبق. الاستخدام المستمر للمنصة بعد أي تغييرات يشير إلى قبولك للشروط الجديدة."
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-ed-beige pt-20 flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-3xl mx-auto px-6 lg:px-10 pt-12 pb-24 w-full">
        <h1 className={`text-4xl md:text-5xl text-ed-green mb-2 ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : ''}`} style={{ fontFamily: language === 'ar' ? undefined : 'Georgia, serif' }}>
          {t("Terms of Service", "شروط الخدمة")}
        </h1>
        <p className="text-xs text-ed-text-muted mb-8">{t("Last updated: May 2026", "آخر تحديث: مايو 2026")}</p>
        <div className="h-px bg-ed-green/8 mb-10"></div>

        <div className={`space-y-10 ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)] text-right' : 'text-left'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-xl font-semibold text-ed-green mb-3">{i + 1}. {section.title}</h2>
              <p className="text-ed-text-secondary text-base leading-[1.9]">{section.content}</p>
            </section>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
