"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Heart } from "lucide-react";

export default function AboutPage() {
  const { language, t } = useLanguage();

  return (
    <main className="min-h-screen bg-emerald-forest pt-24 flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="glass-card p-8 md:p-12 text-center animate-in fade-in duration-700">
          <Heart className="w-16 h-16 text-gold-soft mx-auto mb-6" />
          <h1 className={`text-4xl md:text-5xl font-bold text-gold-soft mb-8 ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : ''}`}>
            {t("About Bayan Platform", "عن منصة بيان")}
          </h1>
          
          <div className={`space-y-6 text-white/80 text-lg leading-relaxed ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : ''}`}>
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

            <div className="my-10 border-t border-gold-soft/20 pt-10">
              <p className="text-xl text-gold-soft font-semibold mb-4">
                {t("Sadaqah Jariyah (Ongoing Charity)", "صدقة جارية")}
              </p>
              <p className="italic">
                {t(
                  "This project was created by Mohamed El Banna with the sole intention of it being a Sadaqah Jariyah (ongoing charity). I ask Allah to make this work sincerely for His sake, and that it remains a source of continuous reward and benefit to Muslims even after my passing. May Allah accept this effort from us and grant us all a good ending.",
                  "تم إنشاء هذا المشروع بواسطة محمد البنا بنية خالصة ليكون صدقة جارية. أسأل الله العظيم أن يجعل هذا العمل خالصاً لوجهه الكريم، وأن يجعله علماً ينتفع به وعملاً صالحاً يستمر أجره ونفعه للمسلمين حتى بعد مماتي. نسأل الله القبول وحسن الخاتمة."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
