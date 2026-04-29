"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const faqs = [
  {
    question: "What is the Dhikr Platform?",
    arabicQuestion: "ما هي منصة ذِكْر؟",
    answer: "Dhikr (ذِكْر) is a modern Islamic digital companion that brings together essential spiritual tools in one place — Quran reading with audio from 30+ reciters, 9 tafsir sources, live Islamic radio, accurate prayer times, a digital tasbeeh counter, and daily azkar (morning & evening remembrances).",
    arabicAnswer: "ذِكْر هي رفيق إسلامي رقمي حديث يجمع الأدوات الروحية الأساسية في مكان واحد — قراءة القرآن مع تلاوات من أكثر من 30 قارئًا، 9 مصادر للتفسير، إذاعة إسلامية مباشرة، مواقيت صلاة دقيقة، عداد تسبيح رقمي، وأذكار يومية (أذكار الصباح والمساء).",
  },
  {
    question: "How many reciters are available?",
    arabicQuestion: "كم عدد القراء المتاحين؟",
    answer: "We offer all reciters available through the AlQuran Cloud API, including both Murattal and Mujawwad styles. This includes famous sheikhs like Mishary Al-Afasy, Abdul Basit, Al-Husary, As-Sudais, Al-Minshawi, Maher Al-Muaiqly, and many more. Each reciter's name is displayed in both Arabic and English.",
    arabicAnswer: "نقدم جميع القراء المتاحين عبر واجهة برمجة تطبيقات AlQuran Cloud، بما في ذلك أسلوب الترتيل والمجود. وهذا يشمل مشايخ مشهورين مثل مشاري العفاسي، عبد الباسط، الحصري، السديس، المنشاوي، ماهر المعيقلي، وغيرهم الكثير. يتم عرض اسم كل قارئ باللغتين العربية والإنجليزية.",
  },
  {
    question: "What tafsir sources are available?",
    arabicQuestion: "ما هي مصادر التفسير المتاحة؟",
    answer: "We provide 9 authenticated tafsir sources, all fetched from the AlQuran Cloud API: Tafsir Al-Muyassar, Tafsir Al-Jalalayn, Tafsir Al-Qurtubi, Tafsir Ibn Katheer, Tafsir Al-Tabari, Tafsir As-Sa'di, Tafsir Al-Baghawi, Tafsir Al-Waseet, and At-Tahrir wa At-Tanwir. You can switch between them on any surah.",
    arabicAnswer: "نوفر 9 مصادر تفسير موثوقة، تم جلبها جميعًا من AlQuran Cloud API: التفسير الميسر، تفسير الجلالين، تفسير القرطبي، تفسير ابن كثير، تفسير الطبري، تفسير السعدي، تفسير البغوي، التفسير الوسيط، والتحرير والتنوير. يمكنك التبديل بينها في أي سورة.",
  },
  {
    question: "How are prayer times calculated?",
    arabicQuestion: "كيف يتم حساب أوقات الصلاة؟",
    answer: "Prayer times are fetched from the Aladhan API, which uses high-precision astronomical algorithms. You can select from 8 major cities worldwide. Times are displayed in 12-hour format (AM/PM) and include all 5 daily prayers along with both Hijri and Gregorian dates.",
    arabicAnswer: "يتم جلب أوقات الصلاة من Aladhan API، والتي تستخدم خوارزميات فلكية عالية الدقة. يمكنك الاختيار من بين 8 مدن رئيسية حول العالم. يتم عرض الأوقات بتنسيق 12 ساعة (AM/PM) وتتضمن جميع الصلوات الخمس اليومية بالإضافة إلى التاريخين الهجري والميلادي.",
  },
  {
    question: "What is the Tasbeeh Counter?",
    arabicQuestion: "ما هو عداد التسبيح؟",
    answer: "The Tasbeeh Counter is a digital dhikr tool with 9 preset adhkar (SubhanAllah, Alhamdulillah, Allahu Akbar, etc.). It features a circular progress ring, customizable count targets (33, 100, 500, 1000), round tracking, daily total that persists across sessions, and keyboard support (Space/Enter).",
    arabicAnswer: "عداد التسبيح هو أداة أذكار رقمية تحتوي على 9 أذكار محددة مسبقًا (سبحان الله، الحمد لله، الله أكبر، إلخ). يتميز بحلقة تقدم دائرية، وأهداف عد قابلة للتخصيص (33، 100، 500، 1000)، وتتبع الجولات، ومجموع يومي يستمر عبر الجلسات، ودعم لوحة المفاتيح (Space/Enter).",
  },
  {
    question: "Where do the Azkar come from?",
    arabicQuestion: "من أين تأتي الأذكار؟",
    answer: "Morning and evening azkar are sourced from an authenticated hadith-based API. Each zikr includes the original Arabic text, its reference, and the recommended number of repetitions. You can tap to track your progress through each zikr.",
    arabicAnswer: "أذكار الصباح والمساء مأخوذة من واجهة برمجة تطبيقات موثوقة تعتمد على الأحاديث. يتضمن كل ذكر النص العربي الأصلي، ومصدره، وعدد مرات التكرار الموصى به. يمكنك النقر لتتبع تقدمك في كل ذكر.",
  },
  {
    question: "Is the radio broadcast live?",
    arabicQuestion: "هل البث الإذاعي مباشر؟",
    answer: "Yes, we provide 24/7 live streaming of Quran recitations through verified radio stations sourced from mp3quran.net. You can search stations by name and switch between them freely.",
    arabicAnswer: "نعم، نقدم بثًا مباشرًا لتلاوات القرآن الكريم على مدار 24 ساعة طوال أيام الأسبوع عبر محطات إذاعية تم التحقق منها ومصدرها mp3quran.net. يمكنك البحث عن المحطات بالاسم والتبديل بينها بحرية.",
  },
  {
    question: "Does the platform work on mobile?",
    arabicQuestion: "هل تعمل المنصة على الهواتف المحمولة؟",
    answer: "Yes! The entire platform is fully responsive and works on mobile phones, tablets, and desktop browsers. The interface adapts to your screen size for the best reading and listening experience.",
    arabicAnswer: "نعم! المنصة بالكامل سريعة الاستجابة وتعمل على الهواتف المحمولة والأجهزة اللوحية ومتصفحات سطح المكتب. تتكيف الواجهة مع حجم شاشتك للحصول على أفضل تجربة قراءة واستماع.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { language, t } = useLanguage();

  return (
    <section className="py-24 bg-emerald-deep border-t border-emerald-forest">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-semibold text-white mb-4 ${language === 'ar' ? 'font-[family-name:var(--font-cairo)]' : ''}`}>
            {t("Questions & Answers", "أسئلة وأجوبة")}
          </h2>
          <p className={`text-white/80 max-w-lg mx-auto ${language === 'ar' ? 'font-[family-name:var(--font-cairo)]' : ''}`}>
            {t("Find answers to commonly asked questions about the Dhikr platform.", "ابحث عن إجابات للأسئلة الشائعة حول منصة ذِكْر.")}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="flat-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group hover:bg-emerald-mid transition-colors"
              >
                <span className={`text-base font-semibold transition-colors ${openIndex === index ? 'text-gold-soft' : 'text-white/90 group-hover:text-white'} ${language === 'ar' ? 'font-[family-name:var(--font-cairo)]' : ''}`}>
                  {t(faq.question, faq.arabicQuestion)}
                </span>
                <ChevronDown className={`w-5 h-5 shrink-0 ml-4 transition-transform duration-200 ${openIndex === index ? 'rotate-180 text-gold-soft' : 'text-white/50 group-hover:text-gold-soft'}`} />
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out origin-top ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className={`px-6 pb-5 text-white/70 leading-relaxed text-sm ${language === 'ar' ? 'font-[family-name:var(--font-cairo)]' : ''}`}>
                  {t(faq.answer, faq.arabicAnswer)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
