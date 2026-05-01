"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { language, t } = useLanguage();

  return (
    <main className="min-h-screen bg-ed-beige pt-20 flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-3xl mx-auto px-6 lg:px-10 pt-12 pb-24 w-full">
        <h1 className={`text-4xl md:text-5xl text-ed-green mb-4 ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : ''}`} style={{ fontFamily: language === 'ar' ? undefined : 'Georgia, serif' }}>
          {t("About Bayan Platform", "عن منصة بيان")}
        </h1>
        <div className="h-px bg-ed-green/8 mb-10"></div>

        <div className={`space-y-8 text-ed-text-secondary text-base leading-[1.9] ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : ''}`}>
          <p>
            {t(
              "Bayan is a modern Islamic digital platform designed to provide an elegant and peaceful user experience for Muslims around the world. Our goal is to bring essential spiritual tools into one unified, accessible place.",
              "بيان هي منصة إسلامية رقمية حديثة تم تصميمها لتوفير تجربة مستخدم أنيقة وهادئة للمسلمين في جميع أنحاء العالم. هدفنا هو تقديم الأدوات الروحية الأساسية في مكان واحد يسهل الوصول إليه."
            )}
          </p>

          <p>
            {t(
              "The platform features the Holy Quran with various recitations, live Islamic radio, multiple authenticated tafsir sources, accurate prayer times, and a digital tasbeeh counter.",
              "تتميز المنصة بالقرآن الكريم مع تلاوات متنوعة، وإذاعة إسلامية مباشرة، ومصادر تفسير متعددة وموثوقة، ومواقيت صلاة دقيقة، وعداد تسبيح رقمي."
            )}
          </p>

          <div className="my-10 py-10 border-y border-ed-green/8">
            <p className="text-xl text-ed-green font-semibold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              {t("Sadaqah Jariyah (Ongoing Charity)", "صدقة جارية")}
            </p>
            <p className="italic text-ed-text-muted leading-[1.9]">
              {t(
                "This project was created by Mohamed El Banna with the sole intention of it being a Sadaqah Jariyah (ongoing charity). I ask Allah to make this work sincerely for His sake, and that it remains a source of continuous reward and benefit to Muslims even after my passing. May Allah accept this effort from us and grant us all a good ending.",
                "تم إنشاء هذا المشروع بواسطة محمد البنا بنية خالصة ليكون صدقة جارية. أسأل الله العظيم أن يجعل هذا العمل خالصاً لوجهه الكريم، وأن يجعله علماً ينتفع به وعملاً صالحاً يستمر أجره ونفعه للمسلمين حتى بعد مماتي. نسأل الله القبول وحسن الخاتمة."
              )}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
