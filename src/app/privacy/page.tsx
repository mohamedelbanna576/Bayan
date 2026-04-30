"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  const { language, t } = useLanguage();

  return (
    <main className="min-h-screen bg-emerald-forest pt-24 flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="glass-card p-8 md:p-12 animate-in fade-in duration-700">
          <div className="text-center mb-10">
            <ShieldCheck className="w-16 h-16 text-gold-soft mx-auto mb-6" />
            <h1 className={`text-4xl font-bold text-gold-soft mb-4 ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : ''}`}>
              {t("Privacy Policy", "سياسة الخصوصية")}
            </h1>
            <p className="text-white/60">
              {t("Last updated: May 2026", "آخر تحديث: مايو 2026")}
            </p>
          </div>
          
          <div className={`space-y-8 text-white/80 text-base leading-relaxed ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)] text-right' : 'text-left'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">1. {t("Information Collection", "جمع المعلومات")}</h2>
              <p>
                {t(
                  "The Bayan Platform does not collect, store, or share any personal information. All features of the platform, including the Holy Quran, prayer times, and radio, are provided without requiring you to create an account or provide personal data.",
                  "منصة بيان لا تقوم بجمع أو تخزين أو مشاركة أي معلومات شخصية. جميع ميزات المنصة، بما في ذلك القرآن الكريم، ومواقيت الصلاة، والإذاعة، يتم توفيرها دون الحاجة إلى إنشاء حساب أو تقديم بيانات شخصية."
                )}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">2. {t("Location Data", "بيانات الموقع")}</h2>
              <p>
                {t(
                  "We only request access to your device's location to accurately calculate prayer times based on your current geographical coordinates. This location data is processed locally in your browser and sent securely to the Aladhan API solely for generating prayer schedules. We do not track or store your location history.",
                  "نحن نطلب فقط الوصول إلى موقع جهازك لحساب أوقات الصلاة بدقة بناءً على إحداثياتك الجغرافية الحالية. تتم معالجة بيانات الموقع هذه محليًا في متصفحك وإرسالها بشكل آمن إلى واجهة برمجة تطبيقات Aladhan لغرض وحيد هو إنشاء جداول الصلاة. نحن لا نتتبع أو نخزن سجل موقعك."
                )}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">3. {t("Local Storage", "التخزين المحلي")}</h2>
              <p>
                {t(
                  "We use your browser's local storage to save your preferences, such as your chosen language (Arabic/English) and your Tasbeeh count, so that your experience is seamless across sessions. This data never leaves your device.",
                  "نستخدم مساحة التخزين المحلية لمتصفحك لحفظ تفضيلاتك، مثل لغتك المختارة (العربية/الإنجليزية) وعدد التسبيح الخاص بك، بحيث تكون تجربتك سلسة عبر الجلسات. هذه البيانات لا تغادر جهازك أبداً."
                )}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">4. {t("Third-Party Services", "خدمات الطرف الثالث")}</h2>
              <p>
                {t(
                  "To provide our services, we use reliable third-party APIs (AlQuran Cloud, Aladhan, and mp3quran.net). These services have their own privacy policies regarding the handling of API requests.",
                  "لتقديم خدماتنا، نستخدم واجهات برمجة تطبيقات لجهات خارجية موثوقة (AlQuran Cloud و Aladhan و mp3quran.net). هذه الخدمات لها سياسات الخصوصية الخاصة بها فيما يتعلق بالتعامل مع طلبات واجهة برمجة التطبيقات."
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
