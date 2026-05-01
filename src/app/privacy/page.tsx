"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
  const { language, t } = useLanguage();

  const sections = [
    {
      title: t("Information Collection", "جمع المعلومات"),
      content: t(
        "The Bayan Platform does not collect, store, or share any personal information. All features of the platform, including the Holy Quran, prayer times, and radio, are provided without requiring you to create an account or provide personal data.",
        "منصة بيان لا تقوم بجمع أو تخزين أو مشاركة أي معلومات شخصية. جميع ميزات المنصة، بما في ذلك القرآن الكريم، ومواقيت الصلاة، والإذاعة، يتم توفيرها دون الحاجة إلى إنشاء حساب أو تقديم بيانات شخصية."
      ),
    },
    {
      title: t("Location Data", "بيانات الموقع"),
      content: t(
        "We only request access to your device's location to accurately calculate prayer times based on your current geographical coordinates. This location data is processed locally in your browser and sent securely to the Aladhan API solely for generating prayer schedules. We do not track or store your location history.",
        "نحن نطلب فقط الوصول إلى موقع جهازك لحساب أوقات الصلاة بدقة بناءً على إحداثياتك الجغرافية الحالية. تتم معالجة بيانات الموقع هذه محليًا في متصفحك وإرسالها بشكل آمن إلى واجهة برمجة تطبيقات Aladhan لغرض وحيد هو إنشاء جداول الصلاة. نحن لا نتتبع أو نخزن سجل موقعك."
      ),
    },
    {
      title: t("Local Storage", "التخزين المحلي"),
      content: t(
        "We use your browser's local storage to save your preferences, such as your chosen language (Arabic/English) and your Tasbeeh count, so that your experience is seamless across sessions. This data never leaves your device.",
        "نستخدم مساحة التخزين المحلية لمتصفحك لحفظ تفضيلاتك، مثل لغتك المختارة (العربية/الإنجليزية) وعدد التسبيح الخاص بك، بحيث تكون تجربتك سلسة عبر الجلسات. هذه البيانات لا تغادر جهازك أبداً."
      ),
    },
    {
      title: t("Third-Party Services", "خدمات الطرف الثالث"),
      content: t(
        "To provide our services, we use reliable third-party APIs (AlQuran Cloud, Aladhan, and mp3quran.net). These services have their own privacy policies regarding the handling of API requests.",
        "لتقديم خدماتنا، نستخدم واجهات برمجة تطبيقات لجهات خارجية موثوقة (AlQuran Cloud و Aladhan و mp3quran.net). هذه الخدمات لها سياسات الخصوصية الخاصة بها فيما يتعلق بالتعامل مع طلبات واجهة برمجة التطبيقات."
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-ed-beige pt-20 flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-3xl mx-auto px-6 lg:px-10 pt-12 pb-24 w-full">
        <h1 className={`text-4xl md:text-5xl text-ed-green mb-2 ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : ''}`} style={{ fontFamily: language === 'ar' ? undefined : 'Georgia, serif' }}>
          {t("Privacy Policy", "سياسة الخصوصية")}
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
